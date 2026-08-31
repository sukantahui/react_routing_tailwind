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
  const [selectedQuestion, setSelectedQuestion] = useState(null);
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

  const shortQuestions = [
    {
      id: 1,
      question: "What is the difference between primal and dual problems?",
      answer: "The primal is the original optimization problem, while the dual is its companion problem derived through mathematical transformation. The primal focuses on decisions (what to do), while the dual focuses on resource valuation (what resources are worth)."
    },
    {
      id: 2,
      question: "What is a shadow price?",
      answer: "A shadow price (dual variable) is the marginal value of a resource. It tells you how much the objective function would improve if you had one additional unit of that resource. It represents the economic value of the resource."
    },
    {
      id: 3,
      question: "What is weak duality?",
      answer: "Weak duality states that for any feasible primal solution and any feasible dual solution, the dual objective value provides a bound on the primal objective value. For a maximization problem, Z ≤ W for all feasible solutions."
    },
    {
      id: 4,
      question: "What is strong duality?",
      answer: "Strong duality states that if both the primal and dual problems have optimal solutions, then their optimal objective values are equal. This means Z* = W* and the duality gap is zero."
    },
    {
      id: 5,
      question: "What is complementary slackness?",
      answer: "Complementary slackness states that at optimality, either a constraint is tight or its corresponding dual variable is zero. This means resources are either fully utilized (positive shadow price) or in surplus (zero shadow price)."
    },
    {
      id: 6,
      question: "What is the dual of a maximization problem?",
      answer: "The dual of a maximization problem is a minimization problem. If the primal is Max Z = cᵀx subject to Ax ≤ b, x ≥ 0, the dual is Min W = bᵀy subject to Aᵀy ≥ c, y ≥ 0."
    },
    {
      id: 7,
      question: "How do you form the dual of a minimization problem?",
      answer: "The dual of a minimization problem is a maximization problem. If the primal is Min Z = cᵀx subject to Ax ≥ b, x ≥ 0, the dual is Max W = bᵀy subject to Aᵀy ≤ c, y ≥ 0."
    },
    {
      id: 8,
      question: "What is the economic interpretation of dual variables?",
      answer: "Dual variables represent shadow prices or marginal values of resources. They indicate how much the objective function would improve with one additional unit of each resource, guiding investment and pricing decisions."
    },
    {
      id: 9,
      question: "What is the symmetry property of duality?",
      answer: "The symmetry property states that the dual of the dual problem is the original primal problem (for problems in standard form). This means Dual(Dual(Primal)) = Primal."
    },
    {
      id: 10,
      question: "What is the duality gap?",
      answer: "The duality gap is the difference between the primal and dual objective values. For a maximization problem, Gap = Z - W. The gap is always non-negative (weak duality) and becomes zero at optimality (strong duality)."
    },
    {
      id: 11,
      question: "How do shadow prices guide investment decisions?",
      answer: "Shadow prices indicate which resources are most valuable. Resources with high shadow prices should be prioritized for investment because each additional unit provides the highest return. The shadow price is the maximum you should pay for more of that resource."
    },
    {
      id: 12,
      question: "What happens when a dual variable is zero?",
      answer: "When a dual variable is zero, it means the corresponding resource is not scarce and has no marginal value. The resource is in surplus and not fully utilized. Additional units of this resource would not improve the objective function."
    },
    {
      id: 13,
      question: "What happens when a dual variable is positive?",
      answer: "When a dual variable is positive, it means the corresponding resource is scarce and fully utilized. The resource has positive marginal value. Additional units would improve the objective function, making it valuable to invest in."
    },
    {
      id: 14,
      question: "How does duality help in sensitivity analysis?",
      answer: "Duality provides sensitivity information through shadow prices. The shadow prices tell you how much the objective would change if a constraint's RHS changed. This helps in 'what-if' analysis and understanding the robustness of solutions."
    },
    {
      id: 15,
      question: "What is the relationship between primal and dual feasible regions?",
      answer: "The primal feasible region is in the space of decision variables, while the dual feasible region is in the space of shadow prices. They are different spaces but connected through weak duality and complementary slackness at optimality."
    },
    {
      id: 16,
      question: "How do you verify if a solution is optimal using duality?",
      answer: "To verify optimality: 1) Check that the primal solution is feasible, 2) Check that the dual solution is feasible, 3) Verify that Z = W (strong duality). If all three conditions hold, the solution is optimal."
    },
    {
      id: 17,
      question: "What is the role of duality in linear programming algorithms?",
      answer: "Duality is used in algorithms for: 1) Stopping criteria (duality gap), 2) Optimality verification, 3) Direction finding (reduced costs), 4) Sensitivity analysis. Primal-dual algorithms solve both problems simultaneously."
    },
    {
      id: 18,
      question: "How does duality help in product pricing?",
      answer: "Duality helps set minimum product prices. For a product to be profitable, its price must be at least the cost of resources used: Price ≥ Σ(Resource Consumption × Shadow Price). This ensures products cover their true resource costs."
    },
    {
      id: 19,
      question: "What is the economic meaning of complementary slackness?",
      answer: "Complementary slackness means that resources with positive shadow prices are fully utilized, while resources with zero shadow prices are in surplus. This reflects the economic principle that only scarce resources have value."
    },
    {
      id: 20,
      question: "How does duality help in identifying bottlenecks?",
      answer: "Resources with positive shadow prices are bottlenecks—they're fully utilized and constraining production. Identifying these bottlenecks helps managers know where to focus improvement efforts and investment."
    },
    {
      id: 21,
      question: "What are the conditions for strong duality to hold?",
      answer: "Strong duality requires: 1) Both primal and dual problems must have feasible solutions, 2) Both must have finite optimal values (bounded), and 3) For non-linear problems, convexity and constraint qualification conditions must hold."
    },
    {
      id: 22,
      question: "How does duality help in resource allocation?",
      answer: "Duality guides resource allocation by showing which resources generate the highest returns. Resources with higher shadow prices should receive more allocation, while resources with zero shadow prices are in surplus and don't need additional allocation."
    },
    {
      id: 23,
      question: "What is the significance of the dual objective function?",
      answer: "The dual objective function W = bᵀy represents the total economic value of all resources at their shadow prices. At optimality, this equals the optimal objective value of the primal, showing that total resource value equals total output value."
    },
    {
      id: 24,
      question: "How does duality extend to non-linear programming?",
      answer: "Duality extends through Lagrangian duality. Weak duality holds, strong duality requires convexity and constraint qualifications, complementary slackness appears in KKT conditions, and symmetry is not as direct as in linear programming."
    },
    {
      id: 25,
      question: "What is the role of duality in portfolio optimization?",
      answer: "In portfolio optimization, duality reveals the market price of risk and the value of returns. Dual variables show the trade-off between risk and return, helping investors make informed decisions about asset allocation."
    },
    {
      id: 26,
      question: "How does duality help in make-or-buy decisions?",
      answer: "Duality helps by calculating the true internal cost of production using shadow prices. If the external purchase price is less than the shadow-price cost, you should buy; if it's greater, you should make the product internally."
    },
    {
      id: 27,
      question: "What is the relationship between primal and dual optimal solutions?",
      answer: "Primal and dual optimal solutions are linked through complementary slackness. They are different solutions (different variables) but provide the same optimal objective value. One can be derived from the other using complementary slackness."
    },
    {
      id: 28,
      question: "How does duality help in understanding opportunity cost?",
      answer: "Shadow prices represent opportunity costs—what you give up by using a resource in one way instead of another. This helps in decision-making by revealing the true cost of resource usage."
    },
    {
      id: 29,
      question: "What happens when the primal problem is infeasible?",
      answer: "When the primal is infeasible, the dual is either infeasible or unbounded. This relationship (from Farkas' lemma) helps identify problem formulation errors and provides insight into the structure of the problem."
    },
    {
      id: 30,
      question: "Why is duality important in optimization?",
      answer: "Duality is important because it provides: 1) Theoretical understanding of problems, 2) Practical tools for solving problems, 3) Economic interpretation of solutions, 4) Sensitivity analysis capabilities, 5) Algorithm development foundations, and 6) Multiple perspectives on the same problem."
    }
  ];

  const toggleAnswer = (id) => {
    if (selectedQuestion === id) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(id);
    }
  };

  const sections = [
    { id: 'introduction', title: 'Introduction to Short Questions' },
    { id: 'questions', title: 'Frequently Asked Questions' },
    { id: 'conceptual', title: 'Conceptual Understanding' },
    { id: 'practical', title: 'Practical Applications' },
    { id: 'tips', title: 'Quick Tips & Tricks' },
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
            Topic 5
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            Short Questions on Duality
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Quick questions and answers to reinforce understanding of duality concepts
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Introduction to Short Questions</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <p>
                  This topic presents a collection of short questions and answers covering all aspects of duality in linear programming. These questions are designed to test and reinforce understanding of key concepts, properties, and applications of duality.
                </p>

                <div className="my-6 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border-l-4 border-rose-500">
                  <p className="font-medium text-rose-800 dark:text-rose-300">
                    💡 Key Insight: Short questions help consolidate learning by focusing on the most important concepts. They serve as quick revision tools and help identify areas that need further study.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">How to Use These Questions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Self-Assessment:</strong> Test your understanding of each concept</li>
                  <li><strong>Revision:</strong> Use as quick revision notes before exams</li>
                  <li><strong>Discussion:</strong> Use as discussion prompts for group study</li>
                  <li><strong>Teaching:</strong> Use to explain concepts to others</li>
                  <li><strong>Quick Reference:</strong> Keep as a reference for key concepts</li>
                </ul>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    🎯 Think About: When Mamata in Ichapur prepares for her optimization exam, these short questions help her quickly review all the important concepts and identify what she needs to study in more depth.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Questions Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Frequently Asked Questions</h2>
              
              <div className="space-y-3">
                {shortQuestions.map((item, index) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleAnswer(item.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <span className="flex items-center space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full text-xs font-bold">
                          {item.id}
                        </span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.question}
                        </span>
                      </span>
                      <span className="text-rose-600 dark:text-rose-400">
                        {selectedQuestion === item.id ? '−' : '+'}
                      </span>
                    </button>
                    {selectedQuestion === item.id && (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  💡 <strong>Tip:</strong> Try to answer each question before clicking to reveal the answer. This helps identify areas where you need more study.
                </p>
              </div>
            </div>
          </section>

          {/* Conceptual Understanding Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Conceptual Understanding</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Key Definitions</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li><strong>Primal:</strong> The original optimization problem</li>
                    <li><strong>Dual:</strong> The companion problem derived from the primal</li>
                    <li><strong>Shadow Price:</strong> Marginal value of a resource</li>
                    <li><strong>Duality Gap:</strong> Difference between primal and dual values</li>
                    <li><strong>Complementary Slackness:</strong> Relationship between tight constraints and shadow prices</li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Key Relationships</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li><strong>Weak Duality:</strong> Z ≤ W (for max)</li>
                    <li><strong>Strong Duality:</strong> Z* = W*</li>
                    <li><strong>Complementary Slackness:</strong> yᵢ × slackᵢ = 0</li>
                    <li><strong>Symmetry:</strong> Dual(Dual) = Primal</li>
                    <li><strong>Economic:</strong> Resource value = Output value</li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Important Properties</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Dual of max is min (and vice versa)</li>
                    <li>Constraints become variables</li>
                    <li>Variables become constraints</li>
                    <li>RHS and objective swap</li>
                    <li>Matrix A becomes Aᵀ</li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Economic Interpretations</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Dual variables = Shadow prices</li>
                    <li>Positive shadow price = Scarce resource</li>
                    <li>Zero shadow price = Surplus resource</li>
                    <li>Dual constraints = Fair pricing conditions</li>
                    <li>Dual objective = Total resource value</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                <p className="font-medium text-purple-800 dark:text-purple-300">
                  💡 <strong>Remember:</strong> These concepts are interconnected. Understanding one helps understand the others.
                </p>
              </div>
            </div>
          </section>

          {/* Practical Applications Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Practical Applications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Production Planning</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>What to produce and in what quantities</li>
                    <li>How to value resources</li>
                    <li>Where to invest for maximum return</li>
                    <li>How to price products</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Resource Allocation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Allocate scarce resources optimally</li>
                    <li>Identify bottlenecks</li>
                    <li>Make investment decisions</li>
                    <li>Evaluate resource efficiency</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Financial Planning</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Portfolio optimization</li>
                    <li>Risk management</li>
                    <li>Investment valuation</li>
                    <li>Market analysis</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Strategic Planning</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Make-or-buy decisions</li>
                    <li>Pricing strategies</li>
                    <li>Capacity planning</li>
                    <li>Supply chain optimization</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  💡 <strong>Real-World Connection:</strong> When Susmita in Barrackpore applies duality in her manufacturing business, she uses these concepts to make better decisions about production, investment, and pricing.
                </p>
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Quick Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🎯 Quick Memory Aids</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Primal → Dual: Constraints become variables</li>
                    <li>Dual variables = Shadow prices</li>
                    <li>Max → Min (and vice versa)</li>
                    <li>RHS ↔ Objective coefficients</li>
                    <li>A → Aᵀ (transpose)</li>
                  </ul>
                </div>

                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">💡 Problem-Solving Tips</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Always write primal in standard form first</li>
                    <li>Count variables and constraints</li>
                    <li>Check dimensions after forming dual</li>
                    <li>Verify with weak and strong duality</li>
                    <li>Use complementary slackness for verification</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Exam Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Practice forming duals from different primals</li>
                    <li>Know the four properties by heart</li>
                    <li>Understand economic interpretations</li>
                    <li>Practice sensitivity analysis</li>
                    <li>Solve mixed constraint problems</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Quick Checks</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Dual variables ≥ 0 for ≤ constraints</li>
                    <li>Dual variables ≤ 0 for ≥ constraints</li>
                    <li>Dual variables free for = constraints</li>
                    <li>Z* = W* at optimality</li>
                    <li>Complementary slackness conditions</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Tip:</strong> When solving duality problems, always write down the primal and dual side by side. This makes the relationship clearer and helps catch errors.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Optimization Direction</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting that the dual takes the opposite optimization direction. Max → Min, Min → Max.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Sign Restrictions</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Misplacing sign restrictions on dual variables. Remember: ≤ constraints → y ≥ 0, ≥ constraints → y ≤ 0.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Variable Count Mismatch</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Creating wrong number of dual variables or constraints. Always check: dual variables = primal constraints.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Confusing Shadow Price with Market Price</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow prices are internal values based on optimization, not market prices. They show value to your business.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is thinking that a zero shadow price means a resource has no value. It means the resource has no marginal value because it's in surplus.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">📝 Study Habits</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Practice forming duals regularly</li>
                    <li>Review all four properties weekly</li>
                    <li>Solve mixed constraint problems</li>
                    <li>Apply concepts to real-world scenarios</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🔍 Problem-Solving</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use systematic approach for dual formation</li>
                    <li>Verify with weak and strong duality</li>
                    <li>Check complementary slackness conditions</li>
                    <li>Interpret results economically</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">📚 Exam Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Create summary sheets of key concepts</li>
                    <li>Practice with sample problems</li>
                    <li>Review common mistakes</li>
                    <li>Time yourself on problems</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🎯 Application</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Connect concepts to real-world scenarios</li>
                    <li>Practice economic interpretation</li>
                    <li>Use duality for sensitivity analysis</li>
                    <li>Apply to different problem types</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, duality concepts are used regularly for decision-making. Understanding these concepts well gives you a competitive advantage in roles involving optimization and resource management.
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
              activeSection >= 7 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-100'
            )}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Concepts Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the concept of primal and dual problems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dual Formation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can form the dual of any given primal problem</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Duality Properties</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand weak duality, strong duality, complementary slackness, and symmetry</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Economic Interpretation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can interpret dual variables as shadow prices economically</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply duality concepts to real-world decision-making</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "These short questions represent the most important concepts students need to master. When I teach this, I emphasize that understanding these questions is like having a roadmap of the entire duality topic. Abhronila from Jadavpur found that reviewing these questions before exams helped her identify weak areas and focus her study efforts. Remember: mastery of duality comes from understanding these fundamental concepts and their interconnections."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Short Questions on Duality FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Short Questions on Duality"
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