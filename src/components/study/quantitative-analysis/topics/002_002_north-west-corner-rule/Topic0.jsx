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
    { id: 'introduction', title: 'Introduction to Initial Basic Feasible Solution' },
    { id: 'concept', title: 'Understanding the Concept' },
    { id: 'purpose', title: 'Purpose and Importance' },
    { id: 'methods', title: 'Methods for Finding IBFS' },
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
            Topic 0
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Purpose of an Initial Basic Feasible Solution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding why we need an initial basic feasible solution and how it serves as the foundation for solving transportation problems
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
              activeSection &ge; 0 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction to Initial Basic Feasible Solution</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <p>
                  An Initial Basic Feasible Solution (IBFS) is the starting point for solving transportation problems using optimization algorithms. It provides a feasible but not necessarily optimal shipping plan that serves as the foundation for iterative improvement methods like the transportation simplex.
                </p>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    💡 Key Insight: Think of IBFS as a rough draft of your shipping plan. It satisfies all supply and demand constraints but may not have the lowest possible cost. The optimization algorithm then improves this draft to find the optimal solution.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is an Initial Basic Feasible Solution?</h3>
                <p>
                  An Initial Basic Feasible Solution (IBFS) is a starting solution that satisfies all the constraints of the transportation problem—all supplies are fully used and all demands are fully met—but does not necessarily minimize the total transportation cost. It serves as the starting point for the transportation simplex method, which iteratively improves it to find the optimal solution.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Feasible</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Satisfies all supply & demand constraints</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Basic</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Has exactly m+n-1 allocated cells</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300">Initial</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Starting point for optimization</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata plans her delivery routes, she might start with a simple plan that just gets goods delivered, even if it's not the cheapest. This initial plan is her IBFS, which she then refines to save costs.
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
              activeSection &ge; 1 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Understanding the Concept</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What Makes a Solution "Basic" and "Feasible"?</h3>
                
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Basic</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Contains exactly m + n - 1 positive allocations</li>
                      <li>No cycles in the allocation pattern</li>
                      <li>Forms a spanning tree in the transportation network</li>
                      <li>Required for the simplex method to work</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Feasible</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>All supplies are fully used (Σⱼ xᵢⱼ = Sᵢ)</li>
                      <li>All demands are fully met (Σᵢ xᵢⱼ = Dⱼ)</li>
                      <li>All allocations are non-negative (xᵢⱼ ≥ 0)</li>
                      <li>Valid shipping plan exists</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">The Role of IBFS in the Solution Process</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Start:</strong> Find an initial basic feasible solution using any method (NW Corner, Least Cost, VAM)</li>
                    <li><strong>Check Optimality:</strong> Use MODI method to check if the current solution is optimal</li>
                    <li><strong>Improve:</strong> If not optimal, find an entering variable and departing variable</li>
                    <li><strong>Iterate:</strong> Repeat steps 2-3 until optimality is reached</li>
                    <li><strong>End:</strong> The final solution is the optimal shipping plan</li>
                  </ol>
                </div>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Observe Carefully:</strong> The quality of the IBFS affects how many iterations are needed to reach the optimal solution. A better starting point (like VAM) means fewer iterations and faster convergence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Purpose Section */}
          <section
            ref={(el) => (sectionRefs.current[2] = el)}
            data-index="2"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-200',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection &ge; 2 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Purpose and Importance</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Why Do We Need an IBFS?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Starting Point:</strong> Provides a feasible solution to begin the optimization process</li>
                  <li><strong>Foundation:</strong> Enables the transportation simplex method to work</li>
                  <li><strong>Efficiency:</strong> Better initial solutions reduce the number of iterations needed</li>
                  <li><strong>Feasibility Check:</strong> Confirms that a feasible solution exists</li>
                  <li><strong>Basis:</strong> Establishes the basic variables for the simplex method</li>
                  <li><strong>Cost Bound:</strong> Provides an upper bound on the optimal cost</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Impact of IBFS Quality</h3>
                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Poor IBFS</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Many iterations needed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">NW Corner method</p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Average IBFS</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Moderate iterations</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Least Cost method</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Good IBFS</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Few iterations needed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">VAM method</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you use a different method to find the IBFS? How does the number of iterations change? This is why VAM is preferred—it gives a solution closer to optimal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Methods Section */}
          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            data-index="3"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-300',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection &ge; 3 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Methods for Finding IBFS</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">1. Northwest Corner Method</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li><strong>Procedure:</strong> Start at top-left, allocate max possible</li>
                      <li><strong>Quality:</strong> Poor (usually far from optimal)</li>
                      <li><strong>Speed:</strong> Fastest method</li>
                      <li><strong>Use:</strong> Quick, simple starting point</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">2. Least Cost Method</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li><strong>Procedure:</strong> Choose cheapest cell, allocate max</li>
                      <li><strong>Quality:</strong> Good (better than NW Corner)</li>
                      <li><strong>Speed:</strong> Moderate</li>
                      <li><strong>Use:</strong> Better starting solution</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">3. Vogel's Approximation Method (VAM)</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li><strong>Procedure:</strong> Calculate penalties, allocate highest</li>
                      <li><strong>Quality:</strong> Excellent (near-optimal)</li>
                      <li><strong>Speed:</strong> Slowest</li>
                      <li><strong>Use:</strong> Best starting solution</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Professional Insight:</strong> In practice, VAM is preferred because it gives a solution very close to optimal, reducing the number of iterations in the transportation simplex method. Abhronila from Jadavpur always uses VAM to minimize computation time.
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
              activeSection &ge; 4 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 1: Manufacturing Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata has 3 factories and 4 warehouses. The logistics manager needs to create an initial shipping plan.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">IBFS Process:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Start with the Northwest Corner method for quick feasibility</li>
                      <li>Allocate based on supply and demand constraints</li>
                      <li>Get a valid shipping plan (feasible solution)</li>
                      <li>Total cost: ₹1,85,000 (initial)</li>
                      <li>Will be improved by optimization</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Mahima uses IBFS to quickly get a feasible plan while the optimization algorithm runs in the background.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 2: Agricultural Supply Chain</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative in Barrackpore needs to distribute produce from 4 farms to 5 markets.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">IBFS Approach:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Use Least Cost method for better initial solution</li>
                      <li>Focus on lowest transportation costs first</li>
                      <li>Get a feasible plan with lower cost</li>
                      <li>Total cost: ₹42,500 (initial)</li>
                      <li>Closer to optimal than NW Corner</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita uses Least Cost method to get a good starting point for seasonal produce distribution.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 3: Healthcare Logistics</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur needs to distribute medical supplies from 2 warehouses to 6 hospitals.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">IBFS Strategy:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Use VAM for the best initial solution</li>
                      <li>Calculate penalties for each row and column</li>
                      <li>Allocate to cells with highest penalty</li>
                      <li>Total cost: ₹1,20,000 (initial)</li>
                      <li>Very close to optimal solution</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila uses VAM to quickly get an almost-optimal distribution plan for critical medical supplies.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 4: Educational Resources</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes textbooks from 3 centers to 8 schools.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">IBFS Process Comparison:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>NW Corner: ₹95,000 (poor)</li>
                      <li>Least Cost: ₹78,000 (better)</li>
                      <li>VAM: ₹72,000 (best)</li>
                      <li>Optimal: ₹68,000</li>
                      <li>VAM requires only 2-3 improvement iterations</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu uses VAM to minimize computation time for large distribution problems.</p>
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
              activeSection &ge; 5 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Initial Basic Feasible Solution Process</text>
                  
                  {/* Flow Diagram */}
                  <rect x="50" y="70" width="850" height="100" rx="15" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-base font-bold fill-blue-600 dark:fill-blue-400">The IBFS Journey</text>
                  
                  <rect x="80" y="125" width="200" height="50" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="180" y="155" textAnchor="middle" className="text-sm font-semibold fill-green-600 dark:fill-green-400">Find IBFS</text>
                  
                  <path d="M 280 150 L 320 150" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="1.5s" repeatCount="indefinite" />
                  </path>
                  
                  <rect x="320" y="125" width="200" height="50" rx="8" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="420" y="155" textAnchor="middle" className="text-sm font-semibold fill-amber-600 dark:fill-amber-400">Check Optimality</text>
                  
                  <path d="M 520 150 L 560 150" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="1.5s" repeatCount="indefinite" begin="1s" />
                  </path>
                  
                  <rect x="560" y="125" width="200" height="50" rx="8" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="660" y="155" textAnchor="middle" className="text-sm font-semibold fill-purple-600 dark:fill-purple-400">Improve Solution</text>
                  
                  {/* Methods Box */}
                  <rect x="50" y="210" width="850" height="150" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="245" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Methods for Finding IBFS</text>
                  
                  <rect x="80" y="265" width="240" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="200" y="290" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Northwest Corner</text>
                  <text x="200" y="310" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Fast, Simple, Poor Quality</text>
                  
                  <rect x="355" y="265" width="240" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="475" y="290" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Least Cost</text>
                  <text x="475" y="310" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Better Quality, Moderate Speed</text>
                  
                  <rect x="630" y="265" width="240" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1.5" />
                  <text x="750" y="290" textAnchor="middle" className="text-sm font-bold fill-purple-600 dark:fill-purple-400">VAM</text>
                  <text x="750" y="310" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Best Quality, Slowest</text>
                  
                  {/* Importance Box */}
                  <rect x="50" y="390" width="850" height="130" rx="15" fill="#D946EF" fillOpacity="0.1" stroke="#D946EF" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="425" textAnchor="middle" className="text-base font-bold fill-pink-600 dark:fill-pink-400">Why IBFS Matters</text>
                  
                  <circle cx="90" cy="455" r="8" fill="#10B981" />
                  <text x="110" y="460" className="text-sm fill-gray-700 dark:fill-gray-300">Provides a starting point for optimization</text>
                  
                  <circle cx="90" cy="485" r="8" fill="#3B82F6" />
                  <text x="110" y="490" className="text-sm fill-gray-700 dark:fill-gray-300">Enables the transportation simplex method</text>
                  
                  <circle cx="520" cy="455" r="8" fill="#F59E0B" />
                  <text x="540" y="460" className="text-sm fill-gray-700 dark:fill-gray-300">Better IBFS = fewer iterations</text>
                  
                  <circle cx="520" cy="485" r="8" fill="#8B5CF6" />
                  <text x="540" y="490" className="text-sm fill-gray-700 dark:fill-gray-300">Verifies feasibility of the problem</text>
                  
                  {/* Properties Box */}
                  <rect x="50" y="550" width="850" height="180" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="3s" />
                  </rect>
                  <text x="475" y="585" textAnchor="middle" className="text-base font-bold fill-green-600 dark:fill-green-400">Properties of a Good IBFS</text>
                  
                  <rect x="80" y="605" width="250" height="105" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="630" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Feasible</text>
                  <text x="205" y="650" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">All supplies used</text>
                  <text x="205" y="670" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">All demands met</text>
                  <text x="205" y="690" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Non-negative allocations</text>
                  
                  <rect x="350" y="605" width="250" height="105" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1.5" />
                  <text x="475" y="630" textAnchor="middle" className="text-sm font-bold fill-purple-600 dark:fill-purple-400">Basic</text>
                  <text x="475" y="650" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">m+n-1 allocations</text>
                  <text x="475" y="670" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">No cycles</text>
                  <text x="475" y="690" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Spanning tree structure</text>
                  
                  <rect x="620" y="605" width="250" height="105" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="745" y="630" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Cost Efficient</text>
                  <text x="745" y="650" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Low total cost</text>
                  <text x="745" y="670" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Close to optimal</text>
                  <text x="745" y="690" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Fewer iterations needed</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the flow of the IBFS process, the methods available, and the properties of a good initial solution.</p>
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
              activeSection &ge; 6 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🎯 Choose Method Wisely</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    For small problems, any method works. For large problems, VAM is worth the extra computation for faster convergence.
                  </p>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">💡 Check Basicness</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always verify that your IBFS has exactly m + n - 1 positive allocations. If not, you have degeneracy and need special handling.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Cost Tracking</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always calculate the total cost of your IBFS. This gives you a baseline to measure improvement against.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Documentation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Document your IBFS clearly. This helps in debugging and explaining your solution process to others.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, logistics managers often use VAM because it provides a near-optimal solution quickly. Debangshu from Ichapur found that using VAM reduced his optimization time by 60% compared to starting with Northwest Corner.
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
              activeSection &ge; 7 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Common Mistakes</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Checking Feasibility</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Assuming a solution is feasible without verifying all supply and demand constraints are satisfied.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Number of Allocations</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Having more or fewer than m + n - 1 positive allocations. This indicates degeneracy or errors.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not handling degeneracy when it occurs. This can cause the algorithm to fail or cycle.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Calculating Total Cost</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting to calculate the total cost of the IBFS, which serves as a baseline for improvement.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students think any feasible solution is good enough. The quality of your IBFS directly affects how quickly you reach the optimal solution. A poor IBFS can lead to many iterations.
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
              activeSection &ge; 8 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">📝 Method Selection</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use VAM for large problems</li>
                    <li>Use Least Cost for moderate problems</li>
                    <li>Use NW Corner for quick approximations</li>
                    <li>Consider problem size and complexity</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔍 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify all constraints are satisfied</li>
                    <li>Check number of allocations</li>
                    <li>Calculate total cost</li>
                    <li>Handle degeneracy if present</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document the method used</li>
                    <li>Show all allocations clearly</li>
                    <li>Record total cost</li>
                    <li>Note any degeneracy issues</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🎯 Improvement Planning</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use IBFS as starting point for optimization</li>
                    <li>Apply MODI method for optimality check</li>
                    <li>Track improvement in each iteration</li>
                    <li>Validate final solution</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                <p className="font-medium text-indigo-800 dark:text-indigo-300">
                  <strong>📌 Professional Standard:</strong> In industry, optimization software automatically generates IBFS using VAM and then iterates to optimality. Understanding the process helps in interpreting results and troubleshooting issues.
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
              activeSection &ge; 9 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Concept Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what an IBFS is and why it's needed</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Methods Knowledge</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know the three methods for finding IBFS</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Quality Impact</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand how IBFS quality affects optimization</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify if a solution is basic and feasible</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply IBFS concepts to real-world problems</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The Initial Basic Feasible Solution is like the foundation of a house—it needs to be solid for everything else to work. When I teach this to my students in Kolkata, I emphasize that while any feasible solution will work, a good one makes the optimization process much faster. Susmita from Barrackpore learned this the hard way when she used the Northwest Corner method on a large problem and spent hours on iterations. After switching to VAM, she solved the same problem in minutes. Remember: The time you spend finding a good IBFS is time saved in the optimization phase."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Purpose of an Initial Basic Feasible Solution FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Purpose of an Initial Basic Feasible Solution"
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