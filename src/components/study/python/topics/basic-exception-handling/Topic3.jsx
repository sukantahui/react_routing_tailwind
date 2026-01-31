import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const Topic3 = () => {
  const [activeFlow, setActiveFlow] = useState(null);
  const [hoveredStep, setHoveredStep] = useState(null);

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
        @keyframes tryCatchFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes successGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
        }
        @keyframes exceptionCaught {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300 mb-3">
          Try and Except Blocks
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Learning to catch and handle exceptions gracefully instead of letting programs crash.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Fundamental Concept */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-emerald-900/30 rounded-lg">🛡️</span>
              The Safety Net for Your Code
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-emerald-500">
                  <h3 className="text-xl font-semibold text-white mb-3">What are Try-Except Blocks?</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Try-except blocks are Python's mechanism for 
                    <span className="text-emerald-300 font-medium"> catching and handling runtime exceptions</span>. 
                    They allow your program to respond to errors gracefully instead of crashing.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Real-World Analogy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Think of <span className="text-amber-300">Tuhina</span> from Barrackpore carrying fragile glassware. 
                    The <span className="text-emerald-400">try</span> block is her carrying it carefully, 
                    and the <span className="text-red-400">except</span> block is the padded box that catches it if she slips.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Basic Syntax</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    <p className="text-emerald-400">try:</p>
                    <p className="text-gray-400 ml-4"># Code that might raise an exception</p>
                    <p className="text-emerald-400">except <span className="text-red-400">ExceptionType</span>:</p>
                    <p className="text-gray-400 ml-4"># Code to handle the exception</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 320">
                  <defs>
                    <linearGradient id="tryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                    </linearGradient>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-500" />
                    </marker>
                  </defs>
                  
                  {/* Try Block */}
                  <rect x="50" y="40" width="300" height="80" rx="10" 
                    className="fill-emerald-900/30 stroke-emerald-500 stroke-2" />
                  <text x="200" y="70" className="text-xl font-bold fill-emerald-300" textAnchor="middle">TRY Block</text>
                  <text x="200" y="90" className="text-sm fill-emerald-200" textAnchor="middle">Risky code goes here</text>
                  
                  {/* Arrow to except */}
                  <path d="M200 120 L200 160" className="stroke-gray-500 stroke-2" markerEnd="url(#arrowhead)" />
                  <text x="200" y="145" className="text-sm fill-gray-400" textAnchor="middle">Exception occurs?</text>
                  
                  {/* Decision diamond */}
                  <path d="M150 160 L250 160 L200 210 L150 160" className="fill-gray-800 stroke-gray-600 stroke-2" />
                  <text x="200" y="175" className="text-sm font-bold fill-white" textAnchor="middle">Exception?</text>
                  
                  {/* No branch */}
                  <path d="M250 160 L350 160 L350 240 L200 240" className="stroke-green-500 stroke-2" strokeDasharray="5,5" />
                  <text x="300" y="150" className="text-sm fill-green-400" textAnchor="middle">No</text>
                  <rect x="300" y="240" width="100" height="60" rx="8" className="fill-green-900/30 stroke-green-500 stroke-2" />
                  <text x="350" y="270" className="text-sm fill-green-300" textAnchor="middle">Success!</text>
                  
                  {/* Yes branch */}
                  <path d="M200 210 L200 270" className="stroke-red-500 stroke-2" />
                  <text x="190" y="240" className="text-sm fill-red-400" textAnchor="middle">Yes</text>
                  
                  {/* Except Block */}
                  <rect x="100" y="270" width="200" height="80" rx="10" 
                    className="fill-red-900/30 stroke-red-500 stroke-2" />
                  <text x="200" y="300" className="text-xl font-bold fill-red-300" textAnchor="middle">EXCEPT Block</text>
                  <text x="200" y="320" className="text-sm fill-red-200" textAnchor="middle">Exception handled here</text>
                  
                  {/* Flow animation */}
                  <path id="flowPath" d="M200 120 L200 160 L200 210 L200 270" 
                    className="stroke-cyan-500 stroke-2 fill-none" strokeWidth="3" 
                    strokeDasharray="10,5" strokeDashoffset="100" 
                    style={{animation: 'tryCatchFlow 3s linear infinite'}} />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Basic Usage */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-900/30 rounded-lg">💻</span>
              Basic Try-Except Usage
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example 1: Handling Division by Zero</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Without exception handling\ndef divide_without_handling(a, b):\n    return a / b\n\n# This will crash with ZeroDivisionError\n# result = divide_without_handling(10, 0)\n\n# With exception handling\ndef divide_with_handling(a, b):\n    try:\n        result = a / b\n        print(f"{a} divided by {b} = {result}")\n        return result\n    except ZeroDivisionError:\n        print(f"Error: Cannot divide {a} by zero!")\n        return None\n\n# Test both cases\nprint("Test 1 - Dividing by 5:")\ndivide_with_handling(10, 5)\n\nprint("\\nTest 2 - Dividing by 0:")\ndivide_with_handling(10, 0)\n\nprint("\\nTest 3 - Dividing by 2:")\ndivide_with_handling(10, 2)`}
                />
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-red-900/20 rounded-lg border border-red-700/30">
                    <h4 className="font-bold text-red-300 mb-2">❌ Without Try-Except</h4>
                    <p className="text-red-200 text-sm">Program crashes unexpectedly</p>
                    <p className="text-red-400 text-xs mt-2">ZeroDivisionError: division by zero</p>
                  </div>
                  <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-700/30">
                    <h4 className="font-bold text-emerald-300 mb-2">✅ With Try-Except</h4>
                    <p className="text-emerald-200 text-sm">Graceful error handling</p>
                    <p className="text-emerald-400 text-xs mt-2">"Error: Cannot divide 10 by zero!"</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example 2: File Operations</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Handling file operations safely\ndef read_file_safely(filename):\n    \"\"\"Reads a file with proper error handling\"\"\"\n    try:\n        with open(filename, 'r') as file:\n            content = file.read()\n        print(f"Successfully read {len(content)} characters from {filename}")\n        return content\n    except FileNotFoundError:\n        print(f"Error: File '{filename}' not found.")\n        return None\n    except PermissionError:\n        print(f"Error: Permission denied for '{filename}'")\n        return None\n    except Exception as e:\n        print(f"Unexpected error: {type(e).__name__} - {e}")\n        return None\n\n# Test with different scenarios\nprint("Test 1: Reading existing file (if exists)")\nread_file_safely('data.txt')\n\nprint("\\nTest 2: Reading non-existent file")\nread_file_safely('nonexistent.txt')\n\nprint("\\nTest 3: Try with your own filename")\n# Try changing the filename above to see different behaviors`}
                />
                
                <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="font-bold text-blue-300 mb-2">💡 Professional Insight</h4>
                  <p className="text-blue-200 text-sm">
                    <span className="text-amber-300">Swadeep</span> learned that file operations are one of the most 
                    common places where exceptions occur. Always wrap file operations in try-except blocks!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Anatomy of Try-Except */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg">🔬</span>
              Anatomy of Try-Except Block
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  part: "try Clause",
                  description: "Contains code that might raise an exception",
                  color: "emerald",
                  example: "try:\n    risky_operation()",
                  tip: "Keep this block as small as possible"
                },
                {
                  part: "except Clause",
                  description: "Catches and handles specific exceptions",
                  color: "red",
                  example: "except ValueError:\n    handle_error()",
                  tip: "Be specific about exception types"
                },
                {
                  part: "Optional: else",
                  description: "Runs if no exceptions occur in try block",
                  color: "blue",
                  example: "else:\n    print('Success!')",
                  tip: "Useful for code that should only run on success"
                },
                {
                  part: "Optional: finally",
                  description: "Always executes, regardless of exceptions",
                  color: "amber",
                  example: "finally:\n    cleanup_resources()",
                  tip: "Perfect for cleanup operations"
                },
                {
                  part: "Exception Object",
                  description: "Can access exception details using 'as'",
                  color: "cyan",
                  example: "except ValueError as e:\n    print(f'Error: {e}')",
                  tip: "Useful for debugging and logging"
                },
                {
                  part: "Multiple except",
                  description: "Handle different exceptions differently",
                  color: "purple",
                  example: "except ValueError:\n    # handle ValueError\nexcept TypeError:\n    # handle TypeError",
                  tip: "Order matters - be specific first!"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={clsx(
                    "bg-gray-900/60 p-5 rounded-xl border border-gray-700/50 transition-all duration-300 cursor-pointer",
                    hoveredStep === index && `border-${item.color}-500/50 shadow-lg shadow-${item.color}-900/20 transform -translate-y-2`
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 bg-${item.color}-900/40 rounded-lg flex items-center justify-center`}>
                      <span className={`text-${item.color}-300 font-bold`}>{index + 1}</span>
                    </div>
                    <h4 className={`text-lg font-bold text-${item.color}-300`}>{item.part}</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                  <code className={`text-xs text-${item.color}-200 bg-gray-800/50 p-2 rounded block font-mono whitespace-pre`}>
                    {item.example}
                  </code>
                  <div className={`mt-3 text-xs text-${item.color}-400`}>💡 {item.tip}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gray-900/40 rounded-xl border border-gray-700/30">
              <h4 className="text-lg font-bold text-white mb-3">🎯 Complete Example</h4>
              <EditablePythonCodeBlock
                initialCode={`# Complete try-except-else-finally example\ndef process_user_input():\n    try:\n        age = int(input("Enter your age: "))\n        if age < 0:\n            raise ValueError("Age cannot be negative")\n        \n    except ValueError as e:\n        print(f"Invalid input: {e}")\n        return None\n        \n    else:\n        print(f"Valid age entered: {age}")\n        return age\n        \n    finally:\n        print("Input processing complete.\\n")\n\n# Test the function\nprint("Test 1: Valid input")\n# Enter: 25\n\nprint("Test 2: Invalid input (text)")\n# Enter: abc\n\nprint("Test 3: Invalid input (negative)")\n# Enter: -5`}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Flow Visualization */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">🔄</span>
              Execution Flow Visualization
            </h2>

            <div className="relative max-w-4xl mx-auto">
              <svg className="w-full h-auto" viewBox="0 0 800 500">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#EF4444', stopOpacity: 1}} />
                  </linearGradient>
                </defs>

                {/* Start */}
                <rect x="350" y="30" width="100" height="60" rx="10" className="fill-gray-800 stroke-cyan-500 stroke-2" />
                <text x="400" y="65" className="text-lg font-bold fill-white" textAnchor="middle">Start</text>

                {/* Try Block */}
                <rect x="250" y="120" width="300" height="80" rx="10" 
                  className={clsx(
                    "fill-emerald-900/30 stroke-emerald-500 stroke-2 transition-all duration-300",
                    activeFlow === 'try' && "animate-[successGlow_2s_ease-in-out_infinite]"
                  )}
                  onMouseEnter={() => setActiveFlow('try')}
                  onMouseLeave={() => setActiveFlow(null)}
                />
                <text x="400" y="150" className="text-xl font-bold fill-emerald-300" textAnchor="middle">TRY Block</text>
                <text x="400" y="175" className="text-sm fill-emerald-200" textAnchor="middle">Execute risky code</text>

                {/* Decision */}
                <path d="M350 200 L450 200 L400 250 L350 200" className="fill-gray-800 stroke-gray-600 stroke-2" />
                <text x="400" y="220" className="text-sm font-bold fill-white" textAnchor="middle">Exception?</text>

                {/* No Exception Path */}
                <g onMouseEnter={() => setActiveFlow('else')} onMouseLeave={() => setActiveFlow(null)}>
                  <path d="M450 200 L550 200 L550 280 L400 280" className="stroke-green-500 stroke-2" strokeDasharray="5,5" />
                  <text x="500" y="190" className="text-sm fill-green-400" textAnchor="middle">No</text>
                  <rect x="500" y="280" width="100" height="60" rx="10" 
                    className={clsx(
                      "fill-green-900/30 stroke-green-500 stroke-2",
                      activeFlow === 'else' && "animate-[successGlow_2s_ease-in-out_infinite]"
                    )}
                  />
                  <text x="550" y="310" className="text-sm fill-green-300" textAnchor="middle">ELSE</text>
                  <text x="550" y="330" className="text-xs fill-green-200" textAnchor="middle">(Optional)</text>
                </g>

                {/* Exception Path */}
                <g onMouseEnter={() => setActiveFlow('except')} onMouseLeave={() => setActiveFlow(null)}>
                  <path d="M400 250 L400 320" className="stroke-red-500 stroke-2" />
                  <text x="390" y="285" className="text-sm fill-red-400" textAnchor="middle">Yes</text>
                  <rect x="250" y="320" width="300" height="80" rx="10" 
                    className={clsx(
                      "fill-red-900/30 stroke-red-500 stroke-2",
                      activeFlow === 'except' && "animate-[exceptionCaught_1s_ease-in-out_infinite]"
                    )}
                  />
                  <text x="400" y="350" className="text-xl font-bold fill-red-300" textAnchor="middle">EXCEPT Block</text>
                  <text x="400" y="375" className="text-sm fill-red-200" textAnchor="middle">Handle the exception</text>
                </g>

                {/* Finally Block */}
                <g onMouseEnter={() => setActiveFlow('finally')} onMouseLeave={() => setActiveFlow(null)}>
                  <path d="M400 400 L400 430" className="stroke-amber-500 stroke-2" />
                  <rect x="250" y="430" width="300" height="60" rx="10" 
                    className={clsx(
                      "fill-amber-900/30 stroke-amber-500 stroke-2",
                      activeFlow === 'finally' && "shadow-lg shadow-amber-500/50"
                    )}
                  />
                  <text x="400" y="460" className="text-xl font-bold fill-amber-300" textAnchor="middle">FINALLY Block</text>
                  <text x="400" y="480" className="text-sm fill-amber-200" textAnchor="middle">Always executes</text>
                </g>

                {/* Arrows */}
                <path d="M400 80 L400 120" className="stroke-gray-500 stroke-2" />
                <path d="M400 200 L400 210" className="stroke-gray-500 stroke-2" />
                <path d="M550 340 L400 340 L400 400" className="stroke-gray-500 stroke-2" />
                <path d="M400 360 L400 380" className="stroke-gray-500 stroke-2" />
              </svg>

              <div className="mt-8 grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-emerald-900/20 rounded-lg">
                  <p className="text-emerald-300 font-bold">TRY</p>
                  <p className="text-xs text-emerald-200">Attempt the operation</p>
                </div>
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <p className="text-green-300 font-bold">ELSE</p>
                  <p className="text-xs text-green-200">Success path</p>
                </div>
                <div className="text-center p-3 bg-red-900/20 rounded-lg">
                  <p className="text-red-300 font-bold">EXCEPT</p>
                  <p className="text-xs text-red-200">Error handling</p>
                </div>
                <div className="text-center p-3 bg-amber-900/20 rounded-lg">
                  <p className="text-amber-300 font-bold">FINALLY</p>
                  <p className="text-xs text-amber-200">Cleanup</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Common Mistakes */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1000ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-red-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-red-900/30 rounded-lg">⚠️</span>
              Common Beginner Mistakes
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 1: Bare Except</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    try:<br />
                    &nbsp;&nbsp;risky_code()<br />
                    except:  # ❌ Never do this!<br />
                    &nbsp;&nbsp;pass
                  </code>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Abhronila</span> from Shyamnagar learned this catches 
                    <span className="text-red-400"> ALL exceptions</span>, including KeyboardInterrupt (Ctrl+C).
                  </p>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-green-400">
                      <span className="font-bold">Better:</span> <code className="text-cyan-300">except ValueError:</code> or <code className="text-cyan-300">except Exception as e:</code>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 2: Too Broad Try Block</h4>
                  <p className="text-gray-300 mb-3">
                    Putting too much code in try block makes debugging difficult:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono">
                    try:<br />
                    &nbsp;&nbsp;x = get_user_input()<br />
                    &nbsp;&nbsp;y = process_data(x)  # Multiple operations<br />
                    &nbsp;&nbsp;z = save_to_database(y)<br />
                    except Exception:  # Which line failed?<br />
                    &nbsp;&nbsp;print("Error")
                  </code>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 3: Silent Catching</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    try:<br />
                    &nbsp;&nbsp;result = calculate()<br />
                    except:<br />
                    &nbsp;&nbsp;result = None  # ❌ No logging or feedback
                  </code>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Debangshu</span> from Ichapur learned that silent failures 
                    make debugging <span className="text-red-400">impossible</span>.
                  </p>
                  <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-green-400">
                      <span className="font-bold">Better:</span> Log errors or provide user feedback
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 4: Wrong Exception Order</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    try:<br />
                    &nbsp;&nbsp;code()<br />
                    except Exception:  # ❌ Too broad first<br />
                    &nbsp;&nbsp;print("General error")<br />
                    except ValueError:  # ⚠️ This never runs!<br />
                    &nbsp;&nbsp;print("Value error")
                  </code>
                  <p className="text-gray-300">
                    Python checks except clauses <span className="text-red-400">in order</span>. 
                    Put specific exceptions first!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Best Practices */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-green-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-green-900/30 rounded-lg">✅</span>
              Professional Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">1. Keep Try Blocks Small</h4>
                  <p className="text-gray-300 mb-3">
                    Only wrap the code that might actually raise an exception:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-emerald-400 text-sm">✅ Good:</p>
                    <code className="text-sm text-gray-300 block">
                      x = get_value()  # Safe<br />
                      try:<br />
                      &nbsp;&nbsp;y = risky_operation(x)  # Only risky part<br />
                      except ValueError:<br />
                      &nbsp;&nbsp;y = default_value
                    </code>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">2. Use Specific Exceptions</h4>
                  <p className="text-gray-300">
                    Catch only the exceptions you expect and can handle:
                  </p>
                  <div className="mt-3 bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-emerald-400 text-sm">✅ Professional:</p>
                    <code className="text-sm text-gray-300 block">
                      try:<br />
                      &nbsp;&nbsp;file = open('data.txt')<br />
                      except FileNotFoundError:<br />
                      &nbsp;&nbsp;print("File not found")<br />
                      except PermissionError:<br />
                      &nbsp;&nbsp;print("Permission denied")
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">3. Log Exceptions</h4>
                  <p className="text-gray-300 mb-3">
                    Always log exceptions for debugging:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-sm text-gray-300 block">
                      import logging<br />
                      <br />
                      try:<br />
                      &nbsp;&nbsp;risky_operation()<br />
                      except ValueError as e:<br />
                      &nbsp;&nbsp;{`logging.error(f"ValueError occurred: {e}")`}<br />
                      &nbsp;&nbsp;logging.error("Traceback:", exc_info=True)<br />
                      &nbsp;&nbsp;# Also handle the error for user
                    </code>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">4. Use Finally for Cleanup</h4>
                  <p className="text-gray-300">
                    Ensure resources are always released:
                  </p>
                  <div className="mt-3 bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-sm text-gray-300 block">
                      file = None<br />
                      try:<br />
                      &nbsp;&nbsp;file = open('data.txt', 'r')<br />
                      &nbsp;&nbsp;content = file.read()<br />
                      except FileNotFoundError:<br />
                      &nbsp;&nbsp;print("File not found")<br />
                      finally:<br />
                      &nbsp;&nbsp;if file:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;file.close()  # Always executed
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">🏆 Industry Standard</h4>
              <p className="text-gray-300">
                In professional Python development, we follow the 
                <span className="text-cyan-300"> "Easier to Ask for Forgiveness than Permission" (EAFP) </span>
                principle. This means we try operations and handle exceptions, rather than checking 
                everything beforehand. It makes code cleaner and more efficient.
              </p>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.4s_ease-out] animation-delay-[1400ms]">
          <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/50 
            hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-500 group">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center 
                  group-hover:scale-110 transition-transform duration-500">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="inline-block px-4 py-1 bg-emerald-800/50 rounded-full mb-4">
                  <h3 className="text-xl font-bold text-emerald-300">Teacher's Note</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-200 leading-relaxed">
                    <span className="text-cyan-300 font-medium">Key Insight:</span> Try-except blocks are not just for 
                    preventing crashes. They're a <span className="text-emerald-400">design pattern</span> for writing 
                    robust, user-friendly software. Every professional Python developer masters this.
                  </p>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-300 mb-2">Teaching Strategy:</h4>
                    <p className="text-gray-300">
                      I tell my Barrackpore students: "Think of try-except as a 
                      <span className="text-emerald-400"> safety net</span> for your tightrope walker. 
                      You don't want the net to catch <span className="text-red-400">everything</span> 
                      (like a falling building), just the <span className="text-green-400">tightrope walker</span> 
                      when they slip."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-emerald-400 font-bold text-sm">EAFP Principle</p>
                      <p className="text-xs text-gray-400 mt-1">"Easier to Ask for Forgiveness than Permission"</p>
                    </div>
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-blue-400 font-bold text-sm">LBYL Approach</p>
                      <p className="text-xs text-gray-400 mt-1">"Look Before You Leap" (alternative to EAFP)</p>
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
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Specializes in robust programming</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_1.6s_ease-out] animation-delay-[1600ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">📋</span>
              Try-Except Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">Do These</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Catch specific exceptions whenever possible</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Keep try blocks small and focused</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Use finally for cleanup operations</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">Log exceptions for debugging</p>
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
                      <p className="text-gray-300">Using bare except: clauses</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Catching exceptions silently</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Putting too much code in try blocks</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Wrong order of except clauses</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-700/30">
              <h4 className="text-lg font-bold text-purple-300 mb-3">💪 Practice Exercise</h4>
              <p className="text-gray-300">
                Write a function that asks for two numbers and divides them. Use try-except to handle:
                <span className="text-cyan-300"> 1) Non-numeric input (ValueError)</span>, 
                <span className="text-amber-300"> 2) Division by zero (ZeroDivisionError)</span>, 
                <span className="text-emerald-300"> 3) Use finally to print "Operation complete"</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.8s_ease-out] animation-delay-[1800ms]">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50">
            <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">🤔</span>
              Think About This...
            </h3>
            
            <div className="bg-gray-900/30 p-5 rounded-xl">
              <p className="text-gray-300 italic mb-3">
                "When <span className="text-amber-300">Swadeep</span> writes a calculator program, 
                he needs to handle many possible errors. 
                <span className="text-cyan-300"> What's the difference between catching Exception and BaseException?</span> 
                When would you use one over the other?"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Consider:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    What happens when user presses Ctrl+C during input?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Should your program catch system-exit signals?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Try: <code className="bg-gray-800 px-2 py-1 rounded">except BaseException:</code> vs <code className="bg-gray-800 px-2 py-1 rounded">except Exception:</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Try and Except Blocks • Topic 3 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Handling Multiple Exceptions</p>
      </footer>
    </div>
  );
};

export default Topic3;