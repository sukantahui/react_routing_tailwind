import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import ifExampleSh1 from "./topic11_files/if_example1.sh?raw";
import ifExampleSh2 from "./topic11_files/if_example2.sh?raw";
import ifExampleSh3 from "./topic11_files/if_example3.sh?raw";
import switchExample1 from "./topic11_files/switch_example1.sh?raw";

const Topic11 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFlow, setActiveFlow] = useState("if");
  const [loopStep, setLoopStep] = useState(0);
  const [hoveredExample, setHoveredExample] = useState(null);

  // Calculate experience dynamically
  const currentYear = new Date().getFullYear();
  const experience = currentYear - 1998;

  // Loop steps for visualization
  const loopSteps = [
    "Initialization",
    "Condition Check",
    "Execute Body",
    "Update/Increment",
    "Condition Check",
    "Exit Loop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 px-4 py-8 transition-colors duration-500">
      <style>{`
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
        
        @keyframes decisionFlow {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px);
            opacity: 0;
          }
        }
        
        @keyframes loopPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes codeExecution {
          0% {
            background-color: rgba(59, 130, 246, 0);
          }
          50% {
            background-color: rgba(59, 130, 246, 0.3);
          }
          100% {
            background-color: rgba(59, 130, 246, 0);
          }
        }
        
        @keyframes branchFlow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div 
          className="animate-[fadeInUp_0.8s_ease-out] motion-safe:animate-[fadeInUp_0.8s_ease-out]"
        >
          <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4">
            Topic 12: awk Programming
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
              Conditional Logic and Loops in awk
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            Master decision-making and repetition in awk to create sophisticated data processing scripts.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        {/* Introduction Card */}
        <section className="mb-12">
          <div 
            className="animate-[fadeInUp_0.8s_ease-out_0.1s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.1s_both]"
          >
            <div 
              className={clsx(
                "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-all duration-500",
                hoveredCard === 'intro' ? "shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10 -translate-y-1" : "hover:shadow-xl"
              )}
              onMouseEnter={() => setHoveredCard('intro')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Programmatic Power in awk</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    awk isn't just for one-liners - it's a full programming language with C-style conditionals 
                    and loops. These constructs transform awk from a simple filter into a powerful data processing engine.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-indigo-600 dark:text-indigo-400">Conditional Statements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <code>if-else</code> - Decision making
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <code>?:</code> - Ternary operator
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <code>switch</code> - Multi-way branching
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-pink-600 dark:text-pink-400">Looping Constructs</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <code>for</code> - Counter-based iteration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <code>while</code> - Condition-based iteration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <code>do-while</code> - Execute then check
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conditional Logic Visualization */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <h2 className="text-3xl font-bold mb-8 text-center">Decision Making in awk</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: If-Else Flow */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400">if-else Statement Flow</h3>
                    <div className="flex space-x-2">
                      <button 
                        className={clsx(
                          "px-3 py-1 text-sm rounded-full transition-all",
                          activeFlow === "if" ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                        )}
                        onClick={() => setActiveFlow("if")}
                      >
                        if-else
                      </button>
                      <button 
                        className={clsx(
                          "px-3 py-1 text-sm rounded-full transition-all",
                          activeFlow === "ternary" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                        )}
                        onClick={() => setActiveFlow("ternary")}
                      >
                        Ternary
                      </button>
                    </div>
                  </div>
                  
                  {/* Flow Visualization */}
                  <div className="relative h-64 mb-6">
                    <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                      {/* Decision Diamond */}
                      <g transform="translate(150, 20)" onMouseEnter={() => setActiveFlow("if")}>
                        <polygon 
                          points="0,-30 30,0 0,30 -30,0" 
                          fill="#10b981" 
                          stroke="#059669" 
                          strokeWidth="2"
                          className="transition-all duration-300 hover:fill-emerald-500"
                        />
                        <text x="0" y="0" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Condition</text>
                        <text x="0" y="15" textAnchor="middle" fill="#a7f3d0" fontSize="10" dy=".3em">$3 > 75</text>
                        
                        {/* Animated decision point */}
                        <circle cx="0" cy="0" r="4" fill="#f59e0b">
                          <animate 
                            attributeName="r" 
                            values="4;8;4" 
                            dur="2s" 
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                      
                      {/* True Branch */}
                      <g transform="translate(250, 60)">
                        <rect x="0" y="0" width="100" height="40" rx="8" fill="#3b82f6" />
                        <text x="50" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">True Block</text>
                        <text x="50" y="32" textAnchor="middle" fill="#dbeafe" fontSize="9" dy=".3em">print "Pass"</text>
                        
                        {/* Flow arrow to true */}
                        <path 
                          d="M170,60 Q200,60 200,80 T230,100"
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="3" 
                          strokeDasharray={activeFlow === "if" ? "0" : "5,5"}
                          className="transition-all duration-500"
                        >
                          {activeFlow === "if" && (
                            <animate
                              attributeName="stroke-dashoffset"
                              values="100;0"
                              dur="3s"
                              repeatCount="indefinite"
                            />
                          )}
                        </path>
                      </g>
                      
                      {/* False Branch */}
                      <g transform="translate(50, 60)">
                        <rect x="0" y="0" width="100" height="40" rx="8" fill="#ef4444" />
                        <text x="50" y="20" textAnchor="middle" fill="white" fontSize="12" dy=".3em">False Block</text>
                        <text x="50" y="32" textAnchor="middle" fill="#fee2e2" fontSize="9" dy=".3em">print "Fail"</text>
                        
                        {/* Flow arrow to false */}
                        <path 
                          d="M130,60 Q100,60 100,80 T70,100"
                          fill="none" 
                          stroke="#ef4444" 
                          strokeWidth="3" 
                          strokeDasharray={activeFlow === "if" ? "0" : "5,5"}
                          className="transition-all duration-500"
                        >
                          {activeFlow === "if" && (
                            <animate
                              attributeName="stroke-dashoffset"
                              values="100;0"
                              dur="3s"
                              repeatCount="indefinite"
                              begin="1.5s"
                            />
                          )}
                        </path>
                      </g>
                      
                      {/* Merge Point */}
                      <g transform="translate(150, 180)">
                        <circle cx="0" cy="0" r="30" fill="#6b7280" />
                        <text x="0" y="0" textAnchor="middle" fill="white" fontSize="12" dy=".3em">Continue</text>
                        
                        {/* Merge arrows */}
                        <path d="M180,100 L180,150" stroke="#6b7280" strokeWidth="2" fill="none" />
                        <path d="M120,100 L120,150" stroke="#6b7280" strokeWidth="2" fill="none" />
                      </g>
                      
                      {/* Data flow animation */}
                      {activeFlow === "if" && (
                        <circle cx="150" cy="-10" r="6" fill="#f59e0b">
                          <animate
                            attributeName="cy"
                            values="-10;200"
                            dur="3s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cx"
                            values="150;250;150"
                            dur="3s"
                            repeatCount="indefinite"
                            keyTimes="0;0.3;1"
                          />
                        </circle>
                      )}
                    </svg>
                  </div>
                  
                  <div className="space-y-4">
                    {activeFlow === "if" ? (
                      <>
                        <h4 className="font-semibold text-green-600 dark:text-green-400">if-else Syntax:</h4>
                        <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                            <ShellFileLoader
                                fileModule={ifExampleSh2}
                                title="Forgetting braces for multi-statement blocks"
                                highlightLines={[]}
                            />
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400">Ternary Operator:</h4>
                        <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                            <ShellFileLoader
                                fileModule={ifExampleSh3}
                                title="Forgetting braces for multi-statement blocks"
                                highlightLines={[]}
                            />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">switch Statement</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <ShellFileLoader
                                fileModule={switchExample1}
                                title="Switch Eeample"
                                highlightLines={[]}
                            />
                  </div>
                </div>
              </div>
              
              {/* Right: Loop Visualization */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-center text-pink-600 dark:text-pink-400">Loop Execution Flow</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-4">
                    <h4 className="font-semibold">Loop Steps:</h4>
                    <button 
                      className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm"
                      onClick={() => setLoopStep((loopStep + 1) % 6)}
                    >
                      Next Step →
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {loopSteps.map((step, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "p-3 rounded-lg text-center transition-all duration-300",
                          loopStep === index 
                            ? "bg-pink-100 dark:bg-pink-900/30 border-2 border-pink-500" 
                            : index < loopStep 
                              ? "bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                              : "bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                        )}
                      >
                        <div className={clsx(
                          "w-6 h-6 rounded-full mx-auto mb-2 flex items-center justify-center text-xs font-bold",
                          loopStep === index 
                            ? "bg-pink-500 text-white animate-[loopPulse_1s_ease-in-out_infinite]" 
                            : index < loopStep 
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        )}>
                          {index + 1}
                        </div>
                        <div className="text-xs">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Loop Visualization */}
                <div className="relative h-64">
                  <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
                    {/* Loop Structure */}
                    <g transform="translate(100, 30)">
                      {/* Initialization */}
                      <g transform="translate(100, 0)" className={clsx(loopStep >= 0 && "animate-[codeExecution_1s_ease-in-out]")}>
                        <rect x="0" y="0" width="100" height="30" rx="6" fill="#3b82f6" />
                        <text x="50" y="15" textAnchor="middle" fill="white" fontSize="11" dy=".3em">i = 1</text>
                      </g>
                      
                      {/* Condition Check */}
                      <g transform="translate(100, 50)" className={clsx(loopStep >= 1 && "animate-[codeExecution_1s_ease-in-out]")}>
                        <polygon points="0,-15 15,0 0,15 -15,0" fill="#10b981" stroke="#059669" strokeWidth="2" />
                        <text x="0" y="0" textAnchor="middle" fill="white" fontSize="10" dy=".3em">
                            {`i <= 5`}
                        </text>
                      </g>
                      
                      {/* Loop Body */}
                      <g transform="translate(100, 100)" className={clsx(loopStep >= 2 && "animate-[codeExecution_1s_ease-in-out]")}>
                        <rect x="0" y="0" width="120" height="40" rx="8" fill="#8b5cf6" />
                        <text x="60" y="20" textAnchor="middle" fill="white" fontSize="11" dy=".3em">Process $i</text>
                      </g>
                      
                      {/* Increment */}
                      <g transform="translate(100, 160)" className={clsx(loopStep >= 3 && "animate-[codeExecution_1s_ease-in-out]")}>
                        <rect x="0" y="0" width="100" height="30" rx="6" fill="#f59e0b" />
                        <text x="50" y="15" textAnchor="middle" fill="white" fontSize="11" dy=".3em">i++</text>
                      </g>
                      
                      {/* Loop Arrow */}
                      <path 
                        d="M160,140 Q200,140 200,80 T160,50"
                        fill="none" 
                        stroke="#8b5cf6" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                      />
                      
                      {/* Exit Path */}
                      <path 
                        d="M40,50 Q0,50 0,200 T40,190"
                        fill="none" 
                        stroke="#ef4444" 
                        strokeWidth="2" 
                        strokeDasharray="5,5"
                      />
                      
                      {/* Exit Block */}
                      <g transform="translate(0, 190)" className={clsx(loopStep >= 5 && "animate-[codeExecution_1s_ease-in-out]")}>
                        <rect x="0" y="0" width="80" height="30" rx="6" fill="#059669" />
                        <text x="40" y="15" textAnchor="middle" fill="white" fontSize="11" dy=".3em">Exit Loop</text>
                      </g>
                      
                      {/* Animated counter */}
                      <g transform="translate(220, 20)">
                        <rect x="0" y="0" width="60" height="30" rx="6" fill="#374151" />
                        <text x="30" y="15" textAnchor="middle" fill="white" fontSize="11" dy=".3em">i = {loopStep < 5 ? Math.floor(loopStep / 2) + 1 : 6}</text>
                      </g>
                    </g>
                  </svg>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-pink-600 dark:text-pink-400">Loop Types in awk:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-medium text-sm mb-1">for loop</h5>
                      <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">
{`for (i=1; i<=NF; i++)
    print $i`}
                      </pre>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">while loop</h5>
                      <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">
{`i = 1
while (i <= NF) {
    print $i
    i++
}`}
                      </pre>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm mb-1">do-while</h5>
                      <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">
{`i = 1
do {
    print $i
    i++
} while (i <= NF)`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            <h2 className="text-3xl font-bold mb-8">Practical Applications at CNAT Centers</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Example 1: Student Grade Processing */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'grades' ? "shadow-xl shadow-blue-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('grades')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Student Grade Classification</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Processing marks for <strong>Swadeep</strong>, <strong>Tuhina</strong>, and <strong>Abhronila</strong> 
                  at <strong>CNAT Barrackpore</strong> with complex grading rules.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Complex if-else Ladder:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`awk -F',' '{
    # Calculate average of 5 subjects
    total = $2 + $3 + $4 + $5 + $6
    avg = total / 5
    
    # Multi-level grade classification
    if (avg >= 90) {
        grade = "A+"
        category = "Excellent"
    } else if (avg >= 80) {
        grade = "A"
        category = "Very Good"
    } else if (avg >= 70) {
        grade = "B+"
        category = "Good"
    } else if (avg >= 60) {
        grade = "B"
        category = "Above Average"
    } else if (avg >= 50) {
        grade = "C"
        category = "Average"
    } else if (avg >= 40) {
        grade = "D"
        category = "Below Average"
    } else {
        grade = "F"
        category = "Fail"
    }
    
    # Additional conditions
    if ($2 < 40 || $3 < 40 || $4 < 40 || $5 < 40 || $6 < 40) {
        grade = "F"
        category = "Fail in one or more subjects"
    }
    
    print $1, "Average:", avg, "Grade:", grade, "Category:", category
}' students.txt`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Using switch for Performance:</h4>
                    <pre className="bg-blue-900/30 text-blue-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Convert numeric grade to letter grade using switch
switch(int(avg/10)) {
    case 10:
    case 9:
        letter = "A";
        break;
    case 8:
        letter = "B";
        break;
    case 7:
        letter = "C";
        break;
    case 6:
        letter = "D";
        break;
    default:
        letter = "F";
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Example 2: Data Processing with Loops */}
              <div 
                className={clsx(
                  "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500",
                  hoveredExample === 'processing' ? "shadow-xl shadow-green-500/20 -translate-y-1" : "hover:shadow-xl"
                )}
                onMouseEnter={() => setHoveredExample('processing')}
                onMouseLeave={() => setHoveredExample(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Advanced Data Processing</h3>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Processing complex student records from <strong>CNAT Naihati</strong> with nested loops and conditions.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">Field Processing with for loop:</h4>
                    <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Process all fields in each record
awk '{
    print "Processing record", NR
    print "Number of fields:", NF
    
    # Loop through all fields
    for (i = 1; i <= NF; i++) {
        printf "Field %d: %s\\n", i, $i
        
        # Nested condition within loop
        if ($i ~ /^[0-9]+$/) {
            printf "  -> Numeric field, value: %d\\n", $i
            
            # Further nested logic
            if ($i > 90) {
                print "  -> Excellent score!"
            }
        }
    }
    
    print "--- End of record ---\\n"
}' data.txt`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">while with break/continue:</h4>
                    <pre className="bg-green-900/30 text-green-100 p-3 rounded-lg overflow-x-auto text-xs">
{`# Process until certain condition
awk '{
    i = 1
    total = 0
    count = 0
    
    while (i <= NF) {
        # Skip non-numeric fields
        if ($i !~ /^[0-9]+$/) {
            i++
            continue  # Skip to next iteration
        }
        
        # Stop if we find a negative number
        if ($i < 0) {
            print "Found negative number at field", i
            break  # Exit loop immediately
        }
        
        total += $i
        count++
        i++
    }
    
    if (count > 0) {
        print "Average of numeric fields:", total/count
    }
}' records.txt`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Control Flow Statements */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.4s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <h2 className="text-3xl font-bold mb-8">Control Flow Statements</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-red-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">break Statement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Immediately exits the innermost loop. Useful for stopping processing when a condition is met.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">
{`for (i=1; i<=NF; i++) {
    if ($i == "STOP") {
        break  # Exit loop
    }
    print $i
}`}
                </pre>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-yellow-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">continue Statement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Skips the rest of the current loop iteration and moves to the next one.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">
{`for (i=1; i<=NF; i++) {
    if ($i == "") {
        continue  # Skip empty fields
    }
    process($i)
}`}
                </pre>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="text-purple-500 mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">exit Statement</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Immediately stops awk execution. Can return an exit code to the shell.
                </p>
                <pre className="bg-gray-900 text-gray-100 p-2 rounded text-xs">
{`if (NF < 5) {
    print "Error: Insufficient fields"
    exit 1  # Exit with error code
}
# Normal processing...`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.5s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.5s_both]">
            <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Common Logic Errors in awk</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Missing Braces</h4>
                    <p className="text-sm">
                      Forgetting braces for multi-statement blocks causes only the first statement to be conditional.
                    </p>



                    <div className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
                        <ShellFileLoader
                            fileModule={ifExampleSh1}
                            title="Forgetting braces for multi-statement blocks"
                            highlightLines={[]}
                        />
                    </div>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Infinite Loops</h4>
                    <p className="text-sm">
                      Forgetting to update loop counter or using wrong condition. At <strong>CNAT Shyamnagar</strong>, 
                      a student's script ran forever because <code>while ({`i <= NF`})</code> had no <code>i++</code>.
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
{`# INFINITE LOOP:
i = 1
while (i <= NF) {
    print $i
    # Missing: i++
}`}
                    </pre>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Wrong Comparison Operators</h4>
                    <p className="text-sm">
                      Using <code>=</code> (assignment) instead of <code>==</code> (comparison). This changes variable values unexpectedly.
                    </p>
                    <pre className="bg-red-900/30 text-red-100 p-2 rounded mt-2 text-xs">
{`# WRONG: Assigns 5 to x, always true
if (x = 5) { ... }

# CORRECT: Compares x with 5
if (x == 5) { ... }`}
                    </pre>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Off-by-One Errors</h4>
                    <p className="text-sm">
                      Starting loops at 0 instead of 1 for fields, or using <code>{`<=`}</code> when <code>{`<`}</code> is correct.
                    </p>
                    <pre className="bg-gray-900 text-gray-100 p-2 rounded mt-2 text-xs">
{`# WRONG: $0 is entire record, not first field
for (i=0; i<NF; i++) print $i

# CORRECT: Fields start at 1
for (i=1; i<=NF; i++) print $i`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.6s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
            <h2 className="text-3xl font-bold mb-8">Professional awk Programming Practices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-green-600 dark:text-green-400">✓ Code Organization</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Always use braces <code>{}</code> even for single statements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Indent nested blocks consistently (2 or 4 spaces)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Comment complex logic, especially nested loops</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4 text-blue-600 dark:text-blue-400">✓ Performance & Safety</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Use <code>next</code> statement to skip unnecessary processing early</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Avoid deep nesting - refactor into functions if needed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Initialize loop counters before use, validate bounds</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-indigo-600 dark:text-indigo-400">Professional Pattern: Complex Data Processing</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`#!/usr/bin/awk -f
# Professional awk script with conditionals and loops
BEGIN {
    FS = ","
    OFS = "|"
    
    # Initialize counters
    excellent = 0
    good = 0
    average = 0
    poor = 0
    failures = 0
    
    print "Student Analysis Report"
    print "======================="
}

# Main processing with nested logic
{
    # Validate record
    if (NF < 5) {
        printf "ERROR: Record %d has only %d fields\\n", NR, NF >> "/dev/stderr"
        next  # Skip to next record
    }
    
    # Calculate average using loop
    total = 0
    subject_count = 0
    
    # Process subject columns (fields 2-5)
    for (i = 2; i <= 5; i++) {
        if ($i >= 0 && $i <= 100) {
            total += $i
            subject_count++
        } else {
            printf "WARNING: Invalid mark %s for %s\\n", $i, $1 >> "/dev/stderr"
        }
    }
    
    # Skip if no valid marks
    if (subject_count == 0) {
        next
    }
    
    average_mark = total / subject_count
    
    # Complex grading logic
    if (average_mark >= 90) {
        grade = "A+"
        excellent++
        comment = "Outstanding!"
    } else if (average_mark >= 80) {
        grade = "A"
        good++
        comment = "Very Good"
    } else if (average_mark >= 70) {
        grade = "B+"
        average++
        comment = "Good"
    } else if (average_mark >= 60) {
        grade = "B"
        average++
        comment = "Above Average"
    } else if (average_mark >= 50) {
        grade = "C"
        poor++
        comment = "Needs Improvement"
    } else {
        grade = "F"
        failures++
        comment = "Failed - Requires attention"
    }
    
    # Output formatted result
    printf "%-20s %6.2f %-4s %-20s\\n", $1, average_mark, grade, comment
}

END {
    # Generate summary
    print "\\n======================="
    print "SUMMARY STATISTICS"
    print "======================="
    printf "Excellent (A+): %d\\n", excellent
    printf "Good (A): %d\\n", good
    printf "Average (B): %d\\n", average
    printf "Poor (C): %d\\n", poor
    printf "Failures (F): %d\\n", failures
    printf "Total Students: %d\\n", NR
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.7s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.7s_both]">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What Students Should Remember</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-green-600 dark:text-green-400">✓ Conditionals</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">1</span>
                      <span>Always use braces <code>{}</code> for multi-statement blocks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">2</span>
                      <span>Use <code>==</code> for comparison, not <code>=</code> (assignment)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">3</span>
                      <span><code>switch</code> is efficient for multiple exact matches</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-4 text-emerald-600 dark:text-emerald-400">✓ Loops</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">4</span>
                      <span>Fields start at 1: <code>{`for (i=1; i<=NF; i++)`}</code></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">5</span>
                      <span>Always update loop counters to avoid infinite loops</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm mt-0.5">6</span>
                      <span>Use <code>break</code> to exit, <code>continue</code> to skip iterations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-12">
          <div className="animate-[fadeInUp_0.8s_ease-out_0.8s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.8s_both]">
            <div 
              className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">SH</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <h2 className="text-2xl font-bold">Teacher's Note</h2>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Teaching Programming Thinking in awk</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      At <strong>CNAT Ichapur</strong>, I emphasize that awk's conditionals and loops are where 
                      students transition from "command users" to "programmers." When <strong>Debangshu</strong> 
                      learns to use <code>if-else</code> for student classification, he's learning algorithmic thinking.
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Teaching Strategy:</h4>
                      <p className="text-sm">
                        Start with simple <code>if</code> statements on single fields, progress to <code>if-else</code> ladders 
                        for grading, then introduce loops for processing all fields. Always trace execution on paper first - 
                        have students predict what <code>{`for (i=1; i<=NF; i++) print $i`}</code> will do before running it.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold">Sukanta Hui</p>
                      <p className="text-gray-600 dark:text-gray-400">sukantahui@codernaccotax.co.in</p>
                      <p className="text-gray-600 dark:text-gray-400">{experience} years experience</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Expertise:</p>
                      <p className="text-gray-600 dark:text-gray-400">Programming Languages, RDBMS, Operating Systems, Web Development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section>
          <div className="animate-[fadeInUp_0.8s_ease-out_0.9s_both] motion-safe:animate-[fadeInUp_0.8s_ease-out_0.9s_both]">
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h1m0 0h-1m1 0v4m0 0l2 2m-2-2l-2 2M9 7h6m4 0a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h2m4 0V5a1 1 0 00-1-1H8a1 1 0 00-1 1v2h6z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Think About This...</h2>
                  <p className="text-gray-600 dark:text-gray-300">Developing algorithmic thinking</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Observe Carefully:</h4>
                    <p className="text-sm">
                      What's the difference between <code>{`while (i <= NF)</code> and <code>do { ... } while (i <= NF)`}</code>? 
                      Try both with <strong>Tuhina</strong>'s student record when <code>i</code> starts at <code>NF + 1</code>.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Try Changing This:</h4>
                    <p className="text-sm">
                      Modify the grade classification to use a <code>switch</code> statement instead of <code>if-else</code> ladder. 
                      Which is more readable? Which is more efficient for many exact matches?
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Consider This Scenario:</h4>
                  <p className="text-sm mb-3">
                    At <strong>CNAT Barrackpore</strong>, you need to process student marks where:
                  </p>
                  <ul className="text-sm space-y-1 mb-3">
                    <li>• Each student has 6 subject marks (fields 2-7)</li>
                    <li>• You need to find the highest and lowest marks for each student</li>
                    <li>• Skip students with any mark below 40 (failures)</li>
                    <li>• Calculate average of remaining students</li>
                  </ul>
                  <p className="text-sm">
                    <strong>Challenge:</strong> Write an awk script using loops and conditionals to process this data. 
                    Think about where to initialize variables, how to handle early exits, and how to structure nested logic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Topic 12: Conditional Logic and Loops in awk • Next: Formatting Output Using awk printf</p>
          <p className="mt-2">Interactive Learning System • Mastering awk Programming • Designed for CNAT Computer Centers</p>
        </div>
      </footer>
    </div>
  );
};

export default Topic11;