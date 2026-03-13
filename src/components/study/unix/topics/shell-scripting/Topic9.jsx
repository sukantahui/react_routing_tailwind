// Topic9.jsx - Command substitution: $(command) and backticks
import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import commandSubBasic1 from "./topic9_files/command_sub_basic1.sh?raw";
import commandSubBasic2 from "./topic9_files/command_sub_basic2.sh?raw";
import commandSubNested from "./topic9_files/command_sub_nested.sh?raw";
import commandSubBackticks from "./topic9_files/command_sub_backticks.sh?raw";
import commandSubPitfall from "./topic9_files/command_sub_pitfall.sh?raw";

const Topic9 = () => {
  const [activeExample, setActiveExample] = useState("basic");

  const examples = {
    basic: "Basic Command Substitution",
    nested: "Nested Command Substitution",
    backticks: "Backticks Usage",
    pitfall: "Common Pitfall"
  };

  // SVG Component for visual explanation
  const CommandSubstitutionSVG = ({ stage }) => {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500">
        <svg 
          viewBox="0 0 800 400" 
          className="w-full h-auto"
          aria-label="Command Substitution Process Visualization"
        >
          <defs>
            <linearGradient id="commandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Command execution flow */}
          <g className="transition-all duration-300">
            {/* Step 1: Command */}
            <rect 
              x="50" y="150" 
              width="200" height="60" 
              rx="10"
              fill="url(#commandGradient)"
              stroke="#3B82F6"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="150" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Command
            </text>
            <text x="150" y="205" textAnchor="middle" fill="#E5E7EB" fontSize="11">
              date +%Y-%m-%d
            </text>
            
            {/* Step 2: Substitution */}
            <rect 
              x="300" y="150" 
              width="200" height="60" 
              rx="10"
              fill="#F59E0B"
              fillOpacity="0.9"
              stroke="#D97706"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="400" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Execution
            </text>
            <text x="400" y="205" textAnchor="middle" fill="#FEF3C7" fontSize="11">
              2024-03-15
            </text>
            
            {/* Step 3: Result */}
            <rect 
              x="550" y="150" 
              width="200" height="60" 
              rx="10"
              fill="#10B981"
              fillOpacity="0.9"
              stroke="#059669"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="650" y="185" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              Substitution
            </text>
            <text x="650" y="205" textAnchor="middle" fill="#D1FAE5" fontSize="11">
              echo "Today: 2024-03-15"
            </text>
            
            {/* Arrows */}
            <path 
              d="M250 180 L300 180" 
              stroke="#6B7280" 
              strokeWidth="2" 
              markerEnd="url(#arrowhead)"
              className="motion-safe:animate-pulse"
            />
            <path 
              d="M500 180 L550 180" 
              stroke="#6B7280" 
              strokeWidth="2" 
              markerEnd="url(#arrowhead)"
              className="motion-safe:animate-pulse"
            />
            
            {/* Labels */}
            <text x="175" y="100" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">
              1. $(date +%Y-%m-%d)
            </text>
            <text x="400" y="100" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">
              2. Command runs
            </text>
            <text x="625" y="100" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">
              3. Output replaces $()
            </text>
            
            {/* Syntax examples */}
            <g transform="translate(50 250)">
              <rect x="0" y="0" width="700" height="120" rx="8" fill="#1F2937" fillOpacity="0.1" stroke="#4B5563" strokeWidth="1" />
              
              <text x="20" y="30" fill="#374151" fontSize="12" fontWeight="bold">
                Modern Syntax:
              </text>
              <text x="40" y="55" fill="#10B981" fontSize="11" fontFamily="monospace">
                $(command)
              </text>
              <text x="40" y="75" fill="#6B7280" fontSize="10">
                Preferred method - supports nesting, cleaner escaping
              </text>
              
              <text x="20" y="105" fill="#374151" fontSize="12" fontWeight="bold">
                Legacy Syntax:
              </text>
              <text x="40" y="130" fill="#F59E0B" fontSize="11" fontFamily="monospace">
                `command`
              </text>
              <text x="40" y="150" fill="#6B7280" fontSize="10">
                Deprecated - avoid for complex commands
              </text>
            </g>
            
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
              </marker>
            </defs>
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-[fadeInUp_0.8s_ease-out]">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
            Topic 9: Command Substitution
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            $(command) and backticks - Capturing command output
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Theory */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Introduction */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
                <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">📘</span>
                What is Command Substitution?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Command substitution allows you to <strong>capture the output of a command</strong> and use it as a value within another command. Think of it as a way to make your shell scripts dynamic by incorporating live data from system commands.
              </p>
              
              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded">
                <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Real-world Analogy</h3>
                <p className="text-amber-700 dark:text-amber-400">
                  Imagine <strong>Swadeep</strong> asking his teacher: "What's today's date?" The teacher checks the calendar and replies "March 15". Swadeep then writes in his notebook: "Today is March 15". The command substitution works similarly - it runs a command, gets the answer, and places it where needed.
                </p>
              </div>
            </section>

            {/* Section 2: Visual Explanation */}
            <section className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <CommandSubstitutionSVG />
            </section>

            {/* Section 3: Detailed Explanation */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
              <h2 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
                <span className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">🔧</span>
                How Command Substitution Works
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Prototype / Signature</h3>
                  <div className="space-y-2">
                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                      {`$(command)`}
                    </code>
                    <code className="text-sm text-gray-700 dark:text-gray-300 block">
                      {`\`command\``}
                    </code>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Return Type</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Returns the <strong>standard output (stdout)</strong> of the executed command as a string. Any trailing newlines are removed, making it suitable for variable assignment.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Purpose</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>Dynamically generate values based on system state</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>Create complex commands by combining simpler ones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span>Simplify scripts by avoiding intermediate files</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">When & Why It's Used</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                      <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Configuration Scripts</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Setting variables based on system information</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                      <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">Logging</h4>
                      <p className="text-sm text-green-700 dark:text-green-400">Creating timestamps for log files</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                      <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">File Operations</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-400">Processing lists of files</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                      <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Conditional Logic</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-400">Making decisions based on command output</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Examples Tabs */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
              <h2 className="text-2xl font-bold mb-6 text-purple-700 dark:text-purple-300 flex items-center gap-3">
                <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">📝</span>
                Interactive Examples
              </h2>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.entries(examples).map(([key, label], index) => (
                    <button
                      key={key}
                      onClick={() => setActiveExample(key)}
                      className={clsx(
                        "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                        activeExample === key
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                
                <div className="animate-[fadeIn_0.5s_ease-out]">
                  {activeExample === "basic" && (
                    <div className="space-y-4">
                      <ShellFileLoader
                        fileModule={commandSubBasic1}
                        title="Basic Variable Assignment"
                        highlightLines={[1, 2, 3]}
                      />
                      <ShellFileLoader
                        fileModule={commandSubBasic2}
                        title="Inline Command Substitution"
                        highlightLines={[1, 2, 3]}
                      />
                    </div>
                  )}
                  
                  {activeExample === "nested" && (
                    <ShellFileLoader
                      fileModule={commandSubNested}
                      title="Nested Command Substitution"
                      highlightLines={[1, 3, 5]}
                    />
                  )}
                  
                  {activeExample === "backticks" && (
                    <ShellFileLoader
                      fileModule={commandSubBackticks}
                      title="Backticks Syntax"
                      highlightLines={[1, 3, 5]}
                    />
                  )}
                  
                  {activeExample === "pitfall" && (
                    <ShellFileLoader
                      fileModule={commandSubPitfall}
                      title="Common Pitfall - Spaces"
                      highlightLines={[1, 4, 7]}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* Section 5: Common Pitfalls */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
              <h2 className="text-2xl font-bold mb-6 text-red-700 dark:text-red-300 flex items-center gap-3">
                <span className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">⚠️</span>
                Common Pitfalls & Mistakes
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
                  <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">1. Forgetting $() Syntax</h3>
                  <p className="text-red-700 dark:text-red-400">
                    Beginners often write <code className="bg-red-100 dark:bg-red-800 px-1 rounded">command</code> instead of <code className="bg-red-100 dark:bg-red-800 px-1 rounded">$(command)</code> and wonder why the output isn't captured.
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">2. Using Backticks for Complex Commands</h3>
                  <p className="text-amber-700 dark:text-amber-400">
                    Backticks <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">`command`</code> don't handle nesting well and have confusing escaping rules. <strong>Always prefer $(command)</strong> for modern scripts.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">3. Ignoring Exit Status</h3>
                  <p className="text-blue-700 dark:text-blue-400">
                    Command substitution only captures stdout, not the exit status. Use separate checks if the command's success matters:
                    <code className="text-sm text-gray-700 dark:text-gray-300 block mt-2">
                      {`output=$(command) && echo "Success: $output" || echo "Command failed"`}
                    </code>
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">4. Word Splitting Issues</h3>
                  <p className="text-purple-700 dark:text-purple-400">
                    Without proper quoting, output with spaces gets split:
                    <code className="text-sm text-gray-700 dark:text-gray-300 block mt-2">
                      {`# Wrong: files=$(ls *.txt)  # Splits by spaces
# Correct: files="$(ls *.txt)"  # Preserves as single string`}
                    </code>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Best Practices */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300 flex items-center gap-3">
                <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">✅</span>
                Best Practices
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300">
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">1.</span> Always Use $()
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    $(command) is clearer, supports nesting, and has consistent escaping rules across all shells.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">2.</span> Quote Your Substitutions
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    Always use double quotes around command substitutions: <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">"$(command)"</code>
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">3.</span> Check Exit Status Separately
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400 text-sm">
                    If command success matters, check $? after the substitution or use conditional execution.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">4.</span> Use for Simple Commands
                  </h3>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    Avoid complex pipelines inside $(). If it's getting long, break it into multiple steps for readability.
                  </p>
                </div>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-xl animate-[fadeInUp_0.8s_ease-out_0.7s_both] hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">Teacher's Note</h2>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="mb-4">
                      <h3 className="font-bold text-white mb-2">Professional Insight</h3>
                      <p className="text-white/90 leading-relaxed">
                        Command substitution is one of the most powerful features in shell scripting. It transforms static scripts into dynamic tools. Remember the mnemonic: <strong>"Dollar-parentheses captures, backticks are legacy"</strong>.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          In production scripts at <strong>Barrackpore Tech Solutions</strong>, we always use $(command) and never backticks.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          Teach <strong>Tuhina and Abhronila</strong> to visualize command substitution as "asking the computer a question and using the answer".
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          Always validate: Did the command inside $() actually succeed? Check $? if it matters.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/30">
                      <div className="text-white/70 text-sm">
                        <p><strong>Sukanta Hui</strong> • 27 years experience</p>
                        <p>sukantahui@codernaccotax.co.in • 7003756860</p>
                        <p>Expertise: Shell Scripting, System Administration, DevOps</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Quick Reference */}
          <div className="space-y-8">
            {/* Quick Reference Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.2s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform duration-300">⚡</span>
                Quick Reference
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 group-hover:border-gray-400 transition-all duration-300">
                  <h3 className="font-bold text-emerald-400 mb-2">Modern Syntax</h3>
                  <code className="text-sm text-gray-300 block bg-gray-900 p-2 rounded">
                    {`$(command)`}
                  </code>
                  <p className="text-gray-400 text-sm mt-2">Supports nesting, clear syntax</p>
                </div>
                
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 group-hover:border-gray-400 transition-all duration-300">
                  <h3 className="font-bold text-amber-400 mb-2">Legacy Syntax</h3>
                  <code className="text-sm text-gray-300 block bg-gray-900 p-2 rounded">
                    {`\`command\``}
                  </code>
                  <p className="text-gray-400 text-sm mt-2">Avoid in new scripts</p>
                </div>
                
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 group-hover:border-gray-400 transition-all duration-300">
                  <h3 className="font-bold text-blue-400 mb-2">With Quoting</h3>
                  <code className="text-sm text-gray-300 block bg-gray-900 p-2 rounded">
                    {`"$(command)"`}
                  </code>
                  <p className="text-gray-400 text-sm mt-2">Prevents word splitting</p>
                </div>
                
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 group-hover:border-gray-400 transition-all duration-300">
                  <h3 className="font-bold text-purple-400 mb-2">Nested Example</h3>
                  <code className="text-sm text-gray-300 block bg-gray-900 p-2 rounded">
                    {`$(echo "Count: $(wc -l < file.txt)")`}
                  </code>
                  <p className="text-gray-400 text-sm mt-2">Inner command runs first</p>
                </div>
              </div>
            </div>

            {/* Real-world Examples Card */}
            <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.3s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">🌍</span>
                Real-world Usage
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-700/30 rounded-lg border border-blue-600 group-hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-white mb-2">Log File Naming</h3>
                  <code className="text-xs text-blue-100 block bg-blue-900/50 p-2 rounded">
                    {`logfile="app-$(date +%Y%m%d-%H%M%S).log"`}
                  </code>
                  <p className="text-blue-200 text-xs mt-2">Creates timestamped logs</p>
                </div>
                
                <div className="p-4 bg-blue-700/30 rounded-lg border border-blue-600 group-hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-white mb-2">System Monitoring</h3>
                  <code className="text-xs text-blue-100 block bg-blue-900/50 p-2 rounded">
                    {`echo "CPU: $(uptime), Memory: $(free -h | grep Mem)"`}
                  </code>
                  <p className="text-blue-200 text-xs mt-2">Dynamic system status</p>
                </div>
                
                <div className="p-4 bg-blue-700/30 rounded-lg border border-blue-600 group-hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-white mb-2">Backup Scripts</h3>
                  <code className="text-xs text-blue-100 block bg-blue-900/50 p-2 rounded">
                    {`tar -czf backup-$(hostname)-$(date +%F).tar.gz /data`}
                  </code>
                  <p className="text-blue-200 text-xs mt-2">Unique backup names</p>
                </div>
                
                <div className="p-4 bg-blue-700/30 rounded-lg border border-blue-600 group-hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-white mb-2">User Greeting</h3>
                  <code className="text-xs text-blue-100 block bg-blue-900/50 p-2 rounded">
                    {`echo "Welcome $(whoami)! Today is $(date '+%A')"`}
                  </code>
                  <p className="text-blue-200 text-xs mt-2">Personalized messages</p>
                </div>
              </div>
            </div>

            {/* Mini Checklist Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.4s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform duration-300">📋</span>
                Mini Checklist
              </h2>
              
              <div className="space-y-3">
                {[
                  "Do I need $(command) or just command?",
                  "Have I quoted the substitution?",
                  "Does the inner command need to succeed?",
                  "Is nesting making this too complex?",
                  "Am I using backticks anywhere? (Remove them!)",
                  "Have I tested with spaces in output?"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-emerald-700/30 rounded-lg border border-emerald-600 group-hover:border-emerald-400 transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <input type="checkbox" className="w-4 h-4 text-emerald-400 bg-gray-800 border-gray-600 rounded" />
                    <span className="text-emerald-100 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-700/40 rounded-lg">
                <h3 className="font-bold text-white mb-2">Remember</h3>
                <p className="text-emerald-200 text-sm">
                  Command substitution makes your scripts <strong>dynamic</strong>. Use it to ask the system questions and use the answers in your logic.
                </p>
              </div>
            </div>

            {/* Hint Section */}
            <div className="bg-gradient-to-br from-purple-800 to-pink-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.5s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">💡</span>
                Think About...
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-700/30 rounded-lg border border-purple-600 group-hover:border-purple-400 transition-all duration-300">
                  <p className="text-purple-100 text-sm italic">
                    "What happens if the command inside $() produces no output?"
                  </p>
                </div>
                
                <div className="p-4 bg-pink-700/30 rounded-lg border border-pink-600 group-hover:border-pink-400 transition-all duration-300">
                  <p className="text-pink-100 text-sm italic">
                    "How would <strong>Debangshu</strong> use command substitution to check disk space before a backup?"
                  </p>
                </div>
                
                <div className="p-4 bg-fuchsia-700/30 rounded-lg border border-fuchsia-600 group-hover:border-fuchsia-400 transition-all duration-300">
                  <p className="text-fuchsia-100 text-sm italic">
                    "Try changing $(date) to $(date +%s) - observe the difference in output format"
                  </p>
                </div>
                
                <div className="p-4 bg-rose-700/30 rounded-lg border border-rose-600 group-hover:border-rose-400 transition-all duration-300">
                  <p className="text-rose-100 text-sm italic">
                    "What's the maximum level of nesting you can reasonably use before the script becomes unreadable?"
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 text-sm font-medium">
                  Explore These Questions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-300 dark:border-gray-700 animate-[fadeIn_0.8s_ease-out_0.8s_both]">
          <a href="#prev" className="px-6 py-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Previous: Quoting Rules
          </a>
          <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Topic 9 of 41 • Command Substitution
          </div>
          <a href="#next" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group">
            Next: Conditional Statements
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>

      {/* Inline Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic9;