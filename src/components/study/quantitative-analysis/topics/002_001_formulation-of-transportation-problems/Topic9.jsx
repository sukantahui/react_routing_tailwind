// Topic9.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
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
      question: "What is a transportation problem in operations research?",
      answer: "A transportation problem is a special type of linear programming problem that deals with the optimal distribution of goods from multiple supply points (sources) to multiple demand points (destinations) while minimizing total transportation cost."
    },
    {
      id: 2,
      question: "What are the key components of a transportation problem?",
      answer: "The key components are sources (supply points), destinations (demand points), transportation costs (per unit), decision variables (shipping quantities), supply values, and demand values."
    },
    {
      id: 3,
      question: "What is the balance condition in transportation problems?",
      answer: "The balance condition requires that total supply equals total demand: ΣSᵢ = ΣDⱼ. If this holds, the problem is balanced; if not, it's unbalanced and requires dummy adjustments."
    },
    {
      id: 4,
      question: "What is a dummy source in transportation problems?",
      answer: "A dummy source is an artificial supply point added when total demand exceeds total supply. It has supply equal to the deficit and zero costs to all destinations, representing unmet demand."
    },
    {
      id: 5,
      question: "What is a dummy destination in transportation problems?",
      answer: "A dummy destination is an artificial demand point added when total supply exceeds total demand. It has demand equal to the surplus and zero costs from all sources, representing unused supply."
    },
    {
      id: 6,
      question: "What is a transportation cost matrix?",
      answer: "A transportation cost matrix is a rectangular array containing the unit transportation costs from each source to each destination, organized with sources as rows and destinations as columns."
    },
    {
      id: 7,
      question: "What is the objective function in a transportation problem?",
      answer: "The objective function is to minimize total transportation cost: Minimize Z = ΣᵢΣⱼ cᵢⱼ × xᵢⱼ, where cᵢⱼ is the cost per unit and xᵢⱼ is the quantity shipped from source i to destination j."
    },
    {
      id: 8,
      question: "What are the constraints in a transportation problem?",
      answer: "The constraints are: 1) Supply constraints: Σⱼ xᵢⱼ = Sᵢ (each source's supply must be fully shipped), 2) Demand constraints: Σᵢ xᵢⱼ = Dⱼ (each destination's demand must be fully met), and 3) Non-negativity: xᵢⱼ ≥ 0."
    },
    {
      id: 9,
      question: "What is the Northwest Corner method?",
      answer: "The Northwest Corner method is a simple technique for finding an initial basic feasible solution for transportation problems. It starts at the top-left corner of the table and allocates as much as possible, moving right or down."
    },
    {
      id: 10,
      question: "What is the Least Cost method?",
      answer: "The Least Cost method finds an initial solution by allocating as much as possible to the cheapest available cell in the transportation table, adjusting supplies and demands, and repeating until all allocations are made."
    },
    {
      id: 11,
      question: "What is Vogel's Approximation Method (VAM)?",
      answer: "VAM is an advanced technique for finding a near-optimal initial solution. It calculates penalty costs for each row and column, then allocates to the cell with the highest penalty, providing a solution often close to optimal."
    },
    {
      id: 12,
      question: "What is the transportation simplex method?",
      answer: "The transportation simplex method is an optimization algorithm that improves a feasible solution to find the optimal solution. It starts with an initial basic feasible solution and makes improvements until optimality is reached."
    },
    {
      id: 13,
      question: "What is the Modified Distribution (MODI) method?",
      answer: "The MODI method checks optimality and improves solutions by calculating dual variables (uᵢ and vⱼ) and reduced costs. If all reduced costs are non-negative, the solution is optimal."
    },
    {
      id: 14,
      question: "What is degeneracy in transportation problems?",
      answer: "Degeneracy occurs when the number of basic variables in a transportation solution is less than m + n - 1. It can cause cycling in the simplex method and requires special handling by adding epsilon to break ties."
    },
    {
      id: 15,
      question: "What is the integrality property of transportation problems?",
      answer: "The integrality property ensures that if all supplies and demands are integers, the optimal solution will also have integer values. This makes transportation problems computationally tractable."
    },
    {
      id: 16,
      question: "What are the assumptions of transportation problems?",
      answer: "The assumptions are: 1) Products are homogeneous, 2) Costs are known and linear, 3) Supplies and demands are fixed and known, 4) Direct shipping is possible, and 5) No capacity constraints on routes."
    },
    {
      id: 17,
      question: "What is the difference between transportation and assignment problems?",
      answer: "Transportation problems handle multiple units between multiple points (supplies > 1, demands > 1). Assignment problems handle one-to-one matching with all supplies and demands equal to 1 (special case of transportation)."
    },
    {
      id: 18,
      question: "What is a shadow price in transportation problems?",
      answer: "Shadow prices (dual variables) represent the marginal value of supply at sources (uᵢ) and demand at destinations (vⱼ). They show how much the objective would improve with one additional unit of supply or demand."
    },
    {
      id: 19,
      question: "What is the economic interpretation of transportation problems?",
      answer: "Transportation problems represent the economic flow of goods from producers (sources) to consumers (destinations). The objective is to minimize costs while balancing supply and demand, representing efficient resource allocation."
    },
    {
      id: 20,
      question: "How do you handle unbalanced transportation problems?",
      answer: "Unbalanced problems are handled by adding dummy sources (if demand > supply) or dummy destinations (if supply > demand) with zero costs to balance the problem before solving."
    },
    {
      id: 21,
      question: "What is a transportation table?",
      answer: "A transportation table is a matrix format that organizes all problem data with sources as rows, destinations as columns, costs in cells, supply values on the right, and demand values at the bottom."
    },
    {
      id: 22,
      question: "What is the role of transportation problems in supply chain management?",
      answer: "Transportation problems are fundamental to supply chain management for optimizing logistics, distribution networks, inventory management, and overall supply chain efficiency."
    },
    {
      id: 23,
      question: "What is sensitivity analysis in transportation problems?",
      answer: "Sensitivity analysis examines how changes in costs, supplies, or demands affect the optimal solution. It helps understand the robustness of the solution and guides decision-making."
    },
    {
      id: 24,
      question: "What are the practical applications of transportation problems?",
      answer: "Applications include manufacturing distribution, agricultural supply chains, healthcare logistics, retail distribution, military logistics, humanitarian aid, waste management, and educational resource distribution."
    },
    {
      id: 25,
      question: "How does technology help in solving transportation problems?",
      answer: "Technology enables large-scale optimization through specialized software, ERP systems, AI for demand forecasting, IoT for real-time tracking, and cloud-based solutions for collaborative planning."
    },
    {
      id: 26,
      question: "What is the stepping stone method in transportation?",
      answer: "The stepping stone method is a technique for improving transportation solutions by tracing closed loops in the transportation table to find where improvements can be made."
    },
    {
      id: 27,
      question: "How do you find an initial solution for a transportation problem?",
      answer: "Initial solutions can be found using the Northwest Corner method, Least Cost method, or Vogel's Approximation Method (VAM), which provide starting points for optimization algorithms."
    },
    {
      id: 28,
      question: "What is the significance of the balance condition in transportation?",
      answer: "The balance condition ensures feasibility and allows the use of standard solution methods. If unbalanced, dummy adjustments are required to create a feasible problem."
    },
    {
      id: 29,
      question: "What are the future trends in transportation optimization?",
      answer: "Future trends include AI-driven optimization, real-time dynamic routing, sustainable logistics, autonomous vehicles, IoT integration, predictive analytics, and smart city logistics solutions."
    },
    {
      id: 30,
      question: "Why is the transportation problem important in operations research?",
      answer: "Transportation problems are fundamental to operations research because they: 1) Represent real-world logistics challenges, 2) Have efficient solution methods, 3) Provide economic insights, 4) Connect to other OR problems, and 5) Are widely applicable across industries."
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/30 rounded-full">
            Topic 9
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Short Questions on Transportation Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Quick questions and answers to reinforce understanding of transportation problem concepts
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Introduction to Short Questions</h2>
              
              <div className="prose prose-teal dark:prose-invert max-w-none leading-relaxed">
                <p>
                  This topic presents a collection of short questions and answers covering all essential aspects of transportation problems. These questions are designed to test and reinforce understanding of key concepts, methods, and applications in transportation optimization.
                </p>

                <div className="my-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border-l-4 border-teal-500">
                  <p className="font-medium text-teal-800 dark:text-teal-300">
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
                    🎯 Think About: When Mamata in Ichapur prepares for her operations research exam, these short questions help her quickly review all the important concepts and identify what she needs to study in more depth.
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Frequently Asked Questions</h2>
              
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
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold">
                          {item.id}
                        </span>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.question}
                        </span>
                      </span>
                      <span className="text-teal-600 dark:text-teal-400">
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Conceptual Understanding</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Key Definitions</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li><strong>Transportation Problem:</strong> Optimal distribution of goods from sources to destinations</li>
                    <li><strong>Sources:</strong> Supply points where goods originate</li>
                    <li><strong>Destinations:</strong> Demand points where goods are needed</li>
                    <li><strong>Cost Matrix:</strong> Per-unit transportation costs</li>
                    <li><strong>Balance Condition:</strong> ΣSᵢ = ΣDⱼ</li>
                  </ul>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Key Methods</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li><strong>NW Corner:</strong> Simple initial solution</li>
                    <li><strong>Least Cost:</strong> Better initial solution</li>
                    <li><strong>VAM:</strong> Near-optimal initial solution</li>
                    <li><strong>Transportation Simplex:</strong> Optimal solution algorithm</li>
                    <li><strong>MODI Method:</strong> Optimality checking</li>
                  </ul>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Key Concepts</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li><strong>Balanced:</strong> Supply = Demand</li>
                    <li><strong>Unbalanced:</strong> Supply ≠ Demand</li>
                    <li><strong>Dummy Source:</strong> Excess demand</li>
                    <li><strong>Dummy Destination:</strong> Surplus supply</li>
                    <li><strong>Degeneracy:</strong> Too few basic variables</li>
                  </ul>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Economic Interpretations</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li><strong>Shadow Prices:</strong> Marginal value of resources</li>
                    <li><strong>Surplus:</strong> Unused supply</li>
                    <li><strong>Deficit:</strong> Unmet demand</li>
                    <li><strong>Optimal Cost:</strong> Minimum shipping cost</li>
                    <li><strong>Shipping Plan:</strong> Optimal distribution</li>
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Practical Applications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Manufacturing Distribution</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Factory to warehouse shipping</li>
                    <li>Production planning optimization</li>
                    <li>Inventory management</li>
                    <li>Multi-plant distribution</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Agricultural Distribution</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Farm to market shipping</li>
                    <li>Seasonal produce distribution</li>
                    <li>Supply chain optimization</li>
                    <li>Storage and transportation</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Healthcare Logistics</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Medical supply distribution</li>
                    <li>Hospital resource allocation</li>
                    <li>Emergency response logistics</li>
                    <li>Pharmaceutical distribution</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">Educational Resources</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                    <li>Textbook distribution</li>
                    <li>Educational material supply</li>
                    <li>School resource allocation</li>
                    <li>District-wide distribution</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  💡 <strong>Real-World Connection:</strong> When Susmita in Barrackpore applies transportation problem concepts in her business, she uses these methods to optimize her distribution network and reduce costs.
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Quick Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">🎯 Quick Memory Aids</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Sources = Supply = Rows</li>
                    <li>Destinations = Demand = Columns</li>
                    <li>Balance = ΣSᵢ = ΣDⱼ</li>
                    <li>Dummy source = Excess demand</li>
                    <li>Dummy destination = Surplus supply</li>
                  </ul>
                </div>

                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">💡 Problem-Solving Tips</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Check balance first</li>
                    <li>Use VAM for good initial solution</li>
                    <li>Apply MODI for optimality check</li>
                    <li>Watch for degeneracy</li>
                    <li>Verify all constraints satisfied</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Exam Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Practice all four solution methods</li>
                    <li>Know how to handle unbalanced problems</li>
                    <li>Understand economic interpretation</li>
                    <li>Practice sensitivity analysis</li>
                    <li>Solve mixed constraint problems</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Quick Checks</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                    <li>Total supply = Total demand</li>
                    <li>All costs non-negative</li>
                    <li>All variables non-negative</li>
                    <li>All constraints satisfied</li>
                    <li>Optimality conditions met</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Tip:</strong> When solving transportation problems, always write down the problem statement clearly, draw the transportation table, and check balance before applying any solution method.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting to Check Balance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not verifying ΣSᵢ = ΣDⱼ before solving. Always check balance first!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Dummy Addition</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Adding dummy source when dummy destination is needed (or vice versa). Supply > Demand → Dummy Destination. Demand > Supply → Dummy Source.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Cost Matrix</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Using wrong costs or placing them incorrectly in the transportation table.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not handling degeneracy when the number of basic variables is less than m + n - 1.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is assuming a problem is balanced without checking. Always verify the balance condition before solving.
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">📝 Study Habits</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Practice all solution methods regularly</li>
                    <li>Review all concepts weekly</li>
                    <li>Solve varied problem types</li>
                    <li>Apply concepts to real-world scenarios</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">🔍 Problem-Solving</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use systematic approach for solving</li>
                    <li>Verify all solutions carefully</li>
                    <li>Check optimality conditions</li>
                    <li>Interpret results economically</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">📚 Exam Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Create summary sheets of key concepts</li>
                    <li>Practice with sample problems</li>
                    <li>Review common mistakes</li>
                    <li>Time yourself on problems</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">🎯 Application</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Connect concepts to real-world scenarios</li>
                    <li>Practice economic interpretation</li>
                    <li>Use for sensitivity analysis</li>
                    <li>Apply to different problem types</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, transportation problem concepts are used daily for logistics optimization. Understanding these concepts well gives you a competitive advantage in supply chain and logistics roles.
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
              <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Concepts Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the concept of transportation problems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Table Formulation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can formulate transportation tables correctly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Check</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can check if a problem is balanced or unbalanced</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Solution Methods</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can solve transportation problems using different methods</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply transportation concepts to real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "These short questions represent the most important concepts students need to master in transportation problems. When I teach this, I emphasize that understanding these questions is like having a roadmap of the entire topic. Abhronila from Jadavpur found that reviewing these questions before exams helped her identify weak areas and focus her study efforts. Susmita from Barrackpore uses these questions to train new logistics team members. Remember: mastery of transportation problems comes from understanding these fundamental concepts and their interconnections."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Short Questions on Transportation Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Short Questions on Transportation Problems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic9_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic9;