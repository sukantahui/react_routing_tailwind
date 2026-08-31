import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic29_files/topic29_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic29_files/topic29_note.txt?raw";

/**
 * Topic29: Worked Example 23 – Legal-service resource allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic29 component
 *
 * @purpose Provides a complete, step-by-step worked example of a legal-service
 * resource allocation problem, demonstrating how LP can be used to allocate
 * legal professionals to cases to maximize funding while meeting minimum
 * service requirements.
 *
 * @when_used After social minimization (Topic28), this topic introduces
 * legal services as a new application domain, showing how LP can optimize
 * resource allocation in the justice sector and public defense.
 */
const Topic29 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 29
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 23
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 23: Legal-Service Resource Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing the allocation of legal professionals to civil and criminal
          cases to maximize funding while ensuring access to justice.
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
              A legal aid organization provides <strong>two types of legal services</strong>:
              Civil cases and Criminal cases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Civil Cases</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Lawyer time: <span className="font-mono text-blue-600 dark:text-blue-400">5 hours</span></li>
                  <li>Paralegal time: <span className="font-mono text-blue-600 dark:text-blue-400">2 hours</span></li>
                  <li>Funding: <span className="font-mono text-green-600 dark:text-green-400">₹15,000</span> per case</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Criminal Cases</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Lawyer time: <span className="font-mono text-blue-600 dark:text-blue-400">3 hours</span></li>
                  <li>Paralegal time: <span className="font-mono text-blue-600 dark:text-blue-400">4 hours</span></li>
                  <li>Funding: <span className="font-mono text-green-600 dark:text-green-400">₹18,000</span> per case</li>
                </ul>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Available resources per week:</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Lawyers: <span className="font-mono text-blue-600 dark:text-blue-400">120 hours</span>
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Paralegals: <span className="font-mono text-blue-600 dark:text-blue-400">80 hours</span>
                </p>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Minimum service requirements:</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  At least <span className="font-mono text-blue-600 dark:text-blue-400">10 civil cases</span>
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  At least <span className="font-mono text-blue-600 dark:text-blue-400">8 criminal cases</span>
                </p>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The organization wants to <strong>maximize total funding</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal number of civil
                and criminal cases to maximize funding, subject to lawyer and
                paralegal time constraints and minimum service requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚖️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "⚖️ Legal Aid Organizations",
              description: "Allocating lawyers and paralegals to cases to maximize service delivery.",
            },
            {
              domain: "🏛️ Public Defender Offices",
              description: "Managing caseloads to meet constitutional requirements.",
            },
            {
              domain: "💼 Law Firms",
              description: "Optimizing case mix to maximize revenue and efficiency.",
            },
            {
              domain: "🤝 Pro Bono Services",
              description: "Coordinating volunteer lawyers to serve community needs.",
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
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Legal-service resource allocation is
            critical for ensuring access to justice. LP helps organizations
            maximize their impact with limited legal professionals and funding.
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
                  <li><strong>Goal:</strong> Maximize total funding.</li>
                  <li><strong>Cases:</strong> Civil, Criminal.</li>
                  <li><strong>Resources:</strong> Lawyers (120 hrs), Paralegals (80 hrs).</li>
                  <li><strong>Minimums:</strong> Civil ≥ 10, Criminal ≥ 8.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 case types, 2 resource constraints, 2 minimum requirements.
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
                  <p>x₁ = number of civil cases</p>
                  <p>x₂ = number of criminal cases</p>
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
                  <p>Maximize Z = 15,000x₁ + 18,000x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Civil funding = <span className="font-mono">₹15,000</span></li>
                  <li>Criminal funding = <span className="font-mono">₹18,000</span></li>
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
                  <p>Lawyers: 5x₁ + 3x₂ ≤ 120</p>
                  <p>Paralegals: 2x₁ + 4x₂ ≤ 80</p>
                  <p>Min Civil: x₁ ≥ 10</p>
                  <p>Min Criminal: x₂ ≥ 8</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Lawyers:</strong> Total lawyer hours ≤ 120.</li>
                  <li><strong>Paralegals:</strong> Total paralegal hours ≤ 80.</li>
                  <li><strong>Minimums:</strong> At least 10 civil, 8 criminal cases.</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 This is a <strong>maximization</strong> problem with
                    <strong> minimum requirements</strong> and
                    <strong> resource constraints</strong>.
                  </p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  (Already covered by minimum requirements.)
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 10, x₂ = 10</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Lawyers: 5(10)+3(10) = 50+30 = 80 ≤ 120 ✓
                      <br />
                      Paralegals: 2(10)+4(10) = 20+40 = 60 ≤ 80 ✓
                      <br />
                      Min Civil: 10 ≥ 10 ✓
                      <br />
                      Min Criminal: 10 ≥ 8 ✓
                      <br />
                      Funding: 15,000(10)+18,000(10) = 150,000+180,000 = ₹330,000
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
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
                  <p>Maximize Z = 15,000x₁ + 18,000x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Lawyers: 5x₁ + 3x₂ ≤ 120</p>
                  <p className="pl-4">Paralegals: 2x₁ + 4x₂ ≤ 80</p>
                  <p className="pl-4">Min Civil: x₁ ≥ 10</p>
                  <p className="pl-4">Min Criminal: x₂ ≥ 8</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: GRAPHICAL SOLUTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Graphical Solution & Corner Point Analysis
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 650 450"
            className="w-full h-auto"
            aria-label="Graphical solution for legal-service resource allocation"
            role="img"
          >
            <rect x="0" y="0" width="650" height="450" fill="none" />

            {/* Axes */}
            <line x1="80" y1="400" x2="600" y2="400" stroke="#94a3b8" strokeWidth="2" />
            <line x1="80" y1="400" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="610" y="410" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Civil Cases (x₁)</text>
            <text x="50" y="30" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Criminal Cases (x₂)</text>

            {/* Scale marks */}
            <text x="80" y="415" fontSize="10" fill="#94a3b8">0</text>
            <text x="130" y="415" fontSize="10" fill="#94a3b8">5</text>
            <text x="180" y="415" fontSize="10" fill="#94a3b8">10</text>
            <text x="230" y="415" fontSize="10" fill="#94a3b8">15</text>
            <text x="280" y="415" fontSize="10" fill="#94a3b8">20</text>
            <text x="330" y="415" fontSize="10" fill="#94a3b8">25</text>

            <text x="65" y="340" fontSize="10" fill="#94a3b8">5</text>
            <text x="65" y="280" fontSize="10" fill="#94a3b8">10</text>
            <text x="65" y="220" fontSize="10" fill="#94a3b8">15</text>
            <text x="65" y="160" fontSize="10" fill="#94a3b8">20</text>
            <text x="65" y="100" fontSize="10" fill="#94a3b8">25</text>

            {/* Lawyers: 5x₁ + 3x₂ = 120 => x₂ = 40 - 1.67x₁ */}
            <line x1="80" y1="400" x2="160" y2="240" stroke="#ef4444" strokeWidth="2.5" />
            <text x="165" y="235" fontSize="11" fill="#ef4444" fontWeight="bold">Lawyers</text>

            {/* Paralegals: 2x₁ + 4x₂ = 80 => x₂ = 20 - 0.5x₁ */}
            <line x1="80" y1="400" x2="280" y2="200" stroke="#22c55e" strokeWidth="2.5" />
            <text x="285" y="195" fontSize="11" fill="#22c55e" fontWeight="bold">Paralegals</text>

            {/* Min Civil: x₁ = 10 */}
            <line x1="180" y1="40" x2="180" y2="400" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="185" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Min Civil</text>

            {/* Min Criminal: x₂ = 8 */}
            <line x1="80" y1="320" x2="600" y2="320" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="610" y="315" fontSize="11" fill="#f59e0b" fontWeight="bold">Min Criminal</text>

            {/* Feasible region */}
            <polygon
              points="180,320 180,200 230,200 280,200 280,320"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="230" y="270" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="230" y="290" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (10,8) */}
            <circle cx="180" cy="320" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="310" fontSize="9" fill="#475569" dark="#94a3b8">(10,8)</text>

            {/* (10,15) */}
            <circle cx="180" cy="200" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="195" fontSize="9" fill="#475569" dark="#94a3b8">(10,15)</text>

            {/* (17.14,11.43) - Optimal! */}
            <circle cx="230" cy="230" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="220" y="215" fontSize="11" fill="#22c55e" fontWeight="bold">★ (17.14,11.43)</text>
            <text x="220" y="260" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (19.2,8) */}
            <circle cx="280" cy="320" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="290" y="310" fontSize="9" fill="#475569" dark="#94a3b8">(19.2,8)</text>

            {/* Objective function line at optimum */}
            <line x1="180" y1="380" x2="280" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="380;370;380" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="200;190;200" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="290" y="195" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 15,000x₁ + 18,000x₂</text>

            {/* Arrow showing funding direction */}
            <polygon points="520,320 540,305 540,335" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="325" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Funding</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region shows all possible case allocations. The optimal
            solution is at (17.14, 11.43) with funding = ₹462,857.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CORNER POINT ANALYSIS ===== */}
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Civil)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Criminal)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Funding (Z = 15,000x₁ + 18,000x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹294,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹420,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">17.14</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">11.43</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹462,857</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">19.2</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹432,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Handle{" "}
              <span className="font-bold">17.14 civil cases</span> and{" "}
              <span className="font-bold">11.43 criminal cases</span>.
              Total funding = <span className="font-bold">₹462,857</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: RESOURCE UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Resource Utilization Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              resource: "Lawyers",
              used: "5(17.14)+3(11.43) = 85.71+34.29 = 120 hrs",
              available: "120 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Paralegals",
              used: "2(17.14)+4(11.43) = 34.29+45.71 = 80 hrs",
              available: "80 hrs",
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
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {item.status}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                  {item.percentage}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: item.percentage }}>
                  <animate attributeName="width" values="0%;{item.percentage}" dur="1.5s" fill="freeze" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Both Lawyer and Paralegal
            resources are <strong>binding</strong> (fully used). This means
            the organization is operating at full capacity, and any additional
            resources would increase the organization's capacity to handle more
            cases and generate more funding.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: EFFICIENCY ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Efficiency Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Funding efficiency per hour of lawyer and paralegal time:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Metric</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Civil Cases</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Criminal Cases</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Better</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Funding/Lawyer Hour</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹3,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹6,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Criminal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Funding/Paralegal Hour</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹7,500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹4,500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Civil</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> Criminal cases are more efficient
              for Lawyers (₹6,000/hour), but Civil cases are more efficient for
              Paralegals (₹7,500/hour). The optimal mix of 17.14 civil and
              11.43 criminal cases balances these trade-offs to maximize total
              funding.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: TIPS & TRICKS ===== */}
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
              title: "Identify resource constraints",
              desc: "Lawyer and paralegal time are the critical resources.",
            },
            {
              title: "Include minimum requirements",
              desc: "Minimum case requirements ensure access to justice.",
            },
            {
              title: "Calculate efficiency metrics",
              desc: "Funding per resource hour helps identify the most valuable cases.",
            },
            {
              title: "Consider case complexity",
              desc: "Different cases require different resource mixes.",
            },
            {
              title: "Balance resource utilization",
              desc: "The optimal solution often fully uses both resources.",
            },
            {
              title: "Validate with all constraints",
              desc: "Check that all minimums and resource limits are satisfied.",
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

      {/* ===== SECTION 9: COMMON MISTAKES ===== */}
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
                mistake: "Forgetting minimum case requirements",
                fix: "x₁ ≥ 10 and x₂ ≥ 8 must be included.",
              },
              {
                mistake: "Using wrong resource coefficients",
                fix: "Civil: 5 lawyer, 2 paralegal; Criminal: 3 lawyer, 4 paralegal.",
              },
              {
                mistake: "Assuming all resources should be binding",
                fix: "In this case, both are binding—but that's not always the case.",
              },
              {
                mistake: "Not checking if minimums are binding",
                fix: "Here, minimums are not binding—they're exceeded.",
              },
              {
                mistake: "Ignoring the objective direction",
                fix: "Maximize funding, not minimize it.",
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

      {/* ===== SECTION 10: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "List all resource requirements for each case type.",
            "Include minimum case requirements.",
            "Calculate efficiency metrics (funding per resource hour).",
            "Use the graphical method to visualize constraints.",
            "Evaluate objective at all feasible corner points.",
            "Identify which constraints are binding.",
            "Validate the solution with all constraints.",
            "Document assumptions about case complexity and resource needs.",
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

      {/* ===== SECTION 11: HINT SECTION ===== */}
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
                <strong>Observe carefully:</strong> Criminal cases are more
                efficient for Lawyers (₹6,000/hour) but less efficient for
                Paralegals (₹4,500/hour). How does this explain the optimal mix?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the minimum requirement
                for criminal cases increases to 10, what happens to the optimal
                solution and funding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu is the
                director of a legal aid organization in Kolkata. He has 150
                lawyer hours and 100 paralegal hours available per week. How
                would he use LP to maximize funding?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 12: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
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
              "✅ Formulate a legal-service resource allocation LP model",
              "✅ Include minimum case requirements",
              "✅ Calculate efficiency metrics (funding per resource hour)",
              "✅ Identify binding vs non-binding constraints",
              "✅ Determine the optimal case allocation",
              "✅ Analyze resource utilization at the optimum",
              "✅ Apply the 7-step procedure to legal-service problems",
              "✅ Understand the trade-offs between different case types",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 13: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <FAQTemplate
          title="Legal-Service Resource Allocation FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Legal-Service Resource Allocation - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic29_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "Legal-service resource allocation is a powerful application of LP that directly impacts access to justice. I tell my students: 'The same mathematical tools that optimize factory production can help ensure everyone gets legal representation.' The key insight here is the efficiency trade-off: Criminal cases are better for Lawyers (₹6,000/hour), but Civil cases are better for Paralegals (₹7,500/hour). The optimal solution balances these trade-offs to maximize total funding. Mamata from Barrackpore once told me she used this framework to help her legal aid organization reallocate resources, increasing funding by 12% while maintaining service levels. Remember: in legal services, minimum requirements ensure that vulnerable populations aren't left without representation. The binding constraints (both Lawyer and Paralegal time) tell you where the organization is operating at full capacity."
          }
        />
      </div>
    </div>
  );
};

export default Topic29;