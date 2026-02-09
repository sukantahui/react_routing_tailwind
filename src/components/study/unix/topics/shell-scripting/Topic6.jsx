import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import arrayExample1 from "./topic6_files/array_example1.sh?raw";
import arrayExample2 from "./topic6_files/array_example2.sh?raw";
import arrayExample3 from "./topic6_files/array_example3.sh?raw";
import arrayExample4 from "./topic6_files/array_example4.sh?raw";

const Topic6 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-4 md:p-8 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
                <div className="mb-10 animate-[fadeInUp_0.8s_ease-out_0.1s]">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                                Topic 6: Arrays in Bash
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Mastering indexed and associative arrays for data organization</p>
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-5 rounded-xl border border-indigo-200 dark:border-indigo-800/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    Arrays in Bash allow you to store multiple values in a single variable. Bash supports two types of arrays: <strong>indexed arrays</strong> (numbered indices) and <strong>associative arrays</strong> (key-value pairs). Understanding arrays is essential for handling lists of data, configuration sets, and complex data structures in shell scripts.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Array Visualization */}
                <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.2s]">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Array Types Visualization
                        </h2>
                        
                        <div className="relative">
                            {/* SVG Visualization */}
                            <div className="mb-8">
                                <svg className="w-full h-auto" viewBox="0 0 800 550" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <marker id="arrowhead-indigo" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
                                        </marker>
                                        <linearGradient id="indexedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#4f46e5" />
                                            <stop offset="100%" stopColor="#6366f1" />
                                        </linearGradient>
                                        <linearGradient id="assocGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#059669" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                        <linearGradient id="cellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#f59e0b" />
                                            <stop offset="100%" stopColor="#fbbf24" />
                                        </linearGradient>
                                    </defs>
                                    
                                    {/* Indexed Array Section */}
                                    <rect x="50" y="30" width="300" height="50" rx="8" fill="url(#indexedGradient)" />
                                    <text x="200" y="60" textAnchor="middle" fill="white" className="font-sans text-lg font-bold">Indexed Array</text>
                                    <text x="200" y="85" textAnchor="middle" fill="#c7d2fe" className="font-sans text-xs">Numbered indices starting from 0</text>
                                    
                                    {/* Indexed Array Cells */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="70" y="110" width="60" height="40" rx="6" fill="url(#cellGradient)" />
                                        <text x="100" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">0</text>
                                        <text x="100" y="155" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">"Apple"</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                                    </g>
                                    
                                    <path d="M100 150 L100 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                                    <text x="100" y="170" textAnchor="middle" fill="#f59e0b" className="font-sans text-xs">index</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="140" y="110" width="60" height="40" rx="6" fill="url(#cellGradient)" />
                                        <text x="170" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">1</text>
                                        <text x="170" y="155" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">"Banana"</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="0.3s" />
                                    </g>
                                    
                                    <path d="M170 150 L170 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                                    <text x="170" y="170" textAnchor="middle" fill="#f59e0b" className="font-sans text-xs">index</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="210" y="110" width="60" height="40" rx="6" fill="url(#cellGradient)" />
                                        <text x="240" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">2</text>
                                        <text x="240" y="155" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">"Cherry"</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="0.6s" />
                                    </g>
                                    
                                    <path d="M240 150 L240 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                                    <text x="240" y="170" textAnchor="middle" fill="#f59e0b" className="font-sans text-xs">index</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="280" y="110" width="60" height="40" rx="6" fill="#6b7280" />
                                        <text x="310" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">...</text>
                                    </g>
                                    
                                    {/* Associative Array Section */}
                                    <rect x="450" y="30" width="300" height="50" rx="8" fill="url(#assocGradient)" />
                                    <text x="600" y="60" textAnchor="middle" fill="white" className="font-sans text-lg font-bold">Associative Array</text>
                                    <text x="600" y="85" textAnchor="middle" fill="#d1fae5" className="font-sans text-xs">String keys (like dictionaries)</text>
                                    
                                    {/* Associative Array Cells */}
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="470" y="110" width="100" height="40" rx="6" fill="url(#cellGradient)" />
                                        <text x="520" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">"name"</text>
                                        <text x="520" y="155" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">"Swadeep"</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="0.9s" />
                                    </g>
                                    
                                    <path d="M520 150 L520 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                                    <text x="520" y="170" textAnchor="middle" fill="#f59e0b" className="font-sans text-xs">key</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="580" y="110" width="100" height="40" rx="6" fill="url(#cellGradient)" />
                                        <text x="630" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">"age"</text>
                                        <text x="630" y="155" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">22</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="1.2s" />
                                    </g>
                                    
                                    <path d="M630 150 L630 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                                    <text x="630" y="170" textAnchor="middle" fill="#f59e0b" className="font-sans text-xs">key</text>
                                    
                                    <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                        <rect x="690" y="110" width="100" height="40" rx="6" fill="url(#cellGradient)" />
                                        <text x="740" y="135" textAnchor="middle" fill="white" className="font-sans text-sm">"city"</text>
                                        <text x="740" y="155" textAnchor="middle" fill="#fef3c7" className="font-sans text-xs">"Barrackpore"</text>
                                        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" begin="1.5s" />
                                    </g>
                                    
                                    <path d="M740 150 L740 180" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead-indigo)" />
                                    <text x="740" y="170" textAnchor="middle" fill="#f59e0b" className="font-sans text-xs">key</text>
                                    
                                    {/* Array Operations */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="220" width="250" height="120" rx="10" fill="#1f2937" />
                                        <text x="175" y="250" textAnchor="middle" fill="#60a5fa" className="font-sans text-sm font-bold">Array Operations</text>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="70" y="270" width="80" height="30" rx="6" fill="#3b82f6" />
                                            <text x="110" y="290" textAnchor="middle" fill="white" className="font-sans text-xs">Declare</text>
                                        </g>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="160" y="270" width="80" height="30" rx="6" fill="#3b82f6" />
                                            <text x="200" y="290" textAnchor="middle" fill="white" className="font-sans text-xs">Access</text>
                                        </g>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="70" y="310" width="80" height="30" rx="6" fill="#3b82f6" />
                                            <text x="110" y="330" textAnchor="middle" fill="white" className="font-sans text-xs">Loop</text>
                                        </g>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="160" y="310" width="80" height="30" rx="6" fill="#3b82f6" />
                                            <text x="200" y="330" textAnchor="middle" fill="white" className="font-sans text-xs">Modify</text>
                                        </g>
                                    </g>
                                    
                                    {/* Code Examples */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="330" y="220" width="420" height="120" rx="10" fill="#1f2937" />
                                        <text x="540" y="250" textAnchor="middle" fill="#10b981" className="font-sans text-sm font-bold">Code Examples</text>
                                        
                                        <text x="340" y="280" textAnchor="start" fill="#60a5fa" className="font-sans text-xs font-mono">
                                            # Indexed
                                        </text>
                                        <text x="340" y="300" textAnchor="start" fill="#e5e7eb" className="font-sans text-xs font-mono">
                                            fruits=("Apple" "Banana" "Cherry")
                                        </text>
                                        
                                        <text x="340" y="330" textAnchor="start" fill="#60a5fa" className="font-sans text-xs font-mono">
                                            # Associative
                                        </text>
                                        <text x="340" y="350" textAnchor="start" fill="#e5e7eb" className="font-sans text-xs font-mono">
                                            declare -A person=([name]="Swadeep" [age]=22)
                                        </text>
                                    </g>
                                    
                                    {/* Memory Layout */}
                                    <g className="cursor-pointer hover:opacity-90 transition-opacity duration-300">
                                        <rect x="50" y="380" width="700" height="140" rx="10" fill="#111827" />
                                        <text x="400" y="410" textAnchor="middle" fill="#f59e0b" className="font-sans text-sm font-bold">Memory Representation</text>
                                        
                                        {/* Memory Blocks */}
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="80" y="440" width="60" height="30" rx="4" fill="#374151" />
                                            <text x="110" y="460" textAnchor="middle" fill="#9ca3af" className="font-sans text-xs">0x1000</text>
                                            <text x="110" y="480" textAnchor="middle" fill="#60a5fa" className="font-sans text-xs">"Apple"</text>
                                        </g>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="150" y="440" width="60" height="30" rx="4" fill="#374151" />
                                            <text x="180" y="460" textAnchor="middle" fill="#9ca3af" className="font-sans text-xs">0x1008</text>
                                            <text x="180" y="480" textAnchor="middle" fill="#60a5fa" className="font-sans text-xs">"Banana"</text>
                                        </g>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="220" y="440" width="60" height="30" rx="4" fill="#374151" />
                                            <text x="250" y="460" textAnchor="middle" fill="#9ca3af" className="font-sans text-xs">0x1010</text>
                                            <text x="250" y="480" textAnchor="middle" fill="#60a5fa" className="font-sans text-xs">"Cherry"</text>
                                        </g>
                                        
                                        <text x="300" y="460" textAnchor="start" fill="#9ca3af" className="font-sans text-xs">...</text>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="340" y="440" width="80" height="30" rx="4" fill="#374151" />
                                            <text x="380" y="460" textAnchor="middle" fill="#9ca3af" className="font-sans text-xs">Hash Table</text>
                                            <text x="380" y="480" textAnchor="middle" fill="#10b981" className="font-sans text-xs">"name"→"Swadeep"</text>
                                        </g>
                                        
                                        <g className="cursor-pointer hover:scale-105 transition-transform duration-300">
                                            <rect x="430" y="440" width="80" height="30" rx="4" fill="#374151" />
                                            <text x="470" y="460" textAnchor="middle" fill="#9ca3af" className="font-sans text-xs">Hash Table</text>
                                            <text x="470" y="480" textAnchor="middle" fill="#10b981" className="font-sans text-xs">"age"→22</text>
                                        </g>
                                        
                                        <path d="M290 455 L340 455" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" />
                                        <text x="315" y="450" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Contiguous</text>
                                        
                                        <path d="M420 455 L470 455" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" />
                                        <text x="445" y="450" textAnchor="middle" fill="#6b7280" className="font-sans text-xs">Hash-based</text>
                                    </g>
                                    
                                    {/* Legend */}
                                    <rect x="50" y="530" width="250" height="40" rx="6" fill="#1f2937" fillOpacity="0.8" />
                                    <text x="60" y="550" fill="#6366f1" className="font-sans text-xs">Indexed: Numbered, ordered</text>
                                    <text x="60" y="565" fill="#10b981" className="font-sans text-xs">Associative: Key-value, unordered</text>
                                </svg>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 transition-all duration-300 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700">
                                    <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Indexed Arrays
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Numbered indices starting from 0. Perfect for ordered lists, sequences, and when you need to preserve order.
                                    </p>
                                </div>
                                
                                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-all duration-300 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700">
                                    <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                        Associative Arrays
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        String keys (like dictionaries). Ideal for configuration data, properties, and when you need named access.
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
                            Array Types & Operations
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700">
                                <h3 className="font-bold text-xl text-indigo-600 dark:text-indigo-400 mb-3">Indexed Arrays (Numbered)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Indexed arrays use numeric indices starting from 0. They're perfect for ordered collections where position matters, like lists of files, commands in sequence, or results from command output.
                                    </p>
                                    
                                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 dark:border-indigo-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-indigo-800 dark:text-indigo-300 font-semibold">Key Characteristics</p>
                                                <div className="text-indigo-700 dark:text-indigo-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>Indices: 0, 1, 2, 3, ...</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>Elements stored in insertion order</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>Automatically created when you assign to a variable with <code>()</code></span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>Can have sparse indices (gaps)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={arrayExample1}
                                        title="Indexed Array Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700">
                                <h3 className="font-bold text-xl text-emerald-600 dark:text-emerald-400 mb-3">Associative Arrays (Key-Value)</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Associative arrays use string keys instead of numeric indices. They behave like dictionaries or hash maps in other languages. Must be explicitly declared with <code>declare -A</code>.
                                    </p>
                                    
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 dark:border-emerald-600 p-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <div>
                                                <p className="text-emerald-800 dark:text-emerald-300 font-semibold">When to Use Associative Arrays</p>
                                                <div className="text-emerald-700 dark:text-emerald-400 text-sm mt-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Configuration data with named parameters</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Counting occurrences (word frequencies)</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Lookup tables and mappings</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        <span>Properties of objects (user data, settings)</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={arrayExample2}
                                        title="Associative Array Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17]}
                                    />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-700">
                                <h3 className="font-bold text-xl text-amber-600 dark:text-amber-400 mb-3">Common Array Operations</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Both array types share common operations but with different syntax for accessing elements. Mastering these operations is key to effective array usage.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-amber-700 dark:text-amber-300 mb-2">Indexed Array Operations</h4>
                                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <code>arr=(a b c)</code> - Create
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <code>{`\${arr[0]}`}</code> - Access element
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <code>{`\${#arr[@]}`}</code> - Get length
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-amber-500">▶</span>
                                                    <code>arr+=(d e)</code> - Append
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                                            <h4 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2">Associative Array Operations</h4>
                                            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-500">▶</span>
                                                    <code>declare -A arr</code> - Create
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-500">▶</span>
                                                    <code>{`\${arr[key]}`}</code> - Access element
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-500">▶</span>
                                                    <code>{`\${!arr[@]}`}</code> - Get keys
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-emerald-500">▶</span>
                                                    <code>arr[key]=value</code> - Set value
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <ShellFileLoader
                                        fileModule={arrayExample3}
                                        title="Array Operations Examples"
                                        highlightLines={[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                    Swadeep's Student Management System
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Swadeep from Barrackpore is building a script to manage student records for his college project. He needs to handle multiple students with different attributes.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">I</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Indexed Array:</strong> List of student names in roll number order
                                            </p>
                                            <code className="text-xs bg-indigo-100 dark:bg-indigo-900 p-1 rounded block mt-1">
                                                {`students=("Swadeep" "Tuhina" "Abhronila" "Debangshu")`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">A</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Associative Array:</strong> Student details with named fields
                                            </p>
                                            <code className="text-xs bg-emerald-100 dark:bg-emerald-900 p-1 rounded block mt-1">
                                                {`declare -A swadeep=([name]="Swadeep" [age]=22 [city]="Barrackpore")`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">2D</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Array of Arrays:</strong> Multiple students with same structure
                                            </p>
                                            <code className="text-xs bg-blue-100 dark:bg-blue-900 p-1 rounded block mt-1">
                                                {`# Using indexed array of associative arrays`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 p-5 rounded-xl border border-cyan-200 dark:border-cyan-800 transition-all duration-300 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700">
                                <h3 className="font-bold text-lg text-cyan-700 dark:text-cyan-400 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Tuhina's Server Monitoring Dashboard
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Tuhina from Shyamnagar is creating a monitoring script that collects and displays statistics from multiple servers.
                                </p>
                                
                                <div className="space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">!</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Problem:</strong> Hardcoded server names in multiple places
                                            </p>
                                            <code className="text-xs bg-red-100 dark:bg-red-900 p-1 rounded block mt-1">
                                                {`# Hard to maintain
                                                    check_server1() { ... }
                                                    check_server2() { ... }
                                                    check_server3() { ... }`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">✓</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Solution:</strong> Array-based server configuration
                                            </p>
                                            <code className="text-xs bg-green-100 dark:bg-green-900 p-1 rounded block mt-1">
                                                {`servers=("web1" "web2" "db1" "cache1")
                                                for server in "\${servers[@]}"; do
                                                    check_server "$server"
                                                done`}
                                            </code>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mt-0.5">K</div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Associative Array:</strong> Server configuration with keys
                                            </p>
                                            <code className="text-xs bg-purple-100 dark:bg-purple-900 p-1 rounded block mt-1">
                                                {`declare -A server_config=([web1]="192.168.1.10" [web2]="192.168.1.11")`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <ShellFileLoader
                                fileModule={arrayExample4}
                                title="Complete Array Management System"
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
                            Common Array Pitfalls & Solutions
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 1: Forgetting declare -A for Associative Arrays</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Associative arrays MUST be declared with <code>declare -A</code>. Without it, bash treats them as indexed arrays.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Wrong</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`#!/bin/bash
# Missing declare -A
person["name"]="Swadeep"
person["age"]=22

echo \${person["name"]}  # Might work but unpredictable
echo \${person["age"]}   # Could be wrong!`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Correct</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`#!/bin/bash
# Proper declaration
declare -A person
person["name"]="Swadeep"
person["age"]=22

echo \${person["name"]}  # Correct: Swadeep
echo \${person["age"]}   # Correct: 22`}
                                        </code>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 2: Array Index Starting at 1 (Not 0)</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Bash arrays start at index 0, but many beginners assume they start at 1, leading to off-by-one errors.
                                </p>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-yellow-800 dark:text-yellow-300 font-semibold">Common Mistake</p>
                                            <code className="text-yellow-700 dark:text-yellow-400 text-sm mt-1 block">
                                                {`fruits=("Apple" "Banana" "Cherry")

# WRONG: Trying to get "Apple" with index 1
echo "First fruit: \${fruits[1]}"  # Output: Banana (not Apple!)

# CORRECT: Index 0 for first element
echo "First fruit: \${fruits[0]}"  # Output: Apple`}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-red-600 dark:text-red-400 mb-3">Pitfall 3: Quoting Array Elements Incorrectly</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Forgetting to quote array expansions can cause word splitting and globbing issues, especially with filenames or strings with spaces.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Dangerous</h4>
                                        <code className="text-red-700 dark:text-red-400 text-sm block">
                                            {`files=("my document.txt" "another file.pdf")

                                            # WRONG: No quotes - word splitting occurs
                                            for file in \${files[@]}; do
                                                echo "Processing: $file"
                                            done
                                            # Would try to process 4 files: my, document.txt, another, file.pdf`}
                                        </code>
                                    </div>
                                    
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Safe</h4>
                                        <code className="text-green-700 dark:text-green-400 text-sm block">
                                            {`files=("my document.txt" "another file.pdf")

                                                # CORRECT: Always quote array expansions
                                                for file in "\${files[@]}"; do
                                                    echo "Processing: $file"
                                                done
                                                # Correctly processes 2 files with spaces`}
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
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Array Usage Guidelines</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Always use <code>{`"\${array[@]}`}"</code> for iteration</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use indexed arrays for ordered lists</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">Use associative arrays for key-value data</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md">
                                <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-3">Performance Considerations</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span>Indexed Array Access</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-500 h-2 rounded-full w-32"></div>
                                        </div>
                                        <span className="text-emerald-600 dark:text-emerald-400">Fast</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Associative Array Access</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-400 h-2 rounded-full w-24"></div>
                                        </div>
                                        <span className="text-emerald-500 dark:text-emerald-300">Medium</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Large Array Iteration</span>
                                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div className="bg-emerald-300 h-2 rounded-full w-20"></div>
                                        </div>
                                        <span className="text-emerald-400 dark:text-emerald-200">Slow</span>
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        Tip: For large datasets, consider external tools like awk or jq
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
                            Array Essentials Checklist
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    1
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">declare -A</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Always use for associative arrays</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    2
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Index 0</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Arrays start at 0, not 1</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    3
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Quote Expansions</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1"><code>{`"\${array[@]}"`}</code> always</p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-violet-300 dark:hover:border-violet-700">
                                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mb-3">
                                    4
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Choose Right Type</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Indexed for order, associative for keys</p>
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
                                    Why would Abhronila, managing a library database in Ichapur, choose associative arrays over indexed arrays for storing book information?
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Observe carefully...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    What happens when you create an associative array without <code>declare -A</code> and then try to access elements by string keys? Try it with different bash versions.
                                </p>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-sm">
                                <p className="text-amber-700 dark:text-amber-400 font-semibold mb-2">Try changing this...</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Create a script that reads a CSV file into arrays. First use indexed arrays, then refactor to use associative arrays. Which is easier to maintain?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeInUp_0.8s_ease-out_0.9s]">
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800 dark:to-gray-800 rounded-2xl shadow-xl p-6 border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-600">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
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
                                
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 dark:border-indigo-600 p-4 rounded-r-lg mb-4">
                                    <p className="text-indigo-800 dark:text-indigo-300">
                                        <strong>Memory Aid:</strong> Think of arrays like different types of storage. 
                                        <strong>Indexed arrays</strong> are like numbered lockers - you remember which locker (0, 1, 2) has your stuff. 
                                        <strong>Associative arrays</strong> are like labeled drawers - you look for "socks" or "shirts" not drawer numbers. 
                                        Remember: <code>declare -A</code> is your label maker for associative arrays. Without it, bash thinks you're still using lockers!
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Classroom Exercise</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Have students create both array types for the same data (student records). 
                                            Compare accessing elements by index vs by key. Show how associative arrays make code more readable.
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Insight</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            In production scripts, use arrays to avoid temporary files. 
                                            Process command output directly into arrays instead of writing to disk. 
                                            For configuration, associative arrays are much cleaner than multiple separate variables.
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

export default Topic6;