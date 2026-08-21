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
    { id: 'introduction', title: 'Introduction to Dual Formation' },
    { id: 'steps', title: 'Step-by-Step Formation Process' },
    { id: 'examples', title: 'Practical Examples' },
    { id: 'visualization', title: 'Visual Learning' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 rounded-full">
            Topic 1
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
            Formation of the Dual Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn how to systematically construct the dual problem from any given primal problem
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Understanding Dual Formation</h2>
              
              <div className="prose prose-green dark:prose-invert max-w-none leading-relaxed">
                <p>
                  Forming the dual problem is a systematic process that transforms any linear programming problem into its companion dual. This transformation is not just a mathematical exercise—it reveals the hidden structure of the problem and provides valuable economic insights.
                </p>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 Key Insight: The dual formation process is like looking at a problem through a different lens. Every constraint in the primal becomes a variable in the dual, and every variable becomes a constraint.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Form the Dual?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Computational Efficiency:</strong> Sometimes the dual has fewer constraints and is easier to solve</li>
                  <li><strong>Sensitivity Analysis:</strong> Dual variables reveal the marginal value of resources</li>
                  <li><strong>Theoretical Insights:</strong> Understanding duality deepens comprehension of optimization</li>
                  <li><strong>Economic Interpretation:</strong> Dual problems often have meaningful economic interpretations</li>
                </ul>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    🎯 Think About: When Debangshu in Kolkata solved a large production planning problem, he found that the dual had only 5 constraints compared to the primal's 50 variables. This made the dual much easier to solve and interpret.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Steps Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Step-by-Step Formation Process</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold">1</span>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Identify Primal Problem Type</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          Determine if the primal is a maximization or minimization problem. This determines the direction of the dual objective.
                        </p>
                        <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                          Max Z → Min W (Dual objective is opposite)
                          Min Z → Max W (Dual objective is opposite)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold">2</span>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Set Up Dual Variables</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          Create one dual variable for each constraint in the primal. The variables represent shadow prices.
                        </p>
                        <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                          Each constraint → One dual variable
                          Example: m constraints → y₁, y₂, ..., yₘ
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold">3</span>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Form Dual Objective Function</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          Multiply each dual variable by the RHS of its corresponding primal constraint and sum them.
                        </p>
                        <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                          W = b₁y₁ + b₂y₂ + ... + bₘyₘ
                          (where bᵢ are RHS values from primal constraints)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold">4</span>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Create Dual Constraints</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          For each primal variable, create a dual constraint using the coefficients from primal constraints.
                        </p>
                        <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                          Each variable → One constraint
                          Example: Aᵀy ≥ c (for max primal) or Aᵀy ≤ c (for min primal)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold">5</span>
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Determine Variable Signs</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          Based on constraint types in the primal, determine if dual variables are restricted or unrestricted.
                        </p>
                        <div className="mt-2 p-3 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                          ≤ constraints → y ≥ 0
                          ≥ constraints → y ≤ 0
                          = constraints → y free (unrestricted)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> The number of dual variables always equals the number of primal constraints, and the number of dual constraints equals the number of primal variables. This symmetry helps verify your work.
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Practical Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Example 1: Standard Maximization Problem</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal Problem</p>
                      <p className="text-sm font-mono mt-2">
                        Max Z = 3x₁ + 5x₂<br />
                        Subject to:<br />
                        x₁ ≤ 4<br />
                        2x₂ ≤ 12<br />
                        3x₁ + 2x₂ ≤ 18<br />
                        x₁, x₂ ≥ 0
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">2 variables, 3 constraints</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-purple-600 dark:text-purple-400">Dual Problem</p>
                      <p className="text-sm font-mono mt-2">
                        Min W = 4y₁ + 12y₂ + 18y₃<br />
                        Subject to:<br />
                        y₁ + 3y₃ ≥ 3<br />
                        2y₂ + 2y₃ ≥ 5<br />
                        y₁, y₂, y₃ ≥ 0
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">3 variables, 2 constraints</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">🔍 Observation: The dual has 3 variables (one for each primal constraint) and 2 constraints (one for each primal variable).</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Example 2: Standard Minimization Problem</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal Problem</p>
                      <p className="text-sm font-mono mt-2">
                        Min Z = 4x₁ + 3x₂<br />
                        Subject to:<br />
                        x₁ + x₂ ≥ 6<br />
                        2x₁ + x₂ ≥ 8<br />
                        x₁, x₂ ≥ 0
                      </p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-purple-600 dark:text-purple-400">Dual Problem</p>
                      <p className="text-sm font-mono mt-2">
                        Max W = 6y₁ + 8y₂<br />
                        Subject to:<br />
                        y₁ + 2y₂ ≤ 4<br />
                        y₁ + y₂ ≤ 3<br />
                        y₁, y₂ ≥ 0
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">🔍 Observation: For min problems, the dual takes max direction with opposite inequality signs.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Example 3: Problem with Mixed Constraints</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Primal Problem</p>
                      <p className="text-sm font-mono mt-2">
                        Max Z = 2x₁ + x₂<br />
                        Subject to:<br />
                        x₁ + x₂ ≤ 10 (≤ constraint)<br />
                        x₁ + 2x₂ ≥ 4 (≥ constraint)<br />
                        x₁ + 2x₂ = 8 (= constraint)<br />
                        x₁, x₂ ≥ 0
                      </p>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                      <p className="font-medium text-purple-600 dark:text-purple-400">Dual Problem</p>
                      <p className="text-sm font-mono mt-2">
                        Min W = 10y₁ + 4y₂ + 8y₃<br />
                        Subject to:<br />
                        y₁ + y₂ + y₃ ≥ 2<br />
                        y₁ + 2y₂ + 2y₃ ≥ 1<br />
                        y₁ ≥ 0, y₂ ≤ 0, y₃ free
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Note the different sign restrictions!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Example 4: Production Planning (Real-World)</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> Susmita in Barrackpore runs a bakery producing cakes and pastries.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Maximize Profit</p>
                        <p className="text-sm font-mono mt-2">
                          Max Z = 50x₁ + 40x₂<br />
                          Subject to:<br />
                          2x₁ + x₂ ≤ 100 (flour)<br />
                          x₁ + 2x₂ ≤ 80 (sugar)<br />
                          x₁ + x₂ ≤ 60 (labor)<br />
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-purple-600 dark:text-purple-400">Dual - Resource Values</p>
                        <p className="text-sm font-mono mt-2">
                          Min W = 100y₁ + 80y₂ + 60y₃<br />
                          Subject to:<br />
                          2y₁ + y₂ + y₃ ≥ 50<br />
                          y₁ + 2y₂ + y₃ ≥ 40<br />
                          y₁, y₂, y₃ ≥ 0
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm">
                      <p className="font-medium">💡 Economic Interpretation: y₁, y₂, y₃ are shadow prices for flour, sugar, and labor respectively.</p>
                    </div>
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Visual Learning</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="900" height="600" fill="transparent" />
                  
                  {/* Title */}
                  <text x="450" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Dual Formation Process Flow</text>
                  
                  {/* Step 1: Identify Primal Type */}
                  <rect x="50" y="70" width="180" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="140" y="100" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Step 1</text>
                  <text x="140" y="120" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Identify Primal</text>
                  <text x="140" y="140" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Max/Min?</text>
                  
                  {/* Arrow */}
                  <line x1="230" y1="110" x2="290" y2="110" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                  </line>
                  <polygon points="290,105 300,110 290,115" fill="#10B981" />
                  
                  {/* Step 2: Dual Variables */}
                  <rect x="300" y="70" width="180" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="390" y="100" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Step 2</text>
                  <text x="390" y="120" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Create Dual Variables</text>
                  <text x="390" y="140" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">y₁, y₂, ..., yₘ</text>
                  
                  {/* Arrow */}
                  <line x1="480" y1="110" x2="540" y2="110" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" begin="0.5s" />
                  </line>
                  <polygon points="540,105 550,110 540,115" fill="#10B981" />
                  
                  {/* Step 3: Dual Objective */}
                  <rect x="550" y="70" width="180" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="640" y="100" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Step 3</text>
                  <text x="640" y="120" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Dual Objective</text>
                  <text x="640" y="140" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">W = b₁y₁ + ...</text>
                  
                  {/* Arrow down */}
                  <line x1="740" y1="110" x2="800" y2="110" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" begin="1s" />
                  </line>
                  <polygon points="800,105 810,110 800,115" fill="#10B981" />
                  
                  {/* Result Box */}
                  <rect x="50" y="200" width="760" height="120" rx="15" fill="#F3F4F6" dark:fill="#1F2937" fillOpacity="0.8" stroke="#10B981" strokeWidth="2" strokeDasharray="8,4">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="430" y="235" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">COMPLETE DUAL FORMATION</text>
                  
                  <text x="100" y="265" className="text-sm fill-gray-700 dark:fill-gray-300">Primal: Max Z = c₁x₁ + c₂x₂ + ... + cₙxₙ</text>
                  <text x="100" y="285" className="text-sm fill-gray-700 dark:fill-gray-300">Subject to: A₁₁x₁ + A₁₂x₂ + ... + A₁ₙxₙ ≤ b₁</text>
                  <text x="100" y="305" className="text-sm fill-gray-700 dark:fill-gray-300">Subject to: A₂₁x₁ + A₂₂x₂ + ... + A₂ₙxₙ ≤ b₂</text>
                  
                  <text x="100" y="340" className="text-sm fill-gray-700 dark:fill-gray-300">Dual: Min W = b₁y₁ + b₂y₂ + ... + bₘyₘ</text>
                  <text x="100" y="360" className="text-sm fill-gray-700 dark:fill-gray-300">Subject to: A₁₁y₁ + A₂₁y₂ + ... + Aₘ₁yₘ ≥ c₁</text>
                  <text x="100" y="380" className="text-sm fill-gray-700 dark:fill-gray-300">Subject to: A₁₂y₁ + A₂₂y₂ + ... + Aₘ₂yₘ ≥ c₂</text>
                  
                  {/* Arrow from primal to dual */}
                  <path d="M 430 310 L 430 340" stroke="#8B5CF6" strokeWidth="3" fill="none">
                    <animate attributeName="stroke-dashoffset" values="0;30" dur="2s" repeatCount="indefinite" />
                  </path>
                  <polygon points="425,335 430,345 435,335" fill="#8B5CF6" />
                  
                  <text x="445" y="330" className="text-xs font-medium fill-purple-600 dark:fill-purple-400">Transformation</text>
                  
                  {/* Key Rules Box */}
                  <rect x="50" y="420" width="760" height="150" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" />
                  <text x="430" y="450" textAnchor="middle" className="text-base font-bold fill-yellow-600 dark:fill-yellow-400">Key Rules to Remember</text>
                  
                  <circle cx="90" cy="480" r="12" fill="#10B981" />
                  <text x="110" y="485" className="text-sm fill-gray-700 dark:fill-gray-300">Each primal constraint → One dual variable</text>
                  
                  <circle cx="90" cy="505" r="12" fill="#10B981" />
                  <text x="110" y="510" className="text-sm fill-gray-700 dark:fill-gray-300">Each primal variable → One dual constraint</text>
                  
                  <circle cx="90" cy="530" r="12" fill="#10B981" />
                  <text x="110" y="535" className="text-sm fill-gray-700 dark:fill-gray-300">Max → Min, Min → Max (Opposite direction)</text>
                  
                  <circle cx="520" cy="480" r="12" fill="#10B981" />
                  <text x="540" y="485" className="text-sm fill-gray-700 dark:fill-gray-300">≤ constraints → y ≥ 0</text>
                  
                  <circle cx="520" cy="505" r="12" fill="#10B981" />
                  <text x="540" y="510" className="text-sm fill-gray-700 dark:fill-gray-300">≥ constraints → y ≤ 0</text>
                  
                  <circle cx="520" cy="530" r="12" fill="#10B981" />
                  <text x="540" y="535" className="text-sm fill-gray-700 dark:fill-gray-300">= constraints → y free (unrestricted)</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This flowchart illustrates the systematic process of forming the dual problem from any given primal problem.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Professional Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🎯 Quick Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    After forming the dual, count variables and constraints. They should be swapped: if primal has m constraints and n variables, dual should have n constraints and m variables.
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">💡 Memory Aid</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Remember: "Primal constraints become dual variables, primal variables become dual constraints."
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Sign Convention</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    For maximization: Primal constraints with ≤ give y ≥ 0. For minimization: Primal constraints with ≥ give y ≥ 0.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">⚡ Efficiency Hack</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    If the primal has many constraints but few variables, the dual will have many variables but few constraints - often easier to solve.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> When forming the dual, always write the primal in standard form first. This reduces errors and makes the transformation mechanical. Mahima from Jadavpur found this approach helped her avoid common mistakes.
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
                      Forgetting to reverse the optimization direction. Max primal always gives Min dual, and vice versa.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Mismatched Variable Counts</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Creating the wrong number of dual variables or constraints. Always verify: dual variables = primal constraints, dual constraints = primal variables.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Mixed Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not handling = constraints properly. They produce unrestricted (free) dual variables.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students forget to convert ≥ constraints in the primal to the correct form. For maximization with ≥ constraints, you need to convert to ≤ first or use the general duality rules.
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">📝 Systematic Approach</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Always write primal in standard form first</li>
                    <li>Count variables and constraints</li>
                    <li>Create a table mapping primal to dual</li>
                    <li>Double-check all transformations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🔍 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Check dimension consistency</li>
                    <li>Verify sign restrictions match</li>
                    <li>Test with a simple solution</li>
                    <li>Validate using duality properties</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Clearly label primal and dual variables</li>
                    <li>Show the transformation steps</li>
                    <li>Explain economic interpretation</li>
                    <li>Document any assumptions</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🎯 Learning Tips</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Practice with simple examples first</li>
                    <li>Use the matrix form for verification</li>
                    <li>Understand the economic meaning</li>
                    <li>Connect to real-world applications</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, dual formation is often automated in optimization software, but understanding the manual process is crucial for debugging and interpreting results. Always validate dual formulations with small test cases.
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
              <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Primal Type Identified</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I have identified if the primal is a maximization or minimization problem</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dual Variables Created</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I have created one dual variable for each primal constraint</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dual Objective Formed</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I have formed the dual objective using RHS values and reversed direction</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dual Constraints Created</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I have created one dual constraint for each primal variable</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Sign Restrictions Verified</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I have correctly determined the sign restrictions for dual variables</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Forming the dual problem is like learning a new language—it takes practice to become fluent. When I teach this to my students in Ichapur, I emphasize the pattern recognition. Abhronila discovered that writing the primal in matrix form (A, b, c) made the dual formation mechanical and error-free. Remember: the dual isn't just a mathematical transformation—it's a different way of understanding the same problem. Practice with examples where you can verify the solution using both formulations."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Formation of the Dual Problem FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Formation of the Dual Problem"
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