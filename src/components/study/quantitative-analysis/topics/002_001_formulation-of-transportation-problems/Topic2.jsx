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
    { id: 'introduction', title: 'Introduction to Sources and Destinations' },
    { id: 'sources', title: 'Understanding Sources (Supply Points)' },
    { id: 'destinations', title: 'Understanding Destinations (Demand Points)' },
    { id: 'relationship', title: 'Source-Destination Relationship' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
            Topic 2
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Sources and Destinations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding supply points (sources) and demand points (destinations) in transportation problems
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Introduction to Sources and Destinations</h2>
              
              <div className="prose prose-cyan dark:prose-invert max-w-none leading-relaxed">
                <p>
                  In transportation problems, sources and destinations are the fundamental building blocks. Sources represent the origins or supply points where goods are available, while destinations represent the endpoints or demand points where goods are needed. Understanding these concepts is essential for modeling and solving transportation problems.
                </p>

                <div className="my-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border-l-4 border-cyan-500">
                  <p className="font-medium text-cyan-800 dark:text-cyan-300">
                    💡 Key Insight: Every transportation problem is defined by its sources (where goods come from) and destinations (where goods go to). The relationship between them determines the shipping plan.
                  </p>
                </div>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Sources</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Supply points or origins</li>
                      <li>Where goods are produced or stored</li>
                      <li>Have limited supply capacity</li>
                      <li>Examples: Factories, warehouses, farms</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Destinations</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Demand points or sinks</li>
                      <li>Where goods are consumed or needed</li>
                      <li>Have specific demand requirements</li>
                      <li>Examples: Stores, customers, markets</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata runs her distribution business, she needs to know exactly which sources (warehouses) have stock and which destinations (stores) need products. This is the starting point of any transportation problem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sources Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Understanding Sources (Supply Points)</h2>
              
              <div className="prose prose-cyan dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Definition and Characteristics</h3>
                <p>
                  A source (also called a supply point or origin) is a location where goods are available for shipment. Sources have specific characteristics that define their role in the transportation problem.
                </p>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Key Characteristics of Sources</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Supply Capacity:</strong> Each source has a limited amount of goods available (Sᵢ)</li>
                    <li><strong>Location:</strong> Sources are geographically located at specific points</li>
                    <li><strong>Storage:</strong> Sources typically have storage facilities for goods</li>
                    <li><strong>Costs:</strong> Different sources may have different production or handling costs</li>
                    <li><strong>Limitations:</strong> Sources may have operational constraints (hours, capacity)</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Types of Sources</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Production Sources:</strong> Factories that manufacture goods</li>
                  <li><strong>Storage Sources:</strong> Warehouses that store goods</li>
                  <li><strong>Collection Sources:</strong> Collection centers for agricultural products</li>
                  <li><strong>Distribution Centers:</strong> Hubs that distribute goods to multiple destinations</li>
                  <li><strong>Supplier Sources:</strong> External suppliers providing goods</li>
                </ul>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Observe Carefully:</strong> The total supply from all sources must be sufficient to meet total demand. If not, the problem is unbalanced and requires dummy sources or destinations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Destinations Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Understanding Destinations (Demand Points)</h2>
              
              <div className="prose prose-cyan dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Definition and Characteristics</h3>
                <p>
                  A destination (also called a demand point or sink) is a location where goods are needed and consumed. Destinations have specific requirements that must be satisfied in the transportation problem.
                </p>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Key Characteristics of Destinations</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Demand Requirements:</strong> Each destination has a specific demand (Dⱼ)</li>
                    <li><strong>Location:</strong> Destinations are geographically located at specific points</li>
                    <li><strong>Consumption:</strong> Goods are consumed or used at destinations</li>
                    <li><strong>Time Sensitivity:</strong> Some destinations may have time constraints</li>
                    <li><strong>Receiving Capacity:</strong> Destinations may have limited receiving capacity</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Types of Destinations</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Retail Destinations:</strong> Stores and shops that sell to consumers</li>
                  <li><strong>Consumer Destinations:</strong> End customers who use products</li>
                  <li><strong>Warehouse Destinations:</strong> Distribution centers that receive goods</li>
                  <li><strong>Production Destinations:</strong> Factories that need raw materials</li>
                  <li><strong>Emergency Destinations:</strong> Disaster relief locations</li>
                </ul>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    💡 <strong>Observe Carefully:</strong> Each destination must receive exactly its demand amount in a balanced problem. If a destination receives less, demand is unmet; if more, there's surplus.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Source-Destination Relationship Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Source-Destination Relationship</h2>
              
              <div className="prose prose-cyan dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Connection</h3>
                <p>
                  The relationship between sources and destinations is defined by the transportation routes and costs. Every source can potentially ship to every destination, subject to cost and capacity constraints.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Shipping Routes</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each source-destination pair has a route</li>
                      <li>Routes have associated costs (cᵢⱼ)</li>
                      <li>Routes may have capacity limits</li>
                      <li>Decision variables (xᵢⱼ) represent shipments</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">Cost Structure</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Costs vary by source-destination pair</li>
                      <li>Costs may include distance, fuel, handling</li>
                      <li>Economies of scale may apply</li>
                      <li>Cost matrix summarizes all costs</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Key Relationships</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Supply-Demand Balance:</strong> Total supply must equal total demand</li>
                  <li><strong>Allocation:</strong> Each source distributes its supply among destinations</li>
                  <li><strong>Fulfillment:</strong> Each destination receives from various sources</li>
                  <li><strong>Cost Optimization:</strong> Routes with lower costs typically carry more shipments</li>
                </ul>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you add more sources or destinations? How does the complexity of the problem change? The number of routes grows as m × n.
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 1: Manufacturing Distribution Network</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata has three manufacturing plants and five retail stores.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Sources</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Plant 1 (Supply: 1000 units)</li>
                        <li>Plant 2 (Supply: 800 units)</li>
                        <li>Plant 3 (Supply: 1200 units)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Destinations</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Store 1 (Demand: 400 units)</li>
                        <li>Store 2 (Demand: 500 units)</li>
                        <li>Store 3 (Demand: 600 units)</li>
                        <li>Store 4 (Demand: 700 units)</li>
                        <li>Store 5 (Demand: 800 units)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita uses this model to determine optimal shipping quantities from each plant to each store, reducing transportation costs by 18%.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 2: Agricultural Supply Chain</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative in Barrackpore collects produce from four collection centers and distributes to six markets.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Sources</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Center 1 (Supply: 150 tons)</li>
                        <li>Center 2 (Supply: 200 tons)</li>
                        <li>Center 3 (Supply: 180 tons)</li>
                        <li>Center 4 (Supply: 220 tons)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Destinations</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Market 1 (Demand: 120 tons)</li>
                        <li>Market 2 (Demand: 150 tons)</li>
                        <li>Market 3 (Demand: 180 tons)</li>
                        <li>Market 4 (Demand: 100 tons)</li>
                        <li>Market 5 (Demand: 130 tons)</li>
                        <li>Market 6 (Demand: 170 tons)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila uses this model to plan daily collection and distribution, reducing waste by 30%.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 3: Healthcare Supply Network</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur has two central warehouses and seven hospitals.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Sources</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Warehouse A (Supply: 500 units)</li>
                        <li>Warehouse B (Supply: 700 units)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Destinations</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>7 hospitals with demands ranging from 80 to 200 units</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Mahima ensures timely delivery of medical supplies while optimizing costs using source-destination analysis.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 4: Educational Supplies Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes textbooks from three distribution centers to eight schools.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-blue-600 dark:text-blue-400">Sources</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Center 1 (Supply: 1000 books)</li>
                        <li>Center 2 (Supply: 800 books)</li>
                        <li>Center 3 (Supply: 1200 books)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Destinations</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>8 schools with demands from 300 to 600 books</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu ensures all schools receive their textbooks on time while minimizing distribution costs.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 700" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="700" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Sources and Destinations Network</text>
                  
                  {/* Sources Column */}
                  <rect x="50" y="80" width="250" height="350" rx="15" fill="#0EA5E9" fillOpacity="0.1" stroke="#0EA5E9" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="175" y="115" textAnchor="middle" className="text-lg font-bold fill-cyan-600 dark:fill-cyan-400">Sources</text>
                  <text x="175" y="145" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₁ (Supply: 100)</text>
                  <text x="175" y="175" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₂ (Supply: 150)</text>
                  <text x="175" y="205" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₃ (Supply: 120)</text>
                  <text x="175" y="235" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₄ (Supply: 130)</text>
                  <text x="175" y="265" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₅ (Supply: 140)</text>
                  
                  {/* Source Types */}
                  <rect x="70" y="290" width="210" height="120" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1" />
                  <text x="175" y="315" textAnchor="middle" className="text-xs font-semibold fill-amber-600 dark:fill-amber-400">Types of Sources</text>
                  <text x="90" y="340" className="text-xs fill-gray-700 dark:fill-gray-300">• Factories</text>
                  <text x="90" y="360" className="text-xs fill-gray-700 dark:fill-gray-300">• Warehouses</text>
                  <text x="90" y="380" className="text-xs fill-gray-700 dark:fill-gray-300">• Distribution Centers</text>
                  <text x="90" y="400" className="text-xs fill-gray-700 dark:fill-gray-300">• Collection Centers</text>
                  
                  {/* Transportation Arrows */}
                  <path d="M 300 140 L 620 140" stroke="#14B8A6" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                  </path>
                  <text x="460" y="135" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Shipments</text>
                  
                  <path d="M 300 170 L 620 170" stroke="#14B8A6" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1.2s" repeatCount="indefinite" />
                  </path>
                  <text x="460" y="165" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Shipments</text>
                  
                  <path d="M 300 200 L 620 200" stroke="#14B8A6" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1.4s" repeatCount="indefinite" />
                  </path>
                  <text x="460" y="195" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Shipments</text>
                  
                  <path d="M 300 230 L 620 230" stroke="#14B8A6" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1.6s" repeatCount="indefinite" />
                  </path>
                  <text x="460" y="225" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Shipments</text>
                  
                  <path d="M 300 260 L 620 260" stroke="#14B8A6" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;10" dur="1.8s" repeatCount="indefinite" />
                  </path>
                  <text x="460" y="255" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Shipments</text>
                  
                  {/* Destinations Column */}
                  <rect x="650" y="80" width="250" height="350" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="775" y="115" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Destinations</text>
                  <text x="775" y="145" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₁ (Demand: 80)</text>
                  <text x="775" y="175" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₂ (Demand: 90)</text>
                  <text x="775" y="205" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₃ (Demand: 100)</text>
                  <text x="775" y="235" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₄ (Demand: 120)</text>
                  <text x="775" y="265" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₅ (Demand: 110)</text>
                  
                  {/* Destination Types */}
                  <rect x="670" y="290" width="210" height="120" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1" />
                  <text x="775" y="315" textAnchor="middle" className="text-xs font-semibold fill-amber-600 dark:fill-amber-400">Types of Destinations</text>
                  <text x="690" y="340" className="text-xs fill-gray-700 dark:fill-gray-300">• Retail Stores</text>
                  <text x="690" y="360" className="text-xs fill-gray-700 dark:fill-gray-300">• Consumers</text>
                  <text x="690" y="380" className="text-xs fill-gray-700 dark:fill-gray-300">• Markets</text>
                  <text x="690" y="400" className="text-xs fill-gray-700 dark:fill-gray-300">• Hospitals</text>
                  
                  {/* Cost Labels */}
                  <text x="380" y="145" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₁</text>
                  <text x="430" y="175" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₃</text>
                  <text x="390" y="205" className="text-xs fill-gray-600 dark:fill-gray-400">c₃₂</text>
                  <text x="440" y="235" className="text-xs fill-gray-600 dark:fill-gray-400">c₄₄</text>
                  <text x="400" y="265" className="text-xs fill-gray-600 dark:fill-gray-400">c₅₁</text>
                  
                  {/* Key Points Box */}
                  <rect x="50" y="460" width="850" height="220" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="495" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Key Points About Sources and Destinations</text>
                  
                  <circle cx="90" cy="525" r="8" fill="#0EA5E9" />
                  <text x="110" y="530" className="text-sm fill-gray-700 dark:fill-gray-300">Sources are supply points with limited capacities (Sᵢ)</text>
                  
                  <circle cx="90" cy="555" r="8" fill="#10B981" />
                  <text x="110" y="560" className="text-sm fill-gray-700 dark:fill-gray-300">Destinations are demand points with specific requirements (Dⱼ)</text>
                  
                  <circle cx="90" cy="585" r="8" fill="#14B8A6" />
                  <text x="110" y="590" className="text-sm fill-gray-700 dark:fill-gray-300">Each source-destination pair has a transportation cost (cᵢⱼ)</text>
                  
                  <circle cx="90" cy="615" r="8" fill="#F59E0B" />
                  <text x="110" y="620" className="text-sm fill-gray-700 dark:fill-gray-300">Decision variables (xᵢⱼ) represent quantities shipped from source to destination</text>
                  
                  <circle cx="90" cy="645" r="8" fill="#EC4899" />
                  <text x="110" y="650" className="text-sm fill-gray-700 dark:fill-gray-300">Balance condition: Σᵢ Sᵢ = Σⱼ Dⱼ (total supply = total demand)</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the relationship between sources and destinations in a transportation network, highlighting the flow of goods and the key characteristics of each.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">🎯 Source Identification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Look for locations where goods are produced or stored. These are your sources. Examples include factories, warehouses, and distribution centers.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">💡 Destination Identification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Look for locations where goods are consumed or needed. These are your destinations. Examples include stores, customers, and markets.
                  </p>
                </div>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">🔧 Count Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always count the number of sources (m) and destinations (n). The number of decision variables will be m × n.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Data Collection</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Ensure you have accurate supply and demand data. In real-world problems, this often requires coordination with multiple departments.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, sources and destinations may change over time. Seasonality, demand fluctuations, and supply chain disruptions require dynamic management of sources and destinations.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Misidentifying Sources and Destinations</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Confusing sources (supply points) with destinations (demand points). Remember: sources supply goods, destinations receive goods.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Supply/Demand Values</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Using wrong supply or demand values. Always verify data accuracy before solving the problem.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting to Check Balance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not verifying that total supply equals total demand. Always check ΣSᵢ = ΣDⱼ before solving.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Real-World Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting that sources and destinations may have additional constraints like capacity, time windows, or handling limitations.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students assume that all sources are identical and all destinations are identical. In reality, each source and destination has unique characteristics that affect transportation decisions.
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">📝 Source Identification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>List all potential supply points</li>
                    <li>Verify supply capacities</li>
                    <li>Document source characteristics</li>
                    <li>Consider seasonality and variations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">📝 Destination Identification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>List all demand points</li>
                    <li>Verify demand requirements</li>
                    <li>Document destination characteristics</li>
                    <li>Consider demand fluctuations</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">🔍 Data Validation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify all supply and demand values</li>
                    <li>Check for data consistency</li>
                    <li>Validate with stakeholders</li>
                    <li>Document data sources</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">🎯 Practical Considerations</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Consider real-world constraints</li>
                    <li>Include all relevant factors</li>
                    <li>Plan for uncertainty</li>
                    <li>Monitor and update regularly</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, maintaining an accurate and up-to-date list of sources and destinations is crucial for effective supply chain management. Regular data validation and stakeholder communication are essential best practices.
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Source Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what sources are and their characteristics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Destination Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what destinations are and their characteristics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Source-Destination Relationship</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand how sources and destinations are connected</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can check if total supply equals total demand</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Real-World Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify sources and destinations in real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Sources and destinations are the foundation of any transportation problem. When I teach this to my students in Kolkata, I emphasize that understanding these concepts is like knowing the 'who' and 'where' of the problem. Susmita from Barrackpore found that clearly defining her sources (warehouses) and destinations (retail stores) was the key to solving her distribution challenges. Remember: A problem is only as good as its data—accurate sources and destinations lead to accurate solutions."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Sources and Destinations FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Sources and Destinations"
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