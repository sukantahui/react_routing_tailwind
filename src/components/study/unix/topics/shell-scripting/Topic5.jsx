import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import arithmeticExample1 from "./topic5_files/arithmetic_example1.sh?raw";
import arithmeticExample2 from "./topic5_files/arithmetic_example2.sh?raw";
import arithmeticExample3 from "./topic5_files/arithmetic_example3.sh?raw";
import arithmeticExample4 from "./topic5_files/arithmetic_example4.sh?raw";

const Topic5 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 md:p-8 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
                <div className="mb-10 animate-[fadeInUp_0.8s_ease-out_0.1s]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                                Topic 5: Arithmetic Operations
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Mastering (( )), let, expr, and $(( )) for shell math calculations</p>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-yellow-200 dark:border-yellow-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-yellow-300 dark:hover:border-yellow-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Shell scripting provides multiple ways to perform arithmetic operations. Understanding the differences between <code className="text-sm bg-yellow-100 dark:bg-yellow-900 px-1 rounded">(( ))</code>, <code className="text-sm bg-yellow-100 dark:bg-yellow-900 px-1 rounded">let</code>, and <code className="text-sm bg-yellow-100 dark:bg-yellow-900 px-1 rounded">expr</code> is crucial for writing efficient and portable scripts. Each method has its own use cases and limitations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Arithmetic Methods Comparison */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.2s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-yellow-300 dark:hover:border-yellow-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Arithmetic Methods Comparison
                        </h2>
                        
                        <div className="relative">
                            {/* SVG Visualization */}
                            <div className="mb-8">
                                <svg className="w-full h-auto" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead-yellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                                        </marker>
                                        <linearGradient id="doubleParenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#d97706" />
                                            <stop offset="100%" stopColor="#f59e0b" />
                                        </linearGradient>
                                        <linearGradient id="letGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#059669" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                        <linearGradient id="exprGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                        <linearGradient id="dollarParenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#60a5fa" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Input Section */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="50" width="250" height="60" rx="10" fill="#4b5563" className="transition-all duration-300 hover:stroke-gray-400 hover:stroke-2" />
                                        <text x="175" y="85" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">Arithmetic Expression</text>
                                        <text x="175" y="105" textAnchor="middle" fill="#d1d5db" className="font-sans text-xs">a + b * c</text>
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <path d="M300 80 L350 80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    <text x="325" y="70" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Choose method</text>
                                    
                                    {/* Method Boxes */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="350" y="30" width="180" height="100" rx="10" fill="url(#doubleParenGradient)" className="transition-all duration-300 hover:fill-amber-500" />
                                        <text x="440" y="55" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">(( ))</text>
                                        <text x="440" y="75" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">Arithmetic Evaluation</text>
                                        <text x="440" y="95" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">Bash Built-in</text>
                                        <text x="440" y="115" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">No $ needed</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="350" y="150" width="180" height="100" rx="10" fill="url(#letGradient)" className="transition-all duration-300 hover:fill-emerald-500" />
                                        <text x="440" y="175" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">let</text>
                                        <text x="440" y="195" textAnchor="middle" fill="#d1fae5" className="font-sans text-xs">Variable Assignment</text>
                                        <text x="440" y="215" textAnchor="middle" fill="#d1fae5" className="font-sans text-xs">Bash Built-in</text>
                                        <text x="440" y="235" textAnchor="middle" fill="#d1fae5" className="font-sans text-xs">Space-separated</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                    </g>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="350" y="270" width="180" height="100" rx="10" fill="url(#exprGradient)" className="transition-all duration-300 hover:fill-purple-500" />
                                        <text x="440" y="295" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">expr</text>
                                        <text x="440" y="315" textAnchor="middle" fill="#ede9fe" className="font-sans text-xs">External Command</text>
                                        <text x="440" y="335" textAnchor="middle" fill="#ede9fe" className="font-sans text-xs">POSIX Compliant</text>
                                        <text x="440" y="355" textAnchor="middle" fill="#ede9fe" className="font-sans text-xs">Spaces required</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="1s" />
                                    </g>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="350" y="390" width="180" height="80" rx="10" fill="url(#dollarParenGradient)" className="transition-all duration-300 hover:fill-blue-500" />
                                        <text x="440" y="415" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">$(( ))</text>
                                        <text x="440" y="435" textAnchor="middle" fill="#dbeafe" className="font-sans text-xs">Expression Substitution</text>
                                        <text x="440" y="455" textAnchor="middle" fill="#dbeafe" className="font-sans text-xs">Returns value</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="1.5s" />
                                    </g>
                                    
                                    {/* Examples Flow */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="550" y="60" width="220" height="40" rx="6" fill="#f59e0b" className="transition-all duration-300 hover:fill-amber-500" />
                                        <text x="660" y="85" textAnchor="middle" fill="white" className="font-sans text-sm">(( result = a + b * c ))</text>
                                    </g>
                                    
                                    <path d="M530 80 L550 80" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="550" y="180" width="220" height="40" rx="6" fill="#10b981" className="transition-all duration-300 hover:fill-emerald-500" />
                                        <text x="660" y="205" textAnchor="middle" fill="white" className="font-sans text-sm">let "result = a + b * c"</text>
                                    </g>
                                    
                                    <path d="M530 200 L550 200" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="550" y="300" width="220" height="40" rx="6" fill="#8b5cf6" className="transition-all duration-300 hover:fill-purple-500" />
                                        <text x="660" y="325" textAnchor="middle" fill="white" className="font-sans text-sm">result=$(expr $a + $b \* $c)</text>
                                    </g>
                                    
                                    <path d="M530 320 L550 320" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="550" y="410" width="220" height="40" rx="6" fill="#3b82f6" className="transition-all duration-300 hover:fill-blue-500" />
                                        <text x="660" y="435" textAnchor="middle" fill="white" className="font-sans text-sm">result=$((a + b * c))</text>
                                    </g>
                                    
                                    <path d="M530 430 L550 430" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    
                                    {/* Output Section */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="790" y="220" width="120" height="60" rx="10" fill="#059669" className="transition-all duration-300 hover:fill-emerald-600" />
                                        <text x="850" y="255" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">Result</text>
                                        <text x="850" y="275" textAnchor="middle" fill="#a7f3d0" className="font-sans text-xs">42</text>
                                    </g>
                                    
                                    <path d="M770 80 L790 250" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    <path d="M770 200 L790 250" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    <path d="M770 320 L790 250" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    <path d="M770 430 L790 250" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowhead-yellow)" />
                                    
                                    {/* Legend */}
                                    <rect x="50" y="420" width="250" height="70" rx="8" fill="#1f2937" fillOpacity="0.8" />
                                    <text x="60" y="440" fill="#f59e0b" className="font-sans text-xs font-bold">(( ))</text>
                                    <text x="60" y="455" fill="#9ca3af" className="font-sans text-xs">Fastest, Bash only</text>
                                    <text x="60" y="470" fill="#10b981" className="font-sans text-xs font-bold">let</text>
                                    <text x="60" y="485" fill="#9ca3af" className="font-sans text-xs">Assignment focused</text>
                                </svg>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700">
                                    <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        (( )) Compound Command
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Bash built-in for arithmetic evaluation. Fastest method, supports C-style operations.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700">
                                    <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        let Command
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Bash built-in for variable assignment with arithmetic. Good for complex expressions.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700">
                                    <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                        </svg>
                                        expr Command
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        External POSIX command. Portable but slower. Requires spaces around operators.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
                                    <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        $(( )) Expansion
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Arithmetic expansion. Returns value, can be used in command substitution.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Explanation Section */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Arithmetic Methods Deep Dive
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-700">
                                <h3 className="font-bold text-xl text-amber-600 dark:text-amber-400 mb-3">(( )) - Arithmetic Evaluation</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        The <code className="text-sm bg-amber-100 dark:bg-amber-900 px-1 rounded">(( ))</code> construct is a <strong>bash built-in compound command</strong> that evaluates arithmetic expressions. It's the fastest method and supports C-style syntax with automatic variable dereferencing (no $ needed).
                                    </p>
                                    
                                    <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-amber-800 dark:text-amber-300 font-semibold">Key Features</p>
                                                <div className="text-amber-700 dark:text-amber-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-amber-500">•</span>
                                                        <span>No <code>$</code> needed for variables: <code>((a = b + c))</code></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-amber-500">•</span>
                                                        <span>Supports C-style operators: <code>++</code>, <code>+=</code>, <code>%=</code></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-amber-500">•</span>
                                                        <span>Returns exit code: 0 for true (non-zero), 1 for false (zero)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-amber-500">•</span>
                                                        <span>Can be used in conditionals: <code>if (( a > b ))</code></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={arithmeticExample1}
                                        title="(( )) Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700">
                                <h3 className="font-bold text-xl text-emerald-600 dark:text-emerald-400 mb-3">let - Variable Assignment</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        The <code className="text-sm bg-emerald-100 dark:bg-emerald-900 px-1 rounded">let</code> command is a <strong>bash built-in</strong> specifically designed for arithmetic variable assignment. It evaluates expressions and assigns results to variables.
                                    </p>
                                    
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 dark:border-emerald-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <div>
                                                <p className="text-emerald-800 dark:text-emerald-300 font-semibold">When to Use let</p>
                                                <div className="text-emerald-700 dark:text-emerald-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Multiple assignments in one statement</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Complex expressions with quotes</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>When you need explicit assignment</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Base conversion: <code>let "hex = 0xFF"</code></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={arithmeticExample2}
                                        title="let Command Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
                                <h3 className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-3">expr - Portable Arithmetic</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        <code className="text-sm bg-purple-100 dark:bg-purple-900 px-1 rounded">expr</code> is an <strong>external command</strong> available on all POSIX systems. It's slower (spawns new process) but portable. Requires proper spacing and escaping of operators.
                                    </p>
                                    
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <div>
                                                <p className="text-purple-800 dark:text-purple-300 font-semibold">Important Rules for expr</p>
                                                <div className="text-purple-700 dark:text-purple-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span><strong>Spaces are required</strong> around operators</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span>Special characters must be escaped: <code>\*</code>, <code>\(</code>, <code>\)</code></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span>Only integer arithmetic</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span>Use command substitution: <code>$(expr 1 + 2)</code></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={arithmeticExample3}
                                        title="expr Command Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Practical Examples & Real-World Scenarios */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.4s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Real-World Scenarios & Student Projects
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 p-5 rounded-xl border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700">
                                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Swadeep's Grade Calculator
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Swadeep from Barrackpore is creating a script to calculate student grades with different weights and rounding.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">(</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Using (( )):</strong> For fast calculations and conditions
                                            </p>
                                            <code className="text-xs bg-amber-100 dark:bg-amber-900 p-1 rounded block mt-1">
                                                {`(( final_grade = (exam * 0.6) + (assignment * 0.4) ))`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">l</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Using let:</strong> For multiple calculations in one line
                                            </p>
                                            <code className="text-xs bg-emerald-100 dark:bg-emerald-900 p-1 rounded block mt-1">
                                                {`let "total = math + science + english"`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">$</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Using $(( )):</strong> For inline calculations
                                            </p>
                                            <code className="text-xs bg-blue-100 dark:bg-blue-900 p-1 rounded block mt-1">
                                                {`average=$(( (score1 + score2 + score3) / 3 ))`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 p-5 rounded-xl border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700">
                                <h3 className="font-bold text-lg text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Tuhina's System Monitoring Script
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Tuhina from Shyamnagar is writing a system monitoring script that calculates percentages, rates, and thresholds.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">!</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Problem:</strong> Integer division gives wrong percentage
                                            </p>
                                            <code className="text-xs bg-red-100 dark:bg-red-900 p-1 rounded block mt-1">
                                                {`# Wrong: 3/5 = 0
percentage=$(( (3 / 5) * 100 ))  # Result: 0`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">✓</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Solution:</strong> Multiply before dividing
                                            </p>
                                            <code className="text-xs bg-green-100 dark:bg-green-900 p-1 rounded block mt-1">
                                                {`# Correct: 3*100/5 = 60
percentage=$(( (3 * 100) / 5 ))  # Result: 60`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">e</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Using expr:</strong> For portability in older systems
                                            </p>
                                            <code className="text-xs bg-purple-100 dark:bg-purple-900 p-1 rounded block mt-1">
                                                {`memory_used=$(expr $used \* 100 / $total)`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <ShellFileLoader
                                fileModule={arithmeticExample4}
                                title="Complete Calculator Script"
                                highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]}
                            />
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls Section */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.5s]">
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-2xl shadow-lg p-6 border border-red-200 dark:border-red-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Common Arithmetic Pitfalls
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 1: Integer Division</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Shell arithmetic only works with integers. Division truncates toward zero.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Wrong</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`# Expecting 66.67%
used=2
total=3
percent=$(( (used / total) * 100 ))  # Result: 0`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Correct</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`# Multiply before dividing
percent=$(( (used * 100) / total ))  # Result: 66

# Or use bc for floating point
percent=$(echo "scale=2; $used * 100 / $total" | bc)`}
                                        </code>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 2: Missing Spaces in expr</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    expr requires spaces around operators. Missing spaces cause syntax errors.
                                </p>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-yellow-800 dark:text-yellow-300 font-semibold">Common expr Mistakes</p>
                                            <code className="text-yellow-700 dark:text-yellow-400 text-sm mt-1 block">
                                                {`# WRONG: No spaces
expr 1+2      # Error: "1+2" not a valid expression
expr 2 * 3    # Error: * expands to files in directory

# CORRECT: Spaces and escaping
expr 1 + 2    # 3
expr 2 \* 3   # 6 (escape *)
expr \( 2 + 3 \) \* 4  # 20`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 3: Uninitialized Variables</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Using uninitialized variables in arithmetic causes errors or unexpected results.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Risky Code</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`#!/bin/bash
# Uninitialized variable
count=$((count + 1))  # Error if set -u is used
echo "Count: $count"  # Might be empty`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Safe Code</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`#!/bin/bash
set -u  # Fail on uninitialized variables

# Initialize first
count=0
count=$((count + 1))  # Safe: count is initialized
echo "Count: $count"  # Output: 1`}
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.6s]">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl shadow-lg p-6 border border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Best Practices & Performance Tips
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Method Selection Guide</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use <code>(( ))</code> for performance (bash scripts)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use <code>expr</code> for POSIX portability</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use <code>$(( ))</code> for inline value substitution</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Performance Comparison</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span>(( ))</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-500 h-2 rounded-full w-32"></div>
                                        </div>
                                        <span className="text-emerald-600 dark:text-emerald-400">Fastest</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>$(( ))</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-400 h-2 rounded-full w-28"></div>
                                        </div>
                                        <span className="text-emerald-500 dark:text-emerald-300">Fast</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>let</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-300 h-2 rounded-full w-24"></div>
                                        </div>
                                        <span className="text-emerald-400 dark:text-emerald-200">Medium</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>expr</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-200 h-2 rounded-full w-16"></div>
                                        </div>
                                        <span className="text-emerald-300 dark:text-emerald-100">Slowest</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.7s]">
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 rounded-2xl shadow-lg p-6 border border-violet-200 dark:border-violet-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Arithmetic Operations Checklist
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    1
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Choose Method</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><code>(( ))</code> for bash, <code>expr</code> for POSIX</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    2
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Integer Division</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Multiply before dividing</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    3
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Initialize Variables</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Set before arithmetic operations</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    4
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">expr Spacing</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Spaces around operators, escape *</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.8s]">
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-2xl shadow-lg p-6 border border-amber-200 dark:border-amber-800 transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Thinking Exercises
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Think about...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Why would Abhronila, working on a script that needs to run on both modern and old servers in Ichapur, choose between <code>(( ))</code> and <code>expr</code>?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Observe carefully...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    What happens when you use <code>let "x = 5 / 2"</code> vs <code>(( x = 5 / 2 ))</code> vs <code>expr 5 / 2</code>? Why are the results different?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Try changing this...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Write a script that calculates the percentage increase between two numbers. Try it with integer division first, then fix it to show decimal places.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeInUp_0.8s_ease-out_0.9s]">
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl shadow-xl p-6 border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:border-yellow-400 dark:hover:border-yellow-600">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sukanta Hui • 27 years experience</p>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        sukantahui@codernaccotax.co.in
                                    </div>
                                </div>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 rounded-r-lg mb-4">
                                    <p className="text-yellow-800 dark:text-yellow-300">
                                        <strong>Memory Aid:</strong> Think of arithmetic methods like different types of calculators. 
                                        <code>(( ))</code> is your modern scientific calculator - fast and feature-rich. 
                                        <code>let</code> is your pocket calculator - simple and straightforward. 
                                        <code>expr</code> is an abacus - ancient but works everywhere. 
                                        <code>$(( ))</code> is the calculator's display - shows you the result. 
                                        Remember: Choose your tool based on where your script needs to run.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Classroom Exercise</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Have students write the same calculation using all four methods. 
                                            Time each method with a loop of 10,000 iterations to show performance differences.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Insight</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In production scripts, use <code>(( ))</code> for performance in bash-only environments. 
                                            For floating-point calculations, pipe to <code>bc</code> or use <code>awk</code>. 
                                            Always validate numeric input before arithmetic to prevent errors.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inline Styles for Animations */}
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
                
                @media (prefers-reduced-motion: reduce) {
                    .animate-\\[fadeInUp_0\\.8s_ease-out\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.1s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.2s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.3s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.4s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.5s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.6s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.7s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.8s\\],
                    .animate-\\[fadeInUp_0\\.8s_ease-out_0\\.9s\\] {
                        animation: none;
                        opacity: 1;
                        transform: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Topic5;