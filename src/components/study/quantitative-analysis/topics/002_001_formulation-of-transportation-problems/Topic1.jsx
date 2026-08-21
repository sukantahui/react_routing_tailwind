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
    { id: 'introduction', title: 'Introduction to Transportation Models' },
    { id: 'structure', title: 'Model Structure and Components' },
    { id: 'types', title: 'Types of Transportation Models' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            Topic 1
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Transportation Model
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the structure, components, and types of transportation models in operations research
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Introduction to Transportation Models</h2>
              
              <div className="prose prose-emerald dark:prose-invert max-w-none leading-relaxed">
                <p>
                  A transportation model is a mathematical representation of a transportation problem that helps organizations optimize the movement of goods from supply points to demand points. It is a fundamental tool in operations research and supply chain management.
                </p>

                <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                  <p className="font-medium text-emerald-800 dark:text-emerald-300">
                    💡 Key Insight: The transportation model provides a systematic framework for making optimal shipping decisions, balancing cost minimization with supply and demand constraints.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is a Transportation Model?</h3>
                <p>
                  A transportation model is a specific type of linear programming model designed to solve distribution problems. It assumes that goods are homogeneous and can be shipped directly from sources to destinations, with the goal of minimizing total transportation cost while meeting all supply and demand requirements.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Objective</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Minimize total transportation cost</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Supply and demand limitations</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Variables</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Quantities shipped between points</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Susmita in Kolkata designs a distribution network for her business, she uses a transportation model to determine the most cost-effective way to ship products from her warehouses to retail stores.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Structure Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Model Structure and Components</h2>
              
              <div className="prose prose-emerald dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Transportation Table</h3>
                <p>
                  The transportation model is typically represented using a transportation table (or matrix) that organizes all the data needed for solving the problem.
                </p>

                <div className="my-6 overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Sources ↓ / Destinations →</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₁</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₂</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₃</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">S₁</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">S₂</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">S₃</td>
                      </tr>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Components of the Model</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Supply Vector:</strong> S = [S₁, S₂, ..., Sₘ]ᵀ (capacities of sources)</li>
                  <li><strong>Demand Vector:</strong> D = [D₁, D₂, ..., Dₙ]ᵀ (requirements of destinations)</li>
                  <li><strong>Cost Matrix:</strong> C = [cᵢⱼ] (per-unit shipping costs)</li>
                  <li><strong>Decision Matrix:</strong> X = [xᵢⱼ] (shipping quantities)</li>
                </ul>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Observe Carefully:</strong> The transportation model has a unique structure where all coefficients in the constraints are either 0 or 1, making it a special type of linear programming problem that can be solved efficiently.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Types Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Types of Transportation Models</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">1. Balanced Transportation Model</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li>Total supply equals total demand</li>
                      <li>Σᵢ Sᵢ = Σⱼ Dⱼ</li>
                      <li>Can be solved directly</li>
                      <li>Most common in textbook problems</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">2. Unbalanced Transportation Model</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li>Total supply ≠ total demand</li>
                      <li>Σᵢ Sᵢ ≠ Σⱼ Dⱼ</li>
                      <li>Requires dummy sources/destinations</li>
                      <li>More realistic for business problems</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">3. Simple Transportation Model</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li>Single product type</li>
                      <li>Direct shipping only</li>
                      <li>Linear costs</li>
                      <li>Basic version of the model</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">4. Extended Transportation Model</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li>Multiple products</li>
                      <li>Transshipment allowed</li>
                      <li>Capacity constraints</li>
                      <li>More complex and realistic</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you add transshipment points to a basic transportation model? How does the solution change? This is the progression to more advanced network models.
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 1: FMCG Distribution Model</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A fast-moving consumer goods (FMCG) company in Kolkata has three warehouses and five retail zones.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Transportation Model Setup:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>Sources:</strong> 3 warehouses with monthly supplies of 1000, 800, and 1200 units</li>
                      <li><strong>Destinations:</strong> 5 retail zones with monthly demands of 400, 600, 500, 700, and 800 units</li>
                      <li><strong>Costs:</strong> Shipping costs vary by distance and mode</li>
                      <li><strong>Objective:</strong> Minimize monthly distribution cost</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Mahima uses this model to optimize weekly distribution, achieving 20% cost reduction in logistics.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 2: Agricultural Supply Chain Model</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative society in Barrackpore collects produce from farmers and distributes to markets.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Transportation Model Setup:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>Sources:</strong> 4 collection centers with seasonal supplies</li>
                      <li><strong>Destinations:</strong> 6 wholesale markets with daily demands</li>
                      <li><strong>Costs:</strong> Transportation costs based on distance and perishability</li>
                      <li><strong>Objective:</strong> Minimize total distribution cost while ensuring freshness</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila uses this model to plan daily collection and distribution, reducing waste by 25%.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 3: Healthcare Supply Chain Model</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur distributes medical supplies from central warehouses to hospitals.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Transportation Model Setup:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>Sources:</strong> 2 central warehouses with medical supplies</li>
                      <li><strong>Destinations:</strong> 7 hospitals with specific requirements</li>
                      <li><strong>Costs:</strong> Costs include transportation, handling, and storage</li>
                      <li><strong>Objective:</strong> Minimize total supply chain cost</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita uses this model to ensure timely delivery of medical supplies while optimizing costs.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 4: Educational Resources Distribution Model</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes educational materials to schools.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Transportation Model Setup:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>Sources:</strong> 3 distribution centers with supplies of books and materials</li>
                      <li><strong>Destinations:</strong> 8 schools with different requirements</li>
                      <li><strong>Costs:</strong> Transportation and handling costs per shipment</li>
                      <li><strong>Objective:</strong> Minimize total distribution cost</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu uses this model to ensure all schools receive their materials on time while minimizing costs.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 700" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="700" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Transportation Model Structure</text>
                  
                  {/* Model Components Box */}
                  <rect x="50" y="70" width="850" height="90" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="100" textAnchor="middle" className="text-base font-bold fill-emerald-600 dark:fill-emerald-400">Transportation Model Components</text>
                  <text x="100" y="130" className="text-sm fill-gray-700 dark:fill-gray-300">Sources (Supply Points)</text>
                  <text x="350" y="130" className="text-sm fill-gray-700 dark:fill-gray-300">Destinations (Demand Points)</text>
                  <text x="600" y="130" className="text-sm fill-gray-700 dark:fill-gray-300">Cost Matrix</text>
                  <text x="780" y="130" className="text-sm fill-gray-700 dark:fill-gray-300">Decision Variables</text>
                  
                  {/* Model Structure Flow */}
                  <path d="M 475 160 L 475 190" stroke="#10B981" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 30;30 0" dur="2s" repeatCount="indefinite" />
                  </path>
                  
                  {/* Input Box */}
                  <rect x="50" y="190" width="850" height="100" rx="15" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="475" y="220" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Input Parameters</text>
                  <text x="100" y="250" className="text-sm fill-gray-700 dark:fill-gray-300">Supply: S₁, S₂, ..., Sₘ</text>
                  <text x="350" y="250" className="text-sm fill-gray-700 dark:fill-gray-300">Demand: D₁, D₂, ..., Dₙ</text>
                  <text x="600" y="250" className="text-sm fill-gray-700 dark:fill-gray-300">Cost: c₁₁, c₁₂, ..., cₘₙ</text>
                  <text x="780" y="250" className="text-sm fill-gray-700 dark:fill-gray-300">Balance Check</text>
                  
                  {/* Model Processing */}
                  <path d="M 475 290 L 475 320" stroke="#10B981" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 30;30 0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </path>
                  
                  <rect x="150" y="320" width="650" height="80" rx="15" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="350" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Optimization Algorithm</text>
                  <text x="475" y="375" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Transportation Simplex / MODI Method / Stepping Stone Method</text>
                  
                  {/* Output */}
                  <path d="M 475 400 L 475 430" stroke="#10B981" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 30;30 0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                  </path>
                  
                  <rect x="150" y="430" width="650" height="100" rx="15" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1.5s" />
                  </rect>
                  <text x="475" y="460" textAnchor="middle" className="text-base font-bold fill-pink-600 dark:fill-pink-400">Output / Solution</text>
                  <text x="200" y="490" className="text-sm fill-gray-700 dark:fill-gray-300">Optimal Shipping Plan: x₁₁, x₁₂, ..., xₘₙ</text>
                  <text x="200" y="515" className="text-sm fill-gray-700 dark:fill-gray-300">Minimum Total Cost: Z* = ΣᵢΣⱼ cᵢⱼ × xᵢⱼ</text>
                  
                  {/* Model Characteristics */}
                  <rect x="50" y="560" width="850" height="120" rx="15" fill="#06B6D4" fillOpacity="0.1" stroke="#06B6D4" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="590" textAnchor="middle" className="text-base font-bold fill-cyan-600 dark:fill-cyan-400">Model Characteristics</text>
                  
                  <circle cx="100" cy="620" r="8" fill="#06B6D4" />
                  <text x="120" y="625" className="text-sm fill-gray-700 dark:fill-gray-300">Linear Programming</text>
                  
                  <circle cx="300" cy="620" r="8" fill="#06B6D4" />
                  <text x="320" y="625" className="text-sm fill-gray-700 dark:fill-gray-300">Network Structure</text>
                  
                  <circle cx="500" cy="620" r="8" fill="#06B6D4" />
                  <text x="520" y="625" className="text-sm fill-gray-700 dark:fill-gray-300">Integrality Property</text>
                  
                  <circle cx="700" cy="620" r="8" fill="#06B6D4" />
                  <text x="720" y="625" className="text-sm fill-gray-700 dark:fill-gray-300">Efficient Algorithms</text>
                  
                  <circle cx="100" cy="650" r="8" fill="#06B6D4" />
                  <text x="120" y="655" className="text-sm fill-gray-700 dark:fill-gray-300">Balanced/Unbalanced</text>
                  
                  <circle cx="320" cy="650" r="8" fill="#06B6D4" />
                  <text x="340" y="655" className="text-sm fill-gray-700 dark:fill-gray-300">All Coefficients 0 or 1</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram illustrates the structure of a transportation model, showing the flow from input parameters through optimization to the optimal solution.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🎯 Model Identification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Look for problems with multiple origins and destinations where the goal is to minimize shipping costs while meeting supply and demand constraints.
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">💡 Data Organization</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always organize data in a table format with sources as rows and destinations as columns. This makes the model easier to understand and solve.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Balance Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always check if the problem is balanced before applying solution methods. If unbalanced, add dummy sources or destinations with zero costs.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Software Selection</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    For large-scale problems, use specialized transportation software or LP solvers that can handle thousands of variables efficiently.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, transportation models are often integrated with other supply chain models like inventory management and production planning for comprehensive optimization.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Model Selection</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Using transportation models for problems that involve routing or scheduling. Transportation models are for distribution, not route optimization.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Balance Condition</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Applying solution methods without first checking if the problem is balanced. This leads to incorrect results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Cost Matrix</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Using costs that don't reflect reality or organizing them incorrectly in the transportation table.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Overlooking Capacity Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting that routes may have capacity limits beyond just supply and demand constraints.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students assume that all transportation problems are balanced. Always verify total supply equals total demand before solving. If not, you need to handle the imbalance properly.
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">📝 Model Development</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Clearly define all sources and destinations</li>
                    <li>Gather accurate cost data</li>
                    <li>Verify all supply and demand values</li>
                    <li>Check for balance condition</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🔍 Validation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Test model with small examples</li>
                    <li>Validate results against expectations</li>
                    <li>Perform sensitivity analysis</li>
                    <li>Check feasibility of solution</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document all assumptions</li>
                    <li>Record data sources</li>
                    <li>Explain model structure</li>
                    <li>Justify solution methods</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🎯 Implementation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Consider practical constraints</li>
                    <li>Plan for model maintenance</li>
                    <li>Regularly update cost data</li>
                    <li>Monitor solution effectiveness</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, transportation models are routinely used for logistics planning. Best practice involves integrating the model with other systems like inventory management and production scheduling for comprehensive supply chain optimization.
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Model Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what a transportation model is and its purpose</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Components Identification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify all components of a transportation model</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Check</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to check if a transportation model is balanced</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Model Types</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the different types of transportation models</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply transportation models to real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The transportation model is the foundation of network optimization. When I teach this to my students in Kolkata, I emphasize that understanding the model structure is key to solving real logistics problems. Mahima from Barrackpore found that mastering the transportation model helped her optimize her family business's distribution network, reducing costs by 30%. Remember: A well-structured transportation model is half the solution—the other half is having accurate data and understanding the business context."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Transportation Model FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Transportation Model"
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