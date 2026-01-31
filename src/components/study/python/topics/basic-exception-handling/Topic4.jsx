import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const Topic4 = () => {
  const [activePattern, setActivePattern] = useState(null);
  const [hoveredException, setHoveredException] = useState(null);

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
        @keyframes patternGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(168, 85, 247, 0.3); }
          50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); }
        }
        @keyframes branchFlow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-3">
          Handling Multiple Exceptions
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Mastering the art of catching and handling different exceptions in sophisticated ways.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Introduction */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg">🎯</span>
              Why Multiple Exception Handling?
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-white mb-3">The Real-World Need</h3>
                  <p className="text-gray-300 leading-relaxed">
                    In real applications, <span className="text-purple-300 font-medium">multiple things can go wrong</span>.
                    A single operation might raise different exceptions based on different conditions.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-amber-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Student Scenario</h3>
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-amber-300">Tuhina</span> from Barrackpore builds a calculator app. 
                    User input could cause <span className="text-red-400">ValueError</span> (invalid number) 
                    or <span className="text-amber-400">ZeroDivisionError</span>. Each needs different handling.
                  </p>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 250">
                  <defs>
                    <linearGradient id="multiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#8B5CF6', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#EC4899', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Try Block */}
                  <rect x="50" y="40" width="300" height="60" rx="8" 
                    className="fill-gray-800 stroke-purple-500 stroke-2" />
                  <text x="200" y="75" className="text-lg font-bold fill-white" textAnchor="middle">TRY Block</text>
                  
                  {/* Exception Branching */}
                  <path d="M200 100 L200 130" className="stroke-gray-500 stroke-2" />
                  
                  {/* Branch Point */}
                  <circle cx="200" cy="150" r="10" className="fill-gray-700" />
                  
                  {/* Three Branches */}
                  <g>
                    <path d="M200 150 L120 200" className="stroke-red-500 stroke-2" />
                    <rect x="80" y="200" width="80" height="40" rx="6" className="fill-red-900/30 stroke-red-500 stroke-2" />
                    <text x="120" y="225" className="text-sm fill-red-300" textAnchor="middle">ValueError</text>
                  </g>
                  
                  <g>
                    <path d="M200 150 L200 200" className="stroke-blue-500 stroke-2" />
                    <rect x="160" y="200" width="80" height="40" rx="6" className="fill-blue-900/30 stroke-blue-500 stroke-2" />
                    <text x="200" y="225" className="text-sm fill-blue-300" textAnchor="middle">TypeError</text>
                  </g>
                  
                  <g>
                    <path d="M200 150 L280 200" className="stroke-amber-500 stroke-2" />
                    <rect x="240" y="200" width="80" height="40" rx="6" className="fill-amber-900/30 stroke-amber-500 stroke-2" />
                    <text x="280" y="225" className="text-sm fill-amber-300" textAnchor="middle">ZeroDivision</text>
                  </g>
                  
                  <text x="120" y="170" className="text-xs fill-red-400" textAnchor="middle">Branch 1</text>
                  <text x="200" y="170" className="text-xs fill-blue-400" textAnchor="middle">Branch 2</text>
                  <text x="280" y="170" className="text-xs fill-amber-400" textAnchor="middle">Branch 3</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Separate Except Blocks */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div 
            onMouseEnter={() => setActivePattern('separate')}
            onMouseLeave={() => setActivePattern(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activePattern === 'separate' && "border-blue-500/50 shadow-2xl shadow-blue-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/40 rounded-xl">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-blue-400">Separate Except Blocks</h2>
                  <p className="text-gray-400">Different handling for different exceptions</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-900/30 rounded-full border border-blue-700/50">
                <code className="text-blue-300 font-mono">Pattern 1</code>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">When to Use</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Different exceptions require <span className="text-blue-400">different handling logic</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">You want to provide <span className="text-blue-400">specific error messages</span> for each case</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Need to <span className="text-blue-400">recover differently</span> based on error type</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Points</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Order</div>
                      <div>
                        <p className="text-gray-300 font-medium">Order Matters!</p>
                        <p className="text-gray-400 text-sm">Specific exceptions must come before general ones</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-2 py-1 bg-blue-900/40 rounded text-xs text-blue-300 mt-1">Tip</div>
                      <div>
                        <p className="text-gray-300 font-medium">Clear Separation</p>
                        <p className="text-gray-400 text-sm">Each block handles one specific failure mode</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Pattern 1: Separate Except Blocks\ndef smart_calculator():\n    \"\"\"Handles different calculation errors separately\"\"\"\n    try:\n        num1 = float(input(\"Enter first number: \"))\n        num2 = float(input(\"Enter second number: \"))\n        operation = input(\"Enter operation (+,-,*,/): \")\n        \n        if operation == '+':\n            result = num1 + num2\n        elif operation == '-':\n            result = num1 - num2\n        elif operation == '*':\n            result = num1 * num2\n        elif operation == '/':\n            result = num1 / num2\n        else:\n            print(\"Invalid operation!\")\n            return\n            \n        print(f\"Result: {result}\")\n        \n    except ValueError:\n        print(\"Error: Please enter valid numbers!\")\n        \n    except ZeroDivisionError:\n        print(\"Error: Cannot divide by zero!\")\n        \n    except KeyboardInterrupt:\n        print(\"\\nOperation cancelled by user.\")\n        \n    except Exception as e:\n        print(f\"Unexpected error: {type(e).__name__}\")\n\n# Run the calculator\nsmart_calculator()`}
                />
                
                <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="font-bold text-blue-300 mb-2">💡 Professional Insight</h4>
                  <p className="text-blue-200 text-sm">
                    <span className="text-amber-300">Swadeep</span> uses this pattern for user-facing applications 
                    where <span className="text-blue-400">different errors need different user guidance</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Single Except Block with Tuple */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div 
            onMouseEnter={() => setActivePattern('tuple')}
            onMouseLeave={() => setActivePattern(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activePattern === 'tuple' && "border-green-500/50 shadow-2xl shadow-green-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-900/40 rounded-xl">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-green-400">Single Except with Tuple</h2>
                  <p className="text-gray-400">Grouping related exceptions together</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-900/30 rounded-full border border-green-700/50">
                <code className="text-green-300 font-mono">Pattern 2</code>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Pattern 2: Single Except with Tuple\ndef read_config_file(filename):\n    \"\"\"Reads configuration file with grouped exception handling\"\"\"\n    config = {}\n    \n    try:\n        with open(filename, 'r') as file:\n            for line in file:\n                if '=' in line:\n                    key, value = line.strip().split('=', 1)\n                    config[key] = value\n        \n        print(f\"Successfully read {len(config)} configuration items\")\n        return config\n        \n    except (FileNotFoundError, PermissionError) as e:\n        # Group file access errors together\n        print(f\"File error: {type(e).__name__} - {e}\")\n        return None\n        \n    except (ValueError, UnicodeDecodeError) as e:\n        # Group parsing errors together\n        print(f\"Parsing error: Cannot parse file - {e}\")\n        return None\n        \n    except Exception as e:\n        # Catch-all for unexpected errors\n        print(f\"Unexpected error: {type(e).__name__}\")\n        return None\n\n# Test with different scenarios\nprint(\"Test 1: Try with existing file (if exists)\")\nconfig = read_config_file('config.txt')\n\nprint(\"\\nTest 2: Try with non-existent file\")\nconfig = read_config_file('nonexistent.txt')`}
                />
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">When to Use</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Multiple exceptions require <span className="text-green-400">identical handling</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Exceptions are <span className="text-green-400">logically related</span> (e.g., all file errors)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">You want to <span className="text-green-400">reduce code duplication</span></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Syntax Format</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    <p className="text-green-400">except (<span className="text-blue-400">Exception1</span>, <span className="text-blue-400">Exception2</span>, <span className="text-blue-400">Exception3</span>) <span className="text-amber-400">as e</span>:</p>
                    <p className="text-gray-400 ml-4"># Handle all listed exceptions the same way</p>
                    <p className="text-gray-400 ml-4">
                        {`print(f"Error: {type(e).__name__}")`}
                        </p>
                  </div>
                  <p className="text-green-300 text-sm mt-3">💡 Use parentheses to group exceptions in a tuple</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-green-900/20 rounded-xl border border-green-700/30">
              <h4 className="text-lg font-semibold text-green-300 mb-3">🎯 Real-World Application</h4>
              <p className="text-gray-300">
                <span className="text-amber-300">Abhronila</span> from Shyamnagar uses this pattern in web applications 
                where different database errors (<code className="bg-gray-800 px-2 py-1 rounded">ConnectionError</code>, 
                <code className="bg-gray-800 px-2 py-1 rounded">TimeoutError</code>) need the same retry logic.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Nested Try-Except */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div 
            onMouseEnter={() => setActivePattern('nested')}
            onMouseLeave={() => setActivePattern(null)}
            className={clsx(
              "bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-500",
              activePattern === 'nested' && "border-amber-500/50 shadow-2xl shadow-amber-900/20 transform -translate-y-2"
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-900/40 rounded-xl">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-amber-400">Nested Try-Except</h2>
                  <p className="text-gray-400">Handling exceptions at different levels</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-900/30 rounded-full border border-amber-700/50">
                <code className="text-amber-300 font-mono">Pattern 3</code>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Example</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Pattern 3: Nested Try-Except\ndef process_student_grades(file_path):\n    \"\"\"Process student grades with nested exception handling\"\"\"\n    students = []\n    \n    try:\n        # Outer try: File operations\n        with open(file_path, 'r') as file:\n            lines = file.readlines()\n            \n            for i, line in enumerate(lines, 1):\n                try:\n                    # Inner try: Data processing\n                    data = line.strip().split(',')\n                    \n                    if len(data) != 3:\n                        raise ValueError(f\"Line {i}: Expected 3 values\")\n                    \n                    name, subject, grade = data\n                    \n                    # Convert grade to integer\n                    grade_int = int(grade)\n                    \n                    if grade_int < 0 or grade_int > 100:\n                        raise ValueError(f\"Line {i}: Grade out of range (0-100)\")\n                    \n                    students.append({\n                        'name': name,\n                        'subject': subject,\n                        'grade': grade_int\n                    })\n                    \n                except ValueError as e:\n                    print(f\"Data error on line {i}: {e}\")\n                    # Continue processing other lines\n                    continue\n                \n        print(f\"\\nSuccessfully processed {len(students)} students\")\n        return students\n        \n    except FileNotFoundError:\n        print(f\"Error: File '{file_path}' not found\")\n        return None\n    \n    except PermissionError:\n        print(f\"Error: No permission to read '{file_path}'\")\n        return None\n    \n    except Exception as e:\n        print(f\"Unexpected error: {type(e).__name__}\")\n        return None\n\n# Example data format:\n# Swadeep,Math,85\n# Tuhina,Science,92\n# Abhronila,English,invalid\n# Debangshu,History,105`}
                />
              </div>

              <div className="grid md:grid-cols-1 gap-8">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">When to Use</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Need <span className="text-amber-400">different recovery strategies</span> at different levels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Processing multiple items where <span className="text-amber-400">individual failures shouldn't stop overall processing</span></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Complex operations with <span className="text-amber-400">multiple failure points</span></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Visual Structure</h3>
                  <div className="relative h-40">
                    <div className="absolute left-4 top-4 w-32 h-24 border-2 border-amber-500/50 rounded-lg p-2">
                      <p className="text-xs text-amber-300">Outer Try</p>
                      <p className="text-xs text-gray-400">File operations</p>
                    </div>
                    <div className="absolute left-44 top-8 w-40 h-16 border-2 border-blue-500/50 rounded-lg p-2">
                      <p className="text-xs text-blue-300">Inner Try</p>
                      <p className="text-xs text-gray-400">Data processing</p>
                    </div>
                    <div className="absolute left-52 top-28 w-24 h-12 border-2 border-red-500/50 rounded-lg p-1">
                      <p className="text-xs text-red-300">Except</p>
                    </div>
                    <div className="absolute left-20 top-32 w-24 h-12 border-2 border-green-500/50 rounded-lg p-1">
                      <p className="text-xs text-green-300">Except</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Flow Decision Chart */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1000ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">📊</span>
              Which Pattern to Choose?
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

                {/* Question 1 */}
                <rect x="200" y="100" width="300" height="80" rx="10" className="fill-blue-900/40 stroke-blue-500 stroke-2" />
                <text x="350" y="130" className="text-md font-bold fill-white" textAnchor="middle">Do different exceptions need</text>
                <text x="350" y="155" className="text-md font-bold fill-white" textAnchor="middle">different handling?</text>

                {/* Yes/No */}
                <path d="M350 180 L350 220" className="stroke-gray-500 stroke-2" />
                <path d="M350 180 L200 250" className="stroke-gray-500 stroke-2" />
                <path d="M350 180 L500 250" className="stroke-gray-500 stroke-2" />

                {/* Yes -> Separate */}
                <rect x="100" y="250" width="200" height="60" rx="10" className="fill-blue-900/40 stroke-blue-500 stroke-2" />
                <text x="200" y="285" className="text-md font-bold fill-white" textAnchor="middle">Separate Except Blocks</text>
                <text x="200" y="305" className="text-sm fill-blue-300" textAnchor="middle">Pattern 1</text>

                {/* No -> Question 2 */}
                <rect x="400" y="250" width="200" height="80" rx="10" className="fill-green-900/40 stroke-green-500 stroke-2" />
                <text x="500" y="280" className="text-md font-bold fill-white" textAnchor="middle">Multiple failure</text>
                <text x="500" y="305" className="text-md font-bold fill-white" textAnchor="middle">points at different levels?</text>

                {/* From No */}
                <path d="M500 330 L500 370" className="stroke-gray-500 stroke-2" />
                <path d="M500 330 L350 400" className="stroke-gray-500 stroke-2" />
                <path d="M500 330 L650 400" className="stroke-gray-500 stroke-2" />

                {/* Yes -> Nested */}
                <rect x="300" y="370" width="100" height="60" rx="10" className="fill-amber-900/40 stroke-amber-500 stroke-2" />
                <text x="350" y="405" className="text-md font-bold fill-white" textAnchor="middle">Nested</text>
                <text x="350" y="425" className="text-sm fill-amber-300" textAnchor="middle">Pattern 3</text>

                {/* No -> Tuple */}
                <rect x="550" y="370" width="200" height="60" rx="10" className="fill-green-900/40 stroke-green-500 stroke-2" />
                <text x="650" y="405" className="text-md font-bold fill-white" textAnchor="middle">Single Except with Tuple</text>
                <text x="650" y="425" className="text-sm fill-green-300" textAnchor="middle">Pattern 2</text>

                {/* Labels */}
                <text x="250" y="240" className="text-sm fill-blue-400" textAnchor="middle">Yes</text>
                <text x="450" y="240" className="text-sm fill-green-400" textAnchor="middle">No</text>
                <text x="425" y="360" className="text-sm fill-amber-400" textAnchor="middle">Yes</text>
                <text x="575" y="360" className="text-sm fill-green-400" textAnchor="middle">No</text>

                {/* Examples */}
                <g>
                  <text x="200" y="350" className="text-xs fill-blue-300" textAnchor="middle">User input validation</text>
                  <text x="200" y="365" className="text-xs fill-blue-300" textAnchor="middle">Calculator app</text>
                </g>
                <g>
                  <text x="350" y="470" className="text-xs fill-amber-300" textAnchor="middle">File processing</text>
                  <text x="350" y="485" className="text-xs fill-amber-300" textAnchor="middle">Multi-item data</text>
                </g>
                <g>
                  <text x="650" y="470" className="text-xs fill-green-300" textAnchor="middle">Grouped errors</text>
                  <text x="650" y="485" className="text-xs fill-green-300" textAnchor="middle">Same recovery</text>
                </g>
              </svg>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <p className="text-blue-400 font-bold mb-2">Pattern 1</p>
                  <p className="text-xs text-gray-300">Separate handling for each exception type</p>
                  <p className="text-xs text-blue-300 mt-2">Best for: User-facing apps</p>
                </div>
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <p className="text-green-400 font-bold mb-2">Pattern 2</p>
                  <p className="text-xs text-gray-300">Group related exceptions together</p>
                  <p className="text-xs text-green-300 mt-2">Best for: API/library code</p>
                </div>
                <div className="text-center p-4 bg-amber-900/20 rounded-lg border border-amber-700/30">
                  <p className="text-amber-400 font-bold mb-2">Pattern 3</p>
                  <p className="text-xs text-gray-300">Handle errors at different levels</p>
                  <p className="text-xs text-amber-300 mt-2">Best for: Complex processing</p>
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
              Common Pitfalls with Multiple Exceptions
            </h2>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 1: Wrong Order</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    try:<br />
                    &nbsp;&nbsp;code()<br />
                    except Exception:  # ❌ Too broad first<br />
                    &nbsp;&nbsp;print("General error")<br />
                    except ValueError:  # ⚠️ Never reached!<br />
                    &nbsp;&nbsp;print("Value error")
                  </code>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Debangshu</span> from Ichapur learned: Python checks 
                    except clauses <span className="text-red-400">in order</span>. Put specific exceptions first!
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 2: Overlapping Exception Groups</h4>
                  <p className="text-gray-300 mb-3">
                    Avoid this confusing pattern:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono">
                    except (ValueError, TypeError):<br />
                    &nbsp;&nbsp;print("Type or value error")<br />
                    except ValueError:  # ⚠️ Never reached!<br />
                    &nbsp;&nbsp;print("Only value error")
                  </code>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 3: Too Deep Nesting</h4>
                  <p className="text-gray-300 mb-3">
                    Excessive nesting makes code hard to read:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono">
                    try:<br />
                    &nbsp;&nbsp;try:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;try:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deep_code()<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;except A:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handle_a()<br />
                    &nbsp;&nbsp;except B:<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;handle_b()<br />
                    except C:<br />
                    &nbsp;&nbsp;handle_c()
                  </code>
                  <p className="text-gray-400 text-sm mt-3">💡 Refactor nested try blocks into separate functions</p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 4: Ignoring Exception Details</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    except (ValueError, TypeError):<br />
                    &nbsp;&nbsp;print("Some error occurred")  # ❌ Which one?
                  </code>
                  <p className="text-gray-300">
                    Always capture the exception to provide useful information:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-green-300 text-sm font-mono mt-2">
                    except (ValueError, TypeError) as e:<br />
                    &nbsp;&nbsp;
                    {`print(f"{type(e).__name__}: {e}")`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <section className="motion-safe:animate-[fadeSlideUp_1.4s_ease-out] animation-delay-[1400ms]">
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
                    <span className="text-cyan-300 font-medium">Key Insight:</span> Handling multiple exceptions is not just about 
                    preventing crashes—it's about <span className="text-purple-400">designing robust error recovery strategies</span>. 
                    Each pattern serves a different architectural purpose.
                  </p>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-300 mb-2">Teaching Strategy:</h4>
                    <p className="text-gray-300">
                      I tell my Barrackpore students: "Think of exceptions like different types of customers 
                      in a restaurant. Some want a quick apology (tuple pattern), some need special attention 
                      (separate blocks), and some need you to handle issues at multiple levels (nested). 
                      The pattern you choose depends on what kind of 'service' each error needs."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-blue-400 font-bold text-sm">Separate Blocks</p>
                      <p className="text-xs text-gray-400 mt-1">Customer-specific service</p>
                    </div>
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-green-400 font-bold text-sm">Tuple Pattern</p>
                      <p className="text-xs text-gray-400 mt-1">Group service</p>
                    </div>
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-amber-400 font-bold text-sm">Nested Pattern</p>
                      <p className="text-xs text-gray-400 mt-1">Multi-level service</p>
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
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">Specializes in error strategy</span>
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
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">1. Document Your Exception Strategy</h4>
                  <p className="text-gray-300 mb-3">
                    In professional code, document which exceptions are caught and why:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-sm text-gray-300 block">
                      def process_data(data):<br />
                      &nbsp;&nbsp;"""Process input data.<br />
                      &nbsp;&nbsp;Raises:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;ValueError: If data format is invalid<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;TypeError: If data type is incorrect<br />
                      &nbsp;&nbsp;"""<br />
                      &nbsp;&nbsp;try:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;# ...<br />
                      &nbsp;&nbsp;except (ValueError, TypeError) as e:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {`logging.error(f"Data error: {e}")`}
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;raise  # Re-raise for caller
                    </code>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">2. Use Custom Exception Hierarchies</h4>
                  <p className="text-gray-300">
                    For complex applications, create custom exception classes:
                  </p>
                  <div className="mt-3 bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-sm text-gray-300 block">
                      class DataError(Exception):<br />
                      &nbsp;&nbsp;pass<br />
                      <br />
                      class ValidationError(DataError):<br />
                      &nbsp;&nbsp;pass<br />
                      <br />
                      class ProcessingError(DataError):<br />
                      &nbsp;&nbsp;pass<br />
                      <br />
                      # Then catch the parent class<br />
                      except DataError:<br />
                      &nbsp;&nbsp;# Catches ValidationError and ProcessingError
                    </code>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">3. Use Context Managers for Resources</h4>
                  <p className="text-gray-300 mb-3">
                    Combine multiple exception handling with context managers:
                  </p>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-sm text-gray-300 block">
                      import contextlib<br />
                      <br />
                      @contextlib.contextmanager<br />
                      def safe_operation():<br />
                      &nbsp;&nbsp;try:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;yield<br />
                      &nbsp;&nbsp;except (IOError, OSError) as e:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {`print(f"IO error: {e}")`}
                      <br />
                      &nbsp;&nbsp;except ValueError as e:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {`print(f"Value error: {e}")`}
                      <br />
                      <br />
                      # Usage<br />
                      with safe_operation():<br />
                      &nbsp;&nbsp;risky_code()
                    </code>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border border-emerald-700/30">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">4. Test Exception Scenarios</h4>
                  <p className="text-gray-300">
                    Professional developers test all exception paths:
                  </p>
                  <div className="mt-3 bg-gray-800/50 p-4 rounded-lg">
                    <code className="text-sm text-gray-300 block">
                      import pytest<br />
                      <br />
                      def test_multiple_exceptions():<br />
                      &nbsp;&nbsp;# Test ValueError<br />
                      &nbsp;&nbsp;with pytest.raises(ValueError):<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;process_data("invalid")<br />
                      <br />
                      &nbsp;&nbsp;# Test TypeError<br />
                      &nbsp;&nbsp;with pytest.raises(TypeError):<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;process_data(None)<br />
                      <br />
                      &nbsp;&nbsp;# Test successful case<br />
                      &nbsp;&nbsp;assert process_data("valid") == expected
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">🏆 Industry Standard</h4>
              <p className="text-gray-300">
                In enterprise Python applications, exception handling is not an afterthought—it's 
                <span className="text-cyan-300"> part of the design</span>. Professional teams document 
                exception hierarchies, test error scenarios, and choose patterns based on 
                <span className="text-emerald-300"> business requirements</span> rather than convenience.
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
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">1</span>
                  </div>
                  <p className="text-gray-300">Use <span className="text-blue-400 font-bold">separate except blocks</span> when different exceptions need different handling</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400">2</span>
                  </div>
                  <p className="text-gray-300">Order matters: specific exceptions must come before general ones</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">1</span>
                  </div>
                  <p className="text-gray-300">Use <span className="text-green-400 font-bold">tuple patterns</span> when multiple exceptions need identical handling</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-400">2</span>
                  </div>
                  <p className="text-gray-300">Group logically related exceptions together</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-400">1</span>
                  </div>
                  <p className="text-gray-300">Use <span className="text-amber-400 font-bold">nested try-except</span> for complex, multi-level error handling</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-amber-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-400">2</span>
                  </div>
                  <p className="text-gray-300">Avoid deep nesting; refactor into helper functions</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl border border-purple-700/30">
              <h4 className="text-lg font-bold text-purple-300 mb-3">💪 Practice Exercise</h4>
              <p className="text-gray-300">
                Create a file processor that:
                <span className="text-cyan-300"> 1) Handles FileNotFoundError and PermissionError with different messages</span>, 
                <span className="text-green-300"> 2) Groups ValueError and UnicodeDecodeError together</span>, 
                <span className="text-amber-300"> 3) Uses nested try-except to handle individual line errors without stopping entire processing</span>.
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
                "When <span className="text-amber-300">Swadeep</span> builds a web API, should he use 
                <code className="mx-2 bg-gray-800 px-2 py-1 rounded">except (ValueError, TypeError):</code> 
                or separate except blocks? 
                <span className="text-cyan-300"> Consider: Does the API client need to know exactly which error occurred, 
                or just that there was an input error?</span>"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Consider:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    API design principles: Should errors be specific or generic?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Security: Does revealing error types expose implementation details?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Client experience: Can the client act differently based on error type?
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Handling Multiple Exceptions • Topic 4 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Using else with try-except</p>
      </footer>
    </div>
  );
};

export default Topic4;