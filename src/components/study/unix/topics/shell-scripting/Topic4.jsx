import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import varExample1 from "./topic4_files/var_example1.sh?raw";
import varExample2 from "./topic4_files/var_example2.sh?raw";
import varExample3 from "./topic4_files/var_example3.sh?raw";
import varExample4 from "./topic4_files/var_example4.sh?raw";

const Topic4 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 md:p-8 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
                <div className="mb-10 animate-[fadeInUp_0.8s_ease-out_0.1s]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                Topic 4: Shell Variables
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Local, Global, and Environment Variables - Understanding variable scope in shell scripting</p>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-5 rounded-xl border border-purple-200 dark:border-purple-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Variables in shell scripting store data that can be used and manipulated throughout your scripts. Understanding the difference between local, global, and environment variables is crucial for writing robust, maintainable scripts. Variable scope determines where a variable can be accessed and modified.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Variable Scope Visualization */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.2s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Variable Scope Visualization
                        </h2>
                        
                        <div className="relative">
                            {/* SVG Visualization */}
                            <div className="mb-8">
                                <svg className="w-full h-auto" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                                        </marker>
                                        <linearGradient id="globalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                        <linearGradient id="envGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#059669" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                        <linearGradient id="localGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#60a5fa" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Parent Shell Process */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="50" width="200" height="80" rx="10" fill="url(#globalGradient)" className="transition-all duration-300 hover:stroke-purple-400 hover:stroke-2" />
                                        <text x="150" y="85" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">Parent Shell Process</text>
                                        <text x="150" y="105" textAnchor="middle" fill="#e9d5ff" className="font-sans text-xs">Global Variables Accessible</text>
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                    </g>
                                    
                                    {/* Global Variable Box */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="280" y="30" width="150" height="40" rx="6" fill="#8b5cf6" className="transition-all duration-300 hover:fill-purple-500" />
                                        <text x="355" y="55" textAnchor="middle" fill="white" className="font-sans text-sm">GLOBAL_VAR="parent"</text>
                                    </g>
                                    
                                    <path d="M250 90 L280 70" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                                    <text x="265" y="80" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Can access</text>
                                    
                                    {/* Environment Variable Box */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="280" y="80" width="150" height="40" rx="6" fill="url(#envGradient)" className="transition-all duration-300 hover:fill-emerald-500" />
                                        <text x="355" y="105" textAnchor="middle" fill="white" className="font-sans text-sm">export ENV_VAR="exported"</text>
                                        <animate attributeName="fill" values="#10b981;#34d399;#10b981" dur="3s" repeatCount="indefinite" begin="1s" />
                                    </g>
                                    
                                    <path d="M250 90 L280 100" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                                    <text x="265" y="95" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Can access</text>
                                    
                                    {/* Subshell Process */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="180" width="200" height="80" rx="10" fill="#3b82f6" className="transition-all duration-300 hover:stroke-blue-400 hover:stroke-2" />
                                        <text x="150" y="215" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">Subshell Process</text>
                                        <text x="150" y="235" textAnchor="middle" fill="#dbeafe" className="font-sans text-xs">( ) or bash -c</text>
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                    </g>
                                    
                                    <path d="M150 130 L150 180" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                                    <text x="140" y="155" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Forked</text>
                                    
                                    {/* Subshell Access Arrows */}
                                    <path d="M250 230 L280 70" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
                                    <text x="280" y="140" textAnchor="start" fill="#8b5cf6" className="font-sans text-xs">✗ Global Vars</text>
                                    
                                    <path d="M250 230 L280 100" stroke="#10b981" strokeWidth="2" />
                                    <text x="280" y="160" textAnchor="start" fill="#10b981" className="font-sans text-xs">✓ Env Vars</text>
                                    
                                    {/* Local Variable in Subshell */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="280" y="200" width="150" height="40" rx="6" fill="url(#localGradient)" className="transition-all duration-300 hover:fill-blue-500" />
                                        <text x="355" y="225" textAnchor="middle" fill="white" className="font-sans text-sm">LOCAL_VAR="subshell"</text>
                                    </g>
                                    
                                    <path d="M250 230 L280 220" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                                    <text x="265" y="225" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Can access</text>
                                    
                                    {/* Function Process */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="300" width="200" height="80" rx="10" fill="#f59e0b" className="transition-all duration-300 hover:stroke-amber-400 hover:stroke-2" />
                                        <text x="150" y="335" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">Function Call</text>
                                        <text x="150" y="355" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">my_function()</text>
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                                    </g>
                                    
                                    {/* Function Local Variable */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="280" y="320" width="150" height="40" rx="6" fill="#f59e0b" className="transition-all duration-300 hover:fill-amber-500" />
                                        <text x="355" y="345" textAnchor="middle" fill="white" className="font-sans text-sm">local FUNC_VAR="inside"</text>
                                        <animate attributeName="fill" values="#f59e0b;#fbbf24;#f59e0b" dur="3s" repeatCount="indefinite" begin="2s" />
                                    </g>
                                    
                                    <path d="M250 340 L280 340" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                                    <text x="265" y="335" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Can access</text>
                                    
                                    {/* Access Legend */}
                                    <rect x="450" y="50" width="300" height="120" rx="8" fill="#1f2937" fillOpacity="0.8" />
                                    <text x="460" y="70" fill="#10b981" className="font-sans text-sm font-bold">✓ Environment Variables</text>
                                    <text x="460" y="90" fill="#9ca3af" className="font-sans text-xs">Inherited by all child processes</text>
                                    <text x="460" y="110" fill="#8b5cf6" className="font-sans text-sm font-bold">✗ Global Variables</text>
                                    <text x="460" y="130" fill="#9ca3af" className="font-sans text-xs">Not inherited by subshells</text>
                                    <text x="460" y="150" fill="#f59e0b" className="font-sans text-sm font-bold">• Local Variables</text>
                                    <text x="460" y="170" fill="#9ca3af" className="font-sans text-xs">Only accessible in defining scope</text>
                                </svg>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700">
                                    <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Global Variables
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Accessible throughout the current shell session. Not inherited by child processes.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-700">
                                    <h3 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Environment Variables
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Exported variables inherited by all child processes. Use <code>export</code> command.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
                                    <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                        Local Variables
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Confined to functions or subshells. Use <code>local</code> keyword in functions.
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
                            Variable Types & Scope Rules
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
                                <h3 className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-3">Global Variables (Shell Variables)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Global variables are available throughout the current shell session. They are created by simple assignment but are <strong>not automatically passed to child processes</strong>.
                                    </p>
                                    
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-purple-800 dark:text-purple-300 font-semibold">Key Characteristics</p>
                                                <div className="text-purple-700 dark:text-purple-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span>Created with: <code>VAR="value"</code></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span>Accessible everywhere in current shell</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span><strong>Not</strong> available to subshells or child processes</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-purple-500">•</span>
                                                        <span>View with: <code>set</code> command (shows all variables)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={varExample1}
                                        title="Global Variable Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-green-300 dark:hover:border-green-700">
                                <h3 className="font-bold text-xl text-green-600 dark:text-green-400 mb-3">Environment Variables (Exported Variables)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Environment variables are <strong>inherited by child processes</strong>. They're created using the <code>export</code> command and are essential for configuring the execution environment.
                                    </p>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <div>
                                                <p className="text-green-800 dark:text-green-300 font-semibold">Important Environment Variables</p>
                                                <div className="text-green-700 dark:text-green-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-green-500">•</span>
                                                        <span><code>PATH</code> - Command search path</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-green-500">•</span>
                                                        <span><code>HOME</code> - User's home directory</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-green-500">•</span>
                                                        <span><code>USER</code> / <code>LOGNAME</code> - Current user</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-green-500">•</span>
                                                        <span><code>SHELL</code> - Current shell</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-green-500">•</span>
                                                        <span><code>PWD</code> - Present working directory</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={varExample2}
                                        title="Environment Variable Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                                <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-3">Local Variables (Function Scope)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Local variables are confined to functions or subshells. They prevent variable naming conflicts and are essential for writing modular, reusable functions.
                                    </p>
                                    
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <div>
                                                <p className="text-blue-800 dark:text-blue-300 font-semibold">When to Use Local Variables</p>
                                                <div className="text-blue-700 dark:text-blue-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-blue-500">•</span>
                                                        <span>Inside functions to avoid side effects</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-blue-500">•</span>
                                                        <span>Temporary calculations</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-blue-500">•</span>
                                                        <span>Loop counters in functions</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-blue-500">•</span>
                                                        <span>Function parameters</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={varExample3}
                                        title="Local Variable Examples"
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Swadeep's Configuration Script
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Swadeep from Barrackpore is writing a script to set up his development environment. He needs different variables for different projects.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">E</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Environment Variables:</strong> <code>JAVA_HOME</code>, <code>PYTHONPATH</code> - needed by child processes
                                            </p>
                                            <code className="text-xs bg-orange-100 dark:bg-orange-900 p-1 rounded block mt-1">
                                                {`export JAVA_HOME="/usr/lib/jvm/java-11"`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">G</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Global Variables:</strong> Project paths - only needed in current script
                                            </p>
                                            <code className="text-xs bg-purple-100 dark:bg-purple-900 p-1 rounded block mt-1">
                                                {`PROJECT_DIR="/home/swadeep/projects"`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">L</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Local Variables:</strong> Temporary calculations in functions
                                            </p>
                                            <code className="text-xs bg-blue-100 dark:bg-blue-900 p-1 rounded block mt-1">
                                                {`local file_count=$(ls | wc -l)`}
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
                                    Tuhina's Production Script
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Tuhina from Shyamnagar is writing a deployment script for production servers. She needs to manage different environments safely.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">!</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Problem:</strong> Global variable conflict in nested functions
                                            </p>
                                            <code className="text-xs bg-red-100 dark:bg-red-900 p-1 rounded block mt-1">
                                                {`# Both functions modify same global variable
process_files() {
    COUNT=0
    # ... modifies COUNT
}

validate_files() {
    COUNT=0  # Oops! Resets parent's COUNT
}`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">✓</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Solution:</strong> Use local variables in functions
                                            </p>
                                            <code className="text-xs bg-green-100 dark:bg-green-900 p-1 rounded block mt-1">
                                                {`process_files() {
    local count=0
    # ... safe modifications
}`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">⚠</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Important:</strong> Environment variables for configuration
                                            </p>
                                            <code className="text-xs bg-yellow-100 dark:bg-yellow-900 p-1 rounded block mt-1">
                                                {`# Set in calling script
export DEPLOY_ENV="production"
export DB_HOST="db.prod.example.com"`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <ShellFileLoader
                                fileModule={varExample4}
                                title="Complete Variable Management Script"
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
                            Common Variable Pitfalls & Debugging
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 1: Variable Not Available in Subshell</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    The most common mistake - expecting global variables to be available in child processes.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Wrong Approach</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`#!/bin/bash
CONFIG_FILE="/path/to/config"

# This won't work - subshell doesn't see CONFIG_FILE
( echo "Config: $CONFIG_FILE" )  # Empty!`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Correct Solution</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`#!/bin/bash
export CONFIG_FILE="/path/to/config"

# Now it works - exported to environment
( echo "Config: $CONFIG_FILE" )  # Shows value`}
                                        </code>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 2: Unintended Global Variable Modification</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Functions modifying global variables unintentionally, causing hard-to-find bugs.
                                </p>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-yellow-800 dark:text-yellow-300 font-semibold">Example: Counter variable conflict</p>
                                            <code className="text-yellow-700 dark:text-yellow-400 text-sm mt-1 block">
                                                {`count=0

process_items() {
    for item in "$@"; do
        count=$((count + 1))  # Modifies global count!
    done
}

# Later in script...
count=10  # Reset for different purpose
process_items a b c  # Oops! Changes count to 13`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 3: Forgetting to Export for Child Processes</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Scripts calling external commands that need configuration variables.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Broken Script</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`#!/bin/bash
DB_HOST="localhost"
DB_PORT="5432"

# Python script can't see these variables!
python3 database_script.py  # Error!`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Working Script</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`#!/bin/bash
export DB_HOST="localhost"
export DB_PORT="5432"

# Now Python can access them as os.environ
python3 database_script.py  # Success!`}
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
                            Best Practices & Professional Guidelines
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Variable Naming & Scope Rules</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use <code>UPPER_CASE</code> for environment variables</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use <code>lower_case</code> for local/global variables</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Always use <code>local</code> in functions unless you need side effects</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Debugging & Inspection Commands</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">printenv</code>
                                        <span className="text-gray-700 dark:text-gray-300">- Show all environment variables</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">set</code>
                                        <span className="text-gray-700 dark:text-gray-300">- Show all shell variables (including local)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">unset VAR</code>
                                        <span className="text-gray-700 dark:text-gray-300">- Remove a variable</span>
                                    </li>
                                </ul>
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
                            Variable Scope Checklist
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    1
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Need child access?</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Use <code>export</code> for environment vars</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    2
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Function variables</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Always use <code>local</code> keyword</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    3
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Debug first</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Check with <code>printenv</code> and <code>set</code></p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    4
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Naming convention</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">UPPER_CASE for env, lower_case for others</p>
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
                                    Why would Abhronila, working on a collaborative project in Ichapur, need to understand the difference between global and environment variables when sharing scripts with Debangshu in Naihati?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Observe carefully...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    What happens when you create a variable in a function without the <code>local</code> keyword? Try creating two functions that both modify a variable called <code>counter</code>.
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Try changing this...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Write a script that calls another script. Pass configuration using environment variables. Then try without <code>export</code>. What's the difference?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeInUp_0.8s_ease-out_0.9s]">
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl shadow-xl p-6 border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:border-purple-400 dark:hover:border-purple-600">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
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
                                
                                <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-600 p-4 rounded-r-lg mb-4">
                                    <p className="text-purple-800 dark:text-purple-300">
                                        <strong>Memory Aid:</strong> Think of variables like conversations in rooms. 
                                        <strong>Local variables</strong> are whispers in a private room - only heard inside. 
                                        <strong>Global variables</strong> are conversations in your living room - everyone in your house (shell) can hear. 
                                        <strong>Environment variables</strong> are phone calls - they travel to other houses (processes). 
                                        Remember: <code>export</code> makes the call, <code>local</code> closes the door.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Classroom Exercise</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Have students create a script with a function that uses a global variable, then modify it to use local. 
                                            Show how the global version causes side effects when the function is called multiple times.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Insight</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In production scripts, always declare configuration as environment variables at the script start. 
                                            Use <code>set -u</code> to catch undefined variables. This prevents "silent failures" when variables are missing.
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

export default Topic4;