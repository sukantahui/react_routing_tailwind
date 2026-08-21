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
    { id: 'introduction', title: 'Introduction to Primal-Dual Relationship' },
    { id: 'properties', title: 'Key Properties of the Relationship' },
    { id: 'weakduality', title: 'Weak Duality' },
    { id: 'strongduality', title: 'Strong Duality' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            Topic 2
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Relationship Between Primal and Dual
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the deep connections and mathematical relationships between primal and dual problems
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Understanding the Primal-Dual Relationship</h2>
              
              <div className="prose prose-purple dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The relationship between the primal and dual problems is one of the most profound concepts in optimization. It's not just a mathematical curiosity—it represents a fundamental duality in decision-making that has deep economic and theoretical implications.
                </p>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 Key Insight: The primal and dual are two sides of the same coin. They describe the same optimization problem from different perspectives, and their relationship provides a complete understanding of the solution.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">The Symmetry Principle</h3>
                <p>
                  The relationship between primal and dual is symmetric: the dual of the dual is the original primal (for problems in standard form). This symmetry reflects the fundamental nature of optimization problems.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Primal Perspective</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Decision variables represent actions</li>
                      <li>Constraints represent limitations</li>
                      <li>Objective represents goal</li>
                      <li>Direct interpretation</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Dual Perspective</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Variables represent shadow prices</li>
                      <li>Constraints represent value equations</li>
                      <li>Objective represents resource valuation</li>
                      <li>Economic interpretation</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Susmita in Kolkata optimizes her factory production, the primal tells her what to produce, while the dual tells her the value of her resources. Both perspectives are essential for good decision-making.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Properties Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Key Properties of the Primal-Dual Relationship</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">1. Symmetry Property</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      The dual of the dual is the original primal (for standard form problems). This shows the perfect symmetry between the two formulations.
                    </p>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      Dual(Dual(Primal)) = Primal
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">2. Bounding Property</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      The dual provides a bound on the primal objective value. For maximization, W ≥ Z. For minimization, Z ≥ W.
                    </p>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      Max Primal: Z ≤ W<br/>
                      Min Primal: W ≤ Z
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">3. Complementary Slackness</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      At optimality, either a constraint is tight or its corresponding dual variable is zero.
                    </p>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      If slack > 0 → y = 0<br/>
                      If y > 0 → slack = 0
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">4. Strong Duality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      When both problems have optimal solutions, their objective values are equal.
                    </p>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      Z* = W*
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> These properties work together to form a complete picture. Weak duality gives bounds, complementary slackness links solutions, and strong duality guarantees equality at optimality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Weak Duality Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Weak Duality</h2>
              
              <div className="prose prose-purple dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Definition</h3>
                <p>
                  Weak duality states that for any feasible primal solution and any feasible dual solution, the dual objective value is always a bound on the primal objective value.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    For Maximization Primal: Z ≤ W<br/>
                    For Minimization Primal: W ≤ Z
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Implications of Weak Duality</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Upper/Lower Bounds:</strong> The dual objective gives bounds on the optimal primal value</li>
                  <li><strong>Feasibility Verification:</strong> If Z &gt; W for a max problem, both solutions cannot be optimal</li>
                  <li><strong>Algorithm Stopping Criteria:</strong> Can be used to determine how close we are to optimality</li>
                  <li><strong>Theoretical Foundation:</strong> Establishes the relationship between primal and dual</li>
                </ul>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Practical Application:</strong> When Mahima in Jadavpur solves a production problem, she uses weak duality to check her results. If the dual objective is less than the primal, she knows there's room for improvement.
                  </p>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">Example</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-mono text-sm">
                        Primal: Max Z = 3x₁ + 5x₂<br/>
                        Feasible x = (2, 3): Z = 21
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-mono text-sm">
                        Dual: Min W = 4y₁ + 12y₂ + 18y₃<br/>
                        Feasible y = (2, 1, 0): W = 20
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    Here, Z = 21 and W = 20, so Z &gt; W, confirming weak duality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Strong Duality Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Strong Duality</h2>
              
              <div className="prose prose-purple dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Definition</h3>
                <p>
                  Strong duality states that if both the primal and dual problems have optimal solutions, then their optimal objective values are equal. This is the cornerstone of duality theory.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    For both Maximization and Minimization: Z* = W*
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Conditions for Strong Duality</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Feasibility:</strong> Both problems must have feasible solutions</li>
                  <li><strong>Boundedness:</strong> The objective values must be bounded</li>
                  <li><strong>Convexity:</strong> For nonlinear problems, convexity is required</li>
                  <li><strong>Constraint Qualification:</strong> Slater's condition or similar conditions</li>
                </ul>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Key Insight:</strong> Strong duality guarantees that the duality gap is zero at optimality. This means solving either the primal or the dual gives us the same optimal value.
                  </p>
                </div>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Example</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-mono text-sm">
                        Primal Optimal:<br/>
                        Max Z* = 21<br/>
                        Solution: x* = (2, 3)
                      </p>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-mono text-sm">
                        Dual Optimal:<br/>
                        Min W* = 21<br/>
                        Solution: y* = (2.5, 0.5, 0)
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    Here, Z* = W* = 21, demonstrating strong duality.
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Example 1: Production Planning - Primal and Dual Relationship</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Production Decisions</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        A factory produces two products. The primal decides how many of each to produce to maximize profit.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Max Z = 40x₁ + 30x₂<br/>
                        s.t. 2x₁ + x₂ ≤ 100<br/>
                        x₁ + 2x₂ ≤ 80<br/>
                        x₁, x₂ ≥ 0
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-green-600 dark:text-green-400">Dual - Resource Valuation</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        The dual determines the value of resources (shadow prices) used in production.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Min W = 100y₁ + 80y₂<br/>
                        s.t. 2y₁ + y₂ ≥ 40<br/>
                        y₁ + 2y₂ ≥ 30<br/>
                        y₁, y₂ ≥ 0
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">🔍 Relationship: The primal's optimal profit equals the dual's optimal resource value. If Z* = ₹2200, then resources are worth ₹2200 in total.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Example 2: Investment Portfolio - Dual Interpretation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Investment Decisions</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        An investor chooses investments to maximize returns while managing risk.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Max Z = 0.12x₁ + 0.15x₂<br/>
                        s.t. 0.2x₁ + 0.3x₂ ≤ 0.25<br/>
                        x₁ + x₂ = 1<br/>
                        x₁, x₂ ≥ 0
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-green-600 dark:text-green-400">Dual - Risk Pricing</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        The dual reveals the market price of risk and the value of relaxing constraints.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Min W = 0.25y₁ + 1y₂<br/>
                        s.t. 0.2y₁ + y₂ ≥ 0.12<br/>
                        0.3y₁ + y₂ ≥ 0.15<br/>
                        y₁ free, y₂ free
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">🔍 Relationship: The dual variables y₁ (risk price) and y₂ (return value) show how much the objective improves per unit of constraint relaxation.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Example 3: Transportation Network</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Shipping Decisions</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        A company minimizes shipping costs while meeting demand and respecting supply limits.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Min Z = 2x₁ + 3x₂<br/>
                        s.t. x₁ + x₂ ≥ 50<br/>
                        x₁ ≤ 30, x₂ ≤ 40<br/>
                        x₁, x₂ ≥ 0
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-green-600 dark:text-green-400">Dual - Node Valuation</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        The dual values supply and demand nodes, showing their marginal worth.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Max W = 50y₁ - 30y₂ - 40y₃<br/>
                        s.t. y₁ - y₂ ≤ 2<br/>
                        y₁ - y₃ ≤ 3<br/>
                        y₁ free, y₂, y₃ ≥ 0
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">Example 4: Staff Scheduling</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Staffing Decisions</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        A hospital minimizes labor costs while maintaining minimum staff levels.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Min Z = 50y₁ + 60y₂<br/>
                        s.t. 2y₁ + y₂ ≥ 8<br/>
                        y₁ + 2y₂ ≥ 10<br/>
                        y₁, y₂ ≥ 0
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-green-600 dark:text-green-400">Dual - Staff Value</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        The dual shows the value of having additional staff available.
                      </p>
                      <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm font-mono">
                        Max W = 8x₁ + 10x₂<br/>
                        s.t. 2x₁ + x₂ ≤ 50<br/>
                        x₁ + 2x₂ ≤ 60<br/>
                        x₁, x₂ ≥ 0
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">🔍 Relationship: The dual variables x₁ and x₂ represent the value of additional staff in each shift.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="1000" height="700" fill="transparent" />
                  
                  {/* Title */}
                  <text x="500" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Primal-Dual Relationship Visualization</text>
                  
                  {/* Primal Box */}
                  <rect x="80" y="80" width="350" height="200" rx="15" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="255" y="120" textAnchor="middle" className="text-lg font-bold fill-purple-600 dark:fill-purple-400">Primal Problem</text>
                  
                  <text x="120" y="150" className="text-sm fill-gray-700 dark:fill-gray-300">Maximize/Minimize</text>
                  <text x="120" y="175" className="text-sm fill-gray-700 dark:fill-gray-300">Decision Variables: x₁, x₂, ..., xₙ</text>
                  <text x="120" y="200" className="text-sm fill-gray-700 dark:fill-gray-300">Constraints: m constraints</text>
                  <text x="120" y="225" className="text-sm fill-gray-700 dark:fill-gray-300">Objective: Z = cᵀx</text>
                  <text x="120" y="250" className="text-sm fill-gray-700 dark:fill-gray-300">Feasible Region: P</text>
                  
                  {/* Arrow from Primal to Dual */}
                  <path d="M 430 180 L 570 180" stroke="#8B5CF6" strokeWidth="3" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" fill="freeze" />
                  </path>
                  <polygon points="570,175 580,180 570,185" fill="#8B5CF6" />
                  
                  <text x="500" y="160" textAnchor="middle" className="text-sm font-semibold fill-purple-600 dark:fill-purple-400">Transformation</text>
                  <text x="500" y="200" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">(A → Aᵀ)</text>
                  
                  {/* Dual Box */}
                  <rect x="580" y="80" width="350" height="200" rx="15" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="755" y="120" textAnchor="middle" className="text-lg font-bold fill-pink-600 dark:fill-pink-400">Dual Problem</text>
                  
                  <text x="620" y="150" className="text-sm fill-gray-700 dark:fill-gray-300">Minimize/Maximize</text>
                  <text x="620" y="175" className="text-sm fill-gray-700 dark:fill-gray-300">Decision Variables: y₁, y₂, ..., yₘ</text>
                  <text x="620" y="200" className="text-sm fill-gray-700 dark:fill-gray-300">Constraints: n constraints</text>
                  <text x="620" y="225" className="text-sm fill-gray-700 dark:fill-gray-300">Objective: W = bᵀy</text>
                  <text x="620" y="250" className="text-sm fill-gray-700 dark:fill-gray-300">Feasible Region: D</text>
                  
                  {/* Weak Duality */}
                  <rect x="80" y="340" width="850" height="120" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
                  </rect>
                  <text x="505" y="375" textAnchor="middle" className="text-base font-bold fill-yellow-600 dark:fill-yellow-400">Weak Duality</text>
                  
                  <text x="160" y="400" className="text-sm fill-gray-700 dark:fill-gray-300">For any feasible x ∈ P and y ∈ D:</text>
                  <text x="160" y="425" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">If Primal is Max: Z(x) ≤ W(y) → Dual provides upper bound</text>
                  <text x="160" y="445" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">If Primal is Min: W(y) ≤ Z(x) → Dual provides lower bound</text>
                  
                  {/* Strong Duality */}
                  <rect x="80" y="490" width="850" height="120" rx="10" fill="#D1FAE5" dark:fill="#064E3B" fillOpacity="0.3" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="505" y="525" textAnchor="middle" className="text-base font-bold fill-green-600 dark:fill-green-400">Strong Duality</text>
                  
                  <text x="160" y="550" className="text-sm fill-gray-700 dark:fill-gray-300">If both problems have optimal solutions:</text>
                  <text x="160" y="575" className="text-sm font-mono font-bold fill-green-700 dark:fill-green-300">Z* = W* (Optimal values are equal)</text>
                  <text x="160" y="595" className="text-sm fill-gray-700 dark:fill-gray-300">Duality Gap = Z* - W* = 0</text>
                  
                  {/* Complementary Slackness */}
                  <rect x="80" y="630" width="850" height="50" rx="10" fill="#EDE9FE" dark:fill="#4C1D95" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="2" />
                  <text x="505" y="660" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Complementary Slackness: At optimality, either constraint is tight or dual variable is zero</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This visualization shows the complete relationship between primal and dual problems, including weak duality, strong duality, and complementary slackness.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Professional Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🎯 Use Both Perspectives</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always check both primal and dual solutions. If they don't give the same objective value, something is wrong with your solution or formulation.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">💡 Complementary Slackness Check</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use complementary slackness to verify optimality. If a constraint is loose, the shadow price should be zero.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Duality Gap Analysis</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Monitor the duality gap in algorithms. When it approaches zero, you're close to optimality.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Choose Easier Formulation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    If one problem has fewer variables, solve that one. Strong duality ensures you get the same optimal value.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In industry, duality is used extensively for sensitivity analysis. When Debangshu from Barrackpore optimizes his supply chain, he uses dual variables to understand which constraints are binding and where to invest resources.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Feasibility Conditions</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Both primal and dual must be feasible for strong duality. Infeasibility in one affects the other.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Confusing Primal and Dual Interpretations</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Primal variables are decisions, dual variables are shadow prices. Don't mix up their interpretations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students think that if strong duality holds, the optimal solutions are always the same. They're not - they're different but related through complementary slackness.
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">📝 Verify Both Solutions</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Always solve and verify both problems</li>
                    <li>Check that objectives are equal</li>
                    <li>Verify complementary slackness</li>
                    <li>Test feasibility conditions</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔍 Use Duality for Validation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use weak duality to check bounds</li>
                    <li>Use strong duality to confirm optimality</li>
                    <li>Use complementary slackness to verify solutions</li>
                    <li>Check duality gap as progress metric</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">📚 Document Insights</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Interpret dual variables economically</li>
                    <li>Identify binding constraints</li>
                    <li>Calculate sensitivity information</li>
                    <li>Document shadow prices</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🎯 Strategic Decision Making</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use shadow prices for resource allocation</li>
                    <li>Identify bottlenecks from dual values</li>
                    <li>Evaluate investment opportunities</li>
                    <li>Optimize resource utilization</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In consulting, duality is used to provide clients with two perspectives on their problem. This builds confidence in recommendations and helps justify resource allocation decisions.
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
              <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Understanding Symmetry</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that the dual of the dual is the original primal</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Weak Duality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to apply weak duality to get bounds on the objective</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Strong Duality</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand conditions for strong duality and its implications</p>
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
                    <h4 className="font-medium">Economic Interpretation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can interpret dual variables as shadow prices in real-world applications</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The primal-dual relationship is like understanding both sides of a story. When I teach this to my students in Ichapur, I use the analogy of supply and demand: the primal represents the buyer's perspective (what to buy), while the dual represents the seller's perspective (how to price). Abhronila found that thinking about both perspectives helped her understand why strong duality works. Remember: the relationship isn't just mathematical—it's deeply rooted in economic principles of value and optimization."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Primal-Dual Relationship FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Relationship Between Primal and Dual"
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