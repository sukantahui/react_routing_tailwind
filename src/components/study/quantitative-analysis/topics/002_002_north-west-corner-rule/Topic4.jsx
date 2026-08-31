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
    { id: 'introduction', title: 'Introduction to Transportation Cost Calculation' },
    { id: 'concept', title: 'Understanding Cost Calculation' },
    { id: 'formula', title: 'The Cost Formula' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30 rounded-full">
            Topic 4
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            Transportation Cost Calculation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learning how to calculate total transportation costs from allocations in the transportation table
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Introduction to Transportation Cost Calculation</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <p>
                  Transportation cost calculation is the process of computing the total cost of a shipping plan by multiplying each allocation by its unit cost and summing all the products. This calculation gives the total transportation cost, which serves as a baseline for optimization and comparison.
                </p>

                <div className="my-6 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border-l-4 border-rose-500">
                  <p className="font-medium text-rose-800 dark:text-rose-300">
                    💡 Key Insight: Cost calculation is like totaling a shopping bill—you multiply the quantity of each item by its price and sum everything up. In transportation, the "items" are shipments and the "prices" are per-unit costs.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Calculate Transportation Cost?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Baseline:</strong> Provides a starting cost for comparison</li>
                  <li><strong>Evaluation:</strong> Measures the quality of the current solution</li>
                  <li><strong>Progress:</strong> Tracks improvement during optimization</li>
                  <li><strong>Decision Making:</strong> Helps compare different shipping plans</li>
                  <li><strong>Budgeting:</strong> Provides cost estimates for planning</li>
                  <li><strong>Verification:</strong> Confirms calculations are correct</li>
                </ul>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata calculates shipping costs, she needs to know exactly how much her distribution plan will cost. This helps her decide if she needs to find a cheaper alternative.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Understanding Cost Calculation</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Basic Principle</h3>
                <p>
                  The total transportation cost is the sum of the costs of all individual shipments. For each shipment from source i to destination j, the cost is the quantity shipped multiplied by the unit transportation cost.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm text-center">
                    Cost of a single shipment = Quantity × Unit Cost<br/>
                    Total Cost = Sum of all individual shipment costs
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What Costs Are Included?</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Direct Transportation Costs:</strong> Freight charges, fuel costs, driver wages</li>
                  <li><strong>Handling Costs:</strong> Loading and unloading fees</li>
                  <li><strong>Distance-Based Costs:</strong> Costs that vary with distance traveled</li>
                  <li><strong>Modal Costs:</strong> Costs specific to the mode of transport used</li>
                  <li><strong>Dummy Costs:</strong> Always zero for dummy allocations</li>
                </ul>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Example</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>If x₁₂ = 50 units</li>
                      <li>And c₁₂ = ₹10/unit</li>
                      <li>Cost = 50 × ₹10 = ₹500</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Multiple Shipments</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Shipment 1: 50 × ₹10 = ₹500</li>
                      <li>Shipment 2: 30 × ₹15 = ₹450</li>
                      <li>Total Cost = ₹950</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> Only allocated cells contribute to the total cost. Cells without allocations (xᵢⱼ = 0) have zero cost contribution, regardless of their unit cost value.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Formula Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">The Cost Formula</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Transportation Cost Formula</h3>
                <p>
                  The total transportation cost is calculated using the following formula:
                </p>

                <div className="my-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-mono text-sm text-center font-bold">
                    Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Where cᵢⱼ is the unit cost and xᵢⱼ is the quantity shipped
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Step-by-Step Calculation</h3>
                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Identify All Allocated Cells:</strong> Find every cell with a positive allocation (xᵢⱼ &gt; 0)</li>
                    <li><strong>Multiply Each Allocation by Its Cost:</strong> For each cell, calculate xᵢⱼ × cᵢⱼ</li>
                    <li><strong>Sum All Products:</strong> Add all the individual costs together</li>
                    <li><strong>Verify:</strong> Check the total makes sense with your allocations</li>
                    <li><strong>Record:</strong> Document the total cost for future reference</li>
                  </ol>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Example Calculation</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium">Given Allocations:</p>
                  <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                    <li>x₁₁ = 40, c₁₁ = ₹5 → 40 × 5 = ₹200</li>
                    <li>x₁₂ = 10, c₁₂ = ₹3 → 10 × 3 = ₹30</li>
                    <li>x₂₂ = 40, c₂₂ = ₹6 → 40 × 6 = ₹240</li>
                    <li>x₃₃ = 30, c₃₃ = ₹4 → 30 × 4 = ₹120</li>
                  </ul>
                  <p className="font-medium mt-2">Total Cost = ₹200 + ₹30 + ₹240 + ₹120 = ₹590</p>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    💡 <strong>Try Changing This:</strong> What happens to the total cost if you change an allocation? This is how you evaluate different shipping plans—by calculating and comparing their total costs.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 1: Manufacturing Distribution Cost</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata ships products from 3 factories to 4 distribution centers.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Factory \ DC</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₁</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₂</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₃</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₄</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory A</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹5</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹3</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹7</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹8</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory B</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹6</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹2</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹5</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory C</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹8</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹5</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹6</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">20</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">10</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">120</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">NW Corner Allocations:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (A,DC₁): 40 units × ₹5 = ₹200</li>
                      <li>Cell (A,DC₂): 10 units × ₹3 = ₹30</li>
                      <li>Cell (B,DC₂): 40 units × ₹4 = ₹160</li>
                      <li>Cell (C,DC₃): 20 units × ₹4 = ₹80</li>
                      <li>Cell (C,DC₄): 10 units × ₹6 = ₹60</li>
                    </ul>
                    <p className="font-medium mt-2"><strong>Total Cost = ₹200 + ₹30 + ₹160 + ₹80 + ₹60 = ₹530</strong></p>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita calculates the total cost to evaluate if this shipping plan is cost-effective or needs improvement.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 2: Agricultural Distribution Cost</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative in Barrackpore distributes produce from 3 farms to 4 markets.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Least Cost Allocations:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Farm 1 → Market 3: 30 units × ₹8 = ₹240</li>
                      <li>Farm 1 → Market 1: 20 units × ₹10 = ₹200</li>
                      <li>Farm 2 → Market 2: 40 units × ₹9 = ₹360</li>
                      <li>Farm 3 → Market 4: 35 units × ₹11 = ₹385</li>
                      <li>Farm 3 → Market 1: 25 units × ₹12 = ₹300</li>
                    </ul>
                    <p className="font-medium mt-2"><strong>Total Cost = ₹240 + ₹200 + ₹360 + ₹385 + ₹300 = ₹1,485</strong></p>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila uses cost calculation to compare different distribution plans and choose the most economical one.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 3: Healthcare Supply Cost</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur distributes medical supplies with a dummy destination.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">VAM Allocations with Dummy:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Real shipments: 450 units × various costs = ₹6,750</li>
                      <li>Dummy allocations: 50 units × ₹0 = ₹0</li>
                      <li><strong>Total Cost = ₹6,750</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Dummy allocations have zero cost, so they don't affect the total cost but represent unused supply.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 4: Educational Resource Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes textbooks from 3 centers to 5 schools.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Cost Calculation:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>8 allocated cells with varying quantities and costs</li>
                      <li>Costs range from ₹20 to ₹45 per box</li>
                      <li>Total quantity: 3,000 books</li>
                      <li><strong>Total Cost = ₹94,500</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu calculates the cost to ensure the distribution fits within the school district's budget.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Transportation Cost Calculation Process</text>
                  
                  {/* Table with Allocations */}
                  <rect x="100" y="70" width="750" height="220" rx="10" fill="white" dark:fill="#1F2937" stroke="#EC4899" strokeWidth="2" />
                  
                  {/* Column Headers */}
                  <text x="200" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₁</text>
                  <text x="320" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₂</text>
                  <text x="440" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₃</text>
                  <text x="560" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₄</text>
                  <text x="700" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Supply</text>
                  
                  {/* Grid Lines */}
                  <line x1="160" y1="105" x2="160" y2="285" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="280" y1="105" x2="280" y2="285" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="400" y1="105" x2="400" y2="285" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="520" y1="105" x2="520" y2="285" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="640" y1="105" x2="640" y2="285" stroke="#EC4899" strokeWidth="1.5" />
                  
                  <line x1="100" y1="110" x2="850" y2="110" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="100" y1="155" x2="850" y2="155" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="100" y1="200" x2="850" y2="200" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="100" y1="245" x2="850" y2="245" stroke="#EC4899" strokeWidth="1.5" />
                  <line x1="100" y1="290" x2="850" y2="290" stroke="#EC4899" strokeWidth="1.5" />
                  
                  {/* Row Labels */}
                  <text x="130" y="140" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₁</text>
                  <text x="130" y="185" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₂</text>
                  <text x="130" y="230" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₃</text>
                  
                  {/* Allocated Cells */}
                  <rect x="160" y="110" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="220" y="135" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">40 × ₹5</text>
                  
                  <rect x="280" y="110" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="340" y="135" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">10 × ₹3</text>
                  
                  <rect x="280" y="155" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="340" y="180" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">40 × ₹4</text>
                  
                  <rect x="400" y="200" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="460" y="225" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">20 × ₹4</text>
                  
                  <rect x="520" y="200" width="120" height="45" rx="4" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                  <text x="580" y="225" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">10 × ₹6</text>
                  
                  {/* Calculation Box */}
                  <rect x="50" y="320" width="850" height="200" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="355" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Cost Calculation Steps</text>
                  
                  <rect x="80" y="375" width="250" height="125" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="400" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Step 1: Identify Allocations</text>
                  <text x="205" y="425" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">x₁₁ = 40, x₁₂ = 10</text>
                  <text x="205" y="445" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">x₂₂ = 40, x₃₃ = 20</text>
                  <text x="205" y="465" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">x₃₄ = 10</text>
                  
                  <rect x="350" y="375" width="250" height="125" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1.5" />
                  <text x="475" y="400" textAnchor="middle" className="text-sm font-bold fill-blue-600 dark:fill-blue-400">Step 2: Multiply Each</text>
                  <text x="475" y="425" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">40 × 5 = ₹200</text>
                  <text x="475" y="445" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">10 × 3 = ₹30</text>
                  <text x="475" y="465" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">40 × 4 = ₹160</text>
                  <text x="475" y="485" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">20 × 4 = ₹80, 10 × 6 = ₹60</text>
                  
                  <rect x="620" y="375" width="250" height="125" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1.5" />
                  <text x="745" y="400" textAnchor="middle" className="text-sm font-bold fill-purple-600 dark:fill-purple-400">Step 3: Sum All</text>
                  <text x="745" y="430" textAnchor="middle" className="text-xs font-bold fill-purple-600 dark:fill-purple-400">Total Cost = ₹530</text>
                  <text x="745" y="455" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">₹200 + ₹30 + ₹160</text>
                  <text x="745" y="475" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">+ ₹80 + ₹60 = ₹530</text>
                  
                  {/* Key Points Box */}
                  <rect x="50" y="550" width="850" height="180" rx="15" fill="#EC4899" fillOpacity="0.1" stroke="#EC4899" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="585" textAnchor="middle" className="text-base font-bold fill-pink-600 dark:fill-pink-400">Key Points About Cost Calculation</text>
                  
                  <circle cx="90" cy="615" r="8" fill="#10B981" />
                  <text x="110" y="620" className="text-sm fill-gray-700 dark:fill-gray-300">Only allocated cells contribute to total cost</text>
                  
                  <circle cx="90" cy="645" r="8" fill="#3B82F6" />
                  <text x="110" y="650" className="text-sm fill-gray-700 dark:fill-gray-300">Cost = Quantity × Unit Cost for each cell</text>
                  
                  <circle cx="520" cy="615" r="8" fill="#8B5CF6" />
                  <text x="540" y="620" className="text-sm fill-gray-700 dark:fill-gray-300">Dummy allocations have zero cost</text>
                  
                  <circle cx="520" cy="645" r="8" fill="#F59E0B" />
                  <text x="540" y="650" className="text-sm fill-gray-700 dark:fill-gray-300">Total cost provides baseline for optimization</text>
                  
                  <circle cx="520" cy="675" r="8" fill="#EC4899" />
                  <text x="540" y="680" className="text-sm fill-gray-700 dark:fill-gray-300">Cost calculation is essential for decision making</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the step-by-step process of calculating total transportation cost from the allocation table.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🎯 Systematic Calculation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Go through the table systematically row by row to ensure you don't miss any allocated cells.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">💡 Use a Spreadsheet</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    For large problems, use spreadsheet software with formulas to automatically calculate total cost.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Check Your Work</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    After calculating, verify that your total cost is consistent with the allocation quantities and costs.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">⚡ Cost Visualization</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Color-code high-cost cells to quickly identify where most of the cost is coming from.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> Mahima from Kolkata uses a simple rule: "Multiply, then sum." She never skips a row and always double-checks her arithmetic. A single miscalculation can lead to wrong decisions.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Missing Allocated Cells</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting to include some allocated cells in the cost calculation. This leads to an understated total cost.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Multiplication</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Multiplying the wrong cost with an allocation. Always match the cost with its corresponding cell.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Including Dummy Costs</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Including dummy allocations in the cost calculation. Dummy costs are always zero.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Arithmetic Errors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Making simple addition or multiplication mistakes. Always double-check your calculations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is rushing through the calculation and missing cells or making arithmetic errors. Take your time and systematically work through each allocation.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">📝 Systematic Approach</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Go row by row through the table</li>
                    <li>Check each cell for allocations</li>
                    <li>Multiply each allocation by its cost</li>
                    <li>Keep a running total</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🔍 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Sum row costs and verify</li>
                    <li>Sum column costs and verify</li>
                    <li>Check total against expectations</li>
                    <li>Re-calculate if unsure</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Show all individual costs</li>
                    <li>Document the total cost</li>
                    <li>Note any assumptions</li>
                    <li>Keep records for comparison</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🎯 Cost Analysis</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Identify high-cost allocations</li>
                    <li>Compare with alternatives</li>
                    <li>Track cost improvement</li>
                    <li>Use for decision making</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, cost calculation is often automated, but managers still need to understand the numbers. Susmita from Barrackpore always reviews the cost calculation to ensure it matches her business expectations.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Formula Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the transportation cost formula</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Calculation Steps</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know the step-by-step process for calculating cost</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Error Prevention</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know common mistakes and how to avoid them</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Cost Interpretation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can interpret what the total cost means for decision making</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dummy Cost Handling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know that dummy allocations have zero cost</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Cost calculation is where the math meets the money. When I teach this to my students in Kolkata, I emphasize that this is the number that matters most to business decision-makers. Abhronila from Jadavpur learned that a small error in cost calculation could lead to a large difference in perceived profitability. Susmita from Barrackpore always triple-checks her cost calculations before presenting them to her management. Remember: The transportation cost is not just a number—it's the basis for business decisions. Calculate it carefully, and you'll earn the trust of those who make the decisions."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Transportation Cost Calculation FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Transportation Cost Calculation"
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