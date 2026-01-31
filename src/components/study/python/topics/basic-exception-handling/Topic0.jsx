import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const Topic0 = () => {
  const [activeCard, setActiveCard] = useState(null);

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
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-3">
          Runtime Errors in Python
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Understanding what happens when your code runs but something goes wrong at execution time.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Conceptual Explanation */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-blue-900/30 rounded-lg">📖</span>
              What Are Runtime Errors?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Definition</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Runtime errors occur <span className="text-cyan-300 font-medium">during program execution</span>, 
                    after successful compilation/parsing. Unlike syntax errors, these happen when Python interpreter 
                    can't execute a valid statement due to logical or environmental issues.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-amber-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Real-World Analogy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Think of <span className="text-amber-300">Swadeep</span> trying to open a PDF file that doesn't exist on his computer. 
                    The instruction "open PDF" is valid, but the file isn't there. Similarly, Python understands 
                    your code but encounters problems during execution.
                  </p>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 250">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Code parsing stage */}
                  <rect x="20" y="40" width="120" height="60" rx="8" 
                    className="fill-gray-800 stroke-blue-500 stroke-2" />
                  <text x="80" y="75" className="text-lg font-bold fill-white" textAnchor="middle">Syntax Check</text>
                  <text x="80" y="95" className="text-sm fill-green-400" textAnchor="middle">✓ Pass</text>
                  
                  {/* Arrow */}
                  <path d="M145 70 L175 70" className="stroke-gray-500 stroke-2" markerEnd="url(#arrowhead)" />
                  <polygon points="175,70 165,65 165,75" className="fill-gray-500" />
                  
                  {/* Runtime execution */}
                  <rect x="195" y="40" width="120" height="60" rx="8" 
                    className="fill-gray-800 stroke-amber-500 stroke-2" />
                  <text x="255" y="75" className="text-lg font-bold fill-white" textAnchor="middle">Runtime</text>
                  <text x="255" y="95" className="text-sm fill-amber-400" textAnchor="middle">❌ Error!</text>
                  
                  {/* Error burst */}
                  <g className={clsx("transition-all duration-300", activeCard === 'runtime' && "animate-[pulse_1s_ease-in-out]")}>
                    <circle cx="255" cy="110" r="25" className="fill-red-500/20" />
                    <text x="255" y="115" className="text-sm font-bold fill-red-400" textAnchor="middle">ERROR</text>
                  </g>
                  
                  <animate attributeName="opacity" values="0;1" dur="1.5s" fill="freeze" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why They Occur */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg">🔍</span>
              Why Do Runtime Errors Occur?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Invalid Operations",
                  icon: "➗",
                  color: "red",
                  examples: ["Dividing by zero", "Invalid type casting", "Mathematical domain errors"],
                  desc: "Operations that are mathematically or logically impossible"
                },
                {
                  title: "Resource Issues",
                  icon: "📁",
                  color: "amber",
                  examples: ["File not found", "Memory exhaustion", "Network timeout"],
                  desc: "External resources unavailable or inaccessible"
                },
                {
                  title: "State Problems",
                  icon: "🔢",
                  color: "green",
                  examples: ["Using None as value", "Uninitialized variables", "Invalid object state"],
                  desc: "Program state doesn't match expectations"
                }
              ].map((cause, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setActiveCard(`cause-${index}`)}
                  onMouseLeave={() => setActiveCard(null)}
                  className={clsx(
                    "bg-gray-900/70 p-6 rounded-xl border border-gray-700/50 transition-all duration-300",
                    activeCard === `cause-${index}` && `border-${cause.color}-500/50 shadow-lg shadow-${cause.color}-900/20 transform -translate-y-2`
                  )}
                >
                  <div className={`inline-flex p-3 bg-${cause.color}-900/30 rounded-xl mb-4`}>
                    <span className="text-2xl">{cause.icon}</span>
                  </div>
                  <h3 className={`text-xl font-bold text-${cause.color}-300 mb-3`}>{cause.title}</h3>
                  <p className="text-gray-300 mb-4">{cause.desc}</p>
                  <ul className="space-y-2">
                    {cause.examples.map((ex, i) => (
                      <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full bg-${cause.color}-500`}></span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">💡 Key Insight</h4>
              <p className="text-gray-300">
                Runtime errors are <span className="text-cyan-300">unpredictable by the interpreter</span> during parsing. 
                They depend on the actual data and environment when the code runs. 
                That's why <span className="text-amber-300">Tuhina's</span> program might work on her laptop but fail on <span className="text-amber-300">Abhronila's</span> computer.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Examples */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-green-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-green-900/30 rounded-lg">💻</span>
              See Runtime Errors in Action
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example 1: ZeroDivisionError</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Try changing the divisor to see what happens\ndef calculate_average(total, count):\n    return total / count\n\n# What happens when count is 0?\nresult = calculate_average(100, 0)\nprint(f"Average: {result}")`}
                />
                <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-700/30">
                  <p className="text-red-300 font-medium">Error Output:</p>
                  <pre className="text-sm text-red-400 mt-2">ZeroDivisionError: division by zero</pre>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example 2: FileNotFoundError</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Try creating a file named 'data.txt' in the same directory\n# Or change the filename to something that doesn't exist\ntry:\n    with open('nonexistent_file.txt', 'r') as f:\n        content = f.read()\nexcept FileNotFoundError as e:\n    print(f"Error: {e}")`}
                />
                <div className="mt-4 p-4 bg-amber-900/20 rounded-lg border border-amber-700/30">
                  <p className="text-amber-300 font-medium">Professional Tip:</p>
                  <p className="text-amber-200 mt-2">
                    Always check if files exist before opening them, or use try-except blocks to handle missing files gracefully.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Common Pitfalls */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-red-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-red-900/30 rounded-lg">⚠️</span>
              Common Pitfalls & Beginner Mistakes
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">❌ Assumptions About Data</h4>
                  <p className="text-gray-300">
                    Beginners often assume user input or file data will always be valid. 
                    <span className="text-amber-300"> Debangshu</span> once lost his project data because he didn't handle 
                    corrupted CSV files properly.
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">❌ Not Validating User Input</h4>
                  <p className="text-gray-300">
                    Directly using <code className="bg-gray-800 px-2 py-1 rounded">input()</code> without validation 
                    leads to crashes when users enter unexpected values.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">❌ Ignoring Error Messages</h4>
                  <p className="text-gray-300">
                    Students often panic when they see red error text. Learning to <span className="text-green-400">read error messages carefully</span> 
                    is the first step to debugging.
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">❌ Overly Broad Try-Except</h4>
                  <p className="text-gray-300">
                    Using bare <code className="bg-gray-800 px-2 py-1 rounded">except:</code> without specifying exception types 
                    hides problems and makes debugging harder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Best Practices */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1000ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-emerald-900/30 rounded-lg">✅</span>
              Best Practices for Handling Runtime Errors
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Validate Early",
                  desc: "Check inputs and conditions before operations",
                  example: "if denominator != 0: result = numerator / denominator"
                },
                {
                  title: "Use Specific Exceptions",
                  desc: "Catch specific errors instead of generic ones",
                  example: "except ZeroDivisionError: # handle division by zero"
                },
                {
                  title: "Provide Helpful Messages",
                  desc: "Error messages should guide users to fix problems",
                  example: 'print("Please enter a non-zero number")'
                }
              ].map((practice, index) => (
                <div 
                  key={index}
                  className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30 hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-900/40 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-300">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-bold text-emerald-300">{practice.title}</h4>
                  </div>
                  <p className="text-gray-300 mb-3">{practice.desc}</p>
                  <code className="text-sm text-emerald-200 bg-gray-800/50 p-2 rounded block">
                    {practice.example}
                  </code>
                </div>
              ))}
            </div>

            <div className="bg-gray-900/40 p-5 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">🔄 Debugging Mindset</h4>
              <p className="text-gray-300">
                When you encounter a runtime error, ask yourself: 
                <span className="text-cyan-300"> "What assumptions did I make that turned out to be false?"</span>. 
                This shifts your thinking from "My code is broken" to "My assumptions need adjusting".
              </p>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.2s_ease-out] animation-delay-[1200ms]">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/50 
            hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center 
                  group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="inline-block px-4 py-1 bg-blue-800/50 rounded-full mb-4">
                  <h3 className="text-xl font-bold text-blue-300">Teacher's Note</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <span className="text-cyan-300 font-medium">Remember:</span> Runtime errors are not your enemy—they're feedback. 
                    Every error message is Python's way of telling you exactly where and why something unexpected happened.
                  </p>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-300 mb-2">Classroom Tip:</h4>
                    <p className="text-gray-300">
                      When <span className="text-amber-300">Swadeep</span> gets a ZeroDivisionError, don't just fix it for him. 
                      Ask: "What value could cause this? How can we prevent it?" This builds problem-solving skills.
                    </p>
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
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Programming Languages, OS, Web Dev</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_1.4s_ease-out] animation-delay-[1400ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-amber-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-amber-900/30 rounded-lg">📋</span>
              What to Remember
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">✓</span>
                  </div>
                  <p className="text-gray-300">Runtime errors occur during execution, not during parsing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">✓</span>
                  </div>
                  <p className="text-gray-300">They depend on actual data and environment conditions</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">✓</span>
                  </div>
                  <p className="text-gray-300">Common causes: invalid operations, missing resources, bad state</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">💡</span>
                  </div>
                  <p className="text-gray-300">Read error messages carefully—they contain the solution</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">💡</span>
                  </div>
                  <p className="text-gray-300">Validate inputs and handle edge cases proactively</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">💡</span>
                  </div>
                  <p className="text-gray-300">Use try-except blocks to handle expected runtime errors</p>
                </div>
              </div>
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
                "When <span className="text-amber-300">Tuhina</span> from Barrackpore writes a program that works on her computer 
                but fails on <span className="text-amber-300">Abhronila's</span> computer in Shyamnagar, what kind of runtime errors 
                might be causing this difference?"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Observe carefully:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    File paths and working directory differences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Different Python versions or installed packages
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Operating system-specific behaviors
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Runtime Errors • Topic 0 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Difference between Syntax Errors and Runtime Errors</p>
      </footer>
    </div>
  );
};

export default Topic0;