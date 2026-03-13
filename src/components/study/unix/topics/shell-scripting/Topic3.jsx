import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import pathExample1 from "./topic3_files/path_example1.sh?raw";
import pathExample2 from "./topic3_files/path_example2.sh?raw";
import pathExample3 from "./topic3_files/path_example3.sh?raw";
import pathExample4 from "./topic3_files/path_example4.sh?raw";

const Topic3 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 md:p-8 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
                <div className="mb-10 animate-[fadeInUp_0.8s_ease-out_0.1s]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                                Topic 3: Understanding PATH
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">How shell locates and executes commands, scripts, and programs</p>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl border border-green-200 dark:border-green-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-green-300 dark:hover:border-green-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    The <code className="text-sm bg-green-100 dark:bg-green-900 px-1 rounded">PATH</code> environment variable is the shell's directory search path. When you type a command, the shell searches through these directories in order to find and execute it. Understanding PATH is crucial for script execution, program installation, and system administration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive PATH Visualization */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.2s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            PATH Search Process Visualization
                        </h2>
                        
                        <div className="relative">
                            {/* SVG Visualization of PATH Search */}
                            <div className="mb-8">
                                <svg className="w-full h-auto" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                                        </marker>
                                        <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                                        </marker>
                                        <linearGradient id="terminalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#059669" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                        <linearGradient id="foundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#34d399" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* User Types Command */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="50" width="180" height="60" rx="8" fill="url(#terminalGradient)" className="transition-all duration-300 hover:stroke-green-400 hover:stroke-2" />
                                        <text x="140" y="85" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">User types: ls</text>
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <path d="M230 80 L280 80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                                    <text x="255" y="70" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Shell receives</text>
                                    
                                    {/* Shell Decision Box */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="280" y="50" width="200" height="60" rx="8" fill="#f59e0b" className="transition-all duration-300 hover:fill-amber-500" />
                                        <text x="380" y="85" textAnchor="middle" fill="white" className="font-sans text-sm">Shell checks: Builtin or PATH?</text>
                                        <animate attributeName="fill" values="#f59e0b;#fbbf24;#f59e0b" dur="3s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <path d="M480 80 L530 80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                                    <text x="505" y="70" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Not builtin</text>
                                    
                                    {/* PATH Variable Display */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="530" y="30" width="220" height="80" rx="8" fill="#3b82f6" className="transition-all duration-300 hover:fill-blue-500" />
                                        <text x="640" y="45" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">PATH Variable</text>
                                        <text x="640" y="65" textAnchor="middle" fill="#dbeafe" className="font-sans text-xs">/usr/local/bin:/usr/bin:/bin</text>
                                        <text x="640" y="85" textAnchor="middle" fill="#dbeafe" className="font-sans text-xs">:/usr/local/sbin:/usr/sbin:/sbin</text>
                                        <animate attributeName="fill" values="#3b82f6;#60a5fa;#3b82f6" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                    </g>
                                    
                                    {/* Search Process - Left Column */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="100" y="150" width="160" height="40" rx="6" fill="#6b7280" className="transition-all duration-300 hover:fill-gray-500" />
                                        <text x="180" y="175" textAnchor="middle" fill="white" className="font-sans text-xs">Check /usr/local/bin</text>
                                        <animate attributeName="fill" values="#6b7280;#9ca3af;#6b7280" dur="2s" repeatCount="indefinite" begin="1s" />
                                    </g>
                                    
                                    <path d="M180 190 L180 220" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead-red)" />
                                    <text x="180" y="210" textAnchor="middle" fill="#ef4444" className="font-sans text-xs">Not found</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="100" y="240" width="160" height="40" rx="6" fill="#6b7280" className="transition-all duration-300 hover:fill-gray-500" />
                                        <text x="180" y="265" textAnchor="middle" fill="white" className="font-sans text-xs">Check /usr/bin</text>
                                        <animate attributeName="fill" values="#6b7280;#9ca3af;#6b7280" dur="2s" repeatCount="indefinite" begin="2s" />
                                    </g>
                                    
                                    <path d="M180 280 L180 310" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead-red)" />
                                    <text x="180" y="300" textAnchor="middle" fill="#ef4444" className="font-sans text-xs">Not found</text>
                                    
                                    {/* Search Process - Right Column */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="500" y="150" width="160" height="40" rx="6" fill="#6b7280" className="transition-all duration-300 hover:fill-gray-500" />
                                        <text x="580" y="175" textAnchor="middle" fill="white" className="font-sans text-xs">Check /bin</text>
                                        <animate attributeName="fill" values="#6b7280;#9ca3af;#6b7280" dur="2s" repeatCount="indefinite" begin="3s" />
                                    </g>
                                    
                                    <path d="M580 190 L580 220" stroke="#9ca3af" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                                    <text x="580" y="210" textAnchor="middle" fill="#10b981" className="font-sans text-xs">Found!</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="500" y="240" width="160" height="40" rx="6" fill="url(#foundGradient)" className="transition-all duration-300 hover:fill-emerald-500" />
                                        <text x="580" y="265" textAnchor="middle" fill="white" className="font-sans text-xs font-bold">/bin/ls</text>
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="4s" />
                                    </g>
                                    
                                    <path d="M580 280 L580 340" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead-green)" />
                                    <text x="580" y="320" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Execute</text>
                                    
                                    {/* Result */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="480" y="360" width="200" height="60" rx="8" fill="#059669" className="transition-all duration-300 hover:fill-emerald-600" />
                                        <text x="580" y="395" textAnchor="middle" fill="white" className="font-sans text-sm font-bold">Command executed!</text>
                                    </g>
                                    
                                    {/* Legend */}
                                    <rect x="50" y="400" width="300" height="40" rx="6" fill="#1f2937" fillOpacity="0.8" />
                                    <text x="60" y="420" fill="#60a5fa" className="font-sans text-xs">PATH Order: Leftmost directories checked first</text>
                                    <text x="60" y="435" fill="#10b981" className="font-sans text-xs">Search stops at first match</text>
                                </svg>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
                                    <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        PATH Basics
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        A colon-separated list of directories. Shell searches these in order when you type a command.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-lg hover:border-green-300 dark:hover:border-green-700">
                                    <h3 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Search Order
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Leftmost directory first, rightmost last. First match wins - stops searching.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 transition-all duration-300 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700">
                                    <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        Built-in Commands
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Shell builtins (cd, echo) don't use PATH. External commands (ls, grep) do.
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
                            PATH Components & Mechanics
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                                <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-3">What is PATH Exactly?</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">PATH</code> is an environment variable containing a list of directory paths separated by colons (:). When you execute a command without specifying its full path, the shell searches these directories in order until it finds an executable file with that name.
                                    </p>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-green-800 dark:text-green-300 font-semibold">Typical PATH Structure</p>
                                                <code className="text-green-700 dark:text-green-400 text-sm mt-1 block">
                                                    {`/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin:/home/user/bin`}
                                                </code>
                                                <p className="text-green-700 dark:text-green-400 text-sm mt-2">
                                                    • <strong>/usr/local/bin</strong>: Locally installed software<br/>
                                                    • <strong>/usr/bin</strong>: System-wide user commands<br/>
                                                    • <strong>/bin</strong>: Essential system binaries<br/>
                                                    • <strong>/home/user/bin</strong>: User's personal scripts
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={pathExample1}
                                        title="Viewing and Modifying PATH"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-green-300 dark:hover:border-green-700">
                                <h3 className="font-bold text-xl text-green-600 dark:text-green-400 mb-3">How Shell Locates Commands</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        When you type <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 rounded">ls</code>, the shell follows a specific lookup order. Understanding this flow helps debug "command not found" errors.
                                    </p>
                                    
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <div>
                                                <p className="text-blue-800 dark:text-blue-300 font-semibold">Command Lookup Order</p>
                                                <div className="text-blue-700 dark:text-blue-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs">1</div>
                                                        <span>Check shell builtins (cd, echo, type)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs">2</div>
                                                        <span>Check shell functions</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs">3</div>
                                                        <span>Search directories in PATH (left to right)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs">4</div>
                                                        <span>If not found: "command not found" error</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={pathExample2}
                                        title="Command Location Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
                                <h3 className="font-bold text-xl text-purple-600 dark:text-purple-400 mb-3">Script Execution Methods</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Different ways to execute shell scripts, each with different PATH considerations and execution contexts.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-2">Methods with PATH</h4>
                                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-purple-500">▶</span>
                                                    <span><code>script.sh</code> - Searches PATH</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-purple-500">▶</span>
                                                    <span><code>./script.sh</code> - Current directory</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-purple-500">▶</span>
                                                    <span><code>bash script.sh</code> - Explicit interpreter</span>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">Methods without PATH</h4>
                                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <span><code>source script.sh</code> - Runs in current shell</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <span><code>. script.sh</code> - Same as source</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <span>Absolute path always works</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={pathExample3}
                                        title="Different Execution Methods"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13]}
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
                            Real-World Scenarios & Student Examples
                        </h2>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 p-5 rounded-xl border border-orange-200 dark:border-orange-800 transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700">
                                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Swadeep's Python Development Issue
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Swadeep from Barrackpore installed Python but can't run <code>python3</code> in his terminal. His script shows "command not found".
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">1</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Problem:</strong> Python installed to <code>/usr/local/python3.9/bin</code>
                                            </p>
                                            <code className="text-xs bg-orange-100 dark:bg-orange-900 p-1 rounded block mt-1">
                                                {`which python3  # Returns nothing`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Diagnosis:</strong> Check PATH doesn't include Python directory
                                            </p>
                                            <code className="text-xs bg-orange-100 dark:bg-orange-900 p-1 rounded block mt-1">
                                                {`echo $PATH | grep python  # No output`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">3</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Solution:</strong> Add to PATH in ~/.bashrc
                                            </p>
                                            <code className="text-xs bg-green-100 dark:bg-green-900 p-1 rounded block mt-1">
                                                {`export PATH="/usr/local/python3.9/bin:$PATH"`}
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
                                    Tuhina's Security Audit
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Tuhina from Shyamnagar needs to audit system security. She finds a user added "." (current directory) to PATH.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">!</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Security Risk:</strong> <code>PATH=.:$PATH</code>
                                            </p>
                                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                                Malicious scripts in any directory could be executed accidentally
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">2</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Attack Scenario:</strong> User downloads a file called "ls"
                                            </p>
                                            <code className="text-xs bg-yellow-100 dark:bg-yellow-900 p-1 rounded block mt-1">
                                                {`# In download directory: ./ls (malicious) runs instead of /bin/ls`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">✓</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Best Practice:</strong> Never include "." in PATH
                                            </p>
                                            <code className="text-xs bg-green-100 dark:bg-green-900 p-1 rounded block mt-1">
                                                {`# Use ./script.sh or full paths instead`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <ShellFileLoader
                                fileModule={pathExample4}
                                title="Creating and Installing Scripts"
                                highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
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
                            Common PATH Problems & Solutions
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Problem 1: Command Not Found</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    The most common PATH issue - the shell can't find your command or script.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Symptoms</h4>
                                        <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                                            <li>• <code>bash: myapp: command not found</code></li>
                                            <li>• <code>bash: ./script.sh: No such file or directory</code></li>
                                            <li>• Command works with full path but not by name</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Solutions</h4>
                                        <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                                            <li>• Check PATH: <code>echo $PATH</code></li>
                                            <li>• Check file exists: <code>ls -la /path/to/command</code></li>
                                            <li>• Check executable bit: <code>chmod +x script.sh</code></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Problem 2: Wrong Version Executed</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    PATH order causes an unexpected version of a command to run.
                                </p>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-yellow-800 dark:text-yellow-300 font-semibold">Example: Python version conflict</p>
                                            <code className="text-yellow-700 dark:text-yellow-400 text-sm mt-1 block">
                                                {`$ which python3
/usr/local/bin/python3  # Python 3.9

$ python3 --version
Python 3.6.9  # But running gives old version!

# Why? PATH has /usr/bin before /usr/local/bin`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Problem 3: PATH Overwritten</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Scripts or profiles overwrite PATH instead of appending to it.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Wrong</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`# In .bashrc - DESTROYS existing PATH!
export PATH="/my/new/path"

# Results: ls, cp, mv all stop working!`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Correct</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`# Append to PATH
export PATH="$PATH:/my/new/path"

# Prepend to PATH (higher priority)
export PATH="/my/new/path:$PATH"`}
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
                            Best Practices & Professional Workflow
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">PATH Management Strategy</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use <code>$HOME/bin</code> for personal scripts</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Never include "." (current directory) in PATH</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">System paths (/bin, /usr/bin) should come before custom paths</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Debugging Commands</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">which command</code>
                                        <span className="text-gray-700 dark:text-gray-300">- Shows which executable will run</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">type command</code>
                                        <span className="text-gray-700 dark:text-gray-300">- Shows if builtin, alias, or external</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">command -v command</code>
                                        <span className="text-gray-700 dark:text-gray-300">- Portable version of which</span>
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
                            PATH Essentials Checklist
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    1
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Check PATH</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Always use <code>echo $PATH</code> first</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    2
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Append, Don't Replace</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><code>PATH="$PATH:/new"</code> not <code>PATH="/new"</code></p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    3
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">No Dot in PATH</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Never include "." for security</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    4
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Use which/type</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Debug with <code>which command</code></p>
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
                                    Why would Abhronila, working on a project in Ichapur, need to understand PATH when collaborating with Debangshu in Naihati?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Observe carefully...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    What happens when you have two different versions of Python in <code>/usr/local/bin</code> and <code>/usr/bin</code>? Which one runs when you type <code>python3</code>?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Try changing this...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Create a simple script called <code>hello</code> in your home directory. Try to run it from different locations. What do you need to do to run it from anywhere?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeInUp_0.8s_ease-out_0.9s]">
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl shadow-xl p-6 border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-600">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
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
                                
                                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4 rounded-r-lg mb-4">
                                    <p className="text-green-800 dark:text-green-300">
                                        <strong>Critical Insight:</strong> Think of PATH as your shell's "phone directory." When you call a friend (command), 
                                        the shell looks through this directory in order. If your friend is listed in multiple places, 
                                        the first listing wins. This is why understanding PATH order is crucial for managing software versions 
                                        and avoiding conflicts.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Classroom Exercise</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Have students create a script, make it executable, and try different execution methods. 
                                            Then have them add their script directory to PATH and observe the difference.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Tip</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In production environments, always use absolute paths in scripts and cron jobs. 
                                            Never rely on PATH being set correctly. Use <code>/usr/bin/python3</code> not just <code>python3</code>.
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

export default Topic3;