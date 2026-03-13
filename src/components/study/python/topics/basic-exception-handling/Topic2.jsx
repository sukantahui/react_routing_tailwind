import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const Topic2 = () => {
  const [activeException, setActiveException] = useState(null);
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
        @keyframes exceptionPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes highlightLine {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(239, 68, 68, 0.2); }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-300 mb-3">
          Common Python Exceptions
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Understanding ValueError, TypeError, and ZeroDivisionError - the three most common runtime exceptions.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Exception Overview */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-amber-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-amber-900/30 rounded-lg">🚨</span>
              What Are Python Exceptions?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Definition</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Exceptions are Python's way of saying "something unexpected happened during execution." 
                    They are <span className="text-cyan-300 font-medium">objects</span> that contain information about the error.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Why They Matter</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-amber-300">Tuhina</span> from Barrackpore learns that understanding exceptions 
                    helps write robust programs. Instead of crashing, programs can handle errors gracefully.
                  </p>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 250">
                  <defs>
                    <linearGradient id="exceptionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#F59E0B', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#EF4444', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Normal Execution */}
                  <rect x="50" y="40" width="120" height="60" rx="8" 
                    className="fill-gray-800 stroke-green-500 stroke-2" />
                  <text x="110" y="75" className="text-lg font-bold fill-white" textAnchor="middle">Normal Flow</text>
                  
                  {/* Exception Branch */}
                  <path d="M170 70 Q220 70 220 130" className="stroke-amber-500 stroke-2 fill-none" strokeDasharray="5,5" />
                  
                  {/* Exception Block */}
                  <rect x="220" y="130" width="150" height="80" rx="8" 
                    className="fill-amber-900/30 stroke-amber-500 stroke-2" />
                  <text x="295" y="160" className="text-lg font-bold fill-amber-300" textAnchor="middle">EXCEPTION</text>
                  <text x="295" y="180" className="text-sm fill-amber-200" textAnchor="middle">Raised</text>
                  <text x="295" y="195" className="text-sm fill-amber-200" textAnchor="middle">Handled</text>
                  
                  {/* Arrow back to normal flow */}
                  <path d="M295 210 Q295 260 110 260" className="stroke-green-500 stroke-2 fill-none" strokeDasharray="5,5" />
                  
                  <text x="200" y="60" className="text-sm fill-amber-400" textAnchor="middle">Exception occurs</text>
                  <text x="200" y="245" className="text-sm fill-green-400" textAnchor="middle">Recovery</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: ValueError */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div 
            onMouseEnter={() => setActiveException('valueerror')}
            onMouseLeave={() => setActiveException(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activeException === 'valueerror' && "border-red-500/50 shadow-2xl shadow-red-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-900/40 rounded-xl">
                  <span className="text-2xl">🔢</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-red-400">ValueError</h2>
                  <p className="text-gray-400">Right type, wrong value</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-red-900/30 rounded-full border border-red-700/50">
                <code className="text-red-300 font-mono">class ValueError(Exception)</code>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Prototype & Signature</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono">
                    <p className="text-green-400">class <span className="text-red-400">ValueError</span>(<span className="text-blue-400">Exception</span>):</p>
                    <p className="text-gray-400 ml-4"># Raised when an operation receives the right type</p>
                    <p className="text-gray-400 ml-4"># but an inappropriate value</p>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">When & Why Used</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Converting strings to numbers when string is invalid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">List operations with invalid indices (like <code className="bg-gray-800 px-1">list.index(x)</code> when x not found)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Invalid arguments to built-in functions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={`# ValueError Examples\n# Try changing the values to see different errors\n\n# 1. Invalid integer conversion\ntry:\n    num = int("abc")  # Can't convert 'abc' to integer\n    print(f"Number: {num}")\nexcept ValueError as e:\n    print(f"ValueError: {e}")\n\n# 2. Invalid list index search\nfruits = ["apple", "banana", "cherry"]\ntry:\n    position = fruits.index("mango")  # 'mango' not in list\n    print(f"Found at position: {position}")\nexcept ValueError as e:\n    print(f"ValueError: {e}")\n\n# 3. Invalid base conversion\ntry:\n    # Binary digits are only 0 and 1\n    binary_num = int("102", 2)  # '2' is invalid in binary\n    print(f"Binary: {binary_num}")\nexcept ValueError as e:\n    print(f"ValueError: {e}")`}
                />
                
                <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-700/30">
                  <h4 className="font-bold text-red-300 mb-2">💡 Professional Insight</h4>
                  <p className="text-red-200 text-sm">
                    <span className="text-amber-300">Swadeep</span> learned that <code className="bg-gray-800 px-1">ValueError</code> often occurs 
                    with user input. Always validate before converting or using values!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: TypeError */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div 
            onMouseEnter={() => setActiveException('typeerror')}
            onMouseLeave={() => setActiveException(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activeException === 'typeerror' && "border-blue-500/50 shadow-2xl shadow-blue-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/40 rounded-xl">
                  <span className="text-2xl">🔤</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-blue-400">TypeError</h2>
                  <p className="text-gray-400">Wrong type for operation</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700/50">
                <code className="text-blue-300 font-mono">class TypeError(Exception)</code>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={`# TypeError Examples\n# Python is strict about types!\n\n# 1. Adding incompatible types\ntry:\n    result = "Hello" + 123  # Can't concatenate str and int\n    print(f"Result: {result}")\nexcept TypeError as e:\n    print(f"TypeError: {e}")\n    # Fix: result = "Hello" + str(123)\n\n# 2. Calling non-callable objects\ntry:\n    num = 42\n    num()  # Integers are not functions!\nexcept TypeError as e:\n    print(f"TypeError: {e}")\n\n# 3. Wrong number of arguments\ntry:\n    def greet(name):\n        return f"Hello {name}"\n    \n    # Forgot the argument\n    message = greet()\n    print(message)\nexcept TypeError as e:\n    print(f"TypeError: {e}")\n\n# 4. Invalid operations on types\ntry:\n    value = len(42)  # int has no length!\nexcept TypeError as e:\n    print(f"TypeError: {e}")`}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Prototype & Signature</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono">
                    <p className="text-green-400">class <span className="text-blue-400">TypeError</span>(<span className="text-red-400">Exception</span>):</p>
                    <p className="text-gray-400 ml-4"># Raised when operation/function applied to</p>
                    <p className="text-gray-400 ml-4"># object of inappropriate type</p>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Common Scenarios</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Case</div>
                      <div>
                        <p className="text-gray-300 font-medium">Mixed-type operations</p>
                        <p className="text-gray-400 text-sm"><code>"text" + 123</code> - needs type conversion</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Case</div>
                      <div>
                        <p className="text-gray-300 font-medium">Wrong function arguments</p>
                        <p className="text-gray-400 text-sm"><code>len(42)</code> - int doesn't support len()</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Case</div>
                      <div>
                        <p className="text-gray-300 font-medium">Attribute access errors</p>
                        <p className="text-gray-400 text-sm"><code>None.attribute</code> - None has no attributes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">🎯 Type Checking in Practice</h4>
              <p className="text-gray-300">
                <span className="text-amber-300">Abhronila</span> from Shyamnagar uses <code className="bg-gray-800 px-2 py-1 rounded">isinstance()</code> 
                to check types before operations. Example: 
                <code className="mx-2 bg-gray-800 px-2 py-1 rounded">if isinstance(value, (int, float)):</code>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: ZeroDivisionError */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div 
            onMouseEnter={() => setActiveException('zerodivisionerror')}
            onMouseLeave={() => setActiveException(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activeException === 'zerodivisionerror' && "border-amber-500/50 shadow-2xl shadow-amber-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-900/40 rounded-xl">
                  <span className="text-2xl">➗</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-amber-400">ZeroDivisionError</h2>
                  <p className="text-gray-400">The mathematical impossibility</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-900/30 rounded-full border border-amber-700/50">
                <code className="text-amber-300 font-mono">class ZeroDivisionError(ArithmeticError)</code>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Prototype & Signature</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono">
                    <p className="text-green-400">class <span className="text-amber-400">ZeroDivisionError</span>(<span className="text-purple-400">ArithmeticError</span>):</p>
                    <p className="text-gray-400 ml-4"># Raised when division or modulo operation</p>
                    <p className="text-gray-400 ml-4"># has zero as divisor</p>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Mathematical Context</h3>
                  <p className="text-gray-300">
                    In mathematics, division by zero is <span className="text-red-400">undefined</span>. 
                    Python follows this rule strictly. This error occurs with:
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-amber-300">a / 0</p>
                      <p className="text-xs text-gray-400">Division</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-amber-300">a % 0</p>
                      <p className="text-xs text-gray-400">Modulo</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-amber-300">a // 0</p>
                      <p className="text-xs text-gray-400">Floor division</p>
                    </div>
                    <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-amber-300">divmod(a, 0)</p>
                      <p className="text-xs text-gray-400">Divmod function</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={`# ZeroDivisionError Examples\n# Mathematical operations that are undefined\n\n# 1. Simple division by zero\ndef calculate_average(total, count):\n    try:\n        return total / count\n    except ZeroDivisionError:\n        return "Cannot calculate average of zero items"\n\n# Test with different values\nprint("Test 1:", calculate_average(100, 5))    # Works\nprint("Test 2:", calculate_average(100, 0))    # Error!\n\n# 2. Modulo by zero\ntry:\n    remainder = 10 % 0\n    print(f"Remainder: {remainder}")\nexcept ZeroDivisionError as e:\n    print(f"ZeroDivisionError: {e}")\n\n# 3. Complex calculation with hidden zero\ndef calculate_ratio(a, b, c):\n    # What if (b - c) is zero?\n    try:\n        return a / (b - c)\n    except ZeroDivisionError:\n        return "Division by zero in ratio calculation"\n\n# Test with equal b and c\nprint("\\nRatio test:", calculate_ratio(10, 5, 5))`}
                />
                
                <div className="mt-4 p-4 bg-amber-900/20 rounded-lg border border-amber-700/30">
                  <h4 className="font-bold text-amber-300 mb-2">⚠️ Hidden Danger</h4>
                  <p className="text-amber-200 text-sm">
                    <span className="text-amber-300">Debangshu</span> from Ichapur learned that division by zero 
                    often occurs with <span className="text-red-400">user input or calculated values</span>. 
                    Always check denominators!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Comparison Table */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1000ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg">📊</span>
              Exception Comparison Chart
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-left text-gray-300 font-bold">Exception</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-bold">When Raised</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-bold">Common Causes</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-bold">Prevention</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      exception: "ValueError",
                      color: "red",
                      when: "Right type, wrong value",
                      causes: ["int('abc')", "list.index(not_found)", "math.sqrt(-1)"],
                      prevention: "Validate values before use"
                    },
                    {
                      exception: "TypeError",
                      color: "blue",
                      when: "Wrong type for operation",
                      causes: ["'str' + 123", "len(42)", "None.attribute"],
                      prevention: "Check types with isinstance()"
                    },
                    {
                      exception: "ZeroDivisionError",
                      color: "amber",
                      when: "Division by zero",
                      causes: ["x / 0", "x % 0", "divmod(x, 0)"],
                      prevention: "Check denominator != 0"
                    }
                  ].map((ex, index) => (
                    <tr 
                      key={index}
                      onMouseEnter={() => setHoveredExample(index)}
                      onMouseLeave={() => setHoveredExample(null)}
                      className={clsx(
                        "border-b border-gray-800/50 transition-all duration-300",
                        hoveredExample === index && `bg-${ex.color}-900/10`
                      )}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full bg-${ex.color}-500`}></div>
                          <span className={`text-${ex.color}-400 font-bold`}>{ex.exception}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{ex.when}</td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          {ex.causes.map((cause, i) => (
                            <code key={i} className={`block text-xs bg-gray-900/50 px-2 py-1 rounded font-mono text-${ex.color}-300`}>
                              {cause}
                            </code>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{ex.prevention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-5 bg-gray-900/40 rounded-xl border border-gray-700/30">
              <h4 className="text-lg font-bold text-white mb-3">🎓 Decision Tree for Debugging</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-red-400 font-bold mb-2">Ask:</p>
                  <p className="text-sm text-gray-300">"Is the value appropriate for this operation?"</p>
                  <p className="text-xs text-gray-400 mt-2">→ ValueError</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-blue-400 font-bold mb-2">Ask:</p>
                  <p className="text-sm text-gray-300">"Is the object type correct for this operation?"</p>
                  <p className="text-xs text-gray-400 mt-2">→ TypeError</p>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-amber-400 font-bold mb-2">Ask:</p>
                  <p className="text-sm text-gray-300">"Am I dividing by zero anywhere?"</p>
                  <p className="text-xs text-gray-400 mt-2">→ ZeroDivisionError</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Common Pitfalls */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-red-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-red-900/30 rounded-lg">⚠️</span>
              Common Student Pitfalls
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Confusing ValueError with TypeError</h4>
                  <p className="text-gray-300 mb-3">
                    <span className="text-amber-300">Swadeep</span> often mixes these up. Remember:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <code className="text-sm text-gray-400">int("123")</code>
                      <span className="text-green-400 text-sm">✓ Works (ValueError not raised)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <code className="text-sm text-gray-400">int("abc")</code>
                      <span className="text-red-400 text-sm">✗ ValueError (wrong value)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <code className="text-sm text-gray-400">int([1,2,3])</code>
                      <span className="text-blue-400 text-sm">✗ TypeError (wrong type)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Not Handling Edge Cases</h4>
                  <p className="text-gray-300">
                    Students like <span className="text-amber-300">Abhronila</span> forget to handle:
                  </p>
                  <ul className="mt-2 space-y-1">
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      Empty user input
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      File not found scenarios
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      Network timeouts
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Silent Catching of Errors</h4>
                  <p className="text-gray-300 mb-3">
                    Beginners often write:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono">
                    try:<br />
                    &nbsp;&nbsp;result = x / y<br />
                    except:<br />
                    &nbsp;&nbsp;pass  # Dangerous! Hides all errors
                  </code>
                  <p className="text-gray-400 text-sm mt-3">
                    <span className="text-green-400">Better:</span> Catch specific exceptions and handle them properly.
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Assuming User Input is Valid</h4>
                  <p className="text-gray-300">
                    When <span className="text-amber-300">Tuhina</span> from Naihati asks for a number:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-amber-300 text-sm font-mono mt-2">
                    age = input("Enter your age: ")<br />
                    # What if user enters "twenty"?<br />
                    # What if user enters ""?<br />
                    # What if user enters "-5"?
                  </code>
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
                    <span className="text-cyan-300 font-medium">Remember:</span> These three exceptions cover 
                    <span className="text-red-400"> 80% of beginner errors</span>. Master them, and you'll 
                    debug faster. Each exception tells a story:
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-red-400 font-bold">ValueError</p>
                      <p className="text-xs text-gray-400 mt-1">"I got the right kind of thing, but this particular value won't work"</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-blue-400 font-bold">TypeError</p>
                      <p className="text-xs text-gray-400 mt-1">"You're trying to use this thing in a way it wasn't designed for"</p>
                    </div>
                    <div className="text-center p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-amber-400 font-bold">ZeroDivisionError</p>
                      <p className="text-xs text-gray-400 mt-1">"This mathematical operation is undefined"</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl mt-4">
                    <h4 className="font-bold text-amber-300 mb-2">Teaching Strategy:</h4>
                    <p className="text-gray-300">
                      I tell my Barrackpore students: "When you see an exception, don't panic. 
                      Read the message. The exception <span className="text-green-400">name</span> tells you 
                      <span className="text-cyan-300"> what</span> went wrong, and the 
                      <span className="text-amber-300"> traceback</span> tells you 
                      <span className="text-blue-300"> where</span>."
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
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Specializes in error handling</span>
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
            hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-green-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-green-900/30 rounded-lg">✅</span>
              Best Practices for Exception Handling
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Be Specific",
                  icon: "🎯",
                  description: "Catch specific exceptions, not all exceptions",
                  code: "except ValueError:  # Good\nexcept:  # Bad",
                  color: "green"
                },
                {
                  title: "Validate Early",
                  icon: "🔍",
                  description: "Check inputs before they cause exceptions",
                  code: "if denominator != 0:\n    result = numerator / denominator",
                  color: "blue"
                },
                {
                  title: "Provide Context",
                  icon: "💬",
                  description: "Add helpful error messages for debugging",
                  code: 'raise ValueError(f"Invalid value: {value}")',
                  color: "purple"
                }
              ].map((practice, index) => (
                <div key={index} className="bg-gray-900/60 p-5 rounded-xl border border-gray-700/50">
                  <div className={`inline-flex p-3 bg-${practice.color}-900/30 rounded-xl mb-4`}>
                    <span className="text-2xl">{practice.icon}</span>
                  </div>
                  <h4 className={`text-xl font-bold text-${practice.color}-300 mb-3`}>{practice.title}</h4>
                  <p className="text-gray-300 mb-4">{practice.description}</p>
                  <code className={`text-sm text-${practice.color}-200 bg-gray-800/50 p-3 rounded block font-mono`}>
                    {practice.code}
                  </code>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gray-900/40 rounded-xl border border-gray-700/30">
              <h4 className="text-lg font-bold text-white mb-3">🏆 Professional Mindset</h4>
              <p className="text-gray-300">
                In industry, we don't just fix exceptions - we <span className="text-cyan-300">prevent them</span>. 
                Professional developers write code that validates inputs, checks preconditions, and handles 
                edge cases gracefully. <span className="text-amber-300">Debangshu</span> learned that 
                good error handling makes programs more reliable and user-friendly.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Mini Checklist */}
        <section className="motion-safe:animate-[fadeSlideUp_1.8s_ease-out] animation-delay-[1800ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">📋</span>
              What to Remember
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400">1</span>
                  </div>
                  <p className="text-gray-300"><span className="text-red-400 font-bold">ValueError:</span> Right type, wrong value</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400">2</span>
                  </div>
                  <p className="text-gray-300">Common with type conversions and list operations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">1</span>
                  </div>
                  <p className="text-gray-300"><span className="text-blue-400 font-bold">TypeError:</span> Wrong type for operation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">2</span>
                  </div>
                  <p className="text-gray-300">Common with mixed-type operations and function calls</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-400">1</span>
                  </div>
                  <p className="text-gray-300"><span className="text-amber-400 font-bold">ZeroDivisionError:</span> Division by zero</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-400">2</span>
                  </div>
                  <p className="text-gray-300">Mathematically undefined operation</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">💪 Next Steps</h4>
              <p className="text-gray-300">
                Now that you understand these common exceptions, practice by writing code that 
                <span className="text-green-400"> intentionally causes each one</span>, then 
                <span className="text-amber-400"> handle them gracefully</span>. This builds muscle memory 
                for real debugging situations.
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
                "When <span className="text-amber-300">Swadeep</span> writes 
                <code className="mx-2 bg-gray-800 px-2 py-1 rounded">age = int(input("Age: "))</code>, 
                what exceptions could occur? 
                <span className="text-cyan-300"> List all possible exceptions and think about when each would occur.</span>"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Consider:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    User enters "abc" instead of a number
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    User enters "25.5" (decimal number)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    User presses Enter without typing anything
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    User enters "-5" (negative age)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Common Python Exceptions • Topic 2 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Try and Except Blocks</p>
      </footer>
    </div>
  );
};

export default Topic2;