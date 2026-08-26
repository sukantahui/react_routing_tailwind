// Topic3.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
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
    { id: 'introduction', title: 'Introduction to Economic Interpretation' },
    { id: 'shadowprices', title: 'Shadow Prices and Their Meaning' },
    { id: 'interpretation', title: 'Detailed Economic Interpretation' },
    { id: 'examples', title: 'Real-World Economic Examples' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            Topic 3
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Economic Interpretation of Duality
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the economic meaning behind dual variables and their practical applications in decision-making
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Introduction to Economic Interpretation</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The economic interpretation of duality is one of the most powerful applications of linear programming. It transforms abstract mathematical concepts into tangible business insights that guide real-world decision-making.
                </p>

                <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <p className="font-medium text-amber-800 dark:text-amber-300">
                    💡 Key Insight: Dual variables are not just mathematical artifacts—they represent real economic values. They tell managers how much resources are worth and guide investment decisions.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Economic Interpretation Matters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Resource Valuation:</strong> Determine the true value of scarce resources</li>
                  <li><strong>Investment Decisions:</strong> Guide where to invest for maximum return</li>
                  <li><strong>Pricing Strategy:</strong> Set optimal prices based on resource costs</li>
                  <li><strong>Performance Evaluation:</strong> Assess the efficiency of resource utilization</li>
                  <li><strong>Strategic Planning:</strong> Make informed long-term decisions</li>
                </ul>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    🎯 Think About: When Mahima in Kolkata runs her manufacturing business, the dual variables tell her which machines are bottlenecks and how much she should invest in additional capacity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Shadow Prices Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Shadow Prices and Their Meaning</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">What is a Shadow Price?</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    A shadow price (also called a dual variable or Lagrange multiplier) represents the marginal value of a resource. It tells you how much the objective function would improve if you had one additional unit of that resource.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                    Shadow Price = ∂(Optimal Value) / ∂(Resource Availability)
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    For a maximization problem, the shadow price is the increase in profit per unit increase in resource availability.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Positive Shadow Price</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Indicates the resource is scarce and fully utilized. Each additional unit increases profit.
                    </p>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      yᵢ &gt; 0 → Resource is binding
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Zero Shadow Price</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      Indicates the resource is abundant and not fully utilized. Additional units don't improve profit.
                    </p>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      yᵢ = 0 → Resource is non-binding
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Practical Example:</strong> If the shadow price of labor is ₹500 per hour, then each additional hour of labor increases profit by ₹500. This tells you the maximum you should pay for overtime.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Economic Interpretation Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Detailed Economic Interpretation</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">1. Resource Valuation</h3>
                <p>
                  The dual variables provide the economic value of resources. In a production setting:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Labor:</strong> Shadow price shows the value of an additional hour of labor</li>
                  <li><strong>Raw Materials:</strong> Shadow price shows the value of an additional unit of material</li>
                  <li><strong>Machine Time:</strong> Shadow price shows the value of an additional hour of machine time</li>
                  <li><strong>Capital:</strong> Shadow price shows the return on additional investment</li>
                </ul>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    In a factory in Barrackpore, if the shadow price of steel is ₹200 per kg, then:
                  </p>
                  <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                    <li>Each additional kg of steel increases profit by ₹200</li>
                    <li>The company should be willing to pay up to ₹200 per kg for more steel</li>
                    <li>If steel costs ₹150 per kg on the market, buying more is profitable</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">2. Investment Decisions</h3>
                <p>
                  Shadow prices guide investment decisions by identifying the most valuable resources to acquire.
                </p>
                <div className="my-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Investment Priority = Shadow Price × Amount of Resource Needed
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    Invest in resources with the highest shadow prices first.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">3. Opportunity Cost</h3>
                <p>
                  The shadow price represents the opportunity cost of using a resource. It's what you give up by using the resource in one way instead of another.
                </p>
                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    💡 <strong>Key Insight:</strong> When Susmita in Jadavpur decides to use machine time for Product A instead of Product B, the shadow price tells her the value of the machine time she's using.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">4. Pricing Products</h3>
                <p>
                  The dual constraints in a production problem ensure that products are priced appropriately relative to their resource consumption.
                </p>
                <div className="my-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    For a product to be profitable: Price ≥ Cost of Resources Used
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    Cost of Resources = Sum of (Resource Consumption × Shadow Price)
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Real-World Economic Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 1: Manufacturing Plant</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> A factory in Ichapur produces two products using labor and machine time.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Maximize Profit</p>
                        <p className="text-sm font-mono mt-2">
                          Max Z = 40x₁ + 30x₂<br/>
                          s.t. 2x₁ + x₂ ≤ 100 (Labor)<br/>
                          x₁ + 2x₂ ≤ 80 (Machine)<br/>
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400">Dual - Shadow Prices</p>
                        <p className="text-sm font-mono mt-2">
                          Min W = 100y₁ + 80y₂<br/>
                          s.t. 2y₁ + y₂ ≥ 40<br/>
                          y₁ + 2y₂ ≥ 30<br/>
                          y₁, y₂ ≥ 0
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Economic Interpretation:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>Optimal solution: x₁ = 40, x₂ = 20, Z* = ₹2200</li>
                        <li>Shadow prices: y₁ = ₹10 (labor), y₂ = ₹10 (machine)</li>
                        <li>Each additional hour of labor increases profit by ₹10</li>
                        <li>Each additional machine hour increases profit by ₹10</li>
                        <li>Both resources are fully utilized (binding constraints)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 2: Investment Portfolio</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> An investor in Kolkata wants to maximize returns while managing risk.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Max Return</p>
                        <p className="text-sm font-mono mt-2">
                          Max Z = 0.12x₁ + 0.15x₂<br/>
                          s.t. 0.2x₁ + 0.3x₂ ≤ 0.25<br/>
                          x₁ + x₂ = 1<br/>
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400">Dual - Market Prices</p>
                        <p className="text-sm font-mono mt-2">
                          Min W = 0.25y₁ + 1y₂<br/>
                          s.t. 0.2y₁ + y₂ ≥ 0.12<br/>
                          0.3y₁ + y₂ ≥ 0.15<br/>
                          y₁ free, y₂ free
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Economic Interpretation:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>y₁ = market price of risk (how much risk is worth)</li>
                        <li>y₂ = value of return (how much returns are worth)</li>
                        <li>Helps determine if investments are fairly priced</li>
                        <li>Guides risk-return trade-off decisions</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 3: Transportation and Logistics</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> A logistics company in Jadavpur minimizes shipping costs.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Min Cost</p>
                        <p className="text-sm font-mono mt-2">
                          Min Z = 2x₁ + 3x₂<br/>
                          s.t. x₁ + x₂ ≥ 50 (Demand)<br/>
                          x₁ ≤ 30 (Supply 1)<br/>
                          x₂ ≤ 40 (Supply 2)<br/>
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400">Dual - Node Values</p>
                        <p className="text-sm font-mono mt-2">
                          Max W = 50y₁ - 30y₂ - 40y₃<br/>
                          s.t. y₁ - y₂ ≤ 2<br/>
                          y₁ - y₃ ≤ 3<br/>
                          y₁ free, y₂, y₃ ≥ 0
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Economic Interpretation:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>y₁ = value of demand satisfaction</li>
                        <li>y₂ = cost of supply at node 1</li>
                        <li>y₃ = cost of supply at node 2</li>
                        <li>Helps identify which supply nodes are most valuable</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 4: Staffing and Human Resources</h4>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Scenario:</strong> A hospital in Barrackpore optimizes staff scheduling.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400">Primal - Min Cost</p>
                        <p className="text-sm font-mono mt-2">
                          Min Z = 50y₁ + 60y₂<br/>
                          s.t. 2y₁ + y₂ ≥ 8 (Morning)<br/>
                          y₁ + 2y₂ ≥ 10 (Evening)<br/>
                          y₁, y₂ ≥ 0
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400">Dual - Staff Value</p>
                        <p className="text-sm font-mono mt-2">
                          Max W = 8x₁ + 10x₂<br/>
                          s.t. 2x₁ + x₂ ≤ 50<br/>
                          x₁ + 2x₂ ≤ 60<br/>
                          x₁, x₂ ≥ 0
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                      <p className="font-medium">📊 Economic Interpretation:</p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>x₁ = value of an additional morning shift staff</li>
                        <li>x₂ = value of an additional evening shift staff</li>
                        <li>Helps determine optimal staffing levels</li>
                        <li>Guides overtime decisions</li>
                      </ul>
                    </div>
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 1000 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="1000" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="500" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Economic Interpretation of Duality</text>
                  
                  {/* Resource Box */}
                  <rect x="80" y="80" width="300" height="180" rx="15" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="230" y="115" textAnchor="middle" className="text-lg font-bold fill-amber-600 dark:fill-amber-400">Resources</text>
                  
                  <text x="110" y="145" className="text-sm fill-gray-700 dark:fill-gray-300">Labor Hours</text>
                  <text x="110" y="170" className="text-sm fill-gray-700 dark:fill-gray-300">Raw Materials</text>
                  <text x="110" y="195" className="text-sm fill-gray-700 dark:fill-gray-300">Machine Time</text>
                  <text x="110" y="220" className="text-sm fill-gray-700 dark:fill-gray-300">Capital</text>
                  <text x="110" y="245" className="text-sm fill-gray-700 dark:fill-gray-300">Space</text>
                  
                  {/* Arrow from Resources to Shadow Prices */}
                  <path d="M 380 170 L 450 170" stroke="#F59E0B" strokeWidth="3" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" fill="freeze" />
                  </path>
                  <polygon points="450,165 460,170 450,175" fill="#F59E0B" />
                  <text x="420" y="155" textAnchor="middle" className="text-xs font-semibold fill-amber-600 dark:fill-amber-400">Valuation</text>
                  
                  {/* Shadow Prices Box */}
                  <rect x="460" y="80" width="300" height="180" rx="15" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="610" y="115" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Shadow Prices</text>
                  
                  <text x="490" y="145" className="text-sm fill-gray-700 dark:fill-gray-300">Labor: ₹10/hour</text>
                  <text x="490" y="170" className="text-sm fill-gray-700 dark:fill-gray-300">Materials: ₹15/kg</text>
                  <text x="490" y="195" className="text-sm fill-gray-700 dark:fill-gray-300">Machine: ₹20/hour</text>
                  <text x="490" y="220" className="text-sm fill-gray-700 dark:fill-gray-300">Capital: 12% ROI</text>
                  <text x="490" y="245" className="text-sm fill-gray-700 dark:fill-gray-300">Space: ₹5/sq ft</text>
                  
                  {/* Arrow from Shadow Prices to Decisions */}
                  <path d="M 760 170 L 830 170" stroke="#10B981" strokeWidth="3" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" fill="freeze" begin="1s" />
                  </path>
                  <polygon points="830,165 840,170 830,175" fill="#10B981" />
                  <text x="800" y="155" textAnchor="middle" className="text-xs font-semibold fill-green-600 dark:fill-green-400">Guides</text>
                  
                  {/* Decisions Box */}
                  <rect x="80" y="300" width="760" height="100" rx="15" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="460" y="335" textAnchor="middle" className="text-lg font-bold fill-purple-600 dark:fill-purple-400">Business Decisions</text>
                  
                  <text x="110" y="365" className="text-sm fill-gray-700 dark:fill-gray-300">Investment: Where to invest for maximum return</text>
                  <text x="110" y="385" className="text-sm fill-gray-700 dark:fill-gray-300">Pricing: How to price products based on resource costs</text>
                  
                  {/* Economic Principles Box */}
                  <rect x="80" y="440" width="760" height="250" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="460" y="475" textAnchor="middle" className="text-base font-bold fill-yellow-600 dark:fill-yellow-400">Key Economic Principles</text>
                  
                  <circle cx="120" cy="515" r="10" fill="#F59E0B" />
                  <text x="140" y="520" className="text-sm fill-gray-700 dark:fill-gray-300">Scarcity: Resources with high shadow prices are scarce</text>
                  
                  <circle cx="120" cy="545" r="10" fill="#F59E0B" />
                  <text x="140" y="550" className="text-sm fill-gray-700 dark:fill-gray-300">Opportunity Cost: Shadow price = cost of using resource elsewhere</text>
                  
                  <circle cx="120" cy="575" r="10" fill="#F59E0B" />
                  <text x="140" y="580" className="text-sm fill-gray-700 dark:fill-gray-300">Marginal Value: Value of one additional unit of resource</text>
                  
                  <circle cx="120" cy="605" r="10" fill="#F59E0B" />
                  <text x="140" y="610" className="text-sm fill-gray-700 dark:fill-gray-300">Bottleneck Identification: Positive shadow prices = bottlenecks</text>
                  
                  <circle cx="120" cy="635" r="10" fill="#F59E0B" />
                  <text x="140" y="640" className="text-sm fill-gray-700 dark:fill-gray-300">Investment Priority: Invest where shadow prices are highest</text>
                  
                  <circle cx="120" cy="665" r="10" fill="#F59E0B" />
                  <text x="140" y="670" className="text-sm fill-gray-700 dark:fill-gray-300">Pricing: Product price ≥ sum of shadow prices × resource usage</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This visualization shows how resources are valued through shadow prices, which then guide business decisions and economic principles.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Professional Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🎯 Shadow Price Analysis</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always analyze shadow prices at optimality. They reveal which resources are constraining your business and where to invest.
                  </p>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">💡 Opportunity Cost Thinking</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use shadow prices as opportunity costs. Every resource used has an alternative value that should be considered in decision-making.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">🔧 Investment Prioritization</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Rank investment opportunities by shadow prices. The highest shadow prices indicate the most valuable investments.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">⚡ Pricing Strategy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use shadow prices to set minimum prices. Products should be priced above the cost of resources used (shadow price × resource consumption).
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, shadow prices are used by managers to make real business decisions. When Debangshu in Barrackpore analyzed his factory's shadow prices, he discovered that labor was the bottleneck and invested in training, increasing profit by 15%.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Misinterpreting Shadow Prices</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow prices are marginal values, not total values. They apply to small changes in resource availability, not large-scale changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Range of Optimality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow prices are valid only within the range of optimality. Large changes in resource availability may change the basis and shadow prices.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Confusing Shadow Price with Market Price</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow prices are internal values based on the optimization, not market prices. They show what the resource is worth to your business, not what it costs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Applying Shadow Prices Incorrectly</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow prices apply only to the specific problem and solution. They cannot be generalized to other situations without re-solving the optimization.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students think that a zero shadow price means a resource has no value. It doesn't—it means the resource is abundant relative to current needs. The resource still has value, just not marginal value.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">📝 Systematic Resource Valuation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Calculate shadow prices for all resources</li>
                    <li>Identify resources with highest shadow prices</li>
                    <li>Consider range of optimality for each shadow price</li>
                    <li>Document all shadow prices for future reference</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🔍 Strategic Decision Making</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use shadow prices for investment decisions</li>
                    <li>Apply shadow prices to product pricing</li>
                    <li>Use shadow prices for resource allocation</li>
                    <li>Consider shadow prices in strategic planning</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">📚 Documentation and Analysis</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document shadow prices and their interpretation</li>
                    <li>Explain economic significance to stakeholders</li>
                    <li>Track shadow price changes over time</li>
                    <li>Use shadow prices for scenario analysis</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🎯 Performance Evaluation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use shadow prices to evaluate resource efficiency</li>
                    <li>Identify areas for improvement</li>
                    <li>Monitor resource utilization</li>
                    <li>Evaluate the impact of changes on shadow prices</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, shadow prices are regularly used for management decision-making. When Mahima from Jadavpur presents her optimization results to executives, she always includes the economic interpretation of shadow prices to justify recommendations.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Shadow Price Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that shadow prices represent the marginal value of resources</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Resource Valuation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can interpret shadow prices as the economic value of resources</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Investment Decisions</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can use shadow prices to guide investment decisions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Pricing Strategy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can use shadow prices to set minimum prices for products</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Opportunity Cost</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that shadow prices represent opportunity costs</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The economic interpretation of duality is what makes linear programming truly powerful in business. When I teach this to my students in Kolkata, I emphasize that shadow prices are more than just numbers—they're real economic values that guide decisions. Abhronila in Jadavpur found that understanding shadow prices transformed how she thought about business problems. She could see which resources were actually valuable and where to invest. Remember: The numbers are just tools; the economic interpretation is what makes them useful."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Economic Interpretation of Duality FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Economic Interpretation of Duality"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic3_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic3;