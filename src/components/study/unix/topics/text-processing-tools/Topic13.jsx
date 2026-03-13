import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import sumExampleSh from "./topic13_files/sum_example.sh?raw";
import averageExampleSh from "./topic13_files/average_example.sh?raw";
import minMaxExampleSh from "./topic13_files/min_max_example.sh?raw";
import comprehensiveAggregationSh from "./topic13_files/comprehensive_aggregation.sh?raw";
import studentAggregationSh from "./topic13_files/student_aggregation.sh?raw";

const Topic13 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                Topic 13: Aggregations Using awk
                            </h1>
                            <p className="text-gray-400 mt-2">Sum, Average, Min, Max - Data Analysis Made Simple</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-emerald-300 mb-2">Core Concept</h3>
                            <p className="text-sm">Aggregating data across records using awk variables</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-cyan-300 mb-2">Key Operations</h3>
                            <p className="text-sm">SUM, AVG, MIN, MAX, COUNT with real-time calculation</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-green-300 mb-2">Applications</h3>
                            <p className="text-sm">Reports, Statistics, Data Analysis, Log Processing</p>
                        </div>
                    </div>
                </div>
            </header>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
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
                @keyframes staggerItem {
                    0% { opacity: 0; transform: translateX(-10px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulseGlow {
                    0%, 100% { box-shadow: 0 0 5px currentColor; }
                    50% { box-shadow: 0 0 20px currentColor; }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-emerald-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Conceptual Foundation
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            Aggregation in awk involves <span className="text-emerald-300">accumulating values</span> across multiple 
                            records to produce summary statistics. Unlike simple calculations that work on individual 
                            rows, aggregations require <span className="text-cyan-300">state maintenance</span> between records using 
                            variables in <code className="bg-gray-900 px-2 py-1 rounded">BEGIN</code>, main processing, and 
                            <code className="bg-gray-900 px-2 py-1 rounded">END</code> blocks.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-emerald-500">
                            <h3 className="font-bold text-cyan-300 mb-3">Why Aggregations Matter in Real World</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {icon: "💰", title: "Financial Reports", desc: "Total sales, average revenue per customer"},
                                    {icon: "📊", title: "Academic Analysis", desc: "Class average, highest score, pass percentage"},
                                    {icon: "🖥️", title: "System Monitoring", desc: "Average CPU usage, max memory consumption"},
                                    {icon: "📈", title: "Business Intelligence", desc: "Monthly growth, year-over-year comparisons"}
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/80 transition-colors duration-300"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-bold text-emerald-300">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Aggregation Variables Visualization */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-cyan-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Aggregation Variables Flow
                    </h2>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-8">
                            <svg width="700" height="300" className="hover:scale-[1.02] transition-transform duration-500">
                                <defs>
                                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                                        <stop offset="50%" style={{stopColor: '#06b6d4', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                                    </linearGradient>
                                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
                                    </marker>
                                </defs>
                                
                                {/* BEGIN Block */}
                                <rect x="50" y="100" width="120" height="80" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2"
                                    className="hover:animate-[pulseGlow_2s_ease-in-out_infinite] hover:stroke-emerald-400 transition-all duration-300">
                                    <title>BEGIN Block - Initialize aggregation variables</title>
                                    <animate attributeName="stroke-width" values="2;3;2" dur="3s" repeatCount="indefinite" />
                                </rect>
                                <text x="110" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="14" fontWeight="bold">BEGIN</text>
                                <text x="110" y="155" textAnchor="middle" fill="#d1fae5" fontSize="12">sum=0; count=0</text>
                                <text x="110" y="170" textAnchor="middle" fill="#d1fae5" fontSize="12">min=9999; max=0</text>
                                
                                {/* Processing Arrow */}
                                <path d="M180,140 L230,140 L230,40 L320,40" fill="none" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" 
                                    strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
                                </path>
                                <text x="250" y="35" textAnchor="middle" fill="#67e8f9" fontSize="11">Record Processing</text>
                                
                                {/* Main Processing Loop */}
                                <rect x="320" y="20" width="150" height="60" rx="8" fill="#155e75" stroke="#06b6d4" strokeWidth="2"
                                    className="hover:animate-[pulseGlow_2s_ease-in-out_infinite] hover:stroke-cyan-400 transition-all duration-300">
                                    <title>Main Processing - Update aggregations per record</title>
                                    <animate attributeName="stroke-width" values="2;3;2" dur="3s" repeatCount="indefinite" begin="1s" />
                                </rect>
                                <text x="395" y="40" textAnchor="middle" fill="#a5f3fc" fontSize="14" fontWeight="bold">For Each Record</text>
                                <text x="395" y="55" textAnchor="middle" fill="#cffafe" fontSize="11">sum += $3; count++</text>
                                
                                {/* Variable Updates */}
                                <g transform="translate(320, 90)">
                                    <rect x="0" y="0" width="150" height="160" rx="8" fill="#1e3a8a" stroke="#4f46e5" strokeWidth="2" 
                                        className="hover:stroke-blue-500 transition-colors duration-300" />
                                    <text x="75" y="20" textAnchor="middle" fill="#818cf8" fontSize="14" fontWeight="bold">Variable States</text>
                                    
                                    {/* Variable animations */}
                                    <g className="hover:scale-105 transition-transform duration-300">
                                        <rect x="20" y="40" width="110" height="30" rx="6" fill="#312e81">
                                            <animate attributeName="fill" values="#312e81;#3730a3;#312e81" dur="2s" repeatCount="indefinite" />
                                        </rect>
                                        <text x="75" y="60" textAnchor="middle" fill="#c7d2fe" fontSize="12">sum: 0 → 100 → 250</text>
                                    </g>
                                    
                                    <g className="hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.5s'}}>
                                        <rect x="20" y="80" width="110" height="30" rx="6" fill="#312e81">
                                            <animate attributeName="fill" values="#312e81;#3730a3;#312e81" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                        </rect>
                                        <text x="75" y="100" textAnchor="middle" fill="#c7d2fe" fontSize="12">count: 0 → 1 → 5</text>
                                    </g>
                                    
                                    <g className="hover:scale-105 transition-transform duration-300" style={{animationDelay: '1s'}}>
                                        <rect x="20" y="120" width="110" height="30" rx="6" fill="#312e81">
                                            <animate attributeName="fill" values="#312e81;#3730a3;#312e81" dur="2s" repeatCount="indefinite" begin="1s" />
                                        </rect>
                                        <text x="75" y="140" textAnchor="middle" fill="#c7d2fe" fontSize="12">avg: sum/count</text>
                                    </g>
                                </g>
                                
                                {/* END Block Arrow */}
                                <path d="M470,140 L520,140 L520,100 L580,100" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead)" 
                                    strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" begin="1s" />
                                </path>
                                
                                {/* END Block */}
                                <rect x="580" y="60" width="120" height="80" rx="10" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2"
                                    className="hover:animate-[pulseGlow_2s_ease-in-out_infinite] hover:stroke-purple-400 transition-all duration-300">
                                    <title>END Block - Calculate and display final results</title>
                                    <animate attributeName="stroke-width" values="2;3;2" dur="3s" repeatCount="indefinite" begin="2s" />
                                </rect>
                                <text x="640" y="90" textAnchor="middle" fill="#e9d5ff" fontSize="14" fontWeight="bold">END</text>
                                <text x="640" y="115" textAnchor="middle" fill="#f3e8ff" fontSize="12">avg = sum/count</text>
                                <text x="640" y="130" textAnchor="middle" fill="#f3e8ff" fontSize="12">print sum, avg</text>
                            </svg>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            <div className="p-4 bg-emerald-900/20 rounded-lg border border-emerald-700/50">
                                <h4 className="font-bold text-emerald-300 mb-2">Initialization</h4>
                                <p className="text-sm">Variables start in BEGIN block (sum=0, count=0)</p>
                            </div>
                            <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-700/50">
                                <h4 className="font-bold text-cyan-300 mb-2">Accumulation</h4>
                                <p className="text-sm">Each record updates variables (sum += value)</p>
                            </div>
                            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-700/50">
                                <h4 className="font-bold text-purple-300 mb-2">Finalization</h4>
                                <p className="text-sm">END block calculates results (avg = sum/count)</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Basic Aggregations */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.2s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-green-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Basic Aggregation Operations
                    </h2>
                    
                    <div className="space-y-8">
                        {/* SUM Example */}
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-emerald-300">SUM Operation</h3>
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm font-semibold">
                                    Running Total
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Swadeep</strong> from Naihati needs to calculate total sales for his store. 
                                SUM aggregation helps track cumulative totals:
                            </p>
                            <ShellFileLoader
                                fileModule={sumExampleSh}
                                title="Summing Sales Data"
                                highlightLines={[5, 6, 8]}
                            />
                        </div>
                        
                        {/* AVERAGE Example */}
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-cyan-300">AVERAGE Operation</h3>
                                <span className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm font-semibold">
                                    Mean Calculation
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Abhronila</strong>, the class representative at Barrackpore school, needs to 
                                calculate average marks for the class:
                            </p>
                            <ShellFileLoader
                                fileModule={averageExampleSh}
                                title="Calculating Class Average"
                                highlightLines={[5, 6, 8, 9]}
                            />
                        </div>
                    </div>
                </section>

                {/* MIN/MAX Operations */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.3s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 9l-7 7-7-7" />
                        </svg>
                        Finding Extremes: MIN & MAX
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-yellow-300">MIN (Minimum Value)</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg mb-4">
                                <h4 className="font-bold text-green-300 mb-2">Initialization Strategy:</h4>
                                <p className="text-sm mb-3">Initialize min with a very large number so first comparison works</p>
                                <code className="text-xs block bg-gray-800 p-2 rounded">
                                    min = 999999  # Or use min = $1 for first record
                                </code>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-4 text-red-300">MAX (Maximum Value)</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-red-300 mb-2">Initialization Strategy:</h4>
                                <p className="text-sm mb-3">Initialize max with 0 or a very small number</p>
                                <code className="text-xs block bg-gray-800 p-2 rounded">
                                    max = 0  # Works for positive numbers
                                </code>
                            </div>
                        </div>
                        
                        <div>
                            <ShellFileLoader
                                fileModule={minMaxExampleSh}
                                title="Finding Min/Max in Temperature Data"
                                highlightLines={[5, 6, 7, 8, 12, 13]}
                            />
                            <div className="mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-700/50">
                                <h4 className="font-bold text-blue-300 mb-2">Real-World Scenario:</h4>
                                <p className="text-sm">
                                    <strong>Debangshu</strong> at Ichapur weather station uses this to find daily 
                                    temperature extremes from hourly readings.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comprehensive Example */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.4s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-purple-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Comprehensive Aggregation Example
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 text-emerald-300">Complete Student Analysis</h3>
                            <p className="mb-4">
                                <strong>Tuhina</strong>, a teacher in Shyamnagar, needs a complete analysis of her 
                                class performance including all statistics:
                            </p>
                            <ShellFileLoader
                                fileModule={comprehensiveAggregationSh}
                                title="Complete Student Performance Analysis"
                                highlightLines={[5, 6, 7, 8, 9, 10, 18, 19, 20]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-emerald-900/20 rounded-xl border border-emerald-700/50">
                                <div className="text-2xl font-bold text-emerald-300 mb-2">87.5</div>
                                <p className="text-sm text-emerald-200">Average Score</p>
                            </div>
                            <div className="p-4 bg-red-900/20 rounded-xl border border-red-700/50">
                                <div className="text-2xl font-bold text-red-300 mb-2">65</div>
                                <p className="text-sm text-red-200">Minimum Score</p>
                            </div>
                            <div className="p-4 bg-blue-900/20 rounded-xl border border-blue-700/50">
                                <div className="text-2xl font-bold text-blue-300 mb-2">98</div>
                                <p className="text-sm text-blue-200">Maximum Score</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Pitfalls */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.5s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-red-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.338 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Common Pitfalls & Solutions
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Division by Zero</h4>
                                <p className="text-sm mb-2">Calculating average when count is zero</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    avg = sum / count  # ERROR if count = 0
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">avg = (count > 0) ? sum/count : 0</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Uninitialized Variables</h4>
                                <p className="text-sm">Using variables before initialization</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    sum += $2  # sum is undefined!
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Wrong MIN/MAX Init</h4>
                                <p className="text-sm mb-2">Initializing min with 0 when all values are positive</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    min = 0  # Will never update if all values > 0
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Better:</p>
                                    <code className="text-xs">min = $1  # Use first record's value</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">String vs Number</h4>
                                <p className="text-sm">Treating string columns as numbers</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    sum += $1  # ERROR if $1 contains "N/A"
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Professional Tips */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.6s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-blue-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Professional Tips & Tricks
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-emerald-300">Industry Best Practices</h3>
                            <ul className="space-y-3">
                                {[
                                    "Always initialize aggregation variables in BEGIN block",
                                    "Use printf in END for formatted output",
                                    "Check for empty files before division operations",
                                    "Use descriptive variable names (total_sales, avg_score)",
                                    "Include count along with average for context",
                                    "Handle edge cases (negative numbers, zero values)"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-emerald-300 text-sm">{index + 1}</span>
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-cyan-300">Advanced Techniques</h3>
                            <ShellFileLoader
                                fileModule={studentAggregationSh}
                                title="Group-wise Aggregation Pattern"
                                highlightLines={[5, 6, 7, 8, 9, 10]}
                            />
                            <div className="mt-4 bg-cyan-900/20 p-4 rounded-lg">
                                <h4 className="font-bold text-cyan-300 mb-2">Group-wise Analysis</h4>
                                <p className="text-sm">
                                    This pattern allows calculating statistics per group (by class, department, etc.) 
                                    by resetting variables when group changes.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 border border-emerald-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.7s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-emerald-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-cyan-300">Remember:</strong> Aggregations transform raw data into 
                                    meaningful insights. The pattern is always the same: <span className="text-yellow-300">Initialize → 
                                    Accumulate → Calculate → Report</span>. This fundamental pattern applies to everything from 
                                    simple sums to complex statistical analyses.
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-yellow-300 mb-2">Key Insight:</h4>
                                    <p className="mb-2">
                                        Think of aggregation variables as <span className="text-emerald-300">memory cells</span> 
                                        that remember information across records. They're the bridge between individual 
                                        data points and overall patterns.
                                    </p>
                                    <ul className="space-y-1 text-sm">
                                        <li>• <code>sum</code> remembers the running total</li>
                                        <li>• <code>count</code> remembers how many items</li>
                                        <li>• <code>min/max</code> remember extremes seen so far</li>
                                    </ul>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="font-bold">Sukanta Hui</p>
                                        <p className="text-sm text-gray-400">27 years experience in Data Processing</p>
                                        <p className="text-sm text-gray-400">sukantahui@codernaccotax.co.in | 7003756860</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Skills: awk, Data Analysis, Statistical Computing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mini Checklist */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Aggregation Checklist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-emerald-300">Must-Do Steps</h3>
                            <div className="space-y-3">
                                {[
                                    "Initialize variables in BEGIN block",
                                    "Update aggregations for each record",
                                    "Calculate final results in END block",
                                    "Handle division by zero for averages",
                                    "Format output with meaningful labels",
                                    "Test with sample data first"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-emerald-900/50 rounded-full flex items-center justify-center group-hover:bg-emerald-700 transition-colors duration-300">
                                            <span className="text-emerald-300">{index + 1}</span>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-cyan-300">Common Use Cases</h3>
                            <div className="space-y-3">
                                {[
                                    "Sales totals and averages",
                                    "Student performance statistics",
                                    "System resource utilization",
                                    "Website traffic analysis",
                                    "Inventory level tracking",
                                    "Financial report generation"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-cyan-900/50 rounded-full flex items-center justify-center group-hover:bg-cyan-700 transition-colors duration-300">
                                            <span className="text-cyan-300">{index + 1}</span>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hint Section */}
                <section 
                    className="bg-gradient-to-br from-cyan-900/20 to-emerald-900/20 border border-cyan-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.9s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Swadeep's store has days with zero sales, how would you calculate the 
                                <span className="text-emerald-300"> average daily sales</span> without getting division by zero errors?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "How would you modify the MIN/MAX logic to also track 
                                <span className="text-red-300"> which student</span> got the highest and lowest scores?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "What happens to your aggregations if the input file is 
                                <span className="text-yellow-300"> sorted differently</span>? Should aggregation results depend on sorting?"
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                        <p className="text-emerald-200">
                            <strong>Hint:</strong> Start with sum and count. Once those work, add min/max. 
                            Always test with small datasets before running on large files.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 13: Aggregations Using awk (Sum, Average, Min, Max)</p>
                    <p className="mt-2">Next Topic: Working with CSV and Delimited Files</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic13;