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
    { id: 'introduction', title: 'Introduction to Degeneracy' },
    { id: 'definition', title: 'Definition and Causes' },
    { id: 'identification', title: 'Identifying Degeneracy' },
    { id: 'handling', title: 'Handling Degeneracy' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            Topic 5
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Degeneracy in Transportation Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding degeneracy: what it is, why it happens, and how to handle it in transportation problems
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Introduction to Degeneracy</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <p>
                  Degeneracy is a special situation in transportation problems where the number of positive allocations (basic variables) is less than the required number (m + n - 1). It occurs when simultaneous exhaustion of supply and demand happens during the allocation process, and it requires special handling to proceed with optimization.
                </p>

                <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <p className="font-medium text-amber-800 dark:text-amber-300">
                    💡 Key Insight: Degeneracy is like having fewer puzzle pieces than needed to complete the picture. You have to add a tiny piece (epsilon) to make everything fit and continue the solution process.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Degeneracy Matters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Algorithm Failure:</strong> Without handling degeneracy, the transportation simplex method may fail</li>
                  <li><strong>Cycling:</strong> Degeneracy can cause the simplex method to cycle infinitely</li>
                  <li><strong>Basis Issues:</strong> Too few basic variables means the basis is incomplete</li>
                  <li><strong>Optimality Check:</strong> The MODI method requires a full basis to work</li>
                  <li><strong>Solution Quality:</strong> Degeneracy must be resolved to find the optimal solution</li>
                </ul>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Susmita in Barrackpore solves transportation problems, she knows that degeneracy is like a roadblock—it doesn't stop you, but you need to find a way around it to continue your journey to the optimal solution.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Definition and Causes</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Formal Definition</h3>
                <p>
                  Degeneracy in a transportation problem occurs when the number of positive allocations (basic variables) is less than m + n - 1, where m is the number of sources and n is the number of destinations.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Normal condition: Basic Variables = m + n - 1<br/>
                    Degeneracy: Basic Variables {`< m + n - 1`}
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What Causes Degeneracy?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Simultaneous Exhaustion:</strong> When both a row's supply and a column's demand reach zero at the same time</li>
                  <li><strong>Equal Allocations:</strong> When the allocation amount equals both the remaining supply and remaining demand</li>
                  <li><strong>NW Corner Method:</strong> The NW Corner method frequently produces degenerate solutions</li>
                  <li><strong>Tie Conditions:</strong> When there are equal costs or equal penalties in VAM</li>
                  <li><strong>Dummy Variables:</strong> Adding dummy sources or destinations can sometimes create degeneracy</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Degeneracy in Different Methods</h3>
                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">NW Corner</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Most likely to be degenerate</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Least Cost</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Moderately likely</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">VAM</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Least likely but still possible</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> Degeneracy is more common than you might think. Many textbook problems are deliberately constructed to avoid degeneracy, but real-world problems often have it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Identification Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Identifying Degeneracy</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">How to Detect Degeneracy</h3>
                <p>
                  You can identify degeneracy by checking the number of positive allocations in your transportation table.
                </p>

                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Count Allocations:</strong> Count the number of cells with positive allocations (xᵢⱼ > 0)</li>
                    <li><strong>Calculate Required:</strong> Required count = m + n - 1</li>
                    <li><strong>Compare:</strong> If allocation count {`<`} required, you have degeneracy</li>
                    <li><strong>Verify:</strong> Double-check that you haven't missed any small allocations</li>
                    <li><strong>Confirm:</strong> Degeneracy often occurs with simultaneous exhaustion</li>
                  </ol>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Warning Signs of Degeneracy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Simultaneous Exhaustion:</strong> Both a row and column reach zero at the same time</li>
                  <li><strong>Missing Allocations:</strong> Fewer cells allocated than expected</li>
                  <li><strong>Zero Allocations:</strong> Some rows or columns have no positive cells</li>
                  <li><strong>Unusual Patterns:</strong> The allocation pattern looks incomplete</li>
                  <li><strong>Algorithm Issues:</strong> The simplex method behaves erratically</li>
                </ul>

                <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    💡 <strong>Try Changing This:</strong> What happens if you try to apply the MODI method to a degenerate solution? You'll find that you can't calculate the dual variables properly because you don't have enough basic variables.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Handling Degeneracy</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Epsilon (ε) Method</h3>
                <p>
                  The standard approach to handling degeneracy is to add a very small positive number (epsilon) to a zero cell, making it a basic variable without affecting the solution.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm text-center">
                    Add ε to a cell where xᵢⱼ = 0<br/>
                    ε > 0 and ε ≈ 0 (extremely small)<br/>
                    The cell becomes a basic variable<br/>
                    Now basic variables = m + n - 1
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Step-by-Step Degeneracy Handling</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Identify:</strong> Detect that allocations {`< m+n-1`}</li>
                    <li><strong>Choose a Zero Cell:</strong> Select a cell where xᵢⱼ = 0</li>
                    <li><strong>Add Epsilon:</strong> Set xᵢⱼ = ε (a very small number)</li>
                    <li><strong>Update:</strong> This cell becomes a basic variable</li>
                    <li><strong>Verify:</strong> Count allocations again (now = m+n-1)</li>
                    <li><strong>Proceed:</strong> Continue with the solution method</li>
                  </ol>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Choosing the Right Zero Cell</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Choose a cell that won't create a cycle</li>
                  <li>Prefer cells with low costs (though epsilon makes cost negligible)</li>
                  <li>Avoid cells that would create duplicate rows or columns</li>
                  <li>Choose a cell that maintains the basic structure</li>
                  <li>Document which cell you chose and why</li>
                </ul>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Key Insight:</strong> Epsilon is mathematically convenient—it's so small that it doesn't affect the cost calculation, but it's large enough to count as a basic variable. Think of it as a placeholder that keeps the algorithm working.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 1: Degeneracy from NW Corner</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A 3×3 transportation problem where NW Corner creates degeneracy.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Problem Data:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Sources: S₁=50, S₂=40, S₃=30</li>
                      <li>Destinations: D₁=40, D₂=50, D₃=30</li>
                      <li>NW Corner allocations: (1,1)=40, (1,2)=10, (2,2)=40, (3,3)=30</li>
                      <li><strong>Allocation count: 4</strong></li>
                      <li>Required: m+n-1 = 3+3-1 = 5</li>
                      <li><strong>Degeneracy detected! {`(4 < 5)`}</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Solution:</p>
                    <p className="text-gray-700 dark:text-gray-300">Add ε to cell (2,1) or (2,3) to make it a basic variable and resolve degeneracy.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 2: Degeneracy in Least Cost Method</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A problem where equal costs cause simultaneous exhaustion.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Allocation Pattern:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (1,2): allocate 30 → S₁=0, D₂=0 (simultaneous)</li>
                      <li>This creates degeneracy</li>
                      <li>Allocations {`< m+n-1`}</li>
                      <li><strong>Degeneracy from simultaneous exhaustion</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Solution:</p>
                    <p className="text-gray-700 dark:text-gray-300">Add ε to a zero cell, preferably one with a low cost, to create the missing basic variable.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 3: Degeneracy with Dummy Variables</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> An unbalanced problem with a dummy destination.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Handling:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Supply: 500, Demand: 400 → Add dummy destination with demand 100</li>
                      <li>Allocations may still be degenerate</li>
                      <li>Dummy cells are candidates for epsilon placement</li>
                      <li><strong>Dummy degeneracy requires careful handling</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Solution:</p>
                    <p className="text-gray-700 dark:text-gray-300">Add ε to a dummy cell or a real zero cell, depending on which maintains the solution structure.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 4: Degeneracy in Large Problems</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A large transportation problem in Ichapur with 5 sources and 6 destinations.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Analysis:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>m = 5, n = 6 → Required: 5+6-1 = 10 allocations</li>
                      <li>After allocation, only 8 positive cells found</li>
                      <li><strong>Degeneracy detected in large problem</strong></li>
                      <li>Need to add 2 epsilons to resolve</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Solution:</p>
                    <p className="text-gray-700 dark:text-gray-300">Add ε to two zero cells, ensuring they don't create cycles and maintain the basic structure.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 800" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="800" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Degeneracy in Transportation Problems</text>
                  
                  {/* Table with Degeneracy */}
                  <rect x="100" y="70" width="750" height="220" rx="10" fill="white" dark:fill="#1F2937" stroke="#F59E0B" strokeWidth="2" />
                  
                  {/* Column Headers */}
                  <text x="200" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₁</text>
                  <text x="320" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₂</text>
                  <text x="440" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₃</text>
                  <text x="560" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Supply</text>
                  
                  {/* Grid Lines */}
                  <line x1="160" y1="105" x2="160" y2="285" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="280" y1="105" x2="280" y2="285" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="400" y1="105" x2="400" y2="285" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="520" y1="105" x2="520" y2="285" stroke="#F59E0B" strokeWidth="1.5" />
                  
                  <line x1="100" y1="110" x2="850" y2="110" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="100" y1="155" x2="850" y2="155" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="100" y1="200" x2="850" y2="200" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="100" y1="245" x2="850" y2="245" stroke="#F59E0B" strokeWidth="1.5" />
                  <line x1="100" y1="290" x2="850" y2="290" stroke="#F59E0B" strokeWidth="1.5" />
                  
                  {/* Row Labels */}
                  <text x="130" y="140" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₁</text>
                  <text x="130" y="185" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₂</text>
                  <text x="130" y="230" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₃</text>
                  
                  {/* Allocated Cells */}
                  <rect x="160" y="110" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="220" y="135" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">40</text>
                  
                  <rect x="280" y="110" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="340" y="135" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">10</text>
                  
                  <rect x="280" y="155" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="340" y="180" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">40</text>
                  
                  <rect x="400" y="200" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="460" y="225" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">30</text>
                  
                  {/* Epsilon Cell */}
                  <rect x="160" y="155" width="120" height="45" rx="4" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="220" y="180" textAnchor="middle" className="text-sm font-bold fill-red-600 dark:fill-red-400">ε</text>
                  
                  {/* Degeneracy Info Box */}
                  <rect x="50" y="320" width="850" height="130" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="355" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Degeneracy Detection</text>
                  
                  <text x="100" y="385" className="text-sm fill-gray-700 dark:fill-gray-300">Allocations: 4 (cells with values: 40, 10, 40, 30)</text>
                  <text x="100" y="410" className="text-sm fill-gray-700 dark:fill-gray-300">Required: m + n - 1 = 3 + 3 - 1 = 5</text>
                  <text x="100" y="435" className="text-sm font-bold fill-red-600 dark:fill-red-400">Degeneracy: 4{` < `}5 → Need to add epsilon (ε)</text>
                  
                  {/* Epsilon Explanation Box */}
                  <rect x="50" y="480" width="850" height="150" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="515" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Handling Degeneracy with Epsilon (ε)</text>
                  
                  <text x="100" y="545" className="text-sm fill-gray-700 dark:fill-gray-300">• Add ε to a zero cell (xᵢⱼ = 0)</text>
                  <text x="100" y="570" className="text-sm fill-gray-700 dark:fill-gray-300">• ε > 0 and ε ≈ 0 (extremely small, no cost impact)</text>
                  <text x="100" y="595" className="text-sm fill-gray-700 dark:fill-gray-300">• The ε cell becomes a basic variable</text>
                  <text x="100" y="620" className="text-sm fill-gray-700 dark:fill-gray-300">• Now allocations = m + n - 1 (feasible for simplex)</text>
                  
                  {/* Key Points Box */}
                  <rect x="50" y="660" width="850" height="120" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="3s" />
                  </rect>
                  <text x="475" y="695" textAnchor="middle" className="text-base font-bold fill-green-600 dark:fill-green-400">Key Points About Degeneracy</text>
                  
                  <circle cx="90" cy="725" r="8" fill="#EF4444" />
                  <text x="110" y="730" className="text-sm fill-gray-700 dark:fill-gray-300">Degeneracy is common in transportation problems</text>
                  
                  <circle cx="90" cy="755" r="8" fill="#F59E0B" />
                  <text x="110" y="760" className="text-sm fill-gray-700 dark:fill-gray-300">It must be handled before using the MODI method</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows a degenerate transportation problem with 4 allocations instead of the required 5, and how epsilon (ε) is added to resolve the degeneracy.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🎯 Early Detection</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Check the number of allocations immediately after finding your IBFS. If it's less than m+n-1, you have degeneracy.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">💡 Choose Epsilon Wisely</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    When adding epsilon, choose a zero cell that won't create a cycle. Preferably a cell with low cost or one that maintains the solution structure.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Document Epsilon Placement</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always document where you placed epsilon. This helps in debugging and explaining your solution process to others.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Multiple Epsilons</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    If you're missing more than one allocation, you may need to add multiple epsilons. Add one at a time and check the count.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> Mahima from Kolkata always adds epsilon to a cell with the lowest cost to minimize any theoretical impact on the objective function. She also documents every epsilon placement carefully for future reference.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Proceeding with optimization without handling degeneracy. This will cause the MODI method or simplex method to fail.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Epsilon Placement</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Placing epsilon in a cell that creates a cycle or doesn't maintain the basic structure. Choose carefully.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Too Many Epsilons</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Adding more epsilons than needed. You only need enough to reach m+n-1 allocations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Verifying After Epsilon</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not checking that after adding epsilon, the allocation count is now m+n-1.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The biggest mistake is thinking degeneracy is a rare or unimportant issue. It's actually quite common, and you must handle it every time it appears. Don't ignore it—it won't go away on its own.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">📝 Early Detection</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Count allocations immediately after IBFS</li>
                    <li>Compare with m+n-1</li>
                    <li>Identify if degeneracy exists</li>
                    <li>Don't wait to handle it</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🔍 Careful Epsilon Placement</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Choose a zero cell carefully</li>
                    <li>Avoid creating cycles</li>
                    <li>Prefer cells with low costs</li>
                    <li>Document your choice</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Record all epsilon placements</li>
                    <li>Note the reason for each choice</li>
                    <li>Keep for future reference</li>
                    <li>Share with team members</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🎯 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify allocation count after epsilon</li>
                    <li>Check that it equals m+n-1</li>
                    <li>Verify the solution is still feasible</li>
                    <li>Proceed with optimization</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, optimization software handles degeneracy automatically. However, understanding degeneracy is crucial for interpreting results and debugging issues. Susmita from Barrackpore always reviews the epsilon placements in her software's output to ensure they make sense.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Understanding Degeneracy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what degeneracy is and why it occurs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Detection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify when a solution is degenerate</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Epsilon Handling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to handle degeneracy with epsilon</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify that degeneracy has been resolved correctly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply degeneracy handling in real-world problems</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Degeneracy is one of those concepts that seems intimidating at first but becomes second nature with practice. When I teach this to my students in Kolkata, I emphasize that degeneracy is not a problem—it's just a situation that needs special handling. Abhronila from Jadavpur was initially worried about degeneracy, but after practicing with epsilon a few times, she found it straightforward. Susmita from Barrackpore compares degeneracy to a small detour on a road trip—it doesn't change your destination, just the path you take to get there. Remember: Degeneracy is normal, common, and manageable. Don't fear it—just handle it systematically."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Degeneracy in Transportation Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Degeneracy in Transportation Problems"
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