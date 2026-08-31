// Topic8.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
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
    { id: 'introduction', title: 'Introduction to Transportation Table Formulation' },
    { id: 'structure', title: 'Structure of the Transportation Table' },
    { id: 'steps', title: 'Step-by-Step Formulation' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-fuchsia-700 dark:text-fuchsia-300 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full">
            Topic 8
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent">
            Formulation of Transportation Tables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learning how to systematically construct and formulate transportation tables for optimization problems
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Introduction to Transportation Table Formulation</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The transportation table is the fundamental tool for organizing and solving transportation problems. It provides a structured format that brings together all the essential components—sources, destinations, costs, supplies, and demands—in a single, easy-to-read layout. Mastering the formulation of transportation tables is essential for solving any transportation problem efficiently.
                </p>

                <div className="my-6 p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border-l-4 border-fuchsia-500">
                  <p className="font-medium text-fuchsia-800 dark:text-fuchsia-300">
                    💡 Key Insight: The transportation table is like a map of your logistics network. It shows exactly where goods come from, where they need to go, and what it costs to move them.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is a Transportation Table?</h3>
                <p>
                  A transportation table is a matrix format that organizes all the data needed to solve a transportation problem. It has sources (supply points) as rows and destinations (demand points) as columns. The cells contain transportation costs, and the margins show supply and demand values.
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
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₁₄</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">S₁</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₂₄</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">S₂</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">c₃₄</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">S₃</td>
                      </tr>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">D₄</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold"></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Example Transportation Table: 3 sources × 4 destinations</p>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Debangshu in Ichapur plans his distribution network, he starts by drawing a transportation table. This helps him visualize the entire problem and ensures he doesn't miss any important data.
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Structure of the Transportation Table</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Table Components</h3>
                <p>
                  A well-structured transportation table consists of several key components that work together to represent the entire problem.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Rows (Sources)</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each row represents a source</li>
                      <li>Contains costs to all destinations</li>
                      <li>Supply value at row end</li>
                      <li>Labeled as S₁, S₂, ..., Sₘ</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Columns (Destinations)</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each column represents a destination</li>
                      <li>Contains costs from all sources</li>
                      <li>Demand value at column bottom</li>
                      <li>Labeled as D₁, D₂, ..., Dₙ</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Cost Cells</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each cell contains cᵢⱼ</li>
                      <li>Cost from source i to destination j</li>
                      <li>Located at row i, column j</li>
                      <li>Used in objective function</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h4 className="font-semibold text-amber-700 dark:text-amber-300">Margins</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Supply values on the right</li>
                      <li>Demand values at the bottom</li>
                      <li>Total supply at bottom-right</li>
                      <li>Total demand at bottom-right</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Key Features</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Dimensions:</strong> m × n where m = sources, n = destinations</li>
                  <li><strong>Total Supply:</strong> Sum of all supply values (ΣSᵢ)</li>
                  <li><strong>Total Demand:</strong> Sum of all demand values (ΣDⱼ)</li>
                  <li><strong>Balance Check:</strong> Compare total supply and demand</li>
                  <li><strong>Decision Variables:</strong> xᵢⱼ represent shipments in cells</li>
                </ul>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> The transportation table is read as "cost from row source to column destination." Always verify the orientation to avoid errors in formulation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Steps Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Step-by-Step Formulation</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-fuchsia-500 text-white rounded-full font-bold">1</span>
                    <div>
                      <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Identify All Sources and Destinations</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        List all supply points (sources) and demand points (destinations) in the problem. Count them to determine table dimensions.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Sources: S₁, S₂, ..., Sₘ (m sources)<br/>
                        Destinations: D₁, D₂, ..., Dₙ (n destinations)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-fuchsia-500 text-white rounded-full font-bold">2</span>
                    <div>
                      <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Create the Table Structure</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Draw a table with m rows (sources) and n columns (destinations). Add an extra column for supply and an extra row for demand.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        m rows × n columns + supply column + demand row
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-fuchsia-500 text-white rounded-full font-bold">3</span>
                    <div>
                      <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Populate the Cost Matrix</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Enter the unit transportation costs (cᵢⱼ) in each cell of the table. Each cell (i, j) contains the cost from source i to destination j.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        cᵢⱼ = cost from Sᵢ to Dⱼ
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-fuchsia-500 text-white rounded-full font-bold">4</span>
                    <div>
                      <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Add Supply and Demand Values</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Enter the supply capacity for each source in the right margin and the demand requirement for each destination in the bottom margin.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Supply: S₁, S₂, ..., Sₘ on the right<br/>
                        Demand: D₁, D₂, ..., Dₙ at the bottom
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-fuchsia-500 text-white rounded-full font-bold">5</span>
                    <div>
                      <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Check Balance Condition</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Verify that total supply equals total demand. If not, add dummy sources or destinations to balance the problem.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        ΣSᵢ = ΣDⱼ? ✓ Balanced / ✗ Unbalanced → Add dummy
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-fuchsia-500 text-white rounded-full font-bold">6</span>
                    <div>
                      <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Add Dummy (if needed)</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        If supply &gt; demand, add a dummy destination column. If demand &gt; supply, add a dummy source row. Set all dummy costs to zero.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Surplus supply → Dummy destination<br/>
                        Excess demand → Dummy source
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you change the order of rows or columns? The solution may change in appearance but the optimal cost remains the same. The table is just a representation!
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Example 1: Manufacturing Distribution Table</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata has 3 factories and 4 distribution centers.
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
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹45</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹52</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹38</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹60</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">100</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory B</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹55</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹42</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹48</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹35</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">150</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Factory C</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹40</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹50</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹62</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹44</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">120</td>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">80</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">90</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">100</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">100</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">370</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Total Supply = 370, Total Demand = 370 → Balanced problem. Table is ready for solution methods.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Example 2: Agricultural Distribution Table</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative in Barrackpore distributes produce from 4 farms to 5 markets.
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
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
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
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">150</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 2</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹16</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹11</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹13</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹20</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹17</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">200</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 3</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹14</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹18</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹9</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹15</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹12</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">180</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Farm 4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹19</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹13</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹16</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹10</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹21</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">220</td>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">120</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">150</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">180</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">100</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">200</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">750</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply = 750, Demand = 750 → Balanced. Table clearly shows all costs and constraints.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Example 3: Healthcare Supply Table with Dummy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network has 2 warehouses and 5 hospitals with a supply shortage.
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
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
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
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">300</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">WH₂</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹140</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹110</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹130</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹160</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">₹90</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">350</td>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">150</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">180</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">200</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">120</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">100</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">750</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded text-sm">
                    <p className="font-medium text-rose-700 dark:text-rose-300">⚠️ Note:</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply = 650, Demand = 750 → Deficit of 100. Dummy source needed with supply 100 and zero costs.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">Example 4: Educational Resources Table</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes books from 3 distribution centers to 6 schools.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Table Summary:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 mt-2">
                      <li><strong>Sources:</strong> 3 distribution centers with supplies: 1000, 800, 1200 books</li>
                      <li><strong>Destinations:</strong> 6 schools with demands: 500, 450, 600, 400, 350, 700 books</li>
                      <li><strong>Costs:</strong> Vary by distance and delivery method (₹20-₹40 per box)</li>
                      <li><strong>Balance:</strong> Supply = 3000, Demand = 3000 → Balanced</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">The table provides complete information for optimization. Costs can be filled based on actual data.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Transportation Table Formulation</text>
                  
                  {/* Table Structure */}
                  <rect x="50" y="70" width="850" height="280" rx="15" fill="#D946EF" fillOpacity="0.1" stroke="#D946EF" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-lg font-bold fill-fuchsia-600 dark:fill-fuchsia-400">Transportation Table Structure</text>
                  
                  {/* Table Grid */}
                  <rect x="100" y="125" width="750" height="200" rx="5" fill="white" dark:fill="#1F2937" stroke="#D946EF" strokeWidth="1.5" />
                  
                  {/* Column Headers */}
                  <text x="170" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₁</text>
                  <text x="260" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₂</text>
                  <text x="350" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₃</text>
                  <text x="440" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">D₄</text>
                  <text x="530" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">... Dₙ</text>
                  
                  <text x="640" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">Supply</text>
                  <text x="780" y="150" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">Sᵢ</text>
                  
                  {/* Grid Lines */}
                  <line x1="160" y1="155" x2="160" y2="320" stroke="#D946EF" strokeWidth="1" />
                  <line x1="250" y1="155" x2="250" y2="320" stroke="#D946EF" strokeWidth="1" />
                  <line x1="340" y1="155" x2="340" y2="320" stroke="#D946EF" strokeWidth="1" />
                  <line x1="430" y1="155" x2="430" y2="320" stroke="#D946EF" strokeWidth="1" />
                  <line x1="520" y1="155" x2="520" y2="320" stroke="#D946EF" strokeWidth="1" />
                  <line x1="630" y1="155" x2="630" y2="320" stroke="#D946EF" strokeWidth="1" />
                  <line x1="720" y1="155" x2="720" y2="320" stroke="#D946EF" strokeWidth="1" />
                  
                  <line x1="100" y1="160" x2="850" y2="160" stroke="#D946EF" strokeWidth="1" />
                  <line x1="100" y1="195" x2="850" y2="195" stroke="#D946EF" strokeWidth="1" />
                  <line x1="100" y1="230" x2="850" y2="230" stroke="#D946EF" strokeWidth="1" />
                  <line x1="100" y1="265" x2="850" y2="265" stroke="#D946EF" strokeWidth="1" />
                  <line x1="100" y1="300" x2="850" y2="300" stroke="#D946EF" strokeWidth="1" />
                  
                  {/* Row Headers */}
                  <text x="130" y="185" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">S₁</text>
                  <text x="130" y="220" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">S₂</text>
                  <text x="130" y="255" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">...</text>
                  <text x="130" y="290" textAnchor="middle" className="text-xs font-bold fill-gray-700 dark:fill-gray-300">Sₘ</text>
                  
                  {/* Cost Cells */}
                  <text x="205" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₁</text>
                  <text x="295" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₂</text>
                  <text x="385" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₃</text>
                  <text x="475" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₄</text>
                  <text x="565" y="185" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">...</text>
                  <text x="675" y="185" textAnchor="middle" className="text-xs font-bold fill-green-600 dark:fill-green-400">S₁</text>
                  
                  <text x="205" y="220" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₁</text>
                  <text x="295" y="220" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₂</text>
                  <text x="385" y="220" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₃</text>
                  <text x="475" y="220" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₄</text>
                  <text x="565" y="220" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">...</text>
                  <text x="675" y="220" textAnchor="middle" className="text-xs font-bold fill-green-600 dark:fill-green-400">S₂</text>
                  
                  <text x="385" y="290" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">cₘₙ</text>
                  <text x="675" y="290" textAnchor="middle" className="text-xs font-bold fill-green-600 dark:fill-green-400">Sₘ</text>
                  
                  {/* Bottom Row */}
                  <text x="170" y="315" textAnchor="middle" className="text-xs font-bold fill-orange-600 dark:fill-orange-400">D₁</text>
                  <text x="260" y="315" textAnchor="middle" className="text-xs font-bold fill-orange-600 dark:fill-orange-400">D₂</text>
                  <text x="350" y="315" textAnchor="middle" className="text-xs font-bold fill-orange-600 dark:fill-orange-400">D₃</text>
                  <text x="440" y="315" textAnchor="middle" className="text-xs font-bold fill-orange-600 dark:fill-orange-400">D₄</text>
                  <text x="530" y="315" textAnchor="middle" className="text-xs font-bold fill-orange-600 dark:fill-orange-400">... Dₙ</text>
                  
                  <text x="675" y="315" textAnchor="middle" className="text-xs font-bold fill-purple-600 dark:fill-purple-400">ΣS=ΣD</text>
                  
                  {/* Key Points Box */}
                  <rect x="50" y="380" width="850" height="150" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="415" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Key Points for Table Formulation</text>
                  
                  <circle cx="90" cy="445" r="8" fill="#D946EF" />
                  <text x="110" y="450" className="text-sm fill-gray-700 dark:fill-gray-300">Rows = Sources, Columns = Destinations</text>
                  
                  <circle cx="90" cy="475" r="8" fill="#10B981" />
                  <text x="110" y="480" className="text-sm fill-gray-700 dark:fill-gray-300">Cells = Costs (cᵢⱼ), Margins = Supply/Demand</text>
                  
                  <circle cx="520" cy="445" r="8" fill="#F97316" />
                  <text x="540" y="450" className="text-sm fill-gray-700 dark:fill-gray-300">Check Balance: ΣSᵢ = ΣDⱼ</text>
                  
                  <circle cx="520" cy="475" r="8" fill="#3B82F6" />
                  <text x="540" y="480" className="text-sm fill-gray-700 dark:fill-gray-300">Add Dummies if Unbalanced</text>
                  
                  {/* Formulation Steps Box */}
                  <rect x="50" y="560" width="850" height="170" rx="15" fill="#D946EF" fillOpacity="0.1" stroke="#D946EF" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="595" textAnchor="middle" className="text-base font-bold fill-fuchsia-600 dark:fill-fuchsia-400">Formulation Steps</text>
                  
                  <rect x="80" y="615" width="250" height="95" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#D946EF" strokeWidth="1.5" />
                  <text x="205" y="640" textAnchor="middle" className="text-sm font-bold fill-fuchsia-600 dark:fill-fuchsia-400">Step 1-2</text>
                  <text x="205" y="660" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Identify Sources</text>
                  <text x="205" y="680" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Create Table Structure</text>
                  
                  <rect x="350" y="615" width="250" height="95" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#D946EF" strokeWidth="1.5" />
                  <text x="475" y="640" textAnchor="middle" className="text-sm font-bold fill-fuchsia-600 dark:fill-fuchsia-400">Step 3-4</text>
                  <text x="475" y="660" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Populate Costs</text>
                  <text x="475" y="680" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Add Supply/Demand</text>
                  
                  <rect x="620" y="615" width="250" height="95" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#D946EF" strokeWidth="1.5" />
                  <text x="745" y="640" textAnchor="middle" className="text-sm font-bold fill-fuchsia-600 dark:fill-fuchsia-400">Step 5-6</text>
                  <text x="745" y="660" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Check Balance</text>
                  <text x="745" y="680" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Add Dummies if Needed</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the complete structure of a transportation table and the step-by-step process for formulating it correctly.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">🎯 Consistent Ordering</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Keep sources and destinations in a consistent order. This makes the table easier to read and reduces errors in cost entry.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">💡 Use Short Names</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use clear, short names for sources and destinations (e.g., W1, S2, StoreA). This makes the table compact and readable.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Highlight Balance</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    After filling the table, check the balance condition by comparing total supply and total demand. Highlight any imbalance to avoid missing it.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">⚡ Cost Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Double-check all cost entries against source documents. A single incorrect cost can lead to suboptimal solutions.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, transportation tables are often created using spreadsheet software with formulas to automatically calculate totals and check balance. Mahima from Kolkata uses Excel templates that validate data entry and flag any inconsistencies.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Row-Column Orientation</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Placing sources as columns and destinations as rows. The standard is sources as rows, destinations as columns.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Cost Placement</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Putting costs in the wrong cells. Always verify that cᵢⱼ is in row i, column j (cost from source i to destination j).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting Supply/Demand Values</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Leaving out supply values in the margin or demand values at the bottom. These are essential for the problem.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Checking Balance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting to verify that total supply equals total demand before proceeding to solution methods.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> A common mistake is mixing up the order of sources and destinations when creating the table. Always double-check that the table matches your problem statement exactly.
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">📝 Table Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use a consistent naming convention</li>
                    <li>Organize sources and destinations logically</li>
                    <li>Leave space for dummy rows/columns</li>
                    <li>Double-check all entries</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">🔍 Data Validation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify all costs are non-negative</li>
                    <li>Check that supplies and demands are positive</li>
                    <li>Validate balance condition</li>
                    <li>Cross-check with source data</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document all assumptions</li>
                    <li>Record data sources</li>
                    <li>Note any modifications</li>
                    <li>Keep backup copies</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">🎯 Table Maintenance</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Update tables when data changes</li>
                    <li>Review regularly for accuracy</li>
                    <li>Version control important</li>
                    <li>Share with stakeholders</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, transportation tables are often integrated with ERP systems. Data is automatically pulled from multiple sources, and tables are generated programmatically to ensure accuracy and consistency.
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
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Table Structure</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the structure of a transportation table</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Component Identification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify all components: rows, columns, costs, margins</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Table Creation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can systematically create a transportation table from data</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify the balance condition in the table</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dummy Handling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to add dummies to the table if needed</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The transportation table is the foundation of all transportation problem solving. When I teach this to my students in Kolkata, I emphasize that a well-constructed table is already half the solution. Susmita from Barrackpore learned that spending extra time on table formulation saved her hours of debugging later. Abhronila from Jadavpur discovered that a clear table helped her explain complex logistics problems to non-technical stakeholders. Remember: A good table tells the whole story—sources, destinations, costs, and constraints—in one simple view."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Formulation of Transportation Tables FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Formulation of Transportation Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic8_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic8;