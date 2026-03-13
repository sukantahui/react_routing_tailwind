// Topic11.jsx - Conditional statements: if, elif, else, test, [ ] and [[ ]]
import React, { useState } from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import ifBasic from "./topic11_files/if_basic.sh?raw";
import ifElse from "./topic11_files/if_else.sh?raw";
import ifElifElse from "./topic11_files/if_elif_else.sh?raw";
import testCommand from "./topic11_files/test_command.sh?raw";
import bracketsComparison from "./topic11_files/brackets_comparison.sh?raw";
import conditionPitfalls from "./topic11_files/condition_pitfalls.sh?raw";

const Topic11 = () => {
  const [activeExample, setActiveExample] = useState("basic");
  const [activeConditionType, setActiveConditionType] = useState("string");

  const examples = {
    basic: "Basic if Statement",
    ifelse: "if-else Statement",
    elif: "if-elif-else Chain",
    test: "test Command",
    brackets: "[ ] vs [[ ]]",
    pitfalls: "Common Pitfalls"
  };

  const conditionTypes = [
    { id: "string", name: "String Conditions", icon: "🔤" },
    { id: "numeric", name: "Numeric Conditions", icon: "🔢" },
    { id: "file", name: "File Tests", icon: "📁" },
    { id: "logical", name: "Logical Operators", icon: "🔀" }
  ];

  // SVG Component for Decision Flow
  const DecisionFlowSVG = () => {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-rose-50 dark:from-gray-800 dark:to-rose-900/20 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-lg hover:border-rose-300 dark:hover:border-rose-500">
        <svg 
          viewBox="0 0 800 500" 
          className="w-full h-auto"
          aria-label="Conditional Statement Flow Diagram"
        >
          <defs>
            <linearGradient id="conditionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="trueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="falseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="elifGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.9" />
            </linearGradient>
            
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
            </marker>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Title */}
          <text x="400" y="40" textAnchor="middle" fill="#1F2937" fontSize="20" fontWeight="bold" className="dark:fill-gray-200">
            Conditional Statement Decision Flow
          </text>
          
          {/* Start Node */}
          <circle 
            cx="400" cy="100" r="30" 
            fill="#3B82F6" 
            stroke="#1D4ED8" 
            strokeWidth="2"
            className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
          />
          <text x="400" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            Start
          </text>
          
          {/* Condition Diamond */}
          <g transform="translate(350 150)">
            <path 
              d="M50,0 L100,50 L50,100 L0,50 Z" 
              fill="url(#conditionGradient)"
              stroke="#2563EB"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="50" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Condition
            </text>
            <text x="50" y="70" textAnchor="middle" fill="#DBEAFE" fontSize="10">
              if [ $age -ge 18 ]
            </text>
          </g>
          
          {/* True Path */}
          <g>
            <path 
              d="M400 180 Q400 200, 250 250" 
              stroke="#10B981" 
              strokeWidth="3" 
              fill="none"
              markerEnd="url(#arrowhead)"
              className="motion-safe:animate-pulse"
            />
            <text x="320" y="220" fill="#059669" fontSize="12" fontWeight="bold">
              TRUE
            </text>
            
            <rect 
              x="150" y="250" 
              width="200" height="60" 
              rx="10"
              fill="url(#trueGradient)"
              stroke="#059669"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="250" y="280" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              if Block
            </text>
            <text x="250" y="295" textAnchor="middle" fill="#D1FAE5" fontSize="10">
              echo "Adult"
            </text>
          </g>
          
          {/* False Path */}
          <g>
            <path 
              d="M400 180 Q400 200, 550 250" 
              stroke="#EF4444" 
              strokeWidth="3" 
              fill="none"
              markerEnd="url(#arrowhead)"
              className="motion-safe:animate-pulse"
            />
            <text x="480" y="220" fill="#DC2626" fontSize="12" fontWeight="bold">
              FALSE
            </text>
            
            <rect 
              x="450" y="250" 
              width="200" height="60" 
              rx="10"
              fill="url(#falseGradient)"
              stroke="#DC2626"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="550" y="280" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
              else Block
            </text>
            <text x="550" y="295" textAnchor="middle" fill="#FECACA" fontSize="10">
              echo "Minor"
            </text>
          </g>
          
          {/* Elif Example */}
          <g transform="translate(0 200)">
            <rect 
              x="300" y="200" 
              width="200" height="60" 
              rx="10"
              fill="url(#elifGradient)"
              stroke="#D97706"
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="400" y="225" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              elif Condition
            </text>
            <text x="400" y="245" textAnchor="middle" fill="#FEF3C7" fontSize="10">
              elif [ $score -ge 60 ]
            </text>
          </g>
          
          {/* Exit Points */}
          <g>
            <circle 
              cx="250" cy="350" r="25" 
              fill="#10B981" 
              stroke="#059669" 
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="250" y="355" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Exit
            </text>
            <text x="250" y="380" textAnchor="middle" fill="#059669" fontSize="10">
              (if path)
            </text>
            
            <circle 
              cx="550" cy="350" r="25" 
              fill="#EF4444" 
              stroke="#DC2626" 
              strokeWidth="2"
              className="hover:stroke-[3] hover:filter hover:drop-shadow-lg transition-all duration-300"
            />
            <text x="550" y="355" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
              Exit
            </text>
            <text x="550" y="380" textAnchor="middle" fill="#DC2626" fontSize="10">
              (else path)
            </text>
          </g>
          
          {/* Syntax Examples */}
          <g transform="translate(50 400)">
            <rect x="0" y="0" width="700" height="80" rx="8" fill="#1F2937" fillOpacity="0.1" stroke="#4B5563" strokeWidth="1" />
            
            <text x="20" y="20" fill="#374151" fontSize="12" fontWeight="bold" className="dark:fill-gray-200">
              Basic Syntax:
            </text>
            <text x="40" y="40" fill="#3B82F6" fontSize="11" fontFamily="monospace">
              if condition; then commands; fi
            </text>
            
            <text x="20" y="60" fill="#374151" fontSize="12" fontWeight="bold" className="dark:fill-gray-200">
              With else:
            </text>
            <text x="40" y="80" fill="#10B981" fontSize="11" fontFamily="monospace">
              if condition; then commands; else other; fi
            </text>
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
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-indigo-600 dark:from-rose-400 dark:to-indigo-400">
            Topic 11: Conditional Statements
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            if, elif, else, test, [ ] and [[ ]] - Making decisions in shell scripts
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Theory */}
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Introduction */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
              <h2 className="text-2xl font-bold mb-6 text-rose-700 dark:text-rose-300 flex items-center gap-3">
                <span className="p-2 bg-rose-100 dark:bg-rose-900 rounded-lg">📘</span>
                The Art of Decision Making in Shell
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Conditional statements allow your scripts to <strong>make decisions based on conditions</strong>. They transform static scripts into intelligent programs that can adapt to different situations, validate inputs, handle errors, and control program flow.
              </p>
              
              <div className="mt-6 p-4 bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 rounded">
                <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-2">Real-world Analogy</h3>
                <p className="text-rose-700 dark:text-rose-400">
                  Imagine <strong>Swadeep</strong> deciding whether to take an umbrella: <code className="bg-rose-100 dark:bg-rose-800 px-1 rounded">if [ "$weather" = "rainy" ]; then take umbrella; else leave umbrella; fi</code>. The script makes similar decisions based on conditions.
                </p>
              </div>
            </section>

            {/* Section 2: Visual Explanation */}
            <section className="animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
              <DecisionFlowSVG />
            </section>

            {/* Section 3: Condition Types */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
              <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-300 flex items-center gap-3">
                <span className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">🔧</span>
                Types of Conditions & Operators
              </h2>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {conditionTypes.map((type, index) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveConditionType(type.id)}
                      className={clsx(
                        "px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
                        activeConditionType === type.id
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      )}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <span className="text-lg">{type.icon}</span>
                      {type.name}
                    </button>
                  ))}
                </div>
                
                <div className="animate-[fadeIn_0.5s_ease-out]">
                  {activeConditionType === "string" && (
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                      <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">String Comparison Operators</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-blue-700 dark:text-blue-300">= or ==</code>
                            <span className="text-sm text-blue-600 dark:text-blue-400">Equal to</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-blue-700 dark:text-blue-300">!=</code>
                            <span className="text-sm text-blue-600 dark:text-blue-400">Not equal to</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-blue-700 dark:text-blue-300">-z</code>
                            <span className="text-sm text-blue-600 dark:text-blue-400">String is empty</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-blue-700 dark:text-blue-300">-n</code>
                            <span className="text-sm text-blue-600 dark:text-blue-400">String is not empty</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-blue-700 dark:text-blue-300">&lt;</code>
                            <span className="text-sm text-blue-600 dark:text-blue-400">Less than (ASCII)</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-blue-700 dark:text-blue-300">&gt;</code>
                            <span className="text-sm text-blue-600 dark:text-blue-400">Greater than (ASCII)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded">
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          <strong>Example:</strong> <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">if [ "$name" = "Swadeep" ]; then</code>
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeConditionType === "numeric" && (
                    <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                      <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-4">Numeric Comparison Operators</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-emerald-700 dark:text-emerald-300">-eq</code>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">Equal to</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-emerald-700 dark:text-emerald-300">-ne</code>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">Not equal to</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-emerald-700 dark:text-emerald-300">-lt</code>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">Less than</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-emerald-700 dark:text-emerald-300">-le</code>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">Less or equal</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-emerald-700 dark:text-emerald-300">-gt</code>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">Greater than</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-emerald-700 dark:text-emerald-300">-ge</code>
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">Greater or equal</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-emerald-100/50 dark:bg-emerald-900/30 rounded">
                        <p className="text-sm text-emerald-700 dark:text-emerald-400">
                          <strong>Example:</strong> <code className="bg-emerald-200 dark:bg-emerald-800 px-1 rounded">if [ $age -ge 18 ]; then</code>
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeConditionType === "file" && (
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
                      <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-4">File Test Operators</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-amber-700 dark:text-amber-300">-e</code>
                            <span className="text-sm text-amber-600 dark:text-amber-400">File exists</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-amber-700 dark:text-amber-300">-f</code>
                            <span className="text-sm text-amber-600 dark:text-amber-400">Regular file</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-amber-700 dark:text-amber-300">-d</code>
                            <span className="text-sm text-amber-600 dark:text-amber-400">Directory</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-amber-700 dark:text-amber-300">-r</code>
                            <span className="text-sm text-amber-600 dark:text-amber-400">Readable</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-amber-700 dark:text-amber-300">-w</code>
                            <span className="text-sm text-amber-600 dark:text-amber-400">Writable</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-amber-700 dark:text-amber-300">-x</code>
                            <span className="text-sm text-amber-600 dark:text-amber-400">Executable</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-amber-100/50 dark:bg-amber-900/30 rounded">
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          <strong>Example:</strong> <code className="bg-amber-200 dark:bg-amber-800 px-1 rounded">if [ -f "/home/abhronila/data.txt" ]; then</code>
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeConditionType === "logical" && (
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                      <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-4">Logical Operators</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-purple-700 dark:text-purple-300">&& or -a</code>
                            <span className="text-sm text-purple-600 dark:text-purple-400">Logical AND</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-purple-700 dark:text-purple-300">|| or -o</code>
                            <span className="text-sm text-purple-600 dark:text-purple-400">Logical OR</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-purple-700 dark:text-purple-300">!</code>
                            <span className="text-sm text-purple-600 dark:text-purple-400">Logical NOT</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-purple-700 dark:text-purple-300">( )</code>
                            <span className="text-sm text-purple-600 dark:text-purple-400">Grouping</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-purple-700 dark:text-purple-300">-o</code>
                            <span className="text-sm text-purple-600 dark:text-purple-400">OR (old style)</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <code className="text-sm text-purple-700 dark:text-purple-300">-a</code>
                            <span className="text-sm text-purple-600 dark:text-purple-400">AND (old style)</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-purple-100/50 dark:bg-purple-900/30 rounded">
                        <p className="text-sm text-purple-700 dark:text-purple-400">
                          <strong>Example:</strong> <code className="bg-purple-200 dark:bg-purple-800 px-1 rounded">if [ -f "$file" ] && [ -r "$file" ]; then</code>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">test Command</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    The original command for testing conditions. <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">test "$x" -eq 5</code> is equivalent to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[ "$x" -eq 5 ]</code>
                  </p>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">[ ] vs [[ ]]</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[ ]</code> is POSIX compatible. <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">[[ ]]</code> is bash-specific with enhanced features like regex matching.
                  </p>
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
                          ? "bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-lg"
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
                    <ShellFileLoader
                      fileModule={ifBasic}
                      title="Basic if Statement"
                      highlightLines={[2, 4, 6]}
                    />
                  )}
                  
                  {activeExample === "ifelse" && (
                    <ShellFileLoader
                      fileModule={ifElse}
                      title="if-else Statement"
                      highlightLines={[2, 6, 10]}
                    />
                  )}
                  
                  {activeExample === "elif" && (
                    <ShellFileLoader
                      fileModule={ifElifElse}
                      title="if-elif-else Chain"
                      highlightLines={[2, 6, 10, 14]}
                    />
                  )}
                  
                  {activeExample === "test" && (
                    <ShellFileLoader
                      fileModule={testCommand}
                      title="test Command Usage"
                      highlightLines={[2, 6, 10]}
                    />
                  )}
                  
                  {activeExample === "brackets" && (
                    <ShellFileLoader
                      fileModule={bracketsComparison}
                      title="[ ] vs [[ ]] Comparison"
                      highlightLines={[2, 8, 14]}
                    />
                  )}
                  
                  {activeExample === "pitfalls" && (
                    <ShellFileLoader
                      fileModule={conditionPitfalls}
                      title="Common Condition Pitfalls"
                      highlightLines={[2, 8, 14, 20]}
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
                  <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">1. Missing Spaces in [ ]</h3>
                  <p className="text-red-700 dark:text-red-400">
                    <code className="bg-red-100 dark:bg-red-800 px-1 rounded">[ "$x" = 5]</code> will fail. Must be <code className="bg-red-100 dark:bg-red-800 px-1 rounded">[ "$x" = 5 ]</code> with spaces around brackets and operators.
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">2. Using Wrong Comparison Operators</h3>
                  <p className="text-amber-700 dark:text-amber-400">
                    Using <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">=</code> for numbers or <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">-eq</code> for strings. Use <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">=</code> for strings, <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">-eq</code> for numbers.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">3. Unquoted Variables with Spaces</h3>
                  <p className="text-blue-700 dark:text-blue-400">
                    <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">[ $name = "John Doe" ]</code> fails if $name has spaces. Use <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">[ "$name" = "John Doe" ]</code>
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">4. Forgetting then and fi</h3>
                  <p className="text-purple-700 dark:text-purple-400">
                    Every <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">if</code> needs <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">then</code> and ends with <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">fi</code>. <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">elif</code> also needs <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">then</code>.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Best Practices */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.6s_both]">
              <h2 className="text-2xl font-bold mb-6 text-green-700 dark:text-green-300 flex items-center gap-3">
                <span className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">✅</span>
                Best Practices for Conditionals
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300">
                  <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">1.</span> Always Quote Variables
                  </h3>
                  <p className="text-green-700 dark:text-green-400 text-sm">
                    Use <code className="bg-green-100 dark:bg-green-800 px-1 rounded">[ "$var" = "value" ]</code> not <code className="bg-green-100 dark:bg-green-800 px-1 rounded">[ $var = "value" ]</code>
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300">
                  <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">2.</span> Use [[ ]] for Bash Scripts
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">
                    <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">[[ ]]</code> has better features and fewer surprises than <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">[ ]</code>
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-400 transition-all duration-300">
                  <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">3.</span> Check Exit Status Directly
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400 text-sm">
                    Use <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">if command; then</code> instead of <code className="bg-purple-100 dark:bg-purple-800 px-1 rounded">if [ $? -eq 0 ]; then</code>
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300">
                  <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <span className="text-xl">4.</span> Prefer Case for Multiple Values
                  </h3>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    For many string comparisons, <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">case</code> is cleaner than long <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">if-elif</code> chains.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Tip from Shyamnagar Systems</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  At Shyamnagar Systems, we use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">set -euo pipefail</code> at the start of scripts. This makes scripts exit on errors, which works well with conditionals for error handling.
                </p>
              </div>
            </section>

            {/* Teacher's Note */}
            <section className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl p-8 shadow-xl animate-[fadeInUp_0.8s_ease-out_0.7s_both] hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">Teacher's Note</h2>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="mb-4">
                      <h3 className="font-bold text-white mb-2">The Conditional Mindset</h3>
                      <p className="text-white/90 leading-relaxed">
                        Conditionals are where scripts gain <strong>intelligence</strong>. Think of them as decision points in a flowchart. The key is understanding that every condition evaluates to either true (exit status 0) or false (exit status non-zero).
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          When teaching <strong>Tuhina at Naihati College</strong>, I emphasize: "Read conditions aloud: 'If variable age is greater than or equal to 18, then...'"
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          The single most important rule: <strong>Always test your edge cases</strong>. What if the variable is empty? What if it has spaces?
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <p className="text-white/80 text-sm">
                          Remember: In shell, success is 0, failure is non-zero. This is opposite from many programming languages but consistent with Unix philosophy.
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
                <div className="p-3 bg-rose-800/30 rounded-lg border border-rose-700">
                  <h3 className="font-bold text-rose-300 mb-2 text-sm">Basic Syntax</h3>
                  <code className="text-xs text-rose-200 block bg-rose-900/50 p-2 rounded font-mono">
                    {`if condition; then\n  commands\nfi`}
                  </code>
                </div>
                
                <div className="p-3 bg-indigo-800/30 rounded-lg border border-indigo-700">
                  <h3 className="font-bold text-indigo-300 mb-2 text-sm">With else</h3>
                  <code className="text-xs text-indigo-200 block bg-indigo-900/50 p-2 rounded font-mono">
                    {`if condition; then\n  commands\nelse\n  other_commands\nfi`}
                  </code>
                </div>
                
                <div className="p-3 bg-purple-800/30 rounded-lg border border-purple-700">
                  <h3 className="font-bold text-purple-300 mb-2 text-sm">With elif</h3>
                  <code className="text-xs text-purple-200 block bg-purple-900/50 p-2 rounded font-mono">
                    {`if condition1; then\n  commands1\nelif condition2; then\n  commands2\nelse\n  default_commands\nfi`}
                  </code>
                </div>
                
                <div className="p-3 bg-emerald-800/30 rounded-lg border border-emerald-700">
                  <h3 className="font-bold text-emerald-300 mb-2 text-sm">One-liner</h3>
                  <code className="text-xs text-emerald-200 block bg-emerald-900/50 p-2 rounded font-mono">
                    {`[ -f file.txt ] && echo "Exists" || echo "Missing"`}
                  </code>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Memory Aid</h3>
                <p className="text-gray-300 text-xs">
                  <strong>if</strong> starts it<br/>
                  <strong>then</strong> does it<br/>
                  <strong>elif</strong> tries again<br/>
                  <strong>else</strong> does other<br/>
                  <strong>fi</strong> ends it
                </p>
              </div>
            </div>

            {/* Operator Reference Card */}
            <div className="bg-gradient-to-br from-indigo-800 to-purple-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.3s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">🎯</span>
                Operator Quick Guide
              </h2>
              
              <div className="space-y-3">
                <div className="p-3 bg-indigo-700/30 rounded border border-indigo-600">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-indigo-300">String equal</span>
                    <code className="text-xs text-indigo-200 bg-indigo-800 px-2 py-1 rounded">=</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-indigo-300">Numeric equal</span>
                    <code className="text-xs text-indigo-200 bg-indigo-800 px-2 py-1 rounded">-eq</code>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-700/30 rounded border border-purple-600">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-purple-300">File exists</span>
                    <code className="text-xs text-purple-200 bg-purple-800 px-2 py-1 rounded">-e</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-300">Directory</span>
                    <code className="text-xs text-purple-200 bg-purple-800 px-2 py-1 rounded">-d</code>
                  </div>
                </div>
                
                <div className="p-3 bg-rose-700/30 rounded border border-rose-600">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-rose-300">AND (bash)</span>
                    <code className="text-xs text-rose-200 bg-rose-800 px-2 py-1 rounded">&&</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-rose-300">OR (bash)</span>
                    <code className="text-xs text-rose-200 bg-rose-800 px-2 py-1 rounded">||</code>
                  </div>
                </div>
                
                <div className="p-3 bg-emerald-700/30 rounded border border-emerald-600">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-emerald-300">Empty string</span>
                    <code className="text-xs text-emerald-200 bg-emerald-800 px-2 py-1 rounded">-z</code>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-emerald-300">Non-empty</span>
                    <code className="text-xs text-emerald-200 bg-emerald-800 px-2 py-1 rounded">-n</code>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-purple-700/40 rounded-lg">
                <p className="text-purple-200 text-xs">
                  <strong>Pro Tip:</strong> In [[ ]], use <code className="bg-purple-800 px-1 rounded">==</code> for pattern matching: <code className="bg-purple-800 px-1 rounded">[[ $file == *.txt ]]</code>
                </p>
              </div>
            </div>

            {/* Mini Checklist Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-green-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.4s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform duration-300">📋</span>
                Conditional Checklist
              </h2>
              
              <div className="space-y-3">
                {[
                  "Are all variables quoted?",
                  "Correct operator for data type?",
                  "Spaces around [ ] and operators?",
                  "then and fi present?",
                  "Tested with empty values?",
                  "Tested with spaces in values?",
                  "Using [[ ]] for bash scripts?",
                  "Exit status checked properly?"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-emerald-700/30 rounded-lg border border-emerald-600 hover:border-emerald-400 transition-all duration-300 animate-[fadeIn_0.5s_ease-out]"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <input type="checkbox" className="w-4 h-4 text-emerald-400 bg-gray-800 border-gray-600 rounded" />
                    <span className="text-emerald-100 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-emerald-700/40 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-sm">Debugging Tip</h3>
                <p className="text-emerald-200 text-xs">
                  Add <code className="bg-emerald-800 px-1 rounded">set -x</code> before conditionals to see how they evaluate.
                </p>
              </div>
            </div>

            {/* Hint Section */}
            <div className="bg-gradient-to-br from-pink-800 to-rose-900 rounded-2xl p-6 shadow-xl hover:shadow-xl transition-all duration-500 animate-[fadeInUp_0.8s_ease-out_0.5s_both] group">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">💡</span>
                Think About...
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-pink-700/30 rounded-lg border border-pink-600 hover:border-pink-400 transition-all duration-300">
                  <p className="text-pink-100 text-sm italic">
                    "What's the difference between <code className="bg-pink-800/50 px-1 rounded">[ $x ]</code> and <code className="bg-pink-800/50 px-1 rounded">[ -n "$x" ]</code> when $x is empty?"
                  </p>
                </div>
                
                <div className="p-4 bg-rose-700/30 rounded-lg border border-rose-600 hover:border-rose-400 transition-all duration-300">
                  <p className="text-rose-100 text-sm italic">
                    "How would <strong>Abhronila</strong> write a script that checks if a student's score is between 60 and 100 (inclusive)?"
                  </p>
                </div>
                
                <div className="p-4 bg-fuchsia-700/30 rounded-lg border border-fuchsia-600 hover:border-fuchsia-400 transition-all duration-300">
                  <p className="text-fuchsia-100 text-sm italic">
                    "Try: <code className="bg-fuchsia-800/50 px-1 rounded">if [ ]; then echo true; else echo false; fi</code> - what happens and why?"
                  </p>
                </div>
                
                <div className="p-4 bg-red-700/30 rounded-lg border border-red-600 hover:border-red-400 transition-all duration-300">
                  <p className="text-red-100 text-sm italic">
                    "What advantage does <code className="bg-red-800/50 px-1 rounded">[[ $file == *.txt ]]</code> have over <code className="bg-red-800/50 px-1 rounded">[ "$file" = "*.txt" ]</code>?"
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
            Topic 11 of 41 • Conditional Statements
          </div>
          <a href="#next" className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 flex items-center gap-2 group">
            Next: File and Directory Tests
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

export default Topic11;