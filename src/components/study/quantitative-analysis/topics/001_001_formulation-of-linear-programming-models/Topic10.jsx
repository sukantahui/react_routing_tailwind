import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10: Worked Example 4 – Resource allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic10 component
 *
 * @purpose Provides a complete, step-by-step worked example of a resource
 * allocation problem where limited resources must be distributed across
 * competing activities to maximize total return.
 *
 * @when_used After profit maximization (Topic9), this topic explores a more
 * general resource allocation framework that applies to project selection,
 * budget allocation, and capacity planning.
 */
const Topic10 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 10
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 4
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 4: Resource Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Distributing limited resources across competing activities to maximize
          return — a fundamental LP application in project selection and
          capacity planning.
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
              A company has <strong>three types of resources</strong> to allocate
              across <strong>two projects</strong>:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Project 1</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Project 2</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">200</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Equipment (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">150</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Capital (₹)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1,500</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">100,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Return per unit:</strong> Project 1 ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹12,000</span>,
                Project 2 = <span className="font-mono text-green-600 dark:text-green-400">₹10,000</span>
              </li>
              <li>
                The company wants to <strong>maximize total return</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine how many units of each
                project to undertake to maximize total return, subject to
                labor, equipment, and capital constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: STEP-BY-STEP FORMULATION ===== */}
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
                  <li><strong>Goal:</strong> Maximize total return.</li>
                  <li><strong>Activities:</strong> Project 1 and Project 2 (2 activities).</li>
                  <li><strong>Resources:</strong> Labor (200 hrs), Equipment (150 hrs), Capital (₹100,000).</li>
                  <li><strong>No demand constraints</strong> — similar to previous topics.</li>
                </ul>
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
                  <p>x₁ = number of units of Project 1 undertaken</p>
                  <p>x₂ = number of units of Project 2 undertaken</p>
                </div>
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
                  <p>Maximize Z = 12,000x₁ + 10,000x₂</p>
                </div>
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
                  <p>Labor: 3x₁ + 2x₂ ≤ 200</p>
                  <p>Equipment: 2x₁ + 3x₂ ≤ 150</p>
                  <p>Capital: 2,000x₁ + 1,500x₂ ≤ 100,000</p>
                </div>
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
                  <p>x₁ ≥ 0, x₂ ≥ 0</p>
                </div>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 0, x₂ = 50</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 2(50) = 100 ≤ 200 ✓
                      <br />
                      Equipment: 3(50) = 150 ≤ 150 ✓
                      <br />
                      Capital: 1,500(50) = 75,000 ≤ 100,000 ✓
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 40, x₂ = 20</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 3(40) + 2(20) = 120 + 40 = 160 ≤ 200 ✓
                      <br />
                      Equipment: 2(40) + 3(20) = 80 + 60 = 140 ≤ 150 ✓
                      <br />
                      Capital: 2,000(40) + 1,500(20) = 80,000 + 30,000 = 110,000 ≤ 100,000 ✗
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">❌ Infeasible! Capital exceeded.</p>
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
                  <p>Maximize Z = 12,000x₁ + 10,000x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Labor: 3x₁ + 2x₂ ≤ 200</p>
                  <p className="pl-4">Equipment: 2x₁ + 3x₂ ≤ 150</p>
                  <p className="pl-4">Capital: 2,000x₁ + 1,500x₂ ≤ 100,000</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: GRAPHICAL SOLUTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Graphical Solution & Corner Point Analysis
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 600 500"
            className="w-full h-auto"
            aria-label="Graphical solution for resource allocation problem"
            role="img"
          >
            <rect x="0" y="0" width="600" height="500" fill="none" />

            {/* Axes */}
            <line x1="60" y1="430" x2="560" y2="430" stroke="#94a3b8" strokeWidth="2" />
            <line x1="60" y1="430" x2="60" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="570" y="450" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Project 1 (x₁)</text>
            <text x="30" y="20" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Project 2 (x₂)</text>

            {/* Scale marks */}
            <text x="60" y="445" fontSize="10" fill="#94a3b8">0</text>
            <text x="110" y="445" fontSize="10" fill="#94a3b8">25</text>
            <text x="160" y="445" fontSize="10" fill="#94a3b8">50</text>
            <text x="260" y="445" fontSize="10" fill="#94a3b8">100</text>
            <text x="360" y="445" fontSize="10" fill="#94a3b8">150</text>

            <text x="45" y="230" fontSize="10" fill="#94a3b8">25</text>
            <text x="45" y="130" fontSize="10" fill="#94a3b8">50</text>

            {/* Labor constraint: 3x₁ + 2x₂ = 200 => x₂ = 100 - 1.5x₁ */}
            <line x1="60" y1="430" x2="310" y2="70" stroke="#ef4444" strokeWidth="2.5" />
            <text x="315" y="65" fontSize="11" fill="#ef4444" fontWeight="bold">Labor</text>

            {/* Equipment constraint: 2x₁ + 3x₂ = 150 => x₂ = 50 - (2/3)x₁ */}
            <line x1="60" y1="430" x2="310" y2="180" stroke="#22c55e" strokeWidth="2.5" />
            <text x="315" y="175" fontSize="11" fill="#22c55e" fontWeight="bold">Equipment</text>

            {/* Capital constraint: 2,000x₁ + 1,500x₂ = 100,000 => divide by 500: 4x₁ + 3x₂ = 200 => x₂ = 66.67 - 1.33x₁ */}
            <line x1="60" y1="430" x2="410" y2="30" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="415" y="25" fontSize="11" fill="#a855f7" fontWeight="bold">Capital</text>

            {/* Feasible region */}
            <polygon
              points="60,430 160,430 260,230 210,130 160,130"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="150" y="350" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="150" y="370" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (0,0) */}
            <circle cx="60" cy="430" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="70" y="420" fontSize="9" fill="#475569" dark="#94a3b8">(0,0)</text>

            {/* (0,50) */}
            <circle cx="60" cy="180" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="70" y="175" fontSize="9" fill="#475569" dark="#94a3b8">(0,50)</text>

            {/* (25, 33.33) - Optimal! */}
            <circle cx="210" cy="180" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="200" y="165" fontSize="11" fill="#22c55e" fontWeight="bold">★ (25, 33.33)</text>
            <text x="200" y="210" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (0,0) is also a corner */}

            {/* Objective function line at optimum */}
            <line x1="80" y1="410" x2="310" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="410;400;410" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="70;60;70" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="320" y="65" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 12,000x₁ + 10,000x₂</text>

            {/* Arrow showing profit direction */}
            <polygon points="500,350 520,335 520,365" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="525" y="355" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Return</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region shows all possible allocations. The optimal solution is at (25, 33.33)
            where Equipment and Capital constraints intersect.
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CORNER POINT ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📐</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Corner Point Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Corner Point</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Project 1)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Project 2)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Return (Z)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">50</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹500,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">33.33</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹633,333</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">50</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹600,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Undertake{" "}
              <span className="font-bold">25 units of Project 1</span> and{" "}
              <span className="font-bold">33.33 units of Project 2</span>.
              Total return = <span className="font-bold">₹633,333</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: RESOURCE UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Resource Utilization at Optimal Solution
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              resource: "Labor",
              used: "3(25) + 2(33.33) = 75 + 66.67 = 141.67 hrs",
              available: "200 hrs",
              status: "Slack ✓",
              percentage: "70.8%",
            },
            {
              resource: "Equipment",
              used: "2(25) + 3(33.33) = 50 + 100 = 150 hrs",
              available: "150 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Capital",
              used: "2,000(25) + 1,500(33.33) = 50,000 + 50,000 = 100,000",
              available: "100,000",
              status: "Binding ✓",
              percentage: "100%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.resource}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Used:</span> {item.used}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Available:</span> {item.available}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className={clsx(
                  "text-sm font-medium",
                  item.status.includes("Binding") ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )}>
                  {item.status}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                  {item.percentage}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={clsx(
                    "h-2 rounded-full",
                    item.status.includes("Binding") ? "bg-green-500" : "bg-amber-500"
                  )}
                  style={{ width: item.percentage }}
                >
                  <animate attributeName="width" values="0%;{item.percentage}" dur="1.5s" fill="freeze" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Equipment and Capital are{" "}
            <strong>binding</strong> (fully used), while Labor has{" "}
            <strong>slack</strong> (58.33 hours unused). This means additional
            equipment or capital would increase returns, but more labor would
            not improve the solution.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: REAL-WORLD APPLICATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏢 Project Selection",
              description: "Choose which projects to fund and at what scale, given limited budget and resources.",
            },
            {
              domain: "🏭 Manufacturing",
              description: "Allocate machine time, labor, and materials across product lines.",
            },
            {
              domain: "📊 Budget Allocation",
              description: "Distribute budget across departments or initiatives to maximize ROI.",
            },
            {
              domain: "🏥 Healthcare",
              description: "Allocate staff, equipment, and beds across departments to maximize patient outcomes.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 7: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Identify resource constraints first",
              desc: "List all resources with their capacities before defining variables.",
            },
            {
              title: "Check for binding resources",
              desc: "Resources that are fully used at the optimum are the most valuable.",
            },
            {
              title: "Look for slack resources",
              desc: "Resources with slack are not limiting the solution.",
            },
            {
              title: "Use shadow prices for decision-making",
              desc: "Shadow prices tell you the value of additional resources.",
            },
            {
              title: "Scale variables for clarity",
              desc: "Use thousands or lakhs to simplify large numbers.",
            },
            {
              title: "Validate with extreme allocations",
              desc: "Test producing only one project to check feasibility.",
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

      {/* ===== SECTION 8: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
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
                mistake: "Assuming all resources should be fully used",
                fix: "Some resources may have slack; it's normal and expected.",
              },
              {
                mistake: "Forgetting a resource constraint",
                fix: "List all resources before writing constraints.",
              },
              {
                mistake: "Misinterpreting shadow prices",
                fix: "Shadow prices are marginal values, not total values.",
              },
              {
                mistake: "Not validating the solution",
                fix: "Check all constraints at the optimal solution.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0 are mandatory.",
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

      {/* ===== SECTION 9: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Create a resource-activity table to organize data.",
            "List all resources and their capacities.",
            "Define variables clearly with units.",
            "Write constraints in order of resources.",
            "Use the graphical method for 2-variable problems.",
            "Check resource utilization at the optimum.",
            "Identify binding and non-binding resources.",
            "Document shadow prices for decision-making.",
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

      {/* ===== SECTION 10: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> Labor has slack at the
                optimum. If the company could increase equipment or capital,
                how would the solution change?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the return per unit of
                Project 1 increases to ₹15,000, what happens to the optimal
                allocation? Which resources would become binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita is a portfolio
                manager in Kolkata allocating funds across three investment
                options. She has constraints on risk, liquidity, and minimum
                return. How would the resource allocation framework help her?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 11: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
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
              "✅ Formulate a resource allocation LP model with multiple resources",
              "✅ Identify binding and non-binding resources",
              "✅ Use the graphical method to solve 2-variable resource allocation problems",
              "✅ Analyze resource utilization at the optimum",
              "✅ Interpret slack variables",
              "✅ Understand the concept of shadow prices",
              "✅ Apply the 7-step procedure to resource allocation problems",
              "✅ Recognize real-world applications of resource allocation",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 12: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <FAQTemplate
          title="Resource Allocation Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Resource Allocation Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic10_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "Resource allocation is one of the most important and widely used applications of LP. This example shows that not all resources are equally valuable—the binding resources (Equipment and Capital) are the ones that limit the solution, while Labor has slack. In business, this insight helps managers decide where to invest for the greatest impact. I tell my students: 'If you have excess labor, it means your bottleneck is elsewhere.' Mahima from Jadavpur used this principle to optimize her small business—she realized that buying more equipment was more valuable than hiring more staff. Remember: the shadow prices of binding resources tell you exactly how much each additional unit is worth. This is the kind of insight that makes LP a powerful management tool."
          }
        />
      </div>
    </div>
  );
};

export default Topic10;