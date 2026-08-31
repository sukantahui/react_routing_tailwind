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
    { id: 'introduction', title: 'Introduction to Transportation Cost Matrix' },
    { id: 'structure', title: 'Structure of the Cost Matrix' },
    { id: 'interpretation', title: 'Interpreting Transportation Costs' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            Topic 4
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Transportation Cost Matrix
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the structure, interpretation, and importance of transportation cost matrices in optimization
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Introduction to Transportation Cost Matrix</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The transportation cost matrix is the heart of any transportation problem. It contains the unit transportation costs between each source-destination pair, and is the primary input that determines the optimal shipping plan. Understanding how to construct, interpret, and use the cost matrix is essential for solving transportation problems effectively.
                </p>

                <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-medium text-indigo-800 dark:text-indigo-300">
                    💡 Key Insight: The cost matrix is the bridge between sources and destinations. It quantifies the economic trade-offs in shipping decisions and guides the optimization process.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is a Transportation Cost Matrix?</h3>
                <p>
                  A transportation cost matrix is a rectangular array that organizes the unit transportation costs from each source to each destination. The matrix has m rows (sources) and n columns (destinations), where entry cᵢⱼ represents the cost of shipping one unit from source i to destination j.
                </p>

                <div className="my-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Sources → Destinations ↓</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₁</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₂</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₃</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₄</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹10</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹9</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹9</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹7</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹12</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹6</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹11</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹7</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">₹10</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Example Cost Matrix: 3 sources × 4 destinations</p>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Susmita in Kolkata plans her distribution, the cost matrix tells her exactly how much it costs to ship from each warehouse to each store. This information is crucial for making optimal shipping decisions.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Structure of the Cost Matrix</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Matrix Dimensions</h3>
                <p>
                  The cost matrix has dimensions m × n, where m is the number of sources and n is the number of destinations. Each cell (i, j) contains the cost cᵢⱼ.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    C = [cᵢⱼ]ₘₓₙ<br/>
                    where i = 1, 2, ..., m (sources)<br/>
                    and j = 1, 2, ..., n (destinations)
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Properties of the Cost Matrix</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Non-Negative:</strong> All costs cᵢⱼ ≥ 0 (shipping costs are never negative)</li>
                  <li><strong>Real Values:</strong> Costs can be integers or decimals</li>
                  <li><strong>Asymmetric:</strong> cᵢⱼ ≠ cⱼᵢ generally (costs differ by direction)</li>
                  <li><strong>Fixed:</strong> In basic problems, costs are fixed and known</li>
                  <li><strong>Linear:</strong> Total cost is sum of (cᵢⱼ × xᵢⱼ)</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Components of the Cost Matrix</h3>
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Rows (Sources)</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each row represents a source</li>
                      <li>Contains costs to all destinations</li>
                      <li>Row sum not required</li>
                      <li>Row label identifies the source</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Columns (Destinations)</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each column represents a destination</li>
                      <li>Contains costs from all sources</li>
                      <li>Column sum not required</li>
                      <li>Column label identifies the destination</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> The cost matrix is read as "cost from source i to destination j." Always verify the orientation of your matrix to avoid errors.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Interpretation Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Interpreting Transportation Costs</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What Do Costs Represent?</h3>
                <p>
                  Transportation costs represent the total cost of shipping one unit of goods from a source to a destination. These costs can include various components:
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Direct Costs</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Distance-based costs (fuel, wear)</li>
                      <li>Freight charges</li>
                      <li>Handling fees</li>
                      <li>Loading/unloading costs</li>
                      <li>Insurance</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Indirect Costs</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Administrative overhead</li>
                      <li>Inventory holding costs</li>
                      <li>Delay costs</li>
                      <li>Opportunity costs</li>
                      <li>Storage costs</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Factors Affecting Transportation Costs</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Distance:</strong> Longer distances generally mean higher costs</li>
                  <li><strong>Mode of Transport:</strong> Air vs. rail vs. truck vs. ship</li>
                  <li><strong>Volume:</strong> Economies of scale for larger shipments</li>
                  <li><strong>Product Type:</strong> Perishable, hazardous, fragile</li>
                  <li><strong>Seasonality:</strong> Peak season rates may be higher</li>
                  <li><strong>Fuel Prices:</strong> Fluctuations affect transportation costs</li>
                  <li><strong>Labor Costs:</strong> Vary by location and skill level</li>
                  <li><strong>Infrastructure:</strong> Road quality, port facilities</li>
                </ul>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    💡 <strong>Try Changing This:</strong> What happens if fuel prices increase by 20%? How would the cost matrix change? How would the optimal solution change? This is the essence of sensitivity analysis.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 1: Manufacturing Distribution Cost Matrix</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company has 3 factories and 4 distribution centers. The cost matrix shows shipping costs per unit in rupees.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Source \ Destination</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₁</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₂</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₃</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">DC₄</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory A</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹45</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹52</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹38</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹60</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory B</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹55</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹42</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹48</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹35</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory C</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹40</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹50</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹62</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹44</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Interpretation:</p>
                    <p className="text-gray-700 dark:text-gray-300">The cheapest route is Factory C → DC₁ at ₹40. The most expensive is Factory C → DC₃ at ₹62. This information guides optimal shipping decisions.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 2: Agricultural Products Cost Matrix</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative distributes produce from 4 farms to 5 markets. Costs vary based on distance and road conditions.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Farm \ Market</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">M₁</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">M₂</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">M₃</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">M₄</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">M₅</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 1</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹12</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹15</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹10</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹18</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹14</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 2</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹16</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹11</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹13</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹20</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹17</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 3</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹14</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹18</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹9</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹15</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹12</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹19</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹13</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹16</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹10</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹21</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Interpretation:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila uses this cost matrix to plan optimal distribution, sending produce from the cheapest farms to each market.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 3: Healthcare Supply Chain Cost Matrix</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A medical supply network has 2 warehouses and 5 hospitals with different shipping costs.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Warehouse \ Hospital</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">H₁</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">H₂</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">H₃</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">H₄</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">H₅</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">WH₁</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹120</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹150</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹100</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹180</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹140</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">WH₂</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹140</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹110</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹130</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹160</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹90</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Interpretation:</p>
                    <p className="text-gray-700 dark:text-gray-300">Mahima uses this matrix to determine the cheapest way to supply each hospital, ensuring cost-effective healthcare logistics.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 4: Educational Resources Cost Matrix</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district distributes books from 3 distribution centers to 6 schools.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Cost Matrix (per box of books):</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 mt-2">
                      <li>DC₁ to schools: ₹25, ₹30, ₹20, ₹35, ₹28, ₹22</li>
                      <li>DC₂ to schools: ₹30, ₹22, ₹28, ₹40, ₹32, ₹25</li>
                      <li>DC₃ to schools: ₹28, ₹35, ₹25, ₹32, ₹20, ₹30</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Interpretation:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu identifies that DC₁→School 3 (₹20) is the cheapest route, and DC₂→School 4 (₹40) is the most expensive, guiding allocation decisions.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Transportation Cost Matrix Visualization</text>
                  
                  {/* Cost Matrix Box */}
                  <rect x="50" y="70" width="850" height="200" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-lg font-bold fill-purple-600 dark:fill-purple-400">Transportation Cost Matrix</text>
                  
                  {/* Matrix Table */}
                  <rect x="120" y="125" width="710" height="125" rx="5" fill="white" dark:fill="#1F2937" stroke="#8B5CF6" strokeWidth="1.5" />
                  
                  <text x="170" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">S₁</text>
                  <text x="260" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">S₂</text>
                  <text x="350" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">S₃</text>
                  <text x="440" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">S₄</text>
                  <text x="530" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">Supply</text>
                  
                  <text x="640" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₁</text>
                  <text x="730" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₂</text>
                  <text x="820" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₃</text>
                  
                  <line x1="160" y1="155" x2="160" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="250" y1="155" x2="250" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="340" y1="155" x2="340" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="430" y1="155" x2="430" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="520" y1="155" x2="520" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="630" y1="155" x2="630" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="720" y1="155" x2="720" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="810" y1="155" x2="810" y2="245" stroke="#8B5CF6" strokeWidth="1" />
                  
                  <line x1="120" y1="160" x2="830" y2="160" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="120" y1="190" x2="830" y2="190" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="120" y1="220" x2="830" y2="220" stroke="#8B5CF6" strokeWidth="1" />
                  <line x1="120" y1="250" x2="830" y2="250" stroke="#8B5CF6" strokeWidth="1" />
                  
                  <text x="170" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₁</text>
                  <text x="260" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₂</text>
                  <text x="350" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₃</text>
                  <text x="440" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₄</text>
                  <text x="520" y="185" textAnchor="middle" className="text-xs font-semibold fill-green-600 dark:fill-green-400">S₁</text>
                  
                  <text x="170" y="215" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₁</text>
                  <text x="260" y="215" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₂</text>
                  <text x="350" y="215" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₃</text>
                  <text x="440" y="215" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₄</text>
                  <text x="520" y="215" textAnchor="middle" className="text-xs font-semibold fill-green-600 dark:fill-green-400">S₂</text>
                  
                  <text x="170" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₃₁</text>
                  <text x="260" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₃₂</text>
                  <text x="350" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₃₃</text>
                  <text x="440" y="245" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₃₄</text>
                  <text x="520" y="245" textAnchor="middle" className="text-xs font-semibold fill-green-600 dark:fill-green-400">S₃</text>
                  
                  <text x="640" y="240" textAnchor="middle" className="text-xs font-semibold fill-orange-600 dark:fill-orange-400">D₁</text>
                  <text x="730" y="240" textAnchor="middle" className="text-xs font-semibold fill-orange-600 dark:fill-orange-400">D₂</text>
                  <text x="820" y="240" textAnchor="middle" className="text-xs font-semibold fill-orange-600 dark:fill-orange-400">D₃</text>
                  
                  {/* Matrix Properties */}
                  <rect x="50" y="300" width="850" height="120" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="475" y="335" textAnchor="middle" className="text-base font-bold fill-green-600 dark:fill-green-400">Matrix Properties</text>
                  
                  <circle cx="90" cy="365" r="6" fill="#10B981" />
                  <text x="110" y="370" className="text-sm fill-gray-700 dark:fill-gray-300">Non-negative: cᵢⱼ ≥ 0</text>
                  
                  <circle cx="300" cy="365" r="6" fill="#10B981" />
                  <text x="320" y="370" className="text-sm fill-gray-700 dark:fill-gray-300">Real values: integers or decimals</text>
                  
                  <circle cx="520" cy="365" r="6" fill="#10B981" />
                  <text x="540" y="370" className="text-sm fill-gray-700 dark:fill-gray-300">Asymmetric: cᵢⱼ ≠ cⱼᵢ</text>
                  
                  <circle cx="730" cy="365" r="6" fill="#10B981" />
                  <text x="750" y="370" className="text-sm fill-gray-700 dark:fill-gray-300">Fixed: known and constant</text>
                  
                  {/* Cost Components */}
                  <rect x="50" y="450" width="850" height="140" rx="15" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="485" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Components of Transportation Costs</text>
                  
                  <rect x="80" y="505" width="250" height="65" rx="8" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" />
                  <text x="205" y="530" textAnchor="middle" className="text-sm font-semibold fill-amber-700 dark:fill-amber-300">Direct Costs</text>
                  <text x="205" y="550" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Distance, Freight, Handling, Insurance</text>
                  
                  <rect x="350" y="505" width="250" height="65" rx="8" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" />
                  <text x="475" y="530" textAnchor="middle" className="text-sm font-semibold fill-amber-700 dark:fill-amber-300">Indirect Costs</text>
                  <text x="475" y="550" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Admin, Inventory, Delays, Storage</text>
                  
                  <rect x="620" y="505" width="250" height="65" rx="8" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" />
                  <text x="745" y="530" textAnchor="middle" className="text-sm font-semibold fill-amber-700 dark:fill-amber-300">Other Factors</text>
                  <text x="745" y="550" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Fuel, Labor, Infrastructure, Season</text>
                  
                  {/* Objective Box */}
                  <rect x="50" y="620" width="850" height="110" rx="15" fill="#EC4899" fillOpacity="0.1" stroke="#EC4899" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1.5s" />
                  </rect>
                  <text x="475" y="655" textAnchor="middle" className="text-base font-bold fill-pink-600 dark:fill-pink-400">Objective: Minimize Total Transportation Cost</text>
                  
                  <text x="475" y="685" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">Minimize Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ</text>
                  <text x="475" y="705" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">The cost matrix provides the cᵢⱼ values used in the objective function</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the structure of the transportation cost matrix, its properties, and how it fits into the overall transportation problem.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🎯 Matrix Organization</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Organize the cost matrix with sources as rows and destinations as columns. This standard format makes the problem easier to solve and interpret.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">💡 Cost Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always verify the cost matrix with actual data sources. A single incorrect cost can lead to suboptimal solutions and poor decisions.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Sensitivity Analysis</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Perform sensitivity analysis on the cost matrix. Understanding how changes in costs affect the optimal solution helps make robust decisions.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Data Updates</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Regularly update the cost matrix to reflect current fuel prices, route conditions, and other factors. Outdated costs lead to outdated solutions.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, transportation costs are rarely static. Smart companies implement cost monitoring systems and regularly update their cost matrices. Mamata from Kolkata reviews her company's cost matrix monthly to ensure optimal logistics planning.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Matrix Orientation</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Reading the cost matrix incorrectly (sources as columns, destinations as rows). Always verify the orientation before solving.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Including Irrelevant Costs</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Adding costs that don't apply to the transportation problem, like fixed costs or overhead that don't vary with shipment quantity.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Using Average Costs</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Using average costs instead of specific route costs. Each source-destination pair has unique costs that should be captured individually.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Economies of Scale</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting that unit costs may decrease with larger shipment volumes. Basic models assume linear costs, which may not hold in reality.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students assume all costs are symmetric (cᵢⱼ = cⱼᵢ). In reality, costs from source A to destination B are rarely the same as from B to A due to different routes, fuel consumption, and other factors.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">📝 Data Collection</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Gather costs from reliable sources</li>
                    <li>Include all relevant cost components</li>
                    <li>Verify data accuracy</li>
                    <li>Document data sources</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🔍 Matrix Construction</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use standard m × n format</li>
                    <li>Label rows and columns clearly</li>
                    <li>Check dimensions carefully</li>
                    <li>Ensure all costs are non-negative</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">📚 Regular Updates</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Update costs regularly</li>
                    <li>Track cost changes over time</li>
                    <li>Adjust for inflation</li>
                    <li>Account for seasonal variations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🎯 Sensitivity Analysis</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Analyze cost sensitivity</li>
                    <li>Identify critical costs</li>
                    <li>Understand solution robustness</li>
                    <li>Plan for cost variations</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, cost matrices are maintained in integrated systems (like ERP) and automatically updated with real-time data. This ensures transportation decisions are always based on current, accurate costs.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Matrix Structure</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the structure and dimensions of the cost matrix</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Cost Interpretation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can interpret what each cost value represents in real terms</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Matrix Properties</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the properties of the cost matrix (non-negative, etc.)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Cost Factors</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify factors that affect transportation costs</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Real-World Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply cost matrix concepts to real-world transportation scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The cost matrix is the most critical input in any transportation problem. When I teach this to my students in Kolkata, I emphasize that accuracy in the cost matrix leads to accuracy in the solution. Abhronila from Jadavpur learned this lesson when a single incorrect cost value led to a suboptimal shipping plan costing her company ₹50,000. Remember: The optimization algorithm can only be as good as the data you feed it. Take the time to build an accurate cost matrix."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Transportation Cost Matrix FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Transportation Cost Matrix"
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