import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import validateAgePy from "./topic6_files/validate_age.py?raw";
import getNumberPy from "./topic6_files/get_number.py?raw";
import loggingInvalidAgePy from "./topic6_files/logging_invalid_age.py?raw";
import raiseValueErrorPy from "./topic6_files/raise_value_error.py?raw";
import getPositiveIntegerPy from "./topic6_files/get_positive_integer.py?raw";
import getStudentGradePy from "./topic6_files/get_student_grade.py?raw";
import studentManagementSystemPy from "./topic6_files/student_management_system.py?raw";
import ageValidationBasicPy from "./topic6_files/age_validation_basic.py?raw";

const Topic6 = () => {
  const [activeValidation, setActiveValidation] = useState(null);
  const [hoveredExample, setHoveredExample] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-6 md:p-8 transition-all duration-500">
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes validationSuccess {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes inputFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300 mb-3">
          Input Validation with Exception Handling
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Building robust programs that handle invalid user input gracefully using try-except blocks.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Introduction */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-amber-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-amber-900/30 rounded-lg">🎯</span>
              Why Validate Input?
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-amber-500">
                  <h3 className="text-xl font-semibold text-white mb-3">The Problem</h3>
                  <p className="text-gray-300 leading-relaxed">
                    User input is <span className="text-amber-300 font-medium">unpredictable</span>. 
                    Without validation, programs crash with confusing errors when users enter unexpected values.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-red-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Student Scenario</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-amber-300">Tuhina</span> from Barrackpore builds a calculator. 
                    When <span className="text-amber-300">Swadeep</span> enters "abc" instead of a number, 
                    the program crashes with <code className="text-red-400">ValueError</code>.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Validation Goals</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Prevent program crashes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Provide helpful error messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Allow users to correct mistakes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 320">
                  <defs>
                    <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#F59E0B', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#EF4444', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Input Box */}
                  <rect x="50" y="40" width="300" height="60" rx="8" 
                    className="fill-gray-800 stroke-amber-500 stroke-2" />
                  <text x="200" y="75" className="text-lg font-bold fill-white" textAnchor="middle">User Input</text>
                  <text x="200" y="95" className="text-sm fill-amber-300" textAnchor="middle">"abc", "123", "-5", ""</text>
                  
                  {/* Validation Process */}
                  <rect x="150" y="130" width="100" height="60" rx="8" 
                    className="fill-blue-900/30 stroke-blue-500 stroke-2" />
                  <text x="200" y="160" className="text-lg font-bold fill-white" textAnchor="middle">Validate</text>
                  <text x="200" y="180" className="text-sm fill-blue-300" textAnchor="middle">Check & Convert</text>
                  
                  {/* Success Path */}
                  <path d="M200 190 L200 240" className="stroke-green-500 stroke-2" strokeDasharray="5,5" />
                  <rect x="150" y="240" width="100" height="60" rx="8" className="fill-green-900/30 stroke-green-500 stroke-2" />
                  <text x="200" y="270" className="text-sm fill-green-300" textAnchor="middle">Valid ✓</text>
                  <text x="200" y="290" className="text-xs fill-green-200" textAnchor="middle">Use in program</text>
                  
                  {/* Error Path */}
                  <path d="M200 130 L100 190 L100 240" className="stroke-red-500 stroke-2" />
                  <rect x="50" y="240" width="100" height="60" rx="8" className="fill-red-900/30 stroke-red-500 stroke-2" />
                  <text x="100" y="270" className="text-sm fill-red-300" textAnchor="middle">Invalid ✗</text>
                  <text x="100" y="290" className="text-xs fill-red-200" textAnchor="middle">Ask again</text>
                  
                  {/* Arrows */}
                  <path d="M200 100 L200 130" className="stroke-gray-500 stroke-2" />
                  
                  {/* Labels */}
                  <text x="260" y="160" className="text-xs fill-green-400" textAnchor="middle">Valid</text>
                  <text x="80" y="160" className="text-xs fill-red-400" textAnchor="middle">Invalid</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Basic Input Validation */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div 
            onMouseEnter={() => setActiveValidation('basic')}
            onMouseLeave={() => setActiveValidation(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activeValidation === 'basic' && "border-blue-500/50 shadow-2xl shadow-blue-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/40 rounded-xl">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-blue-400">Basic Numeric Input</h2>
                  <p className="text-gray-400">Handling invalid numbers</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700/50">
                <code className="text-blue-300 font-mono">Pattern 1</code>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Common Issues</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-red-400">Non-numeric input:</span> "abc", "ten", "12a"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-red-400">Empty input:</span> "" (just pressing Enter)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-red-400">Decimal numbers:</span> "12.5" when int() expected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-red-400">Negative numbers:</span> "-5" when positive expected</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Validation Strategy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Step 1</div>
                      <div>
                        <p className="text-gray-300 font-medium">Try to convert</p>
                        <p className="text-gray-400 text-sm">Use try-except with int() or float()</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Step 2</div>
                      <div>
                        <p className="text-gray-300 font-medium">Check value range</p>
                        <p className="text-gray-400 text-sm">Use if statements for boundaries</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Step 3</div>
                      <div>
                        <p className="text-gray-300 font-medium">Loop until valid</p>
                        <p className="text-gray-400 text-sm">Use while True with break on success</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <PythonFileLoader
                  fileModule={getPositiveIntegerPy}
                  title="Python: Positive Integer Input Validation"
                  highlightLines={[]}
                />
                
                <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="font-bold text-blue-300 mb-2">💡 Professional Insight</h4>
                  <p className="text-blue-200 text-sm">
                    <span className="text-amber-300">Swadeep</span> learned: Always use <code className="text-cyan-300">while True</code> 
                    with input validation. It ensures users can correct mistakes without restarting the program.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Advanced Validation */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div 
            onMouseEnter={() => setActiveValidation('advanced')}
            onMouseLeave={() => setActiveValidation(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activeValidation === 'advanced' && "border-purple-500/50 shadow-2xl shadow-purple-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-900/40 rounded-xl">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-purple-400">Advanced Validation Patterns</h2>
                  <p className="text-gray-400">Multiple constraints and custom validation</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-purple-900/30 rounded-full border border-purple-700/50">
                <code className="text-purple-300 font-mono">Pattern 2</code>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example: Student Grade Validator</h3>
                <PythonFileLoader
                  fileModule={getStudentGradePy}
                  title="Python: Positive Integer Input Validation"
                  highlightLines={[]}
                />
              </div>

              <div className="grid md:grid-cols-1 gap-8">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Custom Validation Rules</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-purple-900/40 rounded text-xs text-purple-300 mt-1">Rule</div>
                      <div>
                        <p className="text-gray-300 font-medium">Range checking</p>
                        <p className="text-gray-400 text-sm">
                          <code>
                            {`if not (0 <= value <= 100): raise ValueError(...)`}
                          </code>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-purple-900/40 rounded text-xs text-purple-300 mt-1">Rule</div>
                      <div>
                        <p className="text-gray-300 font-medium">Format validation</p>
                        <p className="text-gray-400 text-sm"><code>if not re.match(pattern, value): raise ValueError(...)</code></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-purple-900/40 rounded text-xs text-purple-300 mt-1">Rule</div>
                      <div>
                        <p className="text-gray-300 font-medium">Business logic</p>
                        <p className="text-gray-400 text-sm"><code>if value in invalid_values: raise ValueError(...)</code></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Professional Pattern</h3>
                  <p className="text-gray-300 mb-3">
                    Use <code className="text-purple-400">raise ValueError()</code> inside try blocks to 
                    trigger consistent error handling:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <PythonFileLoader
                      fileModule={raiseValueErrorPy}
                      title="Python: Raising a ValueError"
                      highlightLines={[]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Menu System Validation */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div 
            onMouseEnter={() => setActiveValidation('menu')}
            onMouseLeave={() => setActiveValidation(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activeValidation === 'menu' && "border-green-500/50 shadow-2xl shadow-green-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-900/40 rounded-xl">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-green-400">Menu System Validation</h2>
                  <p className="text-gray-400">Handling menu choices and user options</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-900/30 rounded-full border border-green-700/50">
                <code className="text-green-300 font-mono">Pattern 3</code>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={studentManagementSystemPy}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Menu Validation Strategy</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-green-400">Convert to number:</span> Use <code>int()</code> with try-except</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-green-400">Check range:</span> Validate against available options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-green-400">Handle gracefully:</span> Show error and re-show menu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300"><span className="text-green-400">Allow exit:</span> Always include quit/exit option</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Common Menu Errors</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-red-900/40 rounded text-xs text-red-300 mt-1">Error</div>
                      <div>
                        <p className="text-gray-300 font-medium">Out of range</p>
                        <p className="text-gray-400 text-sm">User enters 5 when options are 1-4</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-red-900/40 rounded text-xs text-red-300 mt-1">Error</div>
                      <div>
                        <p className="text-gray-300 font-medium">Non-numeric input</p>
                        <p className="text-gray-400 text-sm">User enters "A" instead of 1</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-red-900/40 rounded text-xs text-red-300 mt-1">Error</div>
                      <div>
                        <p className="text-gray-300 font-medium">Empty input</p>
                        <p className="text-gray-400 text-sm">User just presses Enter</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Validation Flow Chart */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1000ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">📊</span>
              Input Validation Decision Flow
            </h2>

            <div className="max-w-4xl mx-auto">
              <svg className="w-full h-auto" viewBox="0 0 700 500">
                <defs>
                  <linearGradient id="decisionGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                  </linearGradient>
                </defs>

                {/* Start */}
                <rect x="300" y="20" width="100" height="60" rx="10" className="fill-gray-800 stroke-cyan-500 stroke-2" />
                <text x="350" y="55" className="text-lg font-bold fill-white" textAnchor="middle">Start</text>

                {/* Get Input */}
                <rect x="250" y="100" width="200" height="60" rx="10" className="fill-amber-900/40 stroke-amber-500 stroke-2" />
                <text x="350" y="130" className="text-md font-bold fill-white" textAnchor="middle">Get User Input</text>

                {/* Try Conversion */}
                <rect x="250" y="180" width="200" height="80" rx="10" className="fill-blue-900/40 stroke-blue-500 stroke-2" />
                <text x="350" y="210" className="text-md font-bold fill-white" textAnchor="middle">Try Conversion</text>
                <text x="350" y="235" className="text-sm fill-blue-300" textAnchor="middle">int() or float()</text>

                {/* Conversion Success? */}
                <path d="M350 260 L350 300" className="stroke-gray-500 stroke-2" />
                <circle cx="350" cy="320" r="20" className="fill-gray-700" />
                <text x="350" y="325" className="text-lg fill-white" textAnchor="middle">?</text>
                <text x="350" y="305" className="text-sm fill-gray-400" textAnchor="middle">Success?</text>

                {/* No -> Error Handling */}
                <path d="M350 340 L350 380" className="stroke-red-500 stroke-2" />
                <rect x="250" y="380" width="200" height="60" rx="10" className="fill-red-900/40 stroke-red-500 stroke-2" />
                <text x="350" y="415" className="text-md font-bold fill-white" textAnchor="middle">Show Error</text>
                <text x="325" y="365" className="text-sm fill-red-400" textAnchor="middle">No</text>

                {/* Yes -> Validate Range */}
                <path d="M380 320 L430 320 L430 240" className="stroke-green-500 stroke-2" />
                <rect x="430" y="240" width="200" height="80" rx="10" className="fill-green-900/40 stroke-green-500 stroke-2" />
                <text x="530" y="270" className="text-md font-bold fill-white" textAnchor="middle">Validate Range/Rules</text>
                <text x="530" y="295" className="text-sm fill-green-300" textAnchor="middle">0 ≤ value ≤ 100</text>
                <text x="405" y="315" className="text-sm fill-green-400" textAnchor="middle">Yes</text>

                {/* Range Valid? */}
                <path d="M530 320 L530 360" className="stroke-gray-500 stroke-2" />
                <circle cx="530" cy="380" r="20" className="fill-gray-700" />
                <text x="530" y="385" className="text-lg fill-white" textAnchor="middle">?</text>
                <text x="530" y="365" className="text-sm fill-gray-400" textAnchor="middle">Valid?</text>

                {/* No -> Error */}
                <path d="M510 380 L430 420 L430 460" className="stroke-red-500 stroke-2" />
                <text x="470" y="405" className="text-sm fill-red-400" textAnchor="middle">No</text>

                {/* Yes -> Success */}
                <path d="M550 380 L610 380 L610 440" className="stroke-green-500 stroke-2" />
                <rect x="530" y="440" width="160" height="60" rx="10" className="fill-emerald-900/40 stroke-emerald-500 stroke-2" />
                <text x="610" y="475" className="text-md font-bold fill-white" textAnchor="middle">Return Value</text>
                <text x="580" y="395" className="text-sm fill-green-400" textAnchor="middle">Yes</text>

                {/* Loop back */}
                <path d="M350 440 L350 460 L100 460 L100 160 L250 160" className="stroke-amber-500 stroke-2" strokeDasharray="5,5" />
                <text x="225" y="445" className="text-sm fill-amber-400" textAnchor="middle">Ask Again</text>

                {/* Flow Animation */}
                <path d="M350 80 L350 100 M350 260 L350 320 M380 320 L430 320 L430 240 M530 320 L530 380 M550 380 L610 380 L610 440" 
                  className="stroke-cyan-500 stroke-2 fill-none" strokeWidth="2" 
                  strokeDasharray="10,5" strokeDashoffset="100" 
                  style={{animation: 'inputFlow 4s linear infinite'}} />
              </svg>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-amber-900/20 rounded-lg border border-amber-700/30">
                  <p className="text-amber-400 font-bold mb-2">Step 1</p>
                  <p className="text-xs text-gray-300">Get raw input from user</p>
                  <p className="text-xs text-amber-300 mt-2">input() function</p>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <p className="text-blue-400 font-bold mb-2">Step 2</p>
                  <p className="text-xs text-gray-300">Try conversion with try-except</p>
                  <p className="text-xs text-blue-300 mt-2">int() or float()</p>
                </div>
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <p className="text-green-400 font-bold mb-2">Step 3</p>
                  <p className="text-xs text-gray-300">Validate business rules</p>
                  <p className="text-xs text-green-300 mt-2">Range checking</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Common Mistakes */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-red-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-red-900/30 rounded-lg">⚠️</span>
              Common Validation Mistakes
            </h2>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 1: No Validation</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    age = int(input("Enter age: "))  # ❌ Crashes on "abc"
                  </code>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Abhronila</span> from Shyamnagar learned this the hard way: 
                    Always validate user input!
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 2: Incomplete Validation</h4>
                  <PythonFileLoader
                    initialCode={ageValidationBasicPy}
                  />
                                    <p className="text-gray-300">
                    Validation isn't complete until you check for <span className="text-red-400">all possible invalid values</span>.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 3: Poor Error Messages</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    except ValueError:<br />
                    &nbsp;&nbsp;print("Error!")  # ❌ Not helpful!
                  </code>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Debangshu</span> from Ichapur learned: Error messages should tell users 
                    <span className="text-green-400"> what went wrong and how to fix it</span>.
                  </p>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-green-400">
                      <span className="font-bold">Better:</span> <code className="text-cyan-300">print("Please enter a number between 1 and 100")</code>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 4: Infinite Loop on Quit</h4>
                  <p className="text-gray-300 mb-3">
                    Forgetting to provide an exit option:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono">
                    while True:  # ❌ How does user exit?<br />
                    &nbsp;&nbsp;# ... validation code ...
                  </code>
                  <p className="text-gray-400 text-sm mt-3">💡 Always provide a way to exit validation loops</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.4s_ease-out] animation-delay-[1400ms]">
          <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/50 
            hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center 
                  group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="inline-block px-4 py-1 bg-amber-800/50 rounded-full mb-4">
                  <h3 className="text-xl font-bold text-amber-300">Teacher's Note</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <span className="text-cyan-300 font-medium">Key Insight:</span> Input validation is not just about 
                    preventing crashes—it's about <span className="text-amber-400">creating a good user experience</span>. 
                    Good validation guides users to correct their mistakes.
                  </p>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-300 mb-2">Teaching Strategy:</h4>
                    <p className="text-gray-300">
                      I tell my Barrackpore students: "Think of your program as a helpful teacher. 
                      When <span className="text-amber-300">Swadeep</span> makes a mistake (enters 'abc' instead of a number), 
                      don't scold him with a crash. Instead, gently say 'That's not a number. Please try again.' 
                      That's what good validation does."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-red-400 font-bold text-sm">Bad Validation</p>
                      <p className="text-xs text-gray-400 mt-1">"ValueError" (cryptic)</p>
                    </div>
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-green-400 font-bold text-sm">Good Validation</p>
                      <p className="text-xs text-gray-400 mt-1">"Please enter a number between 1-100" (helpful)</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Sukanta Hui</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">27 years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Specializes in user-friendly design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Best Practices */}
        <section className="motion-safe:animate-[fadeSlideUp_1.6s_ease-out] animation-delay-[1600ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-emerald-900/30 rounded-lg">✅</span>
              Professional Best Practices
            </h2>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">1. Create Validation Functions</h4>
                  <p className="text-gray-300 mb-3">
                    Reusable validation functions make code cleaner:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                   <PythonFileLoader
                      fileModule={validateAgePy}
                      title="Python: Validate Age Function"
                      highlightLines={[]}
                    />
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">2. Use Meaningful Error Messages</h4>
                  <p className="text-gray-300">
                    Error messages should guide users:
                  </p>
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    <div className="p-3 bg-red-900/20 rounded-lg">
                      <p className="text-red-400 text-xs">❌ Bad:</p>
                      <p className="text-red-300 text-xs">"Invalid input"</p>
                    </div>
                    <div className="p-3 bg-green-900/20 rounded-lg">
                      <p className="text-green-400 text-xs">✅ Good:</p>
                      <p className="text-green-300 text-xs">"Please enter a number between 1-100"</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">3. Provide Default Values</h4>
                  <p className="text-gray-300 mb-3">
                    Sometimes it's helpful to suggest defaults:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <PythonFileLoader
                      fileModule={getNumberPy}
                      title="Python: get_number() with Default Input"
                      highlightLines={[]}
                    />
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">4. Log Validation Attempts</h4>
                  <p className="text-gray-300">
                    For professional applications, log validation failures:
                  </p>
                  <div className="mt-3 bg-gray-800/50 p-4 rounded-lg">
                    <PythonFileLoader
                      fileModule={loggingInvalidAgePy}
                      title="Python: Logging Invalid Age Input"
                      highlightLines={[]}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">🏆 Industry Standard</h4>
              <p className="text-gray-300">
                In professional Python applications, input validation is often handled by dedicated 
                validation libraries like <span className="text-cyan-300">Pydantic</span> or 
                <span className="text-purple-300"> Marshmallow</span>. These use the same principles 
                you're learning: type conversion, range checking, and clear error messages—but 
                at an industrial scale.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_1.8s_ease-out] animation-delay-[1800ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">📋</span>
              Input Validation Checklist
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">Always Do These</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Use try-except for type conversion</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Check for empty input</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Validate value ranges (min/max)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Provide clear, helpful error messages</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-red-400 mb-4">Avoid These</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Assuming user input is valid</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Cryptic error messages</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Infinite loops without exit option</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Forgetting to strip whitespace</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-700/30">
              <h4 className="text-lg font-bold text-purple-300 mb-3">💪 Practice Exercise</h4>
              <p className="text-gray-300">
                Create a registration system that validates:
                <span className="text-cyan-300"> 1) Username (non-empty, 3-20 chars)</span>, 
                <span className="text-amber-300"> 2) Email (contains @ and .)</span>, 
                <span className="text-green-300"> 3) Password (8+ chars, contains number)</span>, 
                <span className="text-blue-300"> 4) Age (18+ only)</span>. 
                Use while loops to keep asking until all inputs are valid.
              </p>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="motion-safe:animate-[fadeSlideUp_2s_ease-out] animation-delay-[2000ms]">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">🤔</span>
              Think About This...
            </h3>
            
            <div className="bg-gray-900/30 p-5 rounded-xl">
              <p className="text-gray-300 italic mb-3">
                "When <span className="text-amber-300">Swadeep</span> builds a banking application, 
                how should he validate monetary amounts? 
                <span className="text-cyan-300"> Consider: Can amounts be negative? Can they have more than 2 decimal places? 
                What about very large numbers? How would you handle currency symbols?</span>"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Consider:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Use <code className="bg-gray-800 px-2 py-1 rounded">Decimal</code> instead of <code className="bg-gray-800 px-2 py-1 rounded">float</code> for money
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Strip currency symbols before conversion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Check for reasonable limits (no $1 trillion deposits!)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Handle different decimal separators (1.00 vs 1,00)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Basic input validation using exception handling • Topic 6 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Raising custom exceptions</p>
      </footer>
    </div>
  );
};

export default Topic6;