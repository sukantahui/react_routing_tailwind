// Topic6.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
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
    { id: 'introduction', title: 'Introduction to Numerical Exercises' },
    { id: 'problem1', title: 'Problem 1: Simple 3×3 NW Corner' },
    { id: 'problem2', title: 'Problem 2: 2×3 Least Cost' },
    { id: 'problem3', title: 'Problem 3: 3×4 VAM' },
    { id: 'problem4', title: 'Problem 4: Degeneracy Example' },
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
            Topic 6
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent">
            Numerical Exercises
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Practice problems to master the concepts of initial basic feasible solutions in transportation problems
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
              activeSection &ge; 0 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Introduction to Numerical Exercises</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <p>
                  This topic presents a collection of numerical exercises designed to help you practice finding initial basic feasible solutions using different methods. Working through these problems step by step will reinforce your understanding of the allocation procedures and build your confidence in solving transportation problems.
                </p>

                <div className="my-6 p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg border-l-4 border-fuchsia-500">
                  <p className="font-medium text-fuchsia-800 dark:text-fuchsia-300">
                    💡 Key Insight: Practice makes perfect. The more problems you solve, the more comfortable you'll become with the allocation procedures and the easier it will be to handle any transportation problem.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">How to Use These Exercises</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Solve First:</strong> Try to solve each problem on your own before looking at the solution</li>
                  <li><strong>Step by Step:</strong> Follow the allocation procedure systematically</li>
                  <li><strong>Verify:</strong> Check your work by verifying row and column sums</li>
                  <li><strong>Compare:</strong> Compare different methods for the same problem</li>
                  <li><strong>Learn:</strong> Understand why each allocation was made</li>
                </ul>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata learns transportation problems, she finds that working through examples is the best way to understand the concepts. Each solved problem builds her confidence for the next one.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem 1: NW Corner */}
          <section
            ref={(el) => (sectionRefs.current[1] = el)}
            data-index="1"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-100',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection &ge; 1 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Problem 1: Simple 3×3 NW Corner</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Problem Statement</h3>
                <p>
                  Find the initial basic feasible solution for the following transportation problem using the North-West Corner Rule.
                </p>

                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Source \ Destination</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₁</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₂</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₃</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">9</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">10</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">7</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">11</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                      </tr>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">120</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Solution</h4>
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>Cell (1,1):</strong> min(50, 40) = 40 → S₁ left: 10, D₁: 0</li>
                    <li><strong>Cell (1,2):</strong> min(10, 50) = 10 → S₁: 0, D₂ left: 40</li>
                    <li><strong>Cell (2,2):</strong> min(40, 40) = 40 → S₂: 0, D₂: 0</li>
                    <li><strong>Cell (3,3):</strong> min(30, 30) = 30 → S₃: 0, D₃: 0</li>
                  </ol>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                    Allocations: x₁₁=40, x₁₂=10, x₂₂=40, x₃₃=30
                  </p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Total Cost = 40×8 + 10×6 + 40×7 + 30×6 = 320 + 60 + 280 + 180 = ₹840
                  </p>
                </div>

                <div className="my-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Check:</strong> Row sums: S₁=50, S₂=40, S₃=30 ✓ | Column sums: D₁=40, D₂=50, D₃=30 ✓ | Allocations: 4 (m+n-1=5) → <span className="font-bold text-red-600">Degenerate!</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem 2: Least Cost */}
          <section
            ref={(el) => (sectionRefs.current[2] = el)}
            data-index="2"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-200',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection &ge; 2 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Problem 2: 2×3 Least Cost Method</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Problem Statement</h3>
                <p>
                  Find the initial basic feasible solution using the Least Cost Method for the following problem.
                </p>

                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Source \ Destination</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₁</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₂</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₃</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">12</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">10</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">60</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">9</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">11</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">7</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                      </tr>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">110</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Solution</h4>
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>Cheapest cell (2,3):</strong> min(50, 40) = 40 → S₂ left: 10, D₃: 0</li>
                    <li><strong>Next cheapest (1,2):</strong> min(60, 30) = 30 → S₁ left: 30, D₂: 0</li>
                    <li><strong>Next cheapest (2,1):</strong> min(10, 40) = 10 → S₂: 0, D₁ left: 30</li>
                    <li><strong>Next cheapest (1,1):</strong> min(30, 30) = 30 → S₁: 0, D₁: 0</li>
                  </ol>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                    Allocations: x₂₃=40, x₁₂=30, x₂₁=10, x₁₁=30
                  </p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Total Cost = 40×7 + 30×8 + 10×9 + 30×12 = 280 + 240 + 90 + 360 = ₹970
                  </p>
                </div>

                <div className="my-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Check:</strong> Row sums: S₁=60, S₂=50 ✓ | Column sums: D₁=40, D₂=30, D₃=40 ✓ | Allocations: 4 (m+n-1=4) → <span className="font-bold text-green-600">Non-degenerate!</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem 3: VAM */}
          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            data-index="3"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-300',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection &ge; 3 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Problem 3: 3×4 VAM</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Problem Statement</h3>
                <p>
                  Find the initial basic feasible solution using Vogel's Approximation Method (VAM) for the following problem.
                </p>

                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Source \ Destination</th>
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
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">3</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">7</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">60</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">4</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">2</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">4</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">3</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                      </tr>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">150</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Solution (VAM)</h4>
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>Row penalties:</strong> (2,2,1) | <strong>Column penalties:</strong> (1,1,4,2) → Highest: D₃ (4)</li>
                    <li><strong>Allocate to cheapest in D₃ (S₂):</strong> min(50, 30) = 30 → S₂ left: 20, D₃: 0</li>
                    <li><strong>Recalculate:</strong> Row penalties: (2,2,1) | Col penalties: (1,1,2) → Highest: D₃ (2)</li>
                    <li><strong>Allocate to cheapest in D₃ (S₁):</strong> min(60, 30) = 30 → S₁ left: 30, D₃: 0</li>
                    <li><strong>Continue until complete...</strong></li>
                  </ol>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                    Final Allocations: x₂₃=30, x₁₄=30, x₂₁=20, x₁₂=30, x₃₂=20, x₃₄=10, x₃₃=10
                  </p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Total Cost = ₹ (calculated from allocations)
                  </p>
                </div>

                <div className="my-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Note:</strong> VAM typically gives the best initial solution, closest to the optimal cost. This problem has 6 allocations (m+n-1 = 3+4-1 = 6) → <span className="font-bold text-green-600">Non-degenerate!</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Problem 4: Degeneracy */}
          <section
            ref={(el) => (sectionRefs.current[4] = el)}
            data-index="4"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-400',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection &ge; 4 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Problem 4: Degeneracy Example</h2>
              
              <div className="prose prose-fuchsia dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Problem Statement</h3>
                <p>
                  Find the initial basic feasible solution and handle degeneracy using the epsilon method.
                </p>

                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Source \ Destination</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₁</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₂</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₃</th>
                        <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">4</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">8</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">9</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">7</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">10</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">20</td>
                      </tr>
                      <tr className="bg-gray-100 dark:bg-gray-600">
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">90</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Solution with Degeneracy</h4>
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><strong>NW Corner allocations:</strong> (1,1)=30, (1,2)=0, (2,2)=30, (2,3)=10, (3,3)=10</li>
                    <li><strong>Count allocations:</strong> 4 positive allocations</li>
                    <li><strong>Required:</strong> m+n-1 = 3+3-1 = 5</li>
                    <li><strong>Degeneracy detected!</strong> Need to add epsilon</li>
                    <li><strong>Add ε to cell (2,1):</strong> x₂₁ = ε</li>
                    <li><strong>Now allocations:</strong> 5 = m+n-1 → Degeneracy resolved!</li>
                  </ol>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">
                    Final Allocations: x₁₁=30, x₂₂=30, x₂₃=10, x₃₃=10, x₂₁=ε
                  </p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Total Cost = 30×6 + 30×9 + 10×7 + 10×5 + ε×5 ≈ 180 + 270 + 70 + 50 = ₹570
                  </p>
                </div>

                <div className="my-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    ⚠️ <strong>Important:</strong> This example shows how degeneracy occurs and how epsilon (ε) is used to resolve it. The epsilon allocation has effectively zero cost but provides the needed basic variable.
                  </p>
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
              activeSection &ge; 5 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">🎯 Systematic Approach</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Follow the allocation procedure step by step. Don't skip steps or rush through the process.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">💡 Verify After Each Step</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Check row and column sums after each allocation to catch errors early.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Compare Methods</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    For the same problem, try different methods and compare the total costs. This builds intuition about which method to use.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">⚡ Practice Regularly</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    The more problems you solve, the faster and more accurate you'll become. Practice with different sizes and types of problems.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> Mahima from Kolkata found that practicing with different methods helped her understand when to use each one. She now instinctively knows whether NW Corner, Least Cost, or VAM is best for any given problem.
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
              activeSection &ge; 6 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Common Mistakes</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect min Calculation</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Using wrong values for min(Sᵢ, Dⱼ). Always use the current remaining values, not the original ones.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Updating Values</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting to update supplies and demands after each allocation. This leads to incorrect subsequent allocations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Handling Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Ignoring degeneracy and continuing with optimization. Always resolve degeneracy first.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Cost Calculation Errors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Making arithmetic errors when calculating total cost. Double-check all multiplications and additions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is rushing through the allocation process and missing updates. Take your time and verify each step before moving to the next one.
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
              activeSection &ge; 7 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">📝 Problem Setup</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Copy the problem data clearly</li>
                    <li>Check balance condition first</li>
                    <li>Label all rows and columns correctly</li>
                    <li>Add dummies if needed</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">🔍 Solution Process</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Follow the chosen method systematically</li>
                    <li>Track remaining supplies and demands</li>
                    <li>Cross out completed rows/columns</li>
                    <li>Verify after each allocation</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">📚 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Check row sums equal supplies</li>
                    <li>Check column sums equal demands</li>
                    <li>Count allocations (should be m+n-1)</li>
                    <li>Calculate total cost</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                  <h4 className="font-semibold text-fuchsia-700 dark:text-fuchsia-300">🎯 Learning</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Compare different methods</li>
                    <li>Understand why allocations are made</li>
                    <li>Practice with varied problems</li>
                    <li>Review and learn from mistakes</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In practice, optimization software handles the allocation process automatically. However, understanding the manual process is crucial for interpreting results and debugging issues. Susmita from Barrackpore always reviews the allocation steps to ensure her software is working correctly.
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
              activeSection &ge; 8 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          &gt;
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Problem Setup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can set up a transportation problem correctly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Method Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply NW Corner, Least Cost, and VAM correctly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Degeneracy Handling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify and handle degeneracy with epsilon</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify my solution is correct</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Cost Calculation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can calculate the total transportation cost accurately</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Numerical exercises are the bridge between theory and practice. When I teach this to my students in Kolkata, I emphasize that working through problems is the only way to truly master transportation problem solving. Abhronila from Jadavpur solved over 50 problems before she felt truly confident. Susmita from Barrackpore found that practicing with different methods helped her develop intuition for which method to use. Remember: Each problem you solve builds your skills and confidence. Keep practicing, and the concepts will become second nature."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Numerical Exercises FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic6_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic6;