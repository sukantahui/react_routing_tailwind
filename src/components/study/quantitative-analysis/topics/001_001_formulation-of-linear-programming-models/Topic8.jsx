import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8: Worked Example 2 – Product-mix problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic8 component
 *
 * @purpose Provides a complete, step-by-step worked example of formulating a
 * Linear Programming model for a product-mix problem with 3 products and 3 resources,
 * building on the concepts from Topic7.
 *
 * @when_used After mastering the simple production problem (Topic7), this topic
 * introduces a more complex product-mix scenario with multiple products and resources.
 */
const Topic8 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 8
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 2
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 2: Product-Mix Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Choosing the optimal combination of products to maximize profit — a
          more complex production scenario with three products and three resources.
        </p>
      </header>

      {/* ===== SECTION 1: PROBLEM STATEMENT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Problem Statement
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
              A manufacturing company produces <strong>three products</strong>:
              <strong> Product A</strong>, <strong>Product B</strong>, and{" "}
              <strong>Product C</strong>. The company has <strong>three limited
              resources</strong>: Labor, Machine Time, and Raw Material.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product A</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product B</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product C</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Machine (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">80</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Material (kg)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">120</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per unit:</strong> Product A ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹40</span>,
                Product B = <span className="font-mono text-green-600 dark:text-green-400">₹35</span>,
                Product C = <span className="font-mono text-green-600 dark:text-green-400">₹50</span>
              </li>
              <li>
                The company wants to <strong>maximize total profit</strong>.
              </li>
              <li>
                No minimum demand requirements (unlike Topic7).
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine how many units of each product
                to produce to maximize total profit, subject to labor, machine,
                and material constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: COMPARISON WITH TOPIC7 ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How This Builds on Topic7
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              feature: "Number of Products",
              topic7: "2 (Tables, Chairs)",
              topic8: "3 (Products A, B, C)",
            },
            {
              feature: "Number of Resources",
              topic7: "2 (Carpentry, Finishing)",
              topic8: "3 (Labor, Machine, Material)",
            },
            {
              feature: "Profit per Unit",
              topic7: "₹40, ₹25",
              topic8: "₹40, ₹35, ₹50",
            },
            {
              feature: "Demand Constraint",
              topic7: "Yes (x₂ ≥ 10)",
              topic8: "No",
            },
            {
              feature: "Complexity Level",
              topic7: "Beginner",
              topic8: "Intermediate",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.feature}</h3>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Topic 7: {item.topic7}</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Topic 8: {item.topic8}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key takeaway:</strong> The formulation procedure remains the
            same! More products and resources just mean <strong>more variables
            and constraints</strong> — the structure is identical.
          </p>
        </div>
      </section>

      {/* ===== SECTION 3: STEP-BY-STEP FORMULATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔢</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Step-by-Step Formulation
          </h2>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Read and Understand</h3>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Goal:</strong> Maximize profit.</li>
                  <li><strong>Products:</strong> A, B, C (3 products).</li>
                  <li><strong>Resources:</strong> Labor (100 hrs), Machine (80 hrs), Material (120 kg).</li>
                  <li><strong>No demand constraints</strong> — unlike Topic7.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 products, 3 resources, profit maximization goal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Identify Decision Variables</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <p>x₁ = number of units of Product A produced</p>
                  <p>x₂ = number of units of Product B produced</p>
                  <p>x₃ = number of units of Product C produced</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium">Why?</span> These are the quantities
                  the company can control — how many of each product to make.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">3</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Identify the Objective</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <p>Maximize Z = 40x₁ + 35x₂ + 50x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Profit per unit A = <span className="font-mono">₹40</span></li>
                  <li>Profit per unit B = <span className="font-mono">₹35</span></li>
                  <li>Profit per unit C = <span className="font-mono">₹50</span></li>
                  <li>We want to <strong>maximize</strong> total profit.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">4</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Identify Constraints</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded space-y-1">
                  <p>Labor: 2x₁ + 3x₂ + 4x₃ ≤ 100</p>
                  <p>Machine: 3x₁ + 2x₂ + 1x₃ ≤ 80</p>
                  <p>Material: 4x₁ + 2x₂ + 3x₃ ≤ 120</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Labor:</strong> Each product uses 2, 3, and 4 hours respectively.</li>
                  <li><strong>Machine:</strong> Each product uses 3, 2, and 1 hours respectively.</li>
                  <li><strong>Material:</strong> Each product uses 4, 2, and 3 kg respectively.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">5</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Add Non-Negativity</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <p>x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Cannot produce negative quantities of any product.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">6</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Review and Validate</h3>
                <div className="mt-1 space-y-2">
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">
                      Test: x₁ = 0, x₂ = 0, x₃ = 20 (produce 20 units of Product C)
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 2(0) + 3(0) + 4(20) = 80 ≤ 100 ✅
                      <br />
                      Machine: 3(0) + 2(0) + 1(20) = 20 ≤ 80 ✅
                      <br />
                      Material: 4(0) + 2(0) + 3(20) = 60 ≤ 120 ✅
                      <br />
                      All variables ≥ 0 ✅
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✅ Feasible solution found! The model is consistent.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">
                      Test: x₁ = 20, x₂ = 10, x₃ = 5
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 2(20) + 3(10) + 4(5) = 40 + 30 + 20 = 90 ≤ 100 ✅
                      <br />
                      Machine: 3(20) + 2(10) + 1(5) = 60 + 20 + 5 = 85 ≤ 80 ❌
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      ❌ Infeasible! Machine hours exceeded. This tells us we need to adjust the mix.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">7</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Document and Label</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Final LP Model:</p>
                  <p>Maximize Z = 40x₁ + 35x₂ + 50x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Labor: 2x₁ + 3x₂ + 4x₃ ≤ 100</p>
                  <p className="pl-4">Machine: 3x₁ + 2x₂ + x₃ ≤ 80</p>
                  <p className="pl-4">Material: 4x₁ + 2x₂ + 3x₃ ≤ 120</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    where x₁ = Product A, x₂ = Product B, x₃ = Product C
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium">Assumptions:</span> Linear
                  relationships, all resources available, profit per unit constant,
                  no demand constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: VISUALIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Visualizing the Product-Mix Problem
          </h2>
        </div>
        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 600 350"
            className="w-full h-auto"
            aria-label="Product-mix problem visualization with three products"
            role="img"
          >
            <rect x="0" y="0" width="600" height="350" fill="none" />

            {/* Three axes representing products */}
            <line x1="50" y1="300" x2="550" y2="300" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="300" x2="50" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="300" x2="300" y2="30" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />

            <text x="560" y="305" fontSize="12" fill="#475569" dark="#94a3b8" fontWeight="bold">Product A</text>
            <text x="30" y="20" fontSize="12" fill="#475569" dark="#94a3b8" fontWeight="bold">Product B</text>
            <text x="305" y="20" fontSize="12" fill="#475569" dark="#94a3b8" fontWeight="bold">Product C</text>

            {/* Resource planes (simplified visualization) */}
            {/* Labor constraint boundary */}
            <polygon
              points="50,300 200,300 200,150 50,150"
              fill="#ef4444"
              fillOpacity="0.08"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            >
              <animate attributeName="fillOpacity" values="0.05;0.1;0.05" dur="4s" repeatCount="indefinite" />
            </polygon>
            <text x="100" y="280" fontSize="10" fill="#ef4444">Labor</text>

            {/* Machine constraint boundary */}
            <polygon
              points="150,300 350,300 350,100 150,100"
              fill="#22c55e"
              fillOpacity="0.08"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            >
              <animate attributeName="fillOpacity" values="0.05;0.1;0.05" dur="4s" begin="0.5s" repeatCount="indefinite" />
            </polygon>
            <text x="250" y="280" fontSize="10" fill="#22c55e">Machine</text>

            {/* Material constraint boundary */}
            <polygon
              points="100,300 450,300 450,50 100,50"
              fill="#a855f7"
              fillOpacity="0.08"
              stroke="#a855f7"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            >
              <animate attributeName="fillOpacity" values="0.05;0.1;0.05" dur="4s" begin="1s" repeatCount="indefinite" />
            </polygon>
            <text x="400" y="280" fontSize="10" fill="#a855f7">Material</text>

            {/* Feasible region (intersection) */}
            <polygon
              points="50,300 120,300 180,180 180,100 120,100 50,150"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" begin="0.5s" repeatCount="indefinite" />
            </polygon>

            <text x="120" y="220" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="120" y="240" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            <circle cx="50" cy="300" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="300" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="180" cy="180" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="180" cy="100" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Products labels */}
            <text x="80" y="320" fontSize="10" fill="#475569" dark="#94a3b8">x₁ (A)</text>
            <text x="130" y="320" fontSize="10" fill="#475569" dark="#94a3b8">x₂ (B)</text>
            <text x="400" y="50" fontSize="10" fill="#475569" dark="#94a3b8">x₃ (C)</text>

            {/* Arrow showing profit direction */}
            <polygon points="520,250 540,235 540,265" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="255" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Profit</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region in 3D shows all possible production combinations.
            The optimal solution lies at one of the corner points.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: WHAT WE LEARN FROM THIS EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📈</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What We Learn from This Example
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "🎯",
              title: "Scaling the Formulation",
              desc: "The 7-step procedure works for any number of products and resources — the structure remains the same.",
            },
            {
              icon: "📊",
              title: "Resource Trade-offs",
              desc: "Products compete for limited resources; the optimal mix balances profitability against resource consumption.",
            },
            {
              icon: "🔢",
              title: "Variables and Constraints",
              desc: "More products = more variables; more resources = more constraints. Both grow with problem size.",
            },
            {
              icon: "💡",
              title: "Zero Production is Possible",
              desc: "Unlike Topic7, there's no minimum demand, so some products may be zero in the optimal mix.",
            },
            {
              icon: "✅",
              title: "Validation is Still Essential",
              desc: "Testing with feasible solutions catches errors regardless of problem size.",
            },
            {
              icon: "🔍",
              title: "Interpretation is Key",
              desc: "Understanding why a product is or isn't produced helps in decision-making.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Organize data in a table",
              desc: "A resource-product table (like the one above) makes it easy to identify coefficients.",
            },
            {
              title: "Check for dominating products",
              desc: "A product that uses fewer resources for more profit should dominate others.",
            },
            {
              title: "Look for omitted resources",
              desc: "Real problems often have more resources than initially stated — check carefully.",
            },
            {
              title: "Test extreme solutions",
              desc: "Try producing only one product to see if it's feasible.",
            },
            {
              title: "Use consistent units",
              desc: "All labor hours, machine hours, and material quantities must be in consistent units.",
            },
            {
              title: "Label everything",
              desc: "With more variables and constraints, labels become even more important.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 7: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
        </div>
        <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            {[
              {
                mistake: "Forgetting a resource constraint",
                fix: "List all resources before writing equations. Check the problem statement carefully.",
              },
              {
                mistake: "Swapping coefficients",
                fix: "Double-check which product uses which resources. A table helps.",
              },
              {
                mistake: "Using ≥ instead of ≤ for resources",
                fix: "Resources are limits — you cannot exceed them. Use ≤.",
              },
              {
                mistake: "Not validating with larger numbers",
                fix: "Test with a mix of products, not just extremes.",
              },
              {
                mistake: "Assuming all products should be produced",
                fix: "Product-mix problems may result in some products being zero. That's okay.",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0 mt-0.5">✗</span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.mistake}</span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">✓ {item.fix}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 8: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Create a resource-product table to organize data.",
            "Define variables clearly with product names and units.",
            "Write the objective function first, then constraints.",
            "Use consistent variable names across all equations.",
            "Label each constraint by resource name.",
            "Test the model with multiple feasible solutions.",
            "Check for omitted constraints (e.g., budget, demand).",
            "Document assumptions about linearity and constants.",
            "Review the model with a colleague or stakeholder.",
            "Use the 7-step procedure consistently.",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-green-500 dark:text-green-400 text-lg flex-shrink-0">✓</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 9: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> In the product-mix problem,
                if Product C has the highest profit (₹50) but uses the most
                labor (4 hours), is it always the best choice? Why or why not?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the profit of Product B
                increases to ₹60, how would the optimal product mix change?
                Which products might be affected?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila is a production
                manager in Ichapur. She has 4 products and 5 resources. How would
                she apply the 7-step procedure? What would be different from this
                example?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Mini Checklist
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            After working through this example, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Formulate a product-mix LP model with 3+ products and 3+ resources",
              "✅ Create a resource-product table to organize data",
              "✅ Identify decision variables with clear definitions",
              "✅ Write the objective function (maximize profit)",
              "✅ Formulate multiple resource constraints",
              "✅ Add non-negativity restrictions",
              "✅ Validate the model with multiple feasible solutions",
              "✅ Recognize when a product might be zero in the optimal mix",
              "✅ Apply the 7-step procedure to more complex problems",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 11: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <FAQTemplate
          title="Product-Mix Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Product-Mix Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic8_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "The product-mix problem is the bridge between simple two-product examples and real-world multi-product scenarios. I tell my students: 'Once you can formulate a product-mix problem, you can handle almost any production-related LP problem.' The key insight is that the 7-step procedure scales — it works for 2 products, 3 products, or 100 products. Mahima from Jadavpur once told me that after mastering this example, she felt confident tackling any LP word problem. Remember: organize your data in a table, define variables clearly, and always validate with feasible solutions. The product-mix problem teaches us that sometimes the best mix means not producing everything — and that's an important business lesson too."
          }
        />
      </div>
    </div>
  );
};

export default Topic8;