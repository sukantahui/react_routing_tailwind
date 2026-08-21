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
    { id: 'introduction', title: 'Introduction to Primal and Dual Problems' },
    { id: 'concept', title: 'Understanding the Core Concept' },
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
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Concept of Primal and Dual Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the fundamental relationship between optimization problems and their dual counterparts
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">What are Primal and Dual Problems?</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <p>
                  In optimization theory, every <strong>primal problem</strong> (the original optimization problem) has a corresponding <strong>dual problem</strong>. This relationship is fundamental in linear programming, convex optimization, and various fields of mathematics and engineering.
                </p>
                
                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    💡 Key Insight: The dual problem provides a different perspective on the same optimization challenge, often revealing insights that are not immediately obvious in the primal formulation.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Primal Problem (Original)</h3>
                <p>
                  The primal problem is the original optimization problem we want to solve. It typically involves:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Decision variables</strong> (what we want to optimize)</li>
                  <li><strong>Objective function</strong> (what we want to maximize or minimize)</li>
                  <li><strong>Constraints</strong> (limitations on the decision variables)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Dual Problem (Companion)</h3>
                <p>
                  The dual problem is derived from the primal problem through a mathematical transformation. It offers:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dual variables</strong> (associated with each constraint in the primal)</li>
                  <li><strong>Dual objective function</strong> (formed from the primal's constraints)</li>
                  <li><strong>Dual constraints</strong> (derived from the primal's objective coefficients)</li>
                </ul>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    🎯 Analogy: Think of the primal problem as buying groceries (minimizing cost with constraints on nutrition), and the dual as the store's pricing strategy (maximizing profit while ensuring competitive prices).
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Understanding the Core Concept</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The duality concept is based on the principle that every optimization problem has a "shadow" problem that provides valuable insights. The relationship between primal and dual problems is symmetric and fundamental.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Primal Problem</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Maximize or minimize objective</li>
                      <li>Subject to constraints</li>
                      <li>Variables represent decisions</li>
                      <li>Constraints represent limitations</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Dual Problem</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      <li>Opposite optimization direction</li>
                      <li>Constraints become variables</li>
                      <li>Variables represent shadow prices</li>
                      <li>Provides lower/upper bounds</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Mathematical Structure</h4>
                  <p className="text-sm font-mono bg-white dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-600">
                    Primal: maximize c^T x subject to Ax ≤ b, x ≥ 0<br />
                    Dual: minimize b^T y subject to A^T y ≥ c, y ≥ 0
                  </p>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                    Here, x represents primal variables, y represents dual variables, A is the constraint matrix, b is the constraint vector, and c is the objective coefficient vector.
                  </p>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🔑 Key Principle: The objective value of the dual problem always provides a bound on the primal objective value. For minimization problems, the dual provides a lower bound, while for maximization problems, it provides an upper bound.
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 1: Production Planning</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <strong>Primal:</strong> A factory produces two products using limited resources. Maximize profit subject to resource constraints.<br />
                      <strong>Dual:</strong> Determine the shadow prices of resources - how much the profit would increase if we had one more unit of each resource.
                    </p>
                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                      <p className="font-mono">Primal: Max Z = 40x₁ + 30x₂<br />
                      Subject to: 2x₁ + x₂ ≤ 100, x₁ + 2x₂ ≤ 80, x₁,x₂ ≥ 0</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Example 2: Investment Portfolio</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <strong>Primal:</strong> An investor wants to maximize returns on investments while managing risk constraints.<br />
                      <strong>Dual:</strong> Evaluate the marginal value of changing risk constraints to improve returns.
                    </p>
                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                      <p className="font-mono">Primal: Min Z = 0.2x₁ + 0.3x₂<br />
                      Subject to: x₁ + x₂ ≥ 100, x₁,x₂ ≥ 0</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Example 3: Transportation Network</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <strong>Primal:</strong> Minimize transportation costs to deliver goods from warehouses to stores.<br />
                      <strong>Dual:</strong> Determine the value of having additional capacity at each warehouse or demand point.
                    </p>
                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                      <p className="font-mono">Primal: Min Z = 2x₁ + 3x₂<br />
                      Subject to: x₁ + x₂ ≥ 50, x₁ ≤ 30, x₂ ≤ 40</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300">Example 4: Staff Scheduling</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      <strong>Primal:</strong> A restaurant minimizes staff costs while meeting minimum staffing requirements.<br />
                      <strong>Dual:</strong> Value of having additional staff availability or relaxing shift requirements.
                    </p>
                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                      <p className="font-mono">Primal: Min Z = 50y₁ + 60y₂<br />
                      Subject to: 2y₁ + y₂ ≥ 8, y₁ + 2y₂ ≥ 10, y₁,y₂ ≥ 0</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Think About:</strong> How does the dual problem help in each of these scenarios? What insights does it provide that the primal problem alone cannot offer?
                  </p>
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-3xl h-auto" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="800" height="500" fill="transparent" />
                  
                  {/* Primal Block */}
                  <rect x="50" y="100" width="280" height="200" rx="15" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="190" y="140" textAnchor="middle" className="text-xl font-bold fill-blue-600 dark:fill-blue-400">Primal Problem</text>
                  <text x="190" y="170" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Original Optimization</text>
                  <text x="190" y="200" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Maximize/Minimize</text>
                  <text x="190" y="225" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Subject to Constraints</text>
                  <text x="190" y="250" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Decision Variables</text>
                  
                  {/* Arrow from Primal to Dual */}
                  <line x1="330" y1="200" x2="470" y2="200" stroke="#8B5CF6" strokeWidth="3">
                    <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" fill="freeze" />
                  </line>
                  <polygon points="470,195 480,200 470,205" fill="#8B5CF6" />
                  <text x="400" y="180" textAnchor="middle" className="text-sm font-medium fill-purple-600 dark:fill-purple-400">Transformation</text>
                  
                  {/* Dual Block */}
                  <rect x="480" y="100" width="280" height="200" rx="15" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="620" y="140" textAnchor="middle" className="text-xl font-bold fill-purple-600 dark:fill-purple-400">Dual Problem</text>
                  <text x="620" y="170" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Shadow Problem</text>
                  <text x="620" y="200" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Provides Bounds</text>
                  <text x="620" y="225" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Shadow Prices</text>
                  <text x="620" y="250" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Opposite Direction</text>
                  
                  {/* Relationship Indicators */}
                  <circle cx="190" cy="350" r="40" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="190" y="355" textAnchor="middle" className="text-xs font-semibold fill-blue-600 dark:fill-blue-400">Weak Duality</text>
                  
                  <circle cx="620" cy="350" r="40" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" begin="1s" />
                  </circle>
                  <text x="620" y="355" textAnchor="middle" className="text-xs font-semibold fill-purple-600 dark:fill-purple-400">Strong Duality</text>
                  
                  {/* Connection between circles */}
                  <line x1="230" y1="350" x2="580" y2="350" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <text x="405" y="340" textAnchor="middle" className="text-xs fill-green-600 dark:fill-green-400">Optimal Value Equal</text>
                  
                  {/* Legend */}
                  <rect x="50" y="420" width="700" height="60" rx="10" fill="#F3F4F6" dark:fill="#374151" fillOpacity="0.5" />
                  <circle cx="100" cy="450" r="8" fill="#3B82F6" />
                  <text x="115" y="455" className="text-xs fill-gray-700 dark:fill-gray-300">Primal Variables</text>
                  <circle cx="250" cy="450" r="8" fill="#8B5CF6" />
                  <text x="265" y="455" className="text-xs fill-gray-700 dark:fill-gray-300">Dual Variables</text>
                  <line x1="400" y1="445" x2="440" y2="455" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="450" y="455" className="text-xs fill-gray-700 dark:fill-gray-300">Duality Gap</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">The diagram illustrates the relationship between primal and dual problems, showing how they are connected through transformation and provide complementary insights.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🎯 Quick Recognition</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Look for the "shadow price" interpretation - dual variables always represent the marginal value of constraints.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">💡 Duality Check</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always verify that the dual problem has the correct number of variables (equal to primal constraints) and constraints (equal to primal variables).
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🔧 Practical Use</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use duality to find a feasible solution for one problem when the other is easier to solve, or to prove optimality.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">⚡ Performance Hint</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    In large-scale problems, solving the dual (which has fewer constraints) can be computationally more efficient.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Tip:</strong> Always check the duality gap. If the primal and dual optimal values are equal (strong duality), you've found the optimal solution. If not, there might be issues with the problem formulation.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Problem Formulation</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Mistaking maximization for minimization when forming the dual. Remember: The dual of a maximization problem is a minimization problem, and vice versa.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Constraint Direction</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Misplacing constraints (≥ vs ≤) when converting between primal and dual forms. Always carefully check the constraint type.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Variable/Constraint Mismatch</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting that each primal constraint becomes a dual variable, and each primal variable becomes a dual constraint.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Missing Duality Gap</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not checking if the optimal values of primal and dual are equal, which indicates whether strong duality holds.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students assume duality is symmetric, but it's not always the case. The dual of the dual returns to the primal only under certain conditions (e.g., convexity and regularity conditions).
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">📝 Systematic Approach</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Write down the primal problem clearly</li>
                    <li>Identify objective direction (max/min)</li>
                    <li>Count constraints and variables</li>
                    <li>Form dual systematically step by step</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🔍 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Check variable count matches</li>
                    <li>Verify constraint count matches</li>
                    <li>Test with a simple feasible solution</li>
                    <li>Validate duality gap</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Clearly label primal and dual variables</li>
                    <li>Explain economic interpretation</li>
                    <li>Document any transformations used</li>
                    <li>Note assumptions made</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🎯 Optimization Strategy</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Choose easier problem to solve</li>
                    <li>Use duality for sensitivity analysis</li>
                    <li>Consider complementary slackness</li>
                    <li>Exploit special problem structures</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> Always present both primal and dual formulations in optimization papers and reports. This makes the problem easier to understand and validates the optimal solution through complementary slackness conditions.
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Understanding Duality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that every primal problem has a corresponding dual problem</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dual Variables</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know dual variables represent shadow prices (marginal value of constraints)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Objective Direction</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that dual takes the opposite optimization direction</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Duality Properties</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can explain weak and strong duality properties</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify real-world applications of duality in decision-making</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The concept of duality is one of the most profound ideas in optimization. When I teach this, I emphasize that the dual problem isn't just a mathematical curiosity—it's a window into understanding how constraints affect our decisions. Think of Mamata, a student in Barrackpore, who solved a transportation problem using both primal and dual formulations—she discovered that the dual provided insights about warehouse pricing that the primal didn't reveal. Remember: mastering duality transforms you from a problem solver into a strategic decision maker."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Primal and Dual Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Primal and Dual Problems"
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