// Topic4.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
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
    { id: 'introduction', title: 'Introduction to Duality Properties' },
    { id: 'weakduality', title: 'Weak Duality Property' },
    { id: 'strongduality', title: 'Strong Duality Property' },
    { id: 'complementary', title: 'Complementary Slackness' },
    { id: 'symmetry', title: 'Symmetry Property' },
    { id: 'examples', title: 'Real-World Examples' },
    { id: 'visualization', title: 'Visual Understanding' },
    { id: 'tips', title: 'Professional Tips & Tricks' },
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
            Topic 4
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
            Basic Duality Properties
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the fundamental properties that make duality a powerful tool in optimization
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Introduction to Duality Properties</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <p>
                  Duality properties are the fundamental mathematical characteristics that define the relationship between primal and dual problems. These properties form the theoretical foundation of linear programming and are essential for understanding, solving, and interpreting optimization problems.
                </p>

                <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-medium text-indigo-800 dark:text-indigo-300">
                    💡 Key Insight: The basic duality properties—weak duality, strong duality, complementary slackness, and symmetry—work together to provide a complete theoretical framework for linear programming.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">The Four Pillars of Duality</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">1. Weak Duality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">The dual provides bounds on the primal objective</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">2. Strong Duality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">The optimal values of primal and dual are equal</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">3. Complementary Slackness</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Links primal and dual optimal solutions</p>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-300">4. Symmetry Property</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">The dual of the dual is the primal</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Ichapur solves an optimization problem, these properties allow her to verify her solution, understand its implications, and gain confidence in her results.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Weak Duality Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Weak Duality Property</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Statement</h3>
                <p>
                  For any feasible solution x of the primal and any feasible solution y of the dual:
                </p>
                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    If Primal is Maximization: Z(x) ≤ W(y)<br/>
                    If Primal is Minimization: W(y) ≤ Z(x)
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Proof of Weak Duality</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm">
                    For standard form (Max primal, Min dual):
                  </p>
                  <p className="text-sm font-mono mt-2">
                    Z = cᵀx ≤ yᵀAx ≤ yᵀb = W
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Where: cᵀx ≤ yᵀAx (from dual constraint Aᵀy ≥ c)
                    And: yᵀAx ≤ yᵀb (from primal constraint Ax ≤ b)
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Implications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Bounding:</strong> The dual objective provides an upper/lower bound on the primal objective</li>
                  <li><strong>Feasibility Check:</strong> If Z &gt; W for a max problem, both solutions cannot be optimal</li>
                  <li><strong>Optimality Certificate:</strong> Any feasible dual solution gives a certificate of optimality for the primal</li>
                  <li><strong>Algorithm Stopping:</strong> Used to determine how close we are to optimality</li>
                </ul>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Practical Application:</strong> When Abhronila solves a production problem, she uses weak duality to check if her solution is close to optimal. If the dual objective is much larger than the primal, she knows there's room for improvement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Strong Duality Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Strong Duality Property</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Statement</h3>
                <p>
                  If both the primal and dual problems have optimal solutions (and certain conditions are met), then:
                </p>
                <div className="my-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Z* = W*
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    The optimal objective values are equal.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Conditions for Strong Duality</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Feasibility:</strong> Both problems must have feasible solutions</li>
                  <li><strong>Boundedness:</strong> The objective values must be finite (bounded)</li>
                  <li><strong>Convexity:</strong> For non-linear problems, convexity is required</li>
                  <li><strong>Constraint Qualification:</strong> Slater's condition or similar conditions</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Implications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Zero Duality Gap:</strong> The difference between primal and dual is zero at optimality</li>
                  <li><strong>Optimality Guarantee:</strong> Solving either problem gives the same optimal value</li>
                  <li><strong>Solution Verification:</strong> Use to verify if a solution is optimal</li>
                  <li><strong>Algorithm Foundation:</strong> Forms the basis for many optimization algorithms</li>
                </ul>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Key Insight:</strong> Strong duality guarantees that the duality gap is zero at optimality. This means that solving either the primal or the dual gives us the same optimal value, providing confidence in our results.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Complementary Slackness Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Complementary Slackness</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Statement</h3>
                <p>
                  At optimality, for each constraint, either the constraint is tight or the corresponding dual variable is zero:
                </p>
                <div className="my-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    For each i: yᵢ × (bᵢ - Aᵢx) = 0<br/>
                    For each j: xⱼ × (Aⱼᵀy - cⱼ) = 0
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Interpretation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Primal Perspective</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>If slack &gt; 0 (constraint loose) → yᵢ = 0</li>
                      <li>If yᵢ &gt; 0 → constraint is tight (slack = 0)</li>
                      <li>Loose constraints have zero shadow price</li>
                      <li>Tight constraints can have positive shadow price</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Dual Perspective</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>If dual constraint slack &gt; 0 → xⱼ = 0</li>
                      <li>If xⱼ &gt; 0 → dual constraint is tight</li>
                      <li>Unprofitable products have zero production</li>
                      <li>Products produced have zero reduced cost</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Economic Interpretation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Resource Utilization:</strong> Resources with positive shadow prices are fully used</li>
                  <li><strong>Resource Surplus:</strong> Resources that are not fully used have zero shadow price</li>
                  <li><strong>Product Profitability:</strong> Products that are produced have zero reduced cost</li>
                  <li><strong>Market Equilibrium:</strong> Prices adjust so that supply equals demand</li>
                </ul>

                <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <p className="font-medium text-amber-800 dark:text-amber-300">
                    💡 <strong>Practical Application:</strong> When Susmita in Barrackpore uses complementary slackness, she can verify if her production plan is optimal by checking that all resources with positive shadow prices are fully utilized.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Symmetry Property Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Symmetry Property</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Statement</h3>
                <p>
                  The dual of the dual problem is the original primal problem (for problems in standard form).
                </p>
                <div className="my-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Dual(Dual(Primal)) = Primal
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Mathematical Proof</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm">
                    Start with primal (standard form):
                  </p>
                  <p className="text-sm font-mono mt-2">
                    Max Z = cᵀx, s.t. Ax ≤ b, x ≥ 0
                  </p>
                  <p className="text-sm mt-2">
                    The dual is:
                  </p>
                  <p className="text-sm font-mono">
                    Min W = bᵀy, s.t. Aᵀy ≥ c, y ≥ 0
                  </p>
                  <p className="text-sm mt-2">
                    The dual of this dual:
                  </p>
                  <p className="text-sm font-mono">
                    Max Z = cᵀx, s.t. Ax ≤ b, x ≥ 0
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Which is the original primal.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Implications</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Perfect Symmetry:</strong> The relationship between primal and dual is completely symmetric</li>
                  <li><strong>Choice of Formulation:</strong> You can choose to solve either the primal or the dual</li>
                  <li><strong>Economic Equivalence:</strong> The economic interpretation is consistent both ways</li>
                  <li><strong>Theoretical Foundation:</strong> Confirms the mathematical validity of duality</li>
                </ul>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Key Insight:</strong> The symmetry property means that insights from the dual can be transferred back to the primal. If you discover something about the dual, it tells you something about the primal and vice versa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Examples Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 1: Production Planning - All Properties Demonstrated</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> A factory in Kolkata produces two products.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal</p>
                        <p className="text-sm font-mono mt-2">
                          Max Z = 40x₁ + 30x₂<br/>
                          s.t. 2x₁ + x₂ ≤ 100<br/>
                          x₁ + 2x₂ ≤ 80<br/>
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400">Dual</p>
                        <p className="text-sm font-mono mt-2">
                          Min W = 100y₁ + 80y₂<br/>
                          s.t. 2y₁ + y₂ ≥ 40<br/>
                          y₁ + 2y₂ ≥ 30<br/>
                          y₁, y₂ ≥ 0
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Properties Demonstrated:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li><strong>Weak Duality:</strong> Z ≤ W for any feasible solutions</li>
                        <li><strong>Strong Duality:</strong> Z* = W* = ₹2200</li>
                        <li><strong>Complementary Slackness:</strong> Both constraints tight, both shadow prices positive</li>
                        <li><strong>Symmetry:</strong> Dual of dual gives original primal</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 2: Investment Portfolio - Complementary Slackness</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> An investor in Jadavpur optimizes their portfolio.
                    </p>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg mt-3">
                      <p className="font-mono text-sm">
                        Max Z = 0.12x₁ + 0.15x₂<br/>
                        s.t. 0.2x₁ + 0.3x₂ ≤ 0.25 (Risk constraint)<br/>
                        x₁ + x₂ = 1<br/>
                        x₁, x₂ ≥ 0
                      </p>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Complementary Slackness Application:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>If risk constraint is tight → risk shadow price positive</li>
                        <li>If risk constraint is loose → risk shadow price zero</li>
                        <li>If an investment is made → its dual constraint is tight</li>
                        <li>If an investment is not made → its dual constraint has slack</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 3: Transportation - Weak and Strong Duality</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> A logistics company in Barrackpore minimizes shipping costs.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal</p>
                        <p className="text-sm font-mono mt-2">
                          Min Z = 2x₁ + 3x₂<br/>
                          s.t. x₁ + x₂ ≥ 50<br/>
                          x₁ ≤ 30, x₂ ≤ 40<br/>
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400">Dual</p>
                        <p className="text-sm font-mono mt-2">
                          Max W = 50y₁ - 30y₂ - 40y₃<br/>
                          s.t. y₁ - y₂ ≤ 2<br/>
                          y₁ - y₃ ≤ 3<br/>
                          y₁ free, y₂, y₃ ≥ 0
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Properties Demonstrated:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li><strong>Weak Duality:</strong> W ≤ Z for any feasible solutions</li>
                        <li><strong>Strong Duality:</strong> W* = Z* at optimality</li>
                        <li><strong>Economic Interpretation:</strong> Shadow prices show value of supply/demand nodes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 4: Staff Scheduling - Symmetry Property</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> A hospital in Ichapur schedules staff.
                    </p>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg mt-3">
                      <p className="font-mono text-sm">
                        Min Z = 50y₁ + 60y₂<br/>
                        s.t. 2y₁ + y₂ ≥ 8<br/>
                        y₁ + 2y₂ ≥ 10<br/>
                        y₁, y₂ ≥ 0
                      </p>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Symmetry Property Application:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>The dual of this problem is the original</li>
                        <li>This confirms the problem structure</li>
                        <li>Allows solving either formulation</li>
                        <li>Ensures economic interpretation is consistent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visualization Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 1000 800" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="1000" height="800" fill="transparent" />
                  
                  {/* Title */}
                  <text x="500" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Basic Duality Properties</text>
                  
                  {/* Weak Duality Box */}
                  <rect x="80" y="80" width="400" height="150" rx="15" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="280" y="115" textAnchor="middle" className="text-lg font-bold fill-blue-600 dark:fill-blue-400">Weak Duality</text>
                  <text x="120" y="145" className="text-sm fill-gray-700 dark:fill-gray-300">For any feasible primal x and dual y:</text>
                  <text x="120" y="170" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">Max: Z(x) ≤ W(y)</text>
                  <text x="120" y="195" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">Min: W(y) ≤ Z(x)</text>
                  <text x="120" y="220" className="text-sm fill-gray-600 dark:fill-gray-400">Dual provides bounds on primal</text>
                  
                  {/* Arrow from Weak to Strong */}
                  <path d="M 480 155 L 520 155" stroke="#8B5CF6" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 50;50 0" dur="1.5s" repeatCount="indefinite" />
                  </path>
                  
                  {/* Strong Duality Box */}
                  <rect x="520" y="80" width="400" height="150" rx="15" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="720" y="115" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Strong Duality</text>
                  <text x="560" y="145" className="text-sm fill-gray-700 dark:fill-gray-300">At optimality:</text>
                  <text x="560" y="170" className="text-sm font-mono font-bold fill-green-600 dark:fill-green-300">Z* = W*</text>
                  <text x="560" y="195" className="text-sm fill-gray-700 dark:fill-gray-300">Duality Gap = 0</text>
                  <text x="560" y="220" className="text-sm fill-gray-600 dark:fill-gray-400">Optimal values are equal</text>
                  
                  {/* Arrow to Complementary Slackness */}
                  <path d="M 500 230 L 500 300" stroke="#8B5CF6" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </path>
                  
                  {/* Complementary Slackness Box */}
                  <rect x="80" y="300" width="840" height="160" rx="15" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="500" y="335" textAnchor="middle" className="text-lg font-bold fill-purple-600 dark:fill-purple-400">Complementary Slackness</text>
                  
                  <text x="120" y="365" className="text-sm fill-gray-700 dark:fill-gray-300">For each constraint i: yᵢ × (bᵢ - Aᵢx) = 0</text>
                  <text x="120" y="390" className="text-sm fill-gray-700 dark:fill-gray-300">For each variable j: xⱼ × (Aⱼᵀy - cⱼ) = 0</text>
                  
                  <text x="120" y="420" className="text-sm fill-gray-600 dark:fill-gray-400">Economic Meaning:</text>
                  <text x="120" y="445" className="text-sm fill-gray-600 dark:fill-gray-400">• Scarce resources (fully used) have positive shadow prices</text>
                  <text x="120" y="465" className="text-sm fill-gray-600 dark:fill-gray-400">• Surplus resources have zero shadow prices</text>
                  
                  {/* Arrow to Symmetry */}
                  <path d="M 500 460 L 500 530" stroke="#8B5CF6" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" repeatCount="indefinite" begin="2s" />
                  </path>
                  
                  {/* Symmetry Box */}
                  <rect x="80" y="530" width="840" height="150" rx="15" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1.5s" />
                  </rect>
                  <text x="500" y="565" textAnchor="middle" className="text-lg font-bold fill-amber-600 dark:fill-amber-400">Symmetry Property</text>
                  
                  <text x="120" y="595" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">Dual(Dual(Primal)) = Primal</text>
                  
                  <text x="120" y="625" className="text-sm fill-gray-600 dark:fill-gray-400">Implications:</text>
                  <text x="120" y="650" className="text-sm fill-gray-600 dark:fill-gray-400">• Perfect symmetry between primal and dual</text>
                  <text x="120" y="675" className="text-sm fill-gray-600 dark:fill-gray-400">• Can solve either formulation</text>
                  
                  {/* Summary Box */}
                  <rect x="80" y="710" width="840" height="70" rx="10" fill="#1F2937" fillOpacity="0.8" />
                  <text x="500" y="740" textAnchor="middle" className="text-base font-bold fill-white">The Four Properties Work Together to Provide a Complete Theoretical Framework</text>
                  <text x="500" y="765" textAnchor="middle" className="text-sm fill-gray-300">Weak Duality → Strong Duality → Complementary Slackness → Symmetry</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This visualization shows how the four basic duality properties are connected and work together to form a complete theoretical framework.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Professional Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🎯 Verify Optimality</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always check strong duality (Z* = W*) to verify you've found the optimal solution. If the values aren't equal, your solution isn't optimal.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">💡 Use Complementary Slackness</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Apply complementary slackness to find one optimal solution from the other. If you know the optimal primal, you can find the dual, and vice versa.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🔧 Check Bounds with Weak Duality</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use weak duality to get bounds quickly. Any feasible dual solution gives a bound on the primal objective, helping you know how close you are to optimal.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">⚡ Choose the Easier Problem</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Due to the symmetry property, you can solve the problem that's easier to handle. Strong duality ensures you get the same optimal value.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> When Debangshu from Barrackpore solves complex optimization problems, he uses all four properties together. He starts with weak duality for bounds, uses strong duality to verify optimality, applies complementary slackness to find the other solution, and leverages symmetry to choose the easier formulation.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Common Mistakes</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Misapplying Weak Duality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Applying weak duality to non-feasible solutions. Weak duality only holds for feasible primal and dual solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Assuming Strong Duality Always Holds</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Strong duality requires feasibility and boundedness. If either problem is infeasible or unbounded, strong duality may not hold.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Misapplying Complementary Slackness</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Complementary slackness only holds at optimality. Don't apply it to non-optimal solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting Symmetry Conditions</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The symmetry property requires problems in standard form. Mixed constraints or non-standard forms break the symmetry.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students think that weak duality and strong duality are the same thing. They're not—weak duality gives bounds for any feasible solutions, while strong duality guarantees equality at optimality.
                </p>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">📝 Systematic Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify weak duality for any feasible solutions</li>
                    <li>Check strong duality at optimality</li>
                    <li>Apply complementary slackness to verify optimality</li>
                    <li>Confirm symmetry by checking the dual of the dual</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🔍 Use Properties Together</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Start with weak duality for bounds</li>
                    <li>Use strong duality to confirm optimality</li>
                    <li>Apply complementary slackness for verification</li>
                    <li>Leverage symmetry for solving efficiency</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">📚 Document Interpretations</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Explain the economic meaning of each property</li>
                    <li>Document how properties were used in solution</li>
                    <li>Note any conditions or assumptions</li>
                    <li>Record sensitivity analysis results</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🎯 Algorithm Development</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use duality gap as stopping criterion</li>
                    <li>Apply complementary slackness for solution construction</li>
                    <li>Leverage symmetry for problem reformulation</li>
                    <li>Use weak duality for performance bounds</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, all four duality properties are used together for comprehensive problem solving. When Mahima from Jadavpur presents optimization results, she always shows how the properties confirm the solution's validity.
                </p>
              </div>
            </div>
          </section>

          {/* Mini Checklist Section */}
          <section
            ref={(el) => (sectionRefs.current[10] = el)}
            data-index="10"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-1000',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection >= 10 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Weak Duality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that dual provides bounds on primal objective</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Strong Duality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know that optimal primal and dual values are equal</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Complementary Slackness</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply complementary slackness to verify optimality</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Symmetry Property</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that the dual of the dual is the primal</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply all four properties together in problem solving</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The basic duality properties are the foundation of linear programming. When I teach this to my students in Kolkata, I emphasize that these properties aren't just mathematical—they're practical tools. Susmita found that understanding all four properties helped her solve problems faster and with more confidence. Remember: Weak duality gives you bounds, strong duality confirms optimality, complementary slackness links solutions, and symmetry gives you flexibility. Master these, and you master linear programming."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Basic Duality Properties FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Basic Duality Properties"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic4_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic4;