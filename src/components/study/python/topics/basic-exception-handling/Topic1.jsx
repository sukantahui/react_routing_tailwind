import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const Topic1 = () => {
  const [activeComparison, setActiveComparison] = useState(null);
  const [errorType, setErrorType] = useState(null);

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
        @keyframes pulseComparison {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes highlightError {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-3">
          Syntax Errors vs Runtime Errors
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Understanding when Python catches your mistakes and when it waits for execution time.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Fundamental Difference */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg">⚖️</span>
              The Fundamental Difference
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div 
                  onMouseEnter={() => setActiveComparison('syntax')}
                  onMouseLeave={() => setActiveComparison(null)}
                  className={clsx(
                    "bg-gray-900/60 p-5 rounded-xl border-l-4 border-red-500 transition-all duration-300 cursor-pointer",
                    activeComparison === 'syntax' && "shadow-xl shadow-red-900/20 transform -translate-y-1"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-red-400">Syntax Errors</h3>
                    <span className="px-3 py-1 bg-red-900/40 rounded-full text-sm text-red-300">Parse Time</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Caught by Python <span className="text-red-300 font-semibold">before execution begins</span>. 
                    The interpreter reads your code and says "I don't understand this structure."
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Detected during compilation/parsing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Code cannot run at all</span>
                  </div>
                </div>

                <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-gray-300 mb-2">Real-World Analogy</h4>
                  <p className="text-gray-400">
                    <span className="text-amber-300">Swadeep</span> writing a sentence with missing punctuation. 
                    The teacher catches it <span className="text-red-400">before</span> he reads it aloud.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div 
                  onMouseEnter={() => setActiveComparison('runtime')}
                  onMouseLeave={() => setActiveComparison(null)}
                  className={clsx(
                    "bg-gray-900/60 p-5 rounded-xl border-l-4 border-amber-500 transition-all duration-300 cursor-pointer",
                    activeComparison === 'runtime' && "shadow-xl shadow-amber-900/20 transform -translate-y-1"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-amber-400">Runtime Errors</h3>
                    <span className="px-3 py-1 bg-amber-900/40 rounded-full text-sm text-amber-300">Execution Time</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Occur <span className="text-amber-300 font-semibold">while the program is running</span>. 
                    Python understands the structure but encounters problems during execution.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Detected during program execution</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Code runs but hits unexpected conditions</span>
                  </div>
                </div>

                <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-gray-300 mb-2">Real-World Analogy</h4>
                  <p className="text-gray-400">
                    <span className="text-amber-300">Tuhina</span> trying to open a file that doesn't exist. 
                    The instruction is valid, but fails <span className="text-amber-400">during execution</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Visual Comparison Timeline */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-900/30 rounded-lg">📊</span>
              The Python Execution Timeline
            </h2>

            <div className="relative max-w-4xl mx-auto">
              <svg className="w-full h-auto" viewBox="0 0 800 300">
                <defs>
                  <linearGradient id="timelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6B7280" />
                  </marker>
                </defs>

                {/* Timeline */}
                <path d="M 50 150 L 750 150" stroke="url(#timelineGrad)" strokeWidth="3" fill="none" />
                
                {/* Syntax Error Point */}
                <g 
                  onClick={() => setErrorType('syntax')}
                  className="cursor-pointer hover:animate-[pulseComparison_1s_ease-in-out]"
                >
                  <circle cx="150" cy="150" r="20" className="fill-red-900/40 stroke-red-500 stroke-2" />
                  <circle cx="150" cy="150" r="8" className="fill-red-500" />
                  <text x="150" y="190" className="text-lg font-bold fill-white" textAnchor="middle">Syntax Check</text>
                  <text x="150" y="210" className="text-sm fill-red-400" textAnchor="middle">Before Execution</text>
                </g>

                {/* Execution Start */}
                <g>
                  <circle cx="400" cy="150" r="20" className="fill-green-900/40 stroke-green-500 stroke-2" />
                  <circle cx="400" cy="150" r="8" className="fill-green-500" />
                  <text x="400" y="190" className="text-lg font-bold fill-white" textAnchor="middle">Execution Start</text>
                  <text x="400" y="210" className="text-sm fill-green-400" textAnchor="middle">Code Begins</text>
                </g>

                {/* Runtime Error Point */}
                <g 
                  onClick={() => setErrorType('runtime')}
                  className="cursor-pointer hover:animate-[pulseComparison_1s_ease-in-out]"
                >
                  <circle cx="650" cy="150" r="20" className="fill-amber-900/40 stroke-amber-500 stroke-2" />
                  <circle cx="650" cy="150" r="8" className="fill-amber-500" />
                  <text x="650" y="190" className="text-lg font-bold fill-white" textAnchor="middle">Runtime Error</text>
                  <text x="650" y="210" className="text-sm fill-amber-400" textAnchor="middle">During Execution</text>
                </g>

                {/* Error Indicators */}
                {errorType === 'syntax' && (
                  <g className="animate-[highlightError_1.5s_ease-in-out]">
                    <circle cx="150" cy="150" r="35" className="fill-red-500/20" />
                    <text x="150" y="110" className="text-sm font-bold fill-red-400" textAnchor="middle">
                      ❌ Code cannot run
                    </text>
                  </g>
                )}

                {errorType === 'runtime' && (
                  <g className="animate-[highlightError_1.5s_ease-in-out]">
                    <circle cx="650" cy="150" r="35" className="fill-amber-500/20" />
                    <text x="650" y="110" className="text-sm font-bold fill-amber-400" textAnchor="middle">
                      ⚠ Code runs but fails
                    </text>
                  </g>
                )}
              </svg>

              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-gray-900/40 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-xl font-bold text-red-400 mb-3">Syntax Error Characteristics</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Python cannot understand your code structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Always caught before any code runs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Easy to fix once you understand Python syntax</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/40 p-5 rounded-xl border border-amber-700/30">
                  <h4 className="text-xl font-bold text-amber-400 mb-3">Runtime Error Characteristics</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Code structure is valid but logic fails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Dependent on data and environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Requires testing and error handling</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Examples */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-green-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-green-900/30 rounded-lg">💻</span>
              Compare Through Code
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-red-900/40 rounded-full text-red-300 font-bold">Syntax Error</div>
                  <span className="text-gray-400 text-sm">Caught before execution</span>
                </div>
                <EditablePythonCodeBlock
                  initialCode={`# Syntax Error Examples\n# Try fixing these one by one\n\n# 1. Missing colon\ndef greet(name)\n    return f"Hello {name}"\n\n# 2. Missing parenthesis\nprint "Hello World"\n\n# 3. Invalid indentation\ndef calculate():\nresult = 5 + 3  # This line should be indented\n    return result\n\n# 4. Misspelled keyword\nwhle True:\n    print("Looping...")`}
                />
                <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-700/30">
                  <h4 className="font-bold text-red-300 mb-2">Python's Response:</h4>
                  <pre className="text-sm text-red-400">
                    SyntaxError: invalid syntax
                  </pre>
                  <p className="text-red-300 text-sm mt-2">
                    <span className="font-semibold">^</span> Python points exactly to where it got confused
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="px-3 py-1 bg-amber-900/40 rounded-full text-amber-300 font-bold">Runtime Error</div>
                  <span className="text-gray-400 text-sm">Caught during execution</span>
                </div>
                <EditablePythonCodeBlock
                  initialCode={`# Runtime Error Examples\n# Code runs but fails during execution\n\n# 1. ZeroDivisionError (valid syntax, invalid operation)\ndef divide(a, b):\n    return a / b\n\nresult = divide(10, 0)  # This will fail at runtime\nprint(f"Result: {result}")\n\n# 2. TypeError (wrong type usage)\ndef add_strings(a, b):\n    return a + b\n\n# This looks fine but fails at runtime\nresult = add_strings("Hello", 123)  # Can't add string and int\nprint(f"Result: {result}")`}
                />
                <div className="mt-4 p-4 bg-amber-900/20 rounded-lg border border-amber-700/30">
                  <h4 className="font-bold text-amber-300 mb-2">Python's Response:</h4>
                  <pre className="text-sm text-amber-400">
                    ZeroDivisionError: division by zero
                  </pre>
                  <p className="text-amber-300 text-sm mt-2">
                    <span className="font-semibold">Stack trace:</span> Shows where in execution it failed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">🧪 Test Yourself</h4>
              <p className="text-gray-300">
                Try this: In the Syntax Error example, fix one error at a time. Notice how Python 
                <span className="text-cyan-300"> stops at the first syntax error</span> it encounters. 
                In the Runtime Error example, try changing <code className="bg-gray-800 px-2 py-1 rounded">divide(10, 0)</code> 
                to <code className="bg-gray-800 px-2 py-1 rounded">divide(10, 2)</code>. The syntax was always valid!
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Common Confusions */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-amber-900/30 rounded-lg">❓</span>
              Common Student Confusions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Misconception 1: "My code looks fine"</h4>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Abhronila</span> often says, "But the code looks correct!" 
                    Syntax errors can be subtle: missing colons, wrong indentation, or misspelled keywords.
                  </p>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">
                      <span className="text-green-400">Tip:</span> Read error messages carefully. Python's caret (^) 
                      points to where it got confused.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Misconception 2: "It worked yesterday"</h4>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Debangshu</span> from Ichapur gets frustrated when 
                    code that worked yesterday has syntax errors today. Often it's because of:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      Accidental file corruption
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      Copy-paste errors
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      Python version differences
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-amber-700/30">
                  <h4 className="text-lg font-bold text-amber-400 mb-3">Confusion: "Why didn't Python catch this earlier?"</h4>
                  <p className="text-gray-300">
                    Students wonder why runtime errors aren't caught during syntax checking. 
                    Python can't predict what data your program will receive or what files will exist.
                  </p>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">
                      <span className="text-cyan-400">Think:</span> Could Python know if a file exists 
                      before trying to open it? No—that's why it's a runtime error.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-amber-700/30">
                  <h4 className="text-lg font-bold text-amber-400 mb-3">Confusion: "Same error, different type?"</h4>
                  <p className="text-gray-300">
                    Some errors can be either syntax or runtime depending on context. 
                    For example, <code className="bg-gray-800 px-2 py-1 rounded">x = y / 0</code> is syntax valid but runtime error.
                  </p>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400">
                      <span className="text-green-400">Rule:</span> If Python can parse it, it's a runtime error. 
                      If Python can't understand the structure, it's a syntax error.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Decision Flowchart */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1000ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">🔄</span>
              Debugging Flow: What Kind of Error Is This?
            </h2>

            <div className="max-w-3xl mx-auto">
              <svg className="w-full h-auto" viewBox="0 0 700 500">
                <defs>
                  <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                  </linearGradient>
                </defs>

                {/* Start */}
                <rect x="300" y="20" width="100" height="60" rx="10" className="fill-gray-800 stroke-cyan-500 stroke-2" />
                <text x="350" y="55" className="text-lg font-bold fill-white" textAnchor="middle">Start</text>

                {/* Arrow */}
                <path d="M350 80 L350 120" className="stroke-gray-500 stroke-2" />

                {/* Question 1 */}
                <rect x="250" y="120" width="200" height="80" rx="10" className="fill-blue-900/40 stroke-blue-500 stroke-2" />
                <text x="350" y="150" className="text-md font-bold fill-white" textAnchor="middle">Does Python</text>
                <text x="350" y="175" className="text-md font-bold fill-white" textAnchor="middle">understand the code?</text>

                {/* Yes/No branches */}
                <path d="M350 200 L350 240" className="stroke-gray-500 stroke-2" />
                <path d="M350 200 L250 280" className="stroke-gray-500 stroke-2" />
                <path d="M350 200 L450 280" className="stroke-gray-500 stroke-2" />

                {/* No -> Syntax Error */}
                <rect x="150" y="280" width="200" height="60" rx="10" className="fill-red-900/40 stroke-red-500 stroke-2" />
                <text x="250" y="315" className="text-md font-bold fill-white" textAnchor="middle">SYNTAX ERROR</text>
                <text x="250" y="335" className="text-sm fill-red-300" textAnchor="middle">Fix structure first</text>

                {/* Yes -> Question 2 */}
                <rect x="250" y="360" width="200" height="80" rx="10" className="fill-green-900/40 stroke-green-500 stroke-2" />
                <text x="350" y="390" className="text-md font-bold fill-white" textAnchor="middle">Does it fail</text>
                <text x="350" y="415" className="text-md font-bold fill-white" textAnchor="middle">during execution?</text>

                {/* Arrow down */}
                <path d="M350 440 L350 480" className="stroke-gray-500 stroke-2" />

                {/* Yes/No branches */}
                <path d="M350 440 L250 520" className="stroke-gray-500 stroke-2" />
                <path d="M350 440 L450 520" className="stroke-gray-500 stroke-2" />

                {/* No -> Works Fine */}
                <rect x="150" y="520" width="200" height="60" rx="10" className="fill-emerald-900/40 stroke-emerald-500 stroke-2" />
                <text x="250" y="555" className="text-md font-bold fill-white" textAnchor="middle">WORKS FINE! ✓</text>

                {/* Yes -> Runtime Error */}
                <rect x="350" y="520" width="200" height="60" rx="10" className="fill-amber-900/40 stroke-amber-500 stroke-2" />
                <text x="450" y="555" className="text-md font-bold fill-white" textAnchor="middle">RUNTIME ERROR</text>
                <text x="450" y="575" className="text-sm fill-amber-300" textAnchor="middle">Check data/environment</text>

                {/* Labels */}
                <text x="280" y="270" className="text-sm fill-gray-400" textAnchor="middle">No</text>
                <text x="420" y="270" className="text-sm fill-gray-400" textAnchor="middle">Yes</text>
                <text x="280" y="530" className="text-sm fill-gray-400" textAnchor="middle">No</text>
                <text x="420" y="530" className="text-sm fill-gray-400" textAnchor="middle">Yes</text>
              </svg>

              <div className="mt-8 p-5 bg-gray-900/40 rounded-xl border border-gray-700/30">
                <h4 className="text-lg font-bold text-white mb-3">How to Use This Flowchart</h4>
                <p className="text-gray-300">
                  When you encounter an error, ask yourself these questions in order. 
                  This systematic approach helps <span className="text-amber-300">Tuhina</span> and 
                  <span className="text-amber-300"> Swadeep</span> debug methodically instead of guessing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.2s_ease-out] animation-delay-[1200ms]">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-700/50 
            hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center 
                  group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="inline-block px-4 py-1 bg-purple-800/50 rounded-full mb-4">
                  <h3 className="text-xl font-bold text-purple-300">Teacher's Note</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <span className="text-cyan-300 font-medium">Key Insight:</span> The difference between syntax and runtime errors 
                    is fundamental to becoming a proficient programmer. Syntax errors are about 
                    <span className="text-red-400"> language rules</span>, while runtime errors are about 
                    <span className="text-amber-400"> program logic and environment</span>.
                  </p>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-300 mb-2">Teaching Strategy:</h4>
                    <p className="text-gray-300">
                      I tell students in Barrackpore: "Python is like a strict editor who checks your grammar 
                      (syntax) before publication, but can't predict if your story will make sense to readers (runtime)."
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Sukanta Hui</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">27 years teaching experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Specializes in debugging techniques</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_1.4s_ease-out] animation-delay-[1400ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-emerald-900/30 rounded-lg">📋</span>
              Quick Reference Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-red-400 mb-4">Syntax Error Signs</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">!</span>
                      </div>
                      <p className="text-gray-300">Python stops before running any code</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">!</span>
                      </div>
                      <p className="text-gray-300">Error message includes "SyntaxError:"</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">!</span>
                      </div>
                      <p className="text-gray-300">Caret (^) points to where Python got confused</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-amber-400 mb-4">Runtime Error Signs</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-amber-400">⚠</span>
                      </div>
                      <p className="text-gray-300">Code starts running before failing</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-amber-400">⚠</span>
                      </div>
                      <p className="text-gray-300">Error name indicates problem type (ZeroDivisionError, etc.)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-amber-400">⚠</span>
                      </div>
                      <p className="text-gray-300">Includes traceback showing execution path</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">🎯 Professional Tip</h4>
              <p className="text-gray-300">
                In industry, we use IDEs that catch <span className="text-red-400">many syntax errors as we type</span> 
                (red squiggly lines). But <span className="text-amber-400">runtime errors require testing</span> with 
                different data. That's why professional programmers write tests!
              </p>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.6s_ease-out] animation-delay-[1600ms]">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">🤔</span>
              Think About This...
            </h3>
            
            <div className="bg-gray-900/30 p-5 rounded-xl">
              <p className="text-gray-300 italic mb-3">
                "When <span className="text-amber-300">Abhronila</span> from Naihati writes 
                <code className="mx-2 bg-gray-800 px-2 py-1 rounded">print("Hello" + 123)</code>, 
                is this a syntax error or runtime error? 
                <span className="text-cyan-300"> Think about when Python would discover the problem.</span>"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Test your understanding:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Does Python understand the structure of this code?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    When would it fail: during parsing or during execution?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Try it in the code editor above to confirm your hypothesis!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Syntax vs Runtime Errors • Topic 1 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Common Python Exceptions (ValueError, TypeError, ZeroDivisionError)</p>
      </footer>
    </div>
  );
};

export default Topic1;