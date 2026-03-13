import React, { useState } from "react";
import clsx from "clsx";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const Topic5 = () => {
  const [activeFlow, setActiveFlow] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

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
        @keyframes successPath {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes elseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
        }
      `}</style>

      {/* Header Section */}
      <header className="mb-10 motion-safe:animate-[fadeSlideUp_0.8s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-300 mb-3">
          The else Clause in Try-Except
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
          Using else to separate success logic from error handling - writing cleaner, more maintainable code.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-400 mt-4 rounded-full"></div>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Section 1: Introduction */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 
            hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-emerald-300 mb-6 flex items-center gap-3">
              <span className="p-2 bg-emerald-900/30 rounded-lg">🎯</span>
              What is the else Clause?
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-emerald-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Definition</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The <span className="text-emerald-300 font-medium">else clause</span> in try-except blocks 
                    executes <span className="text-green-400">only when no exception occurs</span> in the try block. 
                    It's for code that should run on successful execution but might itself raise exceptions.
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl border-l-4 border-amber-500">
                  <h3 className="text-xl font-semibold text-white mb-3">Real-World Analogy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Think of <span className="text-amber-300">Tuhina</span> from Barrackpore ordering food online. 
                    The <span className="text-emerald-400">try</span> is placing the order, 
                    <span className="text-red-400"> except</span> handles delivery failures, and 
                    <span className="text-green-400"> else</span> is enjoying the meal (only if delivery succeeded).
                  </p>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Basic Syntax</h3>
                  <div className="bg-gray-800/50 p-4 rounded-lg font-mono text-sm">
                    <p className="text-emerald-400">try:</p>
                    <p className="text-gray-400 ml-4"># Code that might raise exception</p>
                    <p className="text-emerald-400">except <span className="text-red-400">ExceptionType</span>:</p>
                    <p className="text-gray-400 ml-4"># Handle the exception</p>
                    <p className="text-emerald-400">else:</p>
                    <p className="text-gray-400 ml-4"># Runs only if no exception in try</p>
                    <p className="text-emerald-400">finally:</p>
                    <p className="text-gray-400 ml-4"># Always runs</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <svg className="w-full h-auto" viewBox="0 0 400 320">
                  <defs>
                    <linearGradient id="elseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Try Block */}
                  <rect x="50" y="40" width="300" height="60" rx="8" 
                    className="fill-gray-800 stroke-emerald-500 stroke-2" />
                  <text x="200" y="75" className="text-lg font-bold fill-white" textAnchor="middle">TRY Block</text>
                  
                  {/* Decision */}
                  <circle cx="200" cy="140" r="15" className="fill-gray-700" />
                  <text x="200" y="145" className="text-sm fill-white" textAnchor="middle">?</text>
                  
                  {/* Exception Path */}
                  <path d="M200 155 L200 185" className="stroke-red-500 stroke-2" />
                  <rect x="100" y="185" width="200" height="40" rx="6" className="fill-red-900/30 stroke-red-500 stroke-2" />
                  <text x="200" y="210" className="text-sm fill-red-300" textAnchor="middle">EXCEPT Block</text>
                  
                  {/* Success Path */}
                  <path d="M185 155 L150 200" className="stroke-green-500 stroke-2" strokeDasharray="5,5" />
                  <rect x="100" y="235" width="100" height="40" rx="6" 
                    className={clsx(
                      "fill-green-900/30 stroke-green-500 stroke-2",
                      hoveredSection === 'else' && "animate-[elseGlow_2s_ease-in-out_infinite]"
                    )}
                    onMouseEnter={() => setHoveredSection('else')}
                    onMouseLeave={() => setHoveredSection(null)}
                  />
                  <text x="150" y="260" className="text-sm fill-green-300" textAnchor="middle">ELSE Block</text>
                  
                  {/* Finally Path */}
                  <path d="M215 155 L250 200" className="stroke-amber-500 stroke-2" />
                  <path d="M150 275 L150 285" className="stroke-amber-500 stroke-2" />
                  <path d="M150 285 L250 285" className="stroke-amber-500 stroke-2" />
                  <path d="M250 285 L250 240" className="stroke-amber-500 stroke-2" />
                  <rect x="200" y="235" width="100" height="40" rx="6" className="fill-amber-900/30 stroke-amber-500 stroke-2" />
                  <text x="250" y="260" className="text-sm fill-amber-300" textAnchor="middle">FINALLY Block</text>
                  
                  {/* Labels */}
                  <text x="200" y="130" className="text-xs fill-gray-400" textAnchor="middle">Exception?</text>
                  <text x="120" y="170" className="text-xs fill-red-400" textAnchor="middle">Yes</text>
                  <text x="280" y="170" className="text-xs fill-green-400" textAnchor="middle">No</text>
                  
                  {/* Flow Animation */}
                  <path id="successFlow" d="M200 100 L200 140 M185 155 L150 200" 
                    className="stroke-cyan-500 stroke-2 fill-none" strokeWidth="2" 
                    strokeDasharray="10,5" strokeDashoffset="100" 
                    style={{animation: 'successPath 3s linear infinite'}} />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Use Else? */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[400ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-blue-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-blue-900/30 rounded-lg">🤔</span>
              Why Use the else Clause?
            </h2>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Problem: Code Placement Dilemma</h3>
                  <p className="text-gray-300 mb-3">
                    Where should you put code that should run on success but might raise exceptions?
                  </p>
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-red-400 text-sm">❌ Option A: After try-except</p>
                      <p className="text-gray-400 text-xs">Code runs even if exception was caught!</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-red-400 text-sm">❌ Option B: In try block</p>
                      <p className="text-gray-400 text-xs">Makes exception handling ambiguous</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-emerald-400 text-sm">✅ Option C: In else block</p>
                      <p className="text-gray-400 text-xs">Perfect! Only runs on success</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">Professional Insight</h3>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Swadeep</span> learned that <code className="text-emerald-400">else</code> 
                    makes code <span className="text-blue-400">intent clearer</span>. It separates:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Risky operations (try)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Error handling (except)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-gray-300">Success actions (else)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Interactive Comparison</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Compare: With vs Without else\n\n# ===== WITHOUT else (Problematic) =====\ndef process_file_without_else(filename):\n    data = None\n    try:\n        with open(filename, 'r') as file:\n            data = file.read()\n        # Problem: This runs even if file.read() raises exception!\n        print(f"File read successfully: {len(data)} characters")\n        return data\n    except FileNotFoundError:\n        print(f"Error: File {filename} not found")\n        return None\n\n# ===== WITH else (Correct) =====\ndef process_file_with_else(filename):\n    data = None\n    try:\n        with open(filename, 'r') as file:\n            data = file.read()\n    except FileNotFoundError:\n        print(f"Error: File {filename} not found")\n        return None\n    else:\n        # This only runs if no exception in try block\n        print(f"File read successfully: {len(data)} characters")\n        return data\n    finally:\n        print("File processing attempt completed.\\n")\n\n# Test both functions\nprint("Test WITHOUT else:")\nprocess_file_without_else('nonexistent.txt')\n\nprint("Test WITH else:")\nprocess_file_with_else('nonexistent.txt')`}
                />
                
                <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                  <h4 className="font-bold text-blue-300 mb-2">💡 Key Difference</h4>
                  <p className="text-blue-200 text-sm">
                    Without else: Success message prints even on error (misleading!).<br />
                    With else: Success message only prints on actual success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Practical Examples */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[600ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-purple-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-purple-900/30 rounded-lg">💻</span>
              Practical Examples with else
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example 1: Database Operations</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Example: Database transaction with else\nimport sqlite3\n\ndef save_user_data(user_data):\n    \"\"\"Save user data to database with proper error handling\"\"\"\n    conn = None\n    try:\n        conn = sqlite3.connect('users.db')\n        cursor = conn.cursor()\n        \n        # Risky operation: Insert data\n        cursor.execute(\n            \"INSERT INTO users (name, email, age) VALUES (?, ?, ?)\",\n            (user_data['name'], user_data['email'], user_data['age'])\n        )\n        \n    except sqlite3.IntegrityError:\n        print(\"Error: Email already exists in database\")\n        return False\n        \n    except sqlite3.OperationalError as e:\n        print(f\"Database error: {e}\")\n        return False\n        \n    else:\n        # Only commit if insert succeeded\n        conn.commit()\n        print(f\"User {user_data['name']} saved successfully!\")\n        return True\n        \n    finally:\n        # Always close connection\n        if conn:\n            conn.close()\n\n# Test with sample data\nuser = {\n    'name': 'Swadeep',\n    'email': 'swadeep@example.com',\n    'age': 21\n}\n\n# Try running this (database file may not exist)\n# result = save_user_data(user)`}
                />
                
                <div className="mt-4 p-4 bg-purple-900/20 rounded-lg border border-purple-700/30">
                  <h4 className="font-bold text-purple-300 mb-2">🎯 Why else is Critical Here</h4>
                  <p className="text-purple-200 text-sm">
                    Without else: <code className="bg-gray-800 px-1">conn.commit()</code> would run even on insert failure!<br />
                    With else: Commit only happens on successful insert.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Example 2: Web API Requests</h3>
                <EditablePythonCodeBlock
                  initialCode={`# Example: API request with else\nimport requests\n\ndef fetch_user_data(user_id):\n    \"\"\"Fetch user data from API with proper error handling\"\"\"\n    try:\n        response = requests.get(f'https://api.example.com/users/{user_id}', timeout=5)\n        response.raise_for_status()  # Raises HTTPError for bad responses\n        \n    except requests.exceptions.Timeout:\n        print(\"Error: Request timed out\")\n        return None\n        \n    except requests.exceptions.ConnectionError:\n        print(\"Error: Network connection failed\")\n        return None\n        \n    except requests.exceptions.HTTPError as e:\n        print(f\"HTTP Error: {e.response.status_code}\")\n        return None\n        \n    else:\n        # Only process data if request succeeded\n        user_data = response.json()\n        print(f\"Successfully fetched data for user {user_id}\")\n        return user_data\n        \n    finally:\n        print(f\"API request for user {user_id} completed\")\n\n# Simulate different scenarios\nprint(\"Scenario 1: Simulate successful request (no actual call)\")\nprint(\"Scenario 2: Try modifying to simulate errors\")\nprint(\"\\nKey insight: else block prevents processing bad responses!\")`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Flow Visualization */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[800ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-cyan-900/30 rounded-lg">🔄</span>
              Execution Flow with else
            </h2>

            <div className="relative max-w-4xl mx-auto">
              <svg className="w-full h-auto" viewBox="0 0 800 500">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#EF4444', stopOpacity: 1}} />
                  </linearGradient>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-500" />
                  </marker>
                </defs>

                {/* Start */}
                <rect x="350" y="20" width="100" height="60" rx="10" className="fill-gray-800 stroke-cyan-500 stroke-2" />
                <text x="400" y="55" className="text-lg font-bold fill-white" textAnchor="middle">Start</text>

                {/* Try Block */}
                <rect x="250" y="100" width="300" height="80" rx="10" 
                  className="fill-gray-800 stroke-emerald-500 stroke-2" 
                  onMouseEnter={() => setActiveFlow('try')}
                  onMouseLeave={() => setActiveFlow(null)}
                />
                <text x="400" y="130" className="text-xl font-bold fill-emerald-300" textAnchor="middle">TRY Block</text>
                <text x="400" y="155" className="text-sm fill-emerald-200" textAnchor="middle">Execute risky operation</text>

                {/* Decision Point */}
                <circle cx="400" cy="220" r="20" className="fill-gray-700" />
                <text x="400" y="225" className="text-lg fill-white" textAnchor="middle">?</text>
                <text x="400" y="205" className="text-sm fill-gray-400" textAnchor="middle">Exception?</text>

                {/* Exception Path */}
                <g onMouseEnter={() => setActiveFlow('except')} onMouseLeave={() => setActiveFlow(null)}>
                  <path d="M400 240 L400 280" className="stroke-red-500 stroke-2" markerEnd="url(#arrowhead)" />
                  <rect x="250" y="280" width="300" height="80" rx="10" 
                    className="fill-red-900/30 stroke-red-500 stroke-2" />
                  <text x="400" y="310" className="text-xl font-bold fill-red-300" textAnchor="middle">EXCEPT Block</text>
                  <text x="400" y="335" className="text-sm fill-red-200" textAnchor="middle">Handle the error</text>
                  <text x="320" y="255" className="text-sm fill-red-400" textAnchor="middle">Yes</text>
                </g>

                {/* Success Path */}
                <g onMouseEnter={() => setActiveFlow('else')} onMouseLeave={() => setActiveFlow(null)}>
                  <path d="M380 220 L320 220 L320 280" className="stroke-green-500 stroke-2" markerEnd="url(#arrowhead)" />
                  <rect x="220" y="280" width="200" height="80" rx="10" 
                    className={clsx(
                      "fill-green-900/30 stroke-green-500 stroke-2",
                      activeFlow === 'else' && "animate-[elseGlow_2s_ease-in-out_infinite]"
                    )}
                  />
                  <text x="320" y="310" className="text-xl font-bold fill-green-300" textAnchor="middle">ELSE Block</text>
                  <text x="320" y="335" className="text-sm fill-green-200" textAnchor="middle">Success actions</text>
                  <text x="370" y="215" className="text-sm fill-green-400" textAnchor="middle">No</text>
                </g>

                {/* Finally Block */}
                <g onMouseEnter={() => setActiveFlow('finally')} onMouseLeave={() => setActiveFlow(null)}>
                  <path d="M400 360 L400 400" className="stroke-amber-500 stroke-2" />
                  <path d="M320 360 L320 400" className="stroke-amber-500 stroke-2" />
                  <path d="M320 400 L480 400" className="stroke-amber-500 stroke-2" />
                  <rect x="250" y="400" width="300" height="80" rx="10" 
                    className="fill-amber-900/30 stroke-amber-500 stroke-2" />
                  <text x="400" y="430" className="text-xl font-bold fill-amber-300" textAnchor="middle">FINALLY Block</text>
                  <text x="400" y="455" className="text-sm fill-amber-200" textAnchor="middle">Always executes</text>
                </g>

                {/* Flow Animation */}
                <path d="M400 180 L400 220 M380 220 L320 220 L320 280" 
                  className="stroke-cyan-500 stroke-2 fill-none" strokeWidth="3" 
                  strokeDasharray="10,5" strokeDashoffset="100" 
                  style={{animation: 'successPath 4s linear infinite'}} />
              </svg>

              <div className="mt-8 grid grid-cols-4 gap-4">
                <div className={clsx(
                  "text-center p-3 bg-emerald-900/20 rounded-lg border border-emerald-700/30 transition-all duration-300",
                  activeFlow === 'try' && "scale-105 shadow-lg shadow-emerald-500/50"
                )}>
                  <p className="text-emerald-300 font-bold">TRY</p>
                  <p className="text-xs text-emerald-200">Attempt operation</p>
                </div>
                <div className={clsx(
                  "text-center p-3 bg-green-900/20 rounded-lg border border-green-700/30 transition-all duration-300",
                  activeFlow === 'else' && "scale-105 shadow-lg shadow-green-500/50"
                )}>
                  <p className="text-green-300 font-bold">ELSE</p>
                  <p className="text-xs text-green-200">Only on success</p>
                </div>
                <div className={clsx(
                  "text-center p-3 bg-red-900/20 rounded-lg border border-red-700/30 transition-all duration-300",
                  activeFlow === 'except' && "scale-105 shadow-lg shadow-red-500/50"
                )}>
                  <p className="text-red-300 font-bold">EXCEPT</p>
                  <p className="text-xs text-red-200">Error handling</p>
                </div>
                <div className={clsx(
                  "text-center p-3 bg-amber-900/20 rounded-lg border border-amber-700/30 transition-all duration-300",
                  activeFlow === 'finally' && "scale-105 shadow-lg shadow-amber-500/50"
                )}>
                  <p className="text-amber-300 font-bold">FINALLY</p>
                  <p className="text-xs text-amber-200">Always runs</p>
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
              Common else Clause Mistakes
            </h2>

            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 1: Using else for Non-Success Logic</h4>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono mb-3">
                    try:<br />
                    &nbsp;&nbsp;data = read_file()<br />
                    except FileNotFoundError:<br />
                    &nbsp;&nbsp;print("File not found")<br />
                    else:<br />
                    &nbsp;&nbsp;# This runs even if file is empty!<br />
                    &nbsp;&nbsp;process_data(data)
                  </code>
                  <p className="text-gray-300">
                    <span className="text-amber-300">Abhronila</span> from Shyamnagar learned: 
                    <code className="text-emerald-400">else</code> runs on <span className="text-red-400">no exception</span>, 
                    not on <span className="text-green-400">successful business logic</span>.
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 2: Putting Risky Code in else</h4>
                  <p className="text-gray-300 mb-3">
                    The else block should not contain code that might raise the same exceptions:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-red-300 text-sm font-mono">
                    try:<br />
                    &nbsp;&nbsp;file = open('data.txt')<br />
                    except FileNotFoundError:<br />
                    &nbsp;&nbsp;print("File not found")<br />
                    else:<br />
                    &nbsp;&nbsp;content = file.read()  # ❌ Might raise IOError!<br />
                    &nbsp;&nbsp;file.close()
                  </code>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 3: Confusing else with finally</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="px-2 py-1 bg-green-900/40 rounded text-xs text-green-300 mt-1">else</div>
                      <div>
                        <p className="text-gray-300">Runs only if no exception in try</p>
                        <p className="text-gray-400 text-sm">For success-specific logic</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="px-2 py-1 bg-amber-900/40 rounded text-xs text-amber-300 mt-1">finally</div>
                      <div>
                        <p className="text-gray-300">Always runs, exception or not</p>
                        <p className="text-gray-400 text-sm">For cleanup operations</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-3">
                    <span className="text-amber-300">Debangshu</span> from Ichapur mixes these up. 
                    Use <code className="text-emerald-400">else</code> for success actions, 
                    <code className="text-amber-400">finally</code> for cleanup.
                  </p>
                </div>

                <div className="bg-gray-900/70 p-5 rounded-xl border border-red-700/30">
                  <h4 className="text-lg font-bold text-red-400 mb-3">Mistake 4: Overusing else</h4>
                  <p className="text-gray-300 mb-3">
                    Not every try-except needs an else clause:
                  </p>
                  <code className="block bg-gray-800/50 p-3 rounded-lg text-green-300 text-sm font-mono">
                    # Simple case: No else needed<br />
                    try:<br />
                    &nbsp;&nbsp;result = calculate()<br />
                    except ValueError:<br />
                    &nbsp;&nbsp;result = default<br />
                    # No else needed if nothing special on success
                  </code>
                  <p className="text-gray-400 text-sm mt-3">💡 Use else only when you have success-specific logic</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Best Practices */}
        <section className="motion-safe:animate-[fadeSlideUp_1s_ease-out] animation-delay-[1200ms]">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 
            hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500">
            <h2 className="text-3xl font-bold text-emerald-300 mb-8 flex items-center gap-3">
              <span className="p-2 bg-emerald-900/30 rounded-lg">✅</span>
              When to Use else (Best Practices)
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  scenario: "Database Transactions",
                  description: "Commit only on successful operations",
                  example: "conn.commit() in else",
                  color: "blue",
                  icon: "💾"
                },
                {
                  scenario: "File Processing",
                  description: "Process data only if file read succeeds",
                  example: "process_data(content) in else",
                  color: "green",
                  icon: "📄"
                },
                {
                  scenario: "API Calls",
                  description: "Parse response only on successful request",
                  example: "response.json() in else",
                  color: "purple",
                  icon: "🌐"
                },
                {
                  scenario: "Input Validation",
                  description: "Use validated data only if validation passes",
                  example: "save_to_db(validated) in else",
                  color: "amber",
                  icon: "✓"
                },
                {
                  scenario: "Resource Allocation",
                  description: "Use resource only if allocation succeeds",
                  example: "use_resource(resource) in else",
                  color: "cyan",
                  icon: "🔧"
                },
                {
                  scenario: "Configuration Loading",
                  description: "Apply config only if loading succeeds",
                  example: "apply_config(config) in else",
                  color: "red",
                  icon: "⚙️"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setHoveredSection(`practice-${index}`)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={clsx(
                    "bg-gray-900/60 p-5 rounded-xl border border-gray-700/50 transition-all duration-300 cursor-pointer",
                    hoveredSection === `practice-${index}` && `border-${item.color}-500/50 shadow-lg shadow-${item.color}-900/20 transform -translate-y-2`
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`text-2xl text-${item.color}-300`}>{item.icon}</div>
                    <h4 className={`text-lg font-bold text-${item.color}-300`}>{item.scenario}</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                  <code className={`text-xs text-${item.color}-200 bg-gray-800/50 p-2 rounded block font-mono`}>
                    {item.example}
                  </code>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gray-900/40 rounded-xl border border-gray-700/30">
              <h4 className="text-lg font-bold text-white mb-3">🎯 Professional Rule of Thumb</h4>
              <p className="text-gray-300">
                Use <code className="text-emerald-400">else</code> when you have code that should run 
                <span className="text-green-400"> only if the try block succeeds</span>, but that code 
                <span className="text-red-400"> shouldn't be in the try block</span> (because it might raise different exceptions 
                that need different handling).
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
                    <span className="text-cyan-300 font-medium">Key Insight:</span> The <code className="text-emerald-400">else</code> clause 
                    is about <span className="text-green-400">separation of concerns</span>. It separates "what might fail" 
                    from "what to do on success" from "what to do on failure" from "what always needs doing."
                  </p>
                  
                  <div className="bg-gray-900/40 p-4 rounded-xl">
                    <h4 className="font-bold text-amber-300 mb-2">Teaching Strategy:</h4>
                    <p className="text-gray-300">
                      I tell my Barrackpore students: "Think of try-except-else-finally as a 
                      <span className="text-emerald-400"> four-act play</span>:
                      <span className="text-emerald-300"> Act 1 (try)</span> is the risky stunt, 
                      <span className="text-red-300"> Act 2 (except)</span> is the emergency response, 
                      <span className="text-green-300"> Act 3 (else)</span> is the victory celebration, 
                      and <span className="text-amber-300"> Act 4 (finally)</span> is cleaning up the stage."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-emerald-400 font-bold text-sm">Without else</p>
                      <p className="text-xs text-gray-400 mt-1">Success logic mixed with risky code</p>
                    </div>
                    <div className="p-3 bg-gray-900/40 rounded-lg">
                      <p className="text-green-400 font-bold text-sm">With else</p>
                      <p className="text-xs text-gray-400 mt-1">Clear separation of success path</p>
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
                      <span className="text-sm text-gray-400">Specializes in clean code</span>
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
              else Clause Checklist
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">Use else When...</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">You have code that should run only on success</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">That code doesn't belong in try (different exceptions)</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">You need clear separation of success/failure paths</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-emerald-400">✓</span>
                      </div>
                      <p className="text-gray-300">You're doing resource allocation/commit operations</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-900/60 p-5 rounded-xl">
                  <h4 className="text-xl font-bold text-red-400 mb-4">Don't Use else When...</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">No special success logic is needed</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Success logic might raise same exceptions</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">Code would be clearer without it</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-900/40 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-red-400">✗</span>
                      </div>
                      <p className="text-gray-300">You actually need finally for cleanup</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 p-5 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-700/30">
              <h4 className="text-lg font-bold text-blue-300 mb-3">💪 Practice Exercise</h4>
              <p className="text-gray-300">
                Write a function that:
                <span className="text-emerald-300"> 1) Tries to parse JSON from a string</span>, 
                <span className="text-red-300"> 2) Handles JSONDecodeError separately</span>, 
                <span className="text-green-300"> 3) Uses else to process the parsed data only on success</span>, 
                <span className="text-amber-300"> 4) Uses finally to log the attempt</span>.
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
                "When <span className="text-amber-300">Swadeep</span> writes a function that downloads a file, 
                processes it, and saves the result, should he use <code className="text-emerald-400">else</code>? 
                <span className="text-cyan-300"> Consider each step: download might fail (network error), 
                processing might fail (parse error), save might fail (disk error). Where should else be used?</span>"
              </p>
              
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <h4 className="font-bold text-amber-300 mb-2">Consider:</h4>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Should processing happen only if download succeeds?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Should saving happen only if processing succeeds?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Would nested try-except-else blocks be appropriate?
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                    Try implementing this pipeline with proper else usage!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Using else with try-except • Topic 5 of Python Exception Handling Series</p>
        <p className="mt-2">Next: Basic input validation using exception handling</p>
      </footer>
    </div>
  );
};

export default Topic5;