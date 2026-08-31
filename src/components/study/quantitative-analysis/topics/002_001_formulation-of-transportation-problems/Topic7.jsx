// Topic7.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
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
    { id: 'introduction', title: 'Introduction to Dummy Sources and Destinations' },
    { id: 'dummysource', title: 'Understanding Dummy Sources' },
    { id: 'dummydestination', title: 'Understanding Dummy Destinations' },
    { id: 'handling', title: 'Handling Dummies in Solutions' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded-full">
            Topic 7
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent">
            Dummy Source and Dummy Destination
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding dummy sources and destinations in unbalanced transportation problems
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Introduction to Dummy Sources and Destinations</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <p>
                  Dummy sources and destinations are artificial constructs used to convert unbalanced transportation problems into balanced ones. They represent either unmet demand (dummy sources) or unused supply (dummy destinations) and allow the use of standard transportation algorithms on otherwise unsolvable problems.
                </p>

                <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-500">
                  <p className="font-medium text-amber-800 dark:text-amber-300">
                    💡 Key Insight: Dummy sources and destinations are not real locations—they are mathematical tools that make unbalanced problems solvable while providing valuable insights about surplus or deficit situations.
                  </p>
                </div>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Dummy Source</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Added when demand &gt; supply</li>
                      <li>Represents unmet demand</li>
                      <li>Supply = deficit amount</li>
                      <li>Zero costs to destinations</li>
                      <li>Artificial supply point</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Dummy Destination</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Added when supply &gt; demand</li>
                      <li>Represents unused supply</li>
                      <li>Demand = surplus amount</li>
                      <li>Zero costs from sources</li>
                      <li>Artificial demand point</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mahima in Kolkata has more stock than orders, she creates a "virtual destination" for the extra stock. When she has more orders than stock, she creates a "virtual source" for the missing items. These are her dummy destinations and sources.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dummy Source Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Understanding Dummy Sources</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What is a Dummy Source?</h3>
                <p>
                  A dummy source is an artificial supply point created when total demand exceeds total supply. It represents the amount of demand that cannot be met by available supply. The dummy source has a supply equal to the deficit and zero transportation costs to all destinations.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    {`Deficit = ΣDⱼ - ΣSᵢ (when demand > supply)`}<br/>
                    Dummy Source Supply = Deficit<br/>
                    Costs from Dummy Source = 0
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">When to Use a Dummy Source</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Condition:</strong> {`ΣDⱼ > ΣSᵢ`} (excess demand)</li>
                  <li><strong>Purpose:</strong> To balance the problem by providing additional supply</li>
                  <li><strong>Interpretation:</strong> Represents demand that can't be fulfilled</li>
                  <li><strong>Economic Meaning:</strong> Lost sales, unmet orders, or backorders</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Example of Dummy Source</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium">Problem:</p>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                    <li>Total Supply = 400 units</li>
                    <li>Total Demand = 500 units</li>
                    <li>Deficit = 100 units</li>
                  </ul>
                  <p className="text-sm font-medium mt-2">Solution:</p>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                    <li>Add dummy source with supply = 100</li>
                    <li>Set costs from dummy source = 0</li>
                    <li>Now balanced: 500 = 500</li>
                  </ul>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> The dummy source is a mathematical construct. In reality, unmet demand represents lost sales or customers who couldn't be served. The dummy source helps quantify these losses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dummy Destination Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Understanding Dummy Destinations</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What is a Dummy Destination?</h3>
                <p>
                  A dummy destination is an artificial demand point created when total supply exceeds total demand. It represents the amount of supply that cannot be shipped to actual destinations. The dummy destination has a demand equal to the surplus and zero transportation costs from all sources.
                </p>

                <div className="my-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Surplus = ΣSᵢ - ΣDⱼ (when supply {`>`} demand)<br/>
                    Dummy Destination Demand = Surplus<br/>
                    Costs to Dummy Destination = 0
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">When to Use a Dummy Destination</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Condition:</strong> ΣSᵢ {`>`} ΣDⱼ (surplus supply)</li>
                  <li><strong>Purpose:</strong> To balance the problem by providing additional demand</li>
                  <li><strong>Interpretation:</strong> Represents supply that doesn't need to be shipped</li>
                  <li><strong>Economic Meaning:</strong> Excess inventory, storage, or waste</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Example of Dummy Destination</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm font-medium">Problem:</p>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                    <li>Total Supply = 500 units</li>
                    <li>Total Demand = 400 units</li>
                    <li>Surplus = 100 units</li>
                  </ul>
                  <p className="text-sm font-medium mt-2">Solution:</p>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                    <li>Add dummy destination with demand = 100</li>
                    <li>Set costs to dummy destination = 0</li>
                    <li>Now balanced: 500 = 500</li>
                  </ul>
                </div>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Observe Carefully:</strong> The dummy destination represents supply that doesn't need to be shipped. In reality, this could be inventory that stays in storage, production that's postponed, or goods that are disposed of.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Handling Dummies Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Handling Dummies in Solutions</h2>
              
              <div className="prose prose-amber dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">After Adding Dummies</h3>
                <p>
                  Once dummies are added and the problem becomes balanced, it can be solved using standard transportation algorithms. The solution will include allocations to dummy sources or destinations.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Dummy Source Allocations</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Show which destinations have unmet demand</li>
                      <li>Allocations = deficit at each destination</li>
                      <li>Zero cost doesn't affect total cost</li>
                      <li>Helps prioritize demand fulfillment</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Dummy Destination Allocations</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Show which sources have unused supply</li>
                      <li>Allocations = surplus at each source</li>
                      <li>Zero cost doesn't affect total cost</li>
                      <li>Helps identify excess capacity</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Interpreting Dummy Allocations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dummy Source Allocations:</strong> Represent lost sales or unmet demand. Help identify which destinations are underserved.</li>
                  <li><strong>Dummy Destination Allocations:</strong> Represent unused supply or surplus. Help identify which sources have excess capacity.</li>
                  <li><strong>Zero Cost:</strong> Dummy allocations don't affect the total transportation cost.</li>
                  <li><strong>Strategic Value:</strong> Dummy allocations provide insights for capacity planning and demand management.</li>
                </ul>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    💡 <strong>Try Changing This:</strong> What happens if you change the dummy costs from zero to a positive value? How does the solution change? (Hint: It would penalize surplus or deficit, which may not be desirable.)
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 1: Manufacturing - Dummy Destination for Surplus</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A factory in Kolkata produces more units than customer orders.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Before Dummy</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Supply: 3 factories × 300 = 900 units</li>
                        <li>Demand: 4 customers totaling 700 units</li>
                        <li>Surplus: 200 units</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">After Dummy</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Add dummy destination with demand 200</li>
                        <li>Zero costs to dummy destination</li>
                        <li>Now balanced: 900 = 900</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Dummy Destination Represents:</p>
                    <p className="text-gray-700 dark:text-gray-300">200 units of surplus that will be stored or used later.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 2: Retail - Dummy Source for Deficit</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A retail chain in Barrackpore has more customer demand than available stock.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Before Dummy</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Supply: 2 warehouses × 200 = 400 units</li>
                        <li>Demand: 5 stores totaling 550 units</li>
                        <li>Deficit: 150 units</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">After Dummy</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Add dummy source with supply 150</li>
                        <li>Zero costs from dummy source</li>
                        <li>Now balanced: 550 = 550</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Dummy Source Represents:</p>
                    <p className="text-gray-700 dark:text-gray-300">150 units of unmet demand representing lost sales.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 3: Healthcare - Dummy Source for Emergency Demand</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur faces emergency supply shortages.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded">
                    <p className="font-medium">Dummy Source Details:</p>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                      <li>Supply available: 500 units (from 2 warehouses)</li>
                      <li>Demand required: 650 units (from 5 hospitals)</li>
                      <li>Deficit: 150 units (unmet medical needs)</li>
                      <li>Dummy source supply = 150 units</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Dummy Source Represents:</p>
                    <p className="text-gray-700 dark:text-gray-300">Critical medical supplies that couldn't be delivered.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">Example 4: Education - Dummy Destination for Surplus Books</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur receives more textbooks than needed.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded">
                    <p className="font-medium">Dummy Destination Details:</p>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                      <li>Supply: 1500 books (from 3 distribution centers)</li>
                      <li>Demand: 1100 books (from 6 schools)</li>
                      <li>Surplus: 400 books</li>
                      <li>Dummy destination demand = 400 books</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Dummy Destination Represents:</p>
                    <p className="text-gray-700 dark:text-gray-300">400 extra books that will be stored for next year.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 800" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="800" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Dummy Source and Dummy Destination</text>
                  
                  {/* Dummy Source Case */}
                  <rect x="50" y="70" width="850" height="280" rx="15" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-lg font-bold fill-blue-600 dark:fill-blue-400">Dummy Source (Excess Demand)</text>
                  
                  <rect x="80" y="125" width="200" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5" />
                  <text x="180" y="155" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Real Sources</text>
                  <text x="180" y="180" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">ΣSᵢ = 400</text>
                  
                  <rect x="370" y="125" width="200" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5" />
                  <text x="470" y="155" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">Real Destinations</text>
                  <text x="470" y="180" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">ΣDⱼ = 500</text>
                  
                  <path d="M 380 165 L 410 165" stroke="#F43F5E" strokeWidth="3" />
                  <text x="395" y="155" textAnchor="middle" className="text-xs font-bold fill-rose-600 dark:fill-rose-400">{`<`}</text>
                  
                  <rect x="660" y="125" width="200" height="80" rx="10" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="760" y="155" textAnchor="middle" className="text-sm font-bold fill-blue-600 dark:fill-blue-400">Dummy Source</text>
                  <text x="760" y="180" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">Supply = 100</text>
                  
                  <rect x="80" y="230" width="790" height="100" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="475" y="260" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Dummy Source Represents:</text>
                  <text x="475" y="285" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Unmet demand = 100 units</text>
                  <text x="475" y="310" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Lost sales, unfilled orders, or backorders</text>
                  
                  {/* Dummy Destination Case */}
                  <rect x="50" y="380" width="850" height="280" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="415" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Dummy Destination (Surplus Supply)</text>
                  
                  <rect x="80" y="435" width="200" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5" />
                  <text x="180" y="465" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Real Sources</text>
                  <text x="180" y="490" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">ΣSᵢ = 500</text>
                  
                  <rect x="370" y="435" width="200" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5" />
                  <text x="470" y="465" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">Real Destinations</text>
                  <text x="470" y="490" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">ΣDⱼ = 400</text>
                  
                  <path d="M 380 475 L 410 475" stroke="#F43F5E" strokeWidth="3" />
                  <text x="395" y="465" textAnchor="middle" className="text-xs font-bold fill-rose-600 dark:fill-rose-400">{`>`}</text>
                  
                  <rect x="660" y="435" width="200" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="760" y="465" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Dummy Destination</text>
                  <text x="760" y="490" textAnchor="middle" className="text-sm font-mono fill-gray-700 dark:fill-gray-300">Demand = 100</text>
                  
                  <rect x="80" y="540" width="790" height="100" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="475" y="570" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Dummy Destination Represents:</text>
                  <text x="475" y="595" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Unused supply = 100 units</text>
                  <text x="475" y="620" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Excess inventory, storage, or waste</text>
                  
                  {/* Key Takeaways */}
                  <rect x="50" y="690" width="850" height="90" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="725" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Key Points About Dummies</text>
                  <text x="475" y="755" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Dummy Source = Excess Demand (Deficit) | Dummy Destination = Surplus Supply</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram illustrates dummy sources (for excess demand) and dummy destinations (for surplus supply), showing what each represents in real-world terms.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🎯 Quick Recall</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Remember: Demand {`>`} Supply → Dummy Source (adds supply). Supply {`>`} Demand → Dummy Destination (adds demand).
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">💡 Zero Cost Rule</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always set dummy costs to zero. This ensures the dummy doesn't affect the objective function and only serves to balance the problem.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Interpretation Value</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Dummy allocations are valuable for business insights. They show exactly where surplus exists or where deficits occur, guiding strategic decisions.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Solution Check</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    After solving, verify that dummy allocations match the expected surplus or deficit. This confirms your solution is correct.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, dummies are powerful diagnostic tools. Susmita from Barrackpore uses dummy destination allocations to identify which factories consistently overproduce, and dummy source allocations to find which stores frequently face shortages.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Confusing Dummy Types</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {`Adding a dummy source when you need a dummy destination, or vice versa. Remember: Demand > Supply → Dummy Source. Supply > Demand → Dummy Destination.`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Non-Zero Dummy Costs</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Setting dummy costs to non-zero values. This would incorrectly penalize surplus or deficit situations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Dummy Amount</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Calculating the wrong surplus or deficit amount. Double-check your addition of supplies and demands.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Dummy Allocations</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not interpreting dummy allocations after solving. They provide valuable insights about surplus and deficit patterns.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> A common misconception is that dummy variables represent real sources or destinations. They are artificial constructs used only for mathematical balancing. Always interpret them as surplus or deficit indicators, not actual locations.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">📝 Identify Correct Dummy</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Calculate ΣSᵢ and ΣDⱼ first</li>
                    <li>Determine if surplus or deficit exists</li>
                    <li>Choose the correct dummy type</li>
                    <li>Document your decision</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🔧 Set Costs Correctly</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Always set dummy costs to zero</li>
                    <li>Verify costs in all dummy cells</li>
                    <li>Don't use non-zero values</li>
                    <li>Check after adding dummies</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">📚 Interpret Results</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Analyze dummy allocations</li>
                    <li>Identify surplus patterns</li>
                    <li>Identify deficit patterns</li>
                    <li>Use insights for planning</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-300">🎯 Plan for Balance</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use dummy insights to reduce imbalance</li>
                    <li>Adjust production or sourcing</li>
                    <li>Improve demand forecasting</li>
                    <li>Build flexibility into supply chain</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, dummies are not just mathematical tools—they're diagnostic indicators. Abhronila from Jadavpur uses dummy allocations to identify systemic issues in her supply chain. If a particular source consistently ships to the dummy destination, it indicates overproduction or inefficiency.
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
              <h2 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dummy Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what dummy sources and destinations are</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dummy Identification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know when to use a dummy source vs a dummy destination</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Cost Setting</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know that dummy costs must be set to zero</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Interpretation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can interpret what dummy allocations represent in real terms</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Practical Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply dummy concepts to real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Dummy sources and destinations are powerful tools, not just mathematical constructs. When I teach this to my students in Kolkata, I emphasize that understanding dummies helps diagnose supply chain issues. Abhronila from Jadavpur discovered that by analyzing dummy allocations, she could identify which of her suppliers consistently overproduced and which stores regularly faced shortages. Susmita from Barrackpore uses dummies to determine optimal inventory levels. Remember: Dummies don't just balance the math—they balance your understanding of your supply chain."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Dummy Source and Dummy Destination FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Dummy Source and Dummy Destination"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic7_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic7;