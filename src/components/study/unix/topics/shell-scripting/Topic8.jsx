import { useState, useEffect } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import example script files
import readBasicExample1 from "./topic8_files/read_basic_example1.sh?raw";
import readOptionsExample1 from "./topic8_files/read_options_example1.sh?raw";
import positionalExample1 from "./topic8_files/positional_example1.sh?raw";
import practicalExample1 from "./topic8_files/practical_example1.sh?raw";
import interactiveExample1 from "./topic8_files/interactive_example1.sh?raw";

export default function Topic8() {
  const [activeSection, setActiveSection] = useState("overview");
  const [userInputDemo, setUserInputDemo] = useState("");
  const [positionalParams, setPositionalParams] = useState(["", "", ""]);

  // Animation for section reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-[slideUp_0.6s_ease-out_forwards]");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Demo functions
  const simulatePositionalArgs = (args) => {
    setPositionalParams(args);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 transition-colors duration-300">
      <style>
        {`
          @keyframes slideUp {
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
          @keyframes svgFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 5px #3b82f6; }
            50% { box-shadow: 0 0 20px #3b82f6; }
          }
        `}
      </style>

      {/* Header Section */}
      <header className="section-reveal max-w-6xl mx-auto mb-12 opacity-0">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-semibold mb-4 animate-pulse">
                Topic 8
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                Reading User Input & Positional Parameters
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Learn how to make your shell scripts interactive by reading user input and 
                accepting command-line arguments using <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">read</code> command 
                and positional parameters <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">$1, $2, $@, $#</code>.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">Interactive Scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">Command-line Arguments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">User Feedback</span>
                </div>
              </div>
            </div>
            
            {/* Interactive Demo */}
            <div className="w-full lg:w-2/5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <h3 className="text-xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">💻 Live Demo</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Enter command (simulated):
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 text-green-600 dark:text-green-400 font-mono">$</div>
                    <div className="flex-1 font-mono bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg">
                      ./student_grades.sh
                      <span className="text-indigo-600 dark:text-indigo-400"> Swadeep</span>
                      <span className="text-blue-600 dark:text-blue-400"> 85</span>
                      <span className="text-green-600 dark:text-green-400"> 92</span>
                      <span className="text-purple-600 dark:text-purple-400"> 78</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-400">Processing arguments:</div>
                  <div className="mt-2 space-y-1">
                    <div>$0: <span className="text-yellow-300">./student_grades.sh</span></div>
                    <div>$1: <span className="text-indigo-300">Swadeep</span> (Student Name)</div>
                    <div>$2: <span className="text-blue-300">85</span> (Math Score)</div>
                    <div>$3: <span className="text-green-300">92</span> (Science Score)</div>
                    <div>$4: <span className="text-purple-300">78</span> (English Score)</div>
                    <div className="mt-2">Total arguments ($#): <span className="text-yellow-300">4</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="section-reveal max-w-6xl mx-auto mb-8 opacity-0">
        <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl">
          {["overview", "read-command", "positional", "practical", "pitfalls", "best-practices"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                activeSection === tab
                  ? "bg-white dark:bg-gray-700 shadow-md text-indigo-600 dark:text-indigo-400"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}
            >
              {tab.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            {/* Conceptual Explanation */}
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">🎯</span>
                  Two Ways to Get Input in Shell Scripts
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Interactive Input */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-xl">⌨️</span>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">Interactive Input</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Using the <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">read</code> command to prompt users for input while the script is running.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span><strong>Best for:</strong> Forms, surveys, configuration setup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span><strong>Example:</strong> Asking <span className="font-semibold">Tuhina</span> for her marks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span><strong>Command:</strong> <code>read -p "Enter name: " username</code></span>
                      </div>
                    </div>
                  </div>

                  {/* Positional Parameters */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400 text-xl">⚡</span>
                      </div>
                      <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">Positional Parameters</h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Using command-line arguments passed when executing the script: <code>$1, $2, $3, ...</code>
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span><strong>Best for:</strong> Automation, batch processing, cron jobs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span><strong>Example:</strong> Processing files from <span className="font-semibold">Naihati</span> server</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span><strong>Usage:</strong> <code>./script.sh file1.txt file2.txt</code></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decision Flowchart */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300 text-center">
                    When to Use Which Method?
                  </h3>
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-8">
                    <svg viewBox="0 0 800 400" className="w-full h-64">
                      <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
                        </marker>
                      </defs>
                      
                      {/* Decision Box */}
                      <rect x="350" y="50" width="100" height="60" rx="10" fill="#4f46e5" className="hover:fill-opacity-80 transition-all duration-300"/>
                      <text x="400" y="85" textAnchor="middle" className="fill-white font-bold text-xl">Start</text>
                      
                      {/* Question 1 */}
                      <rect x="250" y="150" width="300" height="60" rx="10" fill="#7c3aed" className="hover:fill-opacity-80 transition-all duration-300"/>
                      <text x="400" y="185" textAnchor="middle" className="fill-white font-semibold">
                        Need user interaction during execution?
                      </text>
                      
                      {/* Yes/No Paths */}
                      <path d="M 400 210 L 400 250 L 200 250 L 200 300" fill="none" stroke="#10b981" strokeWidth="3" marker-end="url(#arrow)"/>
                      <path d="M 400 210 L 400 250 L 600 250 L 600 300" fill="none" stroke="#ef4444" strokeWidth="3" marker-end="url(#arrow)"/>
                      
                      {/* Results */}
                      <rect x="100" y="300" width="200" height="60" rx="10" fill="#10b981" className="hover:fill-opacity-80 transition-all duration-300"/>
                      <text x="200" y="335" textAnchor="middle" className="fill-white font-semibold">Use READ Command</text>
                      
                      <rect x="500" y="300" width="200" height="60" rx="10" fill="#ef4444" className="hover:fill-opacity-80 transition-all duration-300"/>
                      <text x="600" y="335" textAnchor="middle" className="fill-white font-semibold">Use Positional Parameters</text>
                      
                      {/* Labels */}
                      <text x="300" y="240" textAnchor="middle" className="fill-green-400 font-bold">YES</text>
                      <text x="500" y="240" textAnchor="middle" className="fill-red-400 font-bold">NO</text>
                    </svg>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Concepts */}
            <section className="section-reveal opacity-0 animation-delay-200">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
                <h3 className="text-2xl font-bold mb-6 text-amber-800 dark:text-amber-300 flex items-center gap-3">
                  <span className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">🔑</span>
                  Key Concepts to Remember
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: "💾",
                      title: "Variable Storage",
                      desc: "Both methods store input in variables for later use",
                      example: "read stores in named variables, $1 stores first argument"
                    },
                    {
                      icon: "🔄",
                      title: "Flexibility",
                      desc: "Can combine both methods in same script",
                      example: "Use $1 for filename, read for user confirmation"
                    },
                    {
                      icon: "⚡",
                      title: "Script Execution",
                      desc: "Positional parameters must be provided at script start",
                      example: "./backup.sh /home/tuhina /backup"
                    },
                    {
                      icon: "👤",
                      title: "User Experience",
                      desc: "read provides interactive feedback",
                      example: "Prompts and validation messages"
                    },
                    {
                      icon: "🔧",
                      title: "Automation",
                      desc: "Positional parameters enable script automation",
                      example: "Cron jobs with predefined arguments"
                    },
                    {
                      icon: "🛡️",
                      title: "Validation",
                      desc: "Both need input validation",
                      example: "Check if $1 exists, validate read input"
                    }
                  ].map((concept, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-amber-300 dark:border-amber-700 hover:border-amber-500 transition-colors duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{concept.icon}</span>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">{concept.title}</h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{concept.desc}</p>
                      <code className="text-xs bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-2 py-1 rounded block">
                        {concept.example}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* READ Command Section */}
        {activeSection === "read-command" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">⌨️</span>
                  The READ Command
                </h2>

                {/* Basic Syntax */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Basic Syntax & Prototype</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl mb-6">
                    <code className="text-xl text-gray-700 dark:text-gray-300 font-mono block mb-4">
                      {`read [options] variable_name`}
                    </code>
                    <p className="text-gray-700 dark:text-gray-300">
                      Reads a line from standard input (keyboard) and stores it in the specified variable.
                    </p>
                  </div>
                </div>

                {/* Common Options */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-6 text-blue-700 dark:text-blue-300">Common Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {option: "-p 'prompt'", desc: "Display prompt before reading", example: "read -p 'Name: ' name"},
                      {option: "-s", desc: "Silent mode (for passwords)", example: "read -sp 'Password: ' pass"},
                      {option: "-n N", desc: "Read exactly N characters", example: "read -n 1 choice"},
                      {option: "-t SEC", desc: "Timeout after SEC seconds", example: "read -t 10 -p 'Quick! '"},
                      {option: "-a array", desc: "Read into array", example: "read -a numbers"},
                      {option: "-r", desc: "Raw input (preserve backslashes)", example: "read -r path"}
                    ].map((opt, i) => (
                      <div key={i} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform duration-300">
                        <code className="font-mono text-blue-700 dark:text-blue-300 text-lg block mb-2">
                          {opt.option}
                        </code>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{opt.desc}</p>
                        <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded block">
                          {opt.example}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Basic Read Examples */}
                <div className="mb-8">
                  <ShellFileLoader
                    fileModule={readBasicExample1}
                    title="Basic READ Command Examples"
                    highlightLines={[4, 8, 12, 16, 20, 24]}
                  />
                </div>

                {/* Advanced Read Options */}
                <div>
                  <ShellFileLoader
                    fileModule={readOptionsExample1}
                    title="Advanced READ Options"
                    highlightLines={[5, 11, 17, 23, 29, 35]}
                  />
                </div>

                {/* Interactive Demo */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">🎮 Interactive Demo</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Try the -n option (simulated): Enter 1 character
                      </label>
                      <input
                        type="text"
                        maxLength={1}
                        value={userInputDemo}
                        onChange={(e) => setUserInputDemo(e.target.value.slice(0, 1))}
                        className="w-16 text-center font-mono text-xl border-2 border-blue-300 rounded-lg p-2 bg-white dark:bg-gray-900"
                        placeholder="X"
                      />
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Characters entered: {userInputDemo.length}/1
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                      <div className="font-mono text-sm">
                        <div className="text-green-600 dark:text-green-400"># Simulated read command:</div>
                        <div className="mt-2">
                          <span className="text-blue-500">read -n 1 -p "Continue? (y/n): "</span> choice
                        </div>
                        <div className="mt-2">
                          <span className="text-purple-500">echo</span> "You chose: <span className="text-yellow-600 dark:text-yellow-400">{userInputDemo || '[waiting...]'}</span>"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Positional Parameters Section */}
        {activeSection === "positional" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">⚡</span>
                  Positional Parameters
                </h2>

                {/* Parameter Table */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-300">Special Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                      <thead>
                        <tr className="bg-purple-50 dark:bg-purple-900/30">
                          <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Parameter</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {[
                          {param: "$0", desc: "Script name/path", example: "./backup.sh"},
                          {param: "$1, $2, $3...", desc: "First, second, third arguments", example: "file1.txt, file2.txt"},
                          {param: "$#", desc: "Number of arguments", example: "3 (if 3 args passed)"},
                          {param: "$@", desc: "All arguments as separate words", example: "arg1 arg2 arg3"},
                          {param: "$*", desc: "All arguments as single word", example: "arg1 arg2 arg3"},
                          {param: "$?", desc: "Exit status of last command", example: "0 (success)"},
                          {param: "$$", desc: "Process ID of script", example: "12345"},
                          {param: "$!", desc: "Process ID of last background job", example: "12346"}
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <code className="font-mono text-lg text-purple-600 dark:text-purple-400">{row.param}</code>
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{row.desc}</td>
                            <td className="px-6 py-4">
                              <code className="text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">{row.example}</code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-300">📊 Visual Representation</h4>
                  
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-block bg-gray-900 p-4 rounded-xl">
                        <div className="text-green-400 font-mono text-sm mb-2">Command:</div>
                        <div className="font-mono text-lg">
                          <span className="text-yellow-300">./process_data.sh</span>
                          <span className="text-blue-300"> student_records.csv</span>
                          <span className="text-green-300"> 2024-12-15</span>
                          <span className="text-purple-300"> verbose</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {[
                        {param: "$0", value: "./process_data.sh", color: "text-yellow-300"},
                        {param: "$1", value: "student_records.csv", color: "text-blue-300"},
                        {param: "$2", value: "2024-12-15", color: "text-green-300"},
                        {param: "$3", value: "verbose", color: "text-purple-300"}
                      ].map((item, i) => (
                        <div key={i} className="bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition-transform duration-300">
                          <div className="text-gray-400 text-sm mb-1">{item.param}</div>
                          <div className={`font-mono ${item.color} text-lg`}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">$# (Argument Count):</div>
                        <div className="text-yellow-300 text-2xl font-bold">3</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="text-gray-400 text-sm">$@ (All Arguments):</div>
                        <div className="text-green-300 font-mono text-sm">student_records.csv 2024-12-15 verbose</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Positional Parameters Examples */}
                <div>
                  <ShellFileLoader
                    fileModule={positionalExample1}
                    title="Positional Parameters Examples"
                    highlightLines={[5, 10, 15, 21, 27, 34, 40]}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Practical Applications */}
        {activeSection === "practical" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-3">
                  <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">🚀</span>
                  Practical Applications
                </h2>

                {/* Real-world Scenarios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <h3 className="text-xl font-semibold mb-4 text-green-700 dark:text-green-300">🏫 Student Management System</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <span className="font-semibold">Shyamnagar College</span> uses scripts to manage student data:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span><code>./add_student.sh Swadeep Kumar 85 92</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Interactive grade entry for <span className="font-semibold">Abhronila</span></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Batch processing of Ichapur branch records</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">🖥️ System Administration</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <span className="font-semibold">Naihati Server</span> automation scripts:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span><code>./backup.sh /home /backup weekly</code></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span>Interactive log file analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span>User account creation with confirmation prompts</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Complete Practical Example */}
                <div className="mb-8">
                  <ShellFileLoader
                    fileModule={practicalExample1}
                    title="Complete Practical Example: Student Grade Calculator"
                    highlightLines={[7, 14, 21, 28, 35, 42, 50]}
                  />
                </div>

                {/* Interactive Menu Example */}
                <div>
                  <ShellFileLoader
                    fileModule={interactiveExample1}
                    title="Interactive Menu System"
                    highlightLines={[5, 11, 17, 24, 31, 38, 46, 54]}
                  />
                </div>

                {/* Try It Yourself */}
                <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
                  <h4 className="text-xl font-semibold mb-4 text-amber-800 dark:text-amber-300">🎯 Try It Yourself</h4>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Imagine you're creating a script for <span className="font-semibold">Debangshu</span> to manage his photography files from Barrackpore:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => simulatePositionalArgs(["IMG_001.jpg", "IMG_002.jpg", "resized/"])}
                        className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
                      >
                        <div className="font-mono text-sm mb-2">Batch Resize:</div>
                        <div>./resize.sh file1 file2 output/</div>
                      </button>
                      
                      <button
                        onClick={() => simulatePositionalArgs(["2024-12-", "Barrackpore", "jpg"])}
                        className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
                      >
                        <div className="font-mono text-sm mb-2">Search Photos:</div>
                        <div>./search.sh "2024-12-" "Barrackpore"</div>
                      </button>
                      
                      <button
                        onClick={() => simulatePositionalArgs(["backup", "photos/", "/external/"])}
                        className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
                      >
                        <div className="font-mono text-sm mb-2">Backup Script:</div>
                        <div>./backup.sh mode source dest</div>
                      </button>
                    </div>
                    
                    {positionalParams.some(p => p) && (
                      <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                        <div className="text-green-400 text-sm mb-2">Arguments would be:</div>
                        <div className="font-mono">
                          {positionalParams.map((param, i) => (
                            <div key={i} className="ml-4">
                              ${`${i + 1}`}: <span className="text-yellow-300">{param || "(empty)"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Common Pitfalls */}
        {activeSection === "pitfalls" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 rounded-2xl p-8 shadow-lg border border-rose-200 dark:border-rose-800">
                <h2 className="text-3xl font-bold mb-6 text-rose-800 dark:text-rose-300 flex items-center gap-3">
                  <span className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg">⚠️</span>
                  Common Pitfalls & Mistakes
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      title: "Not Checking Argument Count",
                      description: "Using $1 without checking if arguments were provided",
                      example: "echo \"File: $1\"  # Empty if no args",
                      fix: "Check $# first: [ $# -eq 0 ] && echo \"Usage...\"",
                      impact: "Script crashes or produces incorrect output"
                    },
                    {
                      title: "Forgetting to Quote Variables",
                      description: "Arguments with spaces get split incorrectly",
                      example: "cp $1 $2  # Fails if $1 has spaces",
                      fix: "Always quote: cp \"$1\" \"$2\"",
                      impact: "File operations fail, data loss possible"
                    },
                    {
                      title: "Read Without -r for Paths",
                      description: "Backslashes in paths get interpreted",
                      example: "read path; ls $path  # \ gets removed",
                      fix: "Use read -r for raw input",
                      impact: "File paths don't work correctly"
                    },
                    {
                      title: "Assuming $* and $@ are Same",
                      description: "They behave differently in loops",
                      example: "for arg in $* vs for arg in \"$@\"",
                      fix: "Use \"$@\" for separate arguments",
                      impact: "Word splitting issues in loops"
                    },
                    {
                      title: "No Input Validation for Read",
                      description: "Accepting empty or invalid input",
                      example: "read name; echo \"Hello $name\"",
                      fix: "while [[ -z $name ]]; do read -p...",
                      impact: "Empty variables cause errors"
                    },
                    {
                      title: "Confusing $0 with Script Name",
                      description: "$0 includes path when script is sourced",
                      example: "./scripts/tool.sh vs . scripts/tool.sh",
                      fix: "Use basename \"$0\" for just name",
                      impact: "Log messages show full paths"
                    }
                  ].map((mistake, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-rose-300 dark:border-rose-700 hover:border-rose-500 transition-colors duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-rose-600 dark:text-rose-400 font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 text-rose-700 dark:text-rose-300">
                            {mistake.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {mistake.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">Example:</span>
                              <code className="block mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                {mistake.example}
                              </code>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Fix:</span>
                              <code className="block mt-1 font-mono text-sm bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded">
                                {mistake.fix}
                              </code>
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">Impact:</span>
                              <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 p-2 bg-amber-50 dark:bg-amber-900/20 rounded">
                                {mistake.impact}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Best Practices */}
        {activeSection === "best-practices" && (
          <div className="space-y-8">
            <section className="section-reveal opacity-0">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 shadow-lg border border-emerald-200 dark:border-emerald-800">
                <h2 className="text-3xl font-bold mb-6 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
                  <span className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">✅</span>
                  Best Practices
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Column 1 */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        🛡️ Defensive Scripting
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Always validate input: <code>[ -z "$1" ] && exit 1</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use default values: <code>${`\${1:-default}`}</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Check file existence before processing</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        📝 Read Command Tips
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use <code>-p</code> for clear prompts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span><code>-t</code> for timeout in automated scripts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span><code>-s</code> for passwords/sensitive data</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        ⚡ Positional Parameter Tips
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Shift arguments after processing: <code>shift</code></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use <code>${`\${@:2}`}</code> for all args except first</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Store in named variables for readability</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-emerald-300 dark:border-emerald-700">
                      <h3 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300">
                        📚 Readability & Maintenance
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Add usage/help function</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Comment complex argument parsing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">✓</span>
                          <span>Use getopts for complex options</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Mini Checklist */}
                <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl border border-blue-300 dark:border-blue-700">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
                    🧠 What to Remember
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "Check $# before using $1",
                      "Quote all variables: \"$1\"",
                      "Use read -r for paths",
                      "read -p for prompts",
                      "read -s for passwords",
                      "Shift processed args",
                      "Default values: ${1:-default}",
                      "Use \"$@\" in loops",
                      "Validate all user input"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 text-sm">{i + 1}</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className="section-reveal opacity-0 animation-delay-300">
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-2xl">👨‍🏫</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-white">Teacher's Note</h3>
                    <div className="space-y-4">
                      <p className="text-indigo-100 leading-relaxed">
                        <strong>Input handling separates amateur scripts from professional ones.</strong> When 
                        <span className="font-semibold"> Tuhina</span> or <span className="font-semibold">Swadeep</span> 
                        write scripts, I emphasize the <span className="text-yellow-300">importance of validation</span> - 
                        never trust user input or command-line arguments blindly.
                      </p>
                      <p className="text-indigo-100 leading-relaxed">
                        <strong>Professional Tip:</strong> Always write a <code className="bg-indigo-800 px-2 py-1 rounded">usage()</code> function 
                        that explains how to use your script. This helps users (and your future self) understand the expected arguments.
                      </p>
                      <p className="text-indigo-100 leading-relaxed">
                        <strong>Remember:</strong> The <code className="bg-indigo-800 px-2 py-1 rounded">shift</code> command is your friend 
                        when processing multiple arguments. It lets you handle arguments in a loop without complex indexing.
                      </p>
                      <div className="mt-6 pt-6 border-t border-indigo-700">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-indigo-300">Teacher:</span>
                            <span className="ml-2 text-white font-semibold">Sukanta Hui</span>
                          </div>
                          <div>
                            <span className="text-indigo-300">Experience:</span>
                            <span className="ml-2 text-white">27 years</span>
                          </div>
                          <div>
                            <span className="text-indigo-300">Contact:</span>
                            <span className="ml-2 text-white">sukantahui@codernaccotax.co.in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hint Section */}
            <section className="section-reveal opacity-0 animation-delay-600">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-8 border border-amber-300 dark:border-amber-700">
                <h3 className="text-2xl font-bold mb-6 text-amber-800 dark:text-amber-300 flex items-center gap-3">
                  <span className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">💡</span>
                  Think About This...
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Observe carefully:</strong> What happens when you pass arguments with special characters 
                    like <code>*</code> or <code>?</code> to your script? How does the shell interpret them before 
                    they reach <code>$1</code>?
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Try changing:</strong> The timeout value in <code>read -t 5</code> to see how it affects 
                    user experience. What's a reasonable timeout for different types of scripts?
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Consider:</strong> How would you design a script that accepts <span className="font-semibold">both</span> 
                    command-line arguments <span className="font-semibold">and</span> interactive input? When would 
                    each method be appropriate in the same script?
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Footer Navigation */}
        <footer className="section-reveal max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 opacity-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 dark:text-gray-400">
              Topic 8: Reading User Input • Shell Scripting Mastery
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveSection("overview")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Review Concepts
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}