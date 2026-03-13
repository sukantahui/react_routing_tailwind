import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import pipelineSimpleSh from "./topic15_files/pipeline_simple.sh?raw";
import pipelineLogAnalysisSh from "./topic15_files/pipeline_log_analysis.sh?raw";
import pipelineDataCleaningSh from "./topic15_files/pipeline_data_cleaning.sh?raw";
import pipelineComplexSh from "./topic15_files/pipeline_complex.sh?raw";
import pipelinePerformanceSh from "./topic15_files/pipeline_performance.sh?raw";

const Topic15 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-pink-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                                Topic 15: Pipelines - Combining grep, sed, awk
                            </h1>
                            <p className="text-gray-400 mt-2">The UNIX Philosophy: Do One Thing Well, Chain Them Together</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-indigo-300 mb-2">Core Principle</h3>
                            <p className="text-sm">Small tools connected by pipes (|) create powerful workflows</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-pink-300 mb-2">Pipeline Symbol</h3>
                            <p className="text-sm">| (vertical bar) - Connects stdout of one to stdin of next</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-purple-300 mb-2">Real-World Value</h3>
                            <p className="text-sm">Complex text processing made simple through composition</p>
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
                @keyframes flowAnimation {
                    0% { stroke-dashoffset: 20; }
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-indigo-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        The UNIX Pipeline Philosophy
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            The pipe symbol (<code className="bg-gray-900 px-2 py-1 rounded">|</code>) is the glue that connects 
                            UNIX tools together. It takes the <span className="text-indigo-300">standard output (stdout)</span> 
                            of one command and feeds it as <span className="text-pink-300">standard input (stdin)</span> to the next, 
                            creating a <span className="text-purple-300">processing pipeline</span>.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-indigo-500">
                            <h3 className="font-bold text-pink-300 mb-3">Why Pipelines Are Revolutionary</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {icon: "🧩", title: "Modularity", desc: "Each tool does one thing perfectly"},
                                    {icon: "⚡", title: "Efficiency", desc: "Process streams without intermediate files"},
                                    {icon: "🔀", title: "Flexibility", desc: "Mix and match tools in any order"},
                                    {icon: "🧠", title: "Readability", desc: "Left-to-right logical flow"},
                                    {icon: "🚀", title: "Performance", desc: "Parallel processing with buffers"},
                                    {icon: "🎯", title: "Debugging", desc: "Test each stage independently"}
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/80 transition-colors duration-300 hover:scale-[1.02]"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-bold text-indigo-300">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pipeline Visualization */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-pink-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Anatomy of a Pipeline
                    </h2>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-8">
                            <svg width="750" height="280" className="hover:scale-[1.02] transition-transform duration-500">
                                <defs>
                                    <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                                        <stop offset="33%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
                                        <stop offset="66%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                                    </linearGradient>
                                    <marker id="pipeArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                                    </marker>
                                    <pattern id="dataPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                                        <circle cx="10" cy="10" r="2" fill="#6366f1" opacity="0.6" />
                                    </pattern>
                                </defs>
                                
                                {/* Data Flow */}
                                <rect x="30" y="100" width="120" height="80" rx="10" fill="#1f2937" stroke="#8b5cf6" strokeWidth="2"
                                    className="hover:stroke-purple-400 transition-colors duration-300">
                                    <title>Input File - Raw Data</title>
                                </rect>
                                <text x="90" y="130" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="bold">Input</text>
                                <text x="90" y="155" textAnchor="middle" fill="#ddd6fe" fontSize="12">Raw Log File</text>
                                
                                {/* Pipe 1 */}
                                <path d="M160,140 L210,140" fill="none" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#pipeArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" />
                                </path>
                                <text x="185" y="135" textAnchor="middle" fill="#a78bfa" fontSize="11">stdout → stdin</text>
                                
                                {/* grep Stage */}
                                <rect x="210" y="100" width="100" height="80" rx="10" fill="#3730a3" stroke="#6366f1" strokeWidth="2"
                                    className="hover:stroke-indigo-400 transition-colors duration-300">
                                    <title>grep - Filter relevant lines</title>
                                </rect>
                                <text x="260" y="130" textAnchor="middle" fill="#818cf8" fontSize="14" fontWeight="bold">grep</text>
                                <text x="260" y="155" textAnchor="middle" fill="#c7d2fe" fontSize="11">"ERROR"</text>
                                
                                {/* Pipe 2 */}
                                <path d="M320,140 L370,140" fill="none" stroke="#6366f1" strokeWidth="3" markerEnd="url(#pipeArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" begin="0.3s" />
                                </path>
                                <text x="345" y="135" textAnchor="middle" fill="#818cf8" fontSize="11">Filtered Data</text>
                                
                                {/* sed Stage */}
                                <rect x="370" y="100" width="100" height="80" rx="10" fill="#701a75" stroke="#ec4899" strokeWidth="2"
                                    className="hover:stroke-pink-400 transition-colors duration-300">
                                    <title>sed - Transform/Replace text</title>
                                </rect>
                                <text x="420" y="130" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">sed</text>
                                <text x="420" y="155" textAnchor="middle" fill="#fce7f3" fontSize="11">s/old/new/g</text>
                                
                                {/* Pipe 3 */}
                                <path d="M480,140 L530,140" fill="none" stroke="#ec4899" strokeWidth="3" markerEnd="url(#pipeArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" begin="0.6s" />
                                </path>
                                <text x="505" y="135" textAnchor="middle" fill="#f472b6" fontSize="11">Cleaned Data</text>
                                
                                {/* awk Stage */}
                                <rect x="530" y="100" width="100" height="80" rx="10" fill="#78350f" stroke="#f59e0b" strokeWidth="2"
                                    className="hover:stroke-yellow-400 transition-colors duration-300">
                                    <title>awk - Process and format</title>
                                </rect>
                                <text x="580" y="130" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">awk</text>
                                <text x="580" y="155" textAnchor="middle" fill="#fef3c7" fontSize="11">{`'{print $1}'`}</text>
                                
                                {/* Pipe 4 */}
                                <path d="M640,140 L690,140" fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#pipeArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite" begin="0.9s" />
                                </path>
                                
                                {/* Output */}
                                <rect x="690" y="100" width="120" height="80" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2"
                                    className="hover:stroke-emerald-400 transition-colors duration-300">
                                    <title>Final Output - Processed Results</title>
                                </rect>
                                <text x="750" y="130" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">Output</text>
                                <text x="750" y="155" textAnchor="middle" fill="#a7f3d0" fontSize="12">Formatted Report</text>
                                
                                {/* Data Particles Animation */}
                                <circle cx="85" cy="140" r="4" fill="#8b5cf6" opacity="0.8">
                                    <animate attributeName="cx" from="85" to="750" dur="4s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="85" cy="140" r="4" fill="#6366f1" opacity="0.8">
                                    <animate attributeName="cx" from="85" to="750" dur="4s" repeatCount="indefinite" begin="1s" />
                                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="1s" />
                                </circle>
                                <circle cx="85" cy="140" r="4" fill="#ec4899" opacity="0.8">
                                    <animate attributeName="cx" from="85" to="750" dur="4s" repeatCount="indefinite" begin="2s" />
                                    <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" begin="2s" />
                                </circle>
                                
                                {/* Legend */}
                                <text x="375" y="50" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">
                                    {`Data Flow: cat file.txt | grep pattern | sed 's/old/new/' | awk '{print $1}' > output.txt`}
                                </text>
                            </svg>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 mt-6">
                            {[
                                {tool: "grep", color: "indigo", desc: "Filter lines matching pattern"},
                                {tool: "sed", color: "pink", desc: "Stream editor for transformations"},
                                {tool: "awk", color: "amber", desc: "Pattern scanning & processing"},
                                {tool: "|", color: "purple", desc: "Pipe connects them all"}
                            ].map((item, index) => (
                                <div key={index} className={`p-4 bg-${item.color}-900/20 rounded-lg border border-${item.color}-700/50`}>
                                    <h4 className={`font-bold text-${item.color}-300 mb-2`}>{item.tool}</h4>
                                    <p className="text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Simple Pipeline Examples */}
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
                        Simple Pipeline Patterns
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-indigo-300">Basic Filtering Pipeline</h3>
                                <span className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm font-semibold">
                                    grep → sed → awk
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Swadeep</strong> needs to extract error messages from logs, clean them up, 
                                and count occurrences:
                            </p>
                            <ShellFileLoader
                                fileModule={pipelineSimpleSh}
                                title="Basic Pipeline: Filter → Transform → Analyze"
                                highlightLines={[4, 5, 6]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-emerald-300 mb-2">Pipeline Breakdown:</h4>
                                <ol className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-indigo-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-indigo-300">1</span>
                                        </div>
                                        <div>
                                            <code className="text-sm bg-gray-900 p-1 rounded">grep "ERROR"</code>
                                            <p className="text-xs text-gray-400 mt-1">Extract lines containing "ERROR"</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-pink-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-pink-300">2</span>
                                        </div>
                                        <div>
                                            <code className="text-sm bg-gray-900 p-1 rounded">sed 's/.*ERROR: //'</code>
                                            <p className="text-xs text-gray-400 mt-1">Remove "ERROR: " prefix from each line</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-6 h-6 bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-amber-300">3</span>
                                        </div>
                                        <div>
                                            <code className="text-sm bg-gray-900 p-1 rounded">sort | uniq -c</code>
                                            <p className="text-xs text-gray-400 mt-1">Count unique error messages</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-blue-300 mb-2">Key Benefits:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>No intermediate files needed</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Each tool focuses on one task</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Easy to debug by testing each stage</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Real-World Pipeline */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.3s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-purple-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19 9l-7 7-7-7" />
                        </svg>
                        Real-World: Log Analysis Pipeline
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-purple-300">Production Log Analysis</h3>
                                <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm font-semibold">
                                    grep → awk → sort → head
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Abhronila</strong> at Barrackpore Web Services needs to analyze Apache 
                                access logs to find the top 10 IP addresses with most requests:
                            </p>
                            <ShellFileLoader
                                fileModule={pipelineLogAnalysisSh}
                                title="Apache Log Analysis Pipeline"
                                highlightLines={[4, 5, 6, 7]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-indigo-900/20 rounded-xl border border-indigo-700/50">
                                <h4 className="font-bold text-indigo-300 mb-2">Input Log Format</h4>
                                <pre className="text-xs">
{`192.168.1.1 - - [15/Jan/2024...]
203.0.113.5 - - [15/Jan/2024...]
192.168.1.1 - - [15/Jan/2024...]`}
                                </pre>
                            </div>
                            <div className="p-4 bg-pink-900/20 rounded-xl border border-pink-700/50">
                                <h4 className="font-bold text-pink-300 mb-2">Pipeline Logic</h4>
                                <p className="text-sm">Extract IP → Count → Sort → Limit</p>
                            </div>
                            <div className="p-4 bg-amber-900/20 rounded-xl border border-amber-700/50">
                                <h4 className="font-bold text-amber-300 mb-2">Output</h4>
                                <pre className="text-xs">
{`45 192.168.1.1
32 203.0.113.5
28 198.51.100.23`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Cleaning Pipeline */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.4s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-blue-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Data Cleaning & Transformation Pipeline
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-blue-300">CSV Data Pipeline</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-green-300 mb-2">Problem:</h4>
                                <p className="text-sm">
                                    <strong>Tuhina</strong> has messy CSV data from multiple sources that needs cleaning 
                                    before analysis:
                                </p>
                                <ul className="text-xs text-gray-400 mt-2 space-y-1">
                                    <li>• Mixed delimiters (comma, semicolon)</li>
                                    <li>• Extra whitespace</li>
                                    <li>• Inconsistent quoting</li>
                                    <li>• Missing values</li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Pipeline Strategy:</h4>
                                <ol className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-indigo-300 font-bold">1.</span>
                                        <span>sed: Normalize delimiters and remove quotes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-pink-300 font-bold">2.</span>
                                        <span>awk: Clean whitespace, handle missing values</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-300 font-bold">3.</span>
                                        <span>grep: Remove invalid/empty lines</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300 font-bold">4.</span>
                                        <span>sort: Organize data for processing</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        
                        <div>
                            <ShellFileLoader
                                fileModule={pipelineDataCleaningSh}
                                title="Data Cleaning Pipeline"
                                highlightLines={[4, 5, 6, 7, 8, 9]}
                            />
                            <div className="mt-4 bg-blue-900/20 p-4 rounded-lg border border-blue-700/50">
                                <h4 className="font-bold text-blue-300 mb-2">Transformation Flow:</h4>
                                <p className="text-sm">
                                    Messy CSV → Clean delimiters → Remove quotes → Fix whitespace → 
                                    Validate rows → Clean output
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Complex Pipeline Example */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.5s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-emerald-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        Complex Production Pipeline
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-emerald-300">Multi-Stage Data Processing</h3>
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm font-semibold">
                                    7-Command Pipeline
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Debangshu</strong> at Ichapur Analytics needs to process server logs, 
                                extract metrics, calculate statistics, and generate a report:
                            </p>
                            <ShellFileLoader
                                fileModule={pipelineComplexSh}
                                title="Complex Multi-Stage Processing Pipeline"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                {stage: "1. Extract", tool: "grep", desc: "Get error lines"},
                                {stage: "2. Clean", tool: "sed", desc: "Remove timestamps"},
                                {stage: "3. Parse", tool: "cut", desc: "Extract IPs"},
                                {stage: "4. Count", tool: "sort/uniq", desc: "Frequency count"}
                            ].map((item, index) => (
                                <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                                    <div className="text-sm text-gray-400 mb-1">{item.stage}</div>
                                    <div className="font-bold text-amber-300 mb-1">{item.tool}</div>
                                    <div className="text-xs text-gray-300">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-indigo-300 mb-2">Pipeline Thinking:</h4>
                                <p className="text-sm">
                                    Break complex problems into simple steps. Each command does one 
                                    transformation, making the pipeline easy to understand and modify.
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-pink-300 mb-2">Debugging Tip:</h4>
                                <p className="text-sm">
                                    Test pipelines incrementally. Start with first command, add pipe, 
                                    add second command, etc. Use <code>tee</code> to save intermediate output.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Common Pitfalls */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.6s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-red-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.338 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Common Pipeline Pitfalls
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Missing Quoting</h4>
                                <p className="text-sm mb-2">Special characters interpreted by shell</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    echo "test" | grep .*  # * interpreted by shell!
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">echo "test" | grep '.*'</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Order Matters</h4>
                                <p className="text-sm">Wrong command order produces wrong results</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    cat file | sort | uniq -c | grep "error"
                                    # Should filter first, then count!
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Buffering Issues</h4>
                                <p className="text-sm mb-2">stdout buffering causes incomplete output</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    tail -f log.txt | grep "ERROR"  # May not show immediately
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">stdbuf -oL tail -f log.txt | grep "ERROR"</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Exit Codes Lost</h4>
                                <p className="text-sm">Pipeline returns exit code of last command only</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    grep "pattern" file | wc -l
                                    # Exit code is from wc, not grep
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Professional Tips */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.7s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-cyan-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Professional Pipeline Techniques
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-indigo-300">Optimization Strategies</h3>
                            <ShellFileLoader
                                fileModule={pipelinePerformanceSh}
                                title="Performance-Optimized Pipeline"
                                highlightLines={[4, 5, 6, 7, 8]}
                            />
                            <div className="mt-4 bg-indigo-900/20 p-4 rounded-lg">
                                <h4 className="font-bold text-indigo-300 mb-2">Why This Works:</h4>
                                <ul className="space-y-2 text-sm">
                                    <li>• <code>head -1000</code>: Process only needed data</li>
                                    <li>• Early filtering reduces downstream processing</li>
                                    <li>• Simple regex patterns are faster</li>
                                    <li>• Avoid unnecessary sorting until needed</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Pipeline Design Principles</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><strong>Filter early:</strong> Remove unwanted data ASAP</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><strong>One tool, one job:</strong> Keep each stage simple</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><strong>Test incrementally:</strong> Build pipelines step by step</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><strong>Document with comments:</strong> Explain complex pipelines</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Debugging Tools</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">🔍</span>
                                        <span><code>tee</code>: Save intermediate output to file</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">📝</span>
                                        <span><code>echo</code>: Test with sample data first</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span><code>time</code>: Measure pipeline performance</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">🐛</span>
                                        <span><code>set -x</code>: Debug shell script execution</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-indigo-900/30 to-pink-900/30 border border-indigo-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-indigo-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-pink-300">Remember:</strong> The pipe symbol (<code>|</code>) 
                                    is the most powerful tool in UNIX. It turns simple commands into 
                                    <span className="text-yellow-300"> programmable data pipelines</span>.
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-yellow-300 mb-2">Mental Model for Pipelines:</h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-indigo-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-indigo-300">→</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Data Flow</p>
                                                <p className="text-sm text-gray-400">Left to right, like a factory assembly line</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-pink-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-pink-300">⚙️</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Transformation</p>
                                                <p className="text-sm text-gray-400">Each stage modifies the data stream</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-300">🎯</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Single Responsibility</p>
                                                <p className="text-sm text-gray-400">Each tool does one job perfectly</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-amber-300">🧩</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Composition</p>
                                                <p className="text-sm text-gray-400">Combine tools like LEGO blocks</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="font-bold">Sukanta Hui</p>
                                        <p className="text-sm text-gray-400">27 years experience in UNIX Systems</p>
                                        <p className="text-sm text-gray-400">sukantahui@codernaccotax.co.in | 7003756860</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Skills: Shell Scripting, Pipeline Design, System Administration</p>
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
                    style={{animationDelay: '0.9s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Pipeline Design Checklist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-indigo-300">Design & Implementation</h3>
                            <div className="space-y-3">
                                {[
                                    "Start with end goal - what output do you need?",
                                    "Break problem into sequential transformations",
                                    "Choose right tool for each transformation",
                                    "Test each stage independently first",
                                    "Use proper quoting for special characters",
                                    "Consider performance - filter early, reduce data"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-indigo-900/50 rounded-full flex items-center justify-center group-hover:bg-indigo-700 transition-colors duration-300">
                                            <span className="text-indigo-300">{index + 1}</span>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-pink-300">Testing & Optimization</h3>
                            <div className="space-y-3">
                                {[
                                    "Test with small sample data first",
                                    "Use tee to save intermediate results",
                                    "Check exit codes of individual commands",
                                    "Monitor memory usage for large datasets",
                                    "Consider parallel processing with xargs",
                                    "Document pipeline with comments"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-pink-900/50 rounded-full flex items-center justify-center group-hover:bg-pink-700 transition-colors duration-300">
                                            <span className="text-pink-300">{index + 1}</span>
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
                    className="bg-gradient-to-br from-pink-900/20 to-indigo-900/20 border border-pink-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-pink-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '1s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-pink-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Swadeep's log analysis pipeline is too slow, where should he look first 
                                to optimize performance? Should he filter earlier or process less data?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "What happens when you have a pipeline that produces no output? 
                                How would you debug which stage is failing?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "How would you modify a pipeline to handle both uppercase and lowercase 
                                error messages without duplicating grep commands?"
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-700/50 rounded-lg">
                        <p className="text-indigo-200">
                            <strong>Hint:</strong> Build pipelines incrementally. Start with 
                            <code className="mx-1 px-1 bg-black/50 rounded">command1 | less</code>
                            then add 
                            <code className="mx-1 px-1 bg-black/50 rounded">command1 | command2 | less</code>
                            and so on. Use <code>echo "test data" | pipeline</code> for testing.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 15: Pipelines - Combining grep, sed, awk</p>
                    <p className="mt-2">Next Topic: Text Processing with Pipes and Redirection</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic15;