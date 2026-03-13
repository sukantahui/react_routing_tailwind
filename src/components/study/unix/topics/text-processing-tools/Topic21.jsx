import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// Import raw shell script files
import performanceTipsBasic from "./topic21_files/performance_tips_basic.sh?raw";
import memoryEfficientProcessing from "./topic21_files/memory_efficient_processing.sh?raw";
import parallelProcessing from "./topic21_files/parallel_processing.sh?raw";
import fileSplitting from "./topic21_files/file_splitting.sh?raw";
import benchmarkingScript from "./topic21_files/benchmarking_script.sh?raw";

const Topic21 = () => {
    return (
        <div className="dark min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8">
            <style>
                {`
                @keyframes fadeSlideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes pulsePerformance {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                }
                
                @keyframes rotateGear {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes flowRight {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                `}
            </style>
            
            {/* Header Section */}
            <div className="max-w-6xl mx-auto">
                <div 
                    className="animate-[fadeSlideUp_0.8s_ease-out] mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-8 bg-green-500 rounded-full"></div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                            Topic 21: Performance Tips for Large Text Files
                        </h1>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed animate-[fadeSlideUp_1s_ease-out]">
                        Optimize your text processing workflows for massive datasets with professional-grade performance techniques
                    </p>
                </div>
                
                {/* Critical Performance Banner */}
                <div 
                    className="animate-[fadeSlideUp_1s_ease-out] mb-12 bg-gradient-to-r from-emerald-900/40 to-green-900/40 backdrop-blur-sm rounded-2xl p-6 border border-emerald-700/50 hover:border-emerald-500/50 transition-all duration-500"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 animate-[pulsePerformance_2s_ease-in-out_infinite]">
                            <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-3 text-emerald-300">
                                The Performance Imperative
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                When Tuhina from Naihati tried processing 5GB of student data using naive methods, 
                                it took 3 hours and crashed her system. After applying these optimizations, the same 
                                task completed in 8 minutes using the same hardware.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Performance Comparison */}
                <div className="animate-[fadeSlideUp_1.2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-blue-300 border-b border-blue-800 pb-2">
                        Performance Impact Comparison
                    </h2>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {[
                            {
                                title: "Naive Approach",
                                time: "3+ hours",
                                memory: "High (OOM Risk)",
                                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                color: "red"
                            },
                            {
                                title: "Basic Optimization",
                                time: "45 minutes",
                                memory: "Medium",
                                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                                color: "yellow"
                            },
                            {
                                title: "Advanced Techniques",
                                time: "8 minutes",
                                memory: "Low",
                                icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                                color: "green"
                            }
                        ].map((approach, index) => (
                            <div 
                                key={index}
                                className={`animate-[fadeSlideUp_${1.2 + index * 0.1}s_ease-out] bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-6 rounded-xl border border-${approach.color}-700/30 hover:border-${approach.color}-500/50 transition-all duration-300 hover:scale-[1.02]`}
                            >
                                <div className={`flex items-center gap-3 mb-4 text-${approach.color}-300`}>
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={approach.icon} />
                                    </svg>
                                    <h3 className="font-bold text-xl">{approach.title}</h3>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                                        <span className="text-gray-300">Processing Time</span>
                                        <span className={`font-bold text-${approach.color}-400`}>{approach.time}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                                        <span className="text-gray-300">Memory Usage</span>
                                        <span className={`font-bold text-${approach.color}-400`}>{approach.memory}</span>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <div className="text-sm text-gray-400 mb-1">Performance Level</div>
                                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-${approach.color}-500 rounded-full`}
                                                style={{ width: `${100 - index * 40}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Performance Visualization */}
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-500">
                        <h3 className="text-xl font-bold mb-4 text-cyan-300">Processing Speed Comparison</h3>
                        <svg viewBox="0 0 800 250" className="w-full">
                            {/* Timeline */}
                            <line x1="50" y1="200" x2="750" y2="200" stroke="#4B5563" strokeWidth="2" />
                            
                            {/* Time markers */}
                            {[0, 1, 2, 3].map((hour, idx) => (
                                <g key={idx}>
                                    <line x1={50 + idx * 233} y1="195" x2={50 + idx * 233} y2="205" stroke="#9CA3AF" strokeWidth="2" />
                                    <text x={50 + idx * 233} y="220" textAnchor="middle" fill="#9CA3AF" fontSize="12">
                                        {hour === 0 ? "0 min" : hour === 1 ? "1 hour" : `${hour} hours`}
                                    </text>
                                </g>
                            ))}
                            
                            {/* Bars */}
                            <g>
                                {/* Naive Approach */}
                                <rect x="60" y="120" width="600" height="40" rx="5" fill="#EF4444" opacity="0.7">
                                    <animate attributeName="width" from="0" to="600" dur="2s" fill="freeze" />
                                </rect>
                                <text x="360" y="145" textAnchor="middle" fill="white" fontSize="12">Naive: 3+ hours</text>
                                
                                {/* Basic Optimization */}
                                <rect x="60" y="70" width="300" height="40" rx="5" fill="#F59E0B" opacity="0.7">
                                    <animate attributeName="width" from="0" to="300" dur="2s" fill="freeze" begin="0.5s" />
                                </rect>
                                <text x="210" y="95" textAnchor="middle" fill="white" fontSize="12">Basic: 45 minutes</text>
                                
                                {/* Advanced Techniques */}
                                <rect x="60" y="20" width="80" height="40" rx="5" fill="#10B981" opacity="0.7">
                                    <animate attributeName="width" from="0" to="80" dur="2s" fill="freeze" begin="1s" />
                                </rect>
                                <text x="100" y="45" textAnchor="middle" fill="white" fontSize="12">Advanced: 8 minutes</text>
                            </g>
                            
                            {/* Legend */}
                            <g transform="translate(500, 100)">
                                <rect x="0" y="0" width="200" height="80" rx="5" fill="#1F2937" stroke="#374151" />
                                <circle cx="20" cy="20" r="8" fill="#EF4444" />
                                <text x="35" y="25" fill="#D1D5DB" fontSize="12">Naive Approach</text>
                                
                                <circle cx="20" cy="40" r="8" fill="#F59E0B" />
                                <text x="35" y="45" fill="#D1D5DB" fontSize="12">Basic Optimization</text>
                                
                                <circle cx="20" cy="60" r="8" fill="#10B981" />
                                <text x="35" y="65" fill="#D1D5DB" fontSize="12">Advanced Techniques</text>
                            </g>
                        </svg>
                    </div>
                </div>
                
                {/* Basic Performance Tips */}
                <div className="animate-[fadeSlideUp_1.4s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-300 border-b border-emerald-800 pb-2">
                        Fundamental Performance Principles
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-emerald-500/40 transition-all duration-300 mb-8">
                        <ShellFileLoader
                            fileModule={performanceTipsBasic}
                            title="Essential Performance Optimizations"
                            highlightLines={[3, 7, 11, 15, 19, 23, 27]}
                        />
                        
                        <div className="mt-6 grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-blue-500/20">
                                    <h4 className="font-semibold text-blue-300 mb-2">Stream Processing Advantage</h4>
                                    <p className="text-sm text-gray-300">
                                        Unix tools process data line-by-line, never loading entire files into memory. 
                                        When Swadeep processed 10GB logs, streaming prevented memory exhaustion.
                                    </p>
                                </div>
                                
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-green-500/20">
                                    <h4 className="font-semibold text-green-300 mb-2">Pipe Efficiency</h4>
                                    <p className="text-sm text-gray-300">
                                        Pipes pass data between processes without intermediate files. 
                                        Each tool processes data as it becomes available.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-purple-500/20">
                                    <h4 className="font-semibold text-purple-300 mb-2">Early Filtering</h4>
                                    <p className="text-sm text-gray-300">
                                        Use grep to filter lines early in pipeline. Process 1% of data 
                                        instead of 100% by removing irrelevant lines first.
                                    </p>
                                </div>
                                
                                <div className="p-4 bg-gray-900/50 rounded-lg border border-yellow-500/20">
                                    <h4 className="font-semibold text-yellow-300 mb-2">Regex Optimization</h4>
                                    <p className="text-sm text-gray-300">
                                        Simple patterns process faster than complex regex. Anchor patterns 
                                        (^, $) help regex engines optimize matching.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Memory Efficiency Diagram */}
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/50 hover:border-cyan-500/30 transition-all duration-500">
                        <h3 className="text-xl font-bold mb-4 text-cyan-300">Memory Usage Comparison</h3>
                        <svg viewBox="0 0 700 300" className="w-full">
                            {/* Memory scale */}
                            <line x1="50" y1="250" x2="650" y2="250" stroke="#4B5563" strokeWidth="2" />
                            <text x="30" y="240" fill="#9CA3AF" fontSize="12">0 GB</text>
                            <text x="630" y="240" fill="#9CA3AF" fontSize="12">10 GB</text>
                            
                            {/* Memory bars */}
                            <g>
                                {/* Load Entire File */}
                                <rect x="100" y="150" width="200" height="100" rx="5" fill="#EF4444" opacity="0.7">
                                    <animate attributeName="height" from="0" to="100" dur="1.5s" fill="freeze" />
                                </rect>
                                <text x="200" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                    Load Entire File
                                </text>
                                <text x="200" y="215" textAnchor="middle" fill="white" fontSize="10">
                                    10 GB in Memory
                                </text>
                                
                                {/* Stream Processing */}
                                <rect x="400" y="230" width="200" height="20" rx="5" fill="#10B981" opacity="0.7">
                                    <animate attributeName="height" from="0" to="20" dur="1.5s" fill="freeze" begin="0.5s" />
                                </rect>
                                <text x="500" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                    Stream Processing
                                </text>
                                <text x="500" y="260" textAnchor="middle" fill="white" fontSize="10">
                                    100 MB Buffer
                                </text>
                            </g>
                            
                            {/* Data flow animation */}
                            <g transform="translate(0, 50)">
                                <rect x="50" y="0" width="100" height="40" rx="5" fill="#4B5563" className="animate-[pulsePerformance_2s_infinite]">
                                    <title>10GB Data File</title>
                                </rect>
                                <text x="100" y="25" textAnchor="middle" fill="#D1D5DB" fontSize="10">10GB File</text>
                                
                                {/* Stream flow */}
                                <path d="M160,20 L300,20 L300,100 L440,100" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                                </path>
                                
                                {/* Bulk load */}
                                <path d="M160,20 L500,20" stroke="#EF4444" strokeWidth="2" fill="none" strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                                </path>
                                
                                <rect x="450" y="0" width="100" height="40" rx="5" fill="#EF4444" opacity="0.7">
                                    <animate attributeName="fill" values="#EF4444;#DC2626;#EF4444" dur="2s" repeatCount="indefinite" />
                                </rect>
                                <text x="500" y="25" textAnchor="middle" fill="white" fontSize="10">10GB in RAM</text>
                                
                                <rect x="450" y="80" width="100" height="40" rx="5" fill="#10B981" opacity="0.7">
                                    <animate attributeName="fill" values="#10B981;#059669;#10B981" dur="2s" repeatCount="indefinite" />
                                </rect>
                                <text x="500" y="105" textAnchor="middle" fill="white" fontSize="10">100MB Buffer</text>
                            </g>
                        </svg>
                    </div>
                </div>
                
                {/* Advanced Techniques */}
                <div className="animate-[fadeSlideUp_1.6s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-purple-300 border-b border-purple-800 pb-2">
                        Advanced Processing Techniques
                    </h2>
                    
                    <div className="space-y-8">
                        {/* Memory Efficient Processing */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-purple-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={memoryEfficientProcessing}
                                title="Memory-Efficient Processing Patterns"
                                highlightLines={[4, 8, 12, 16, 20, 24, 28]}
                            />
                            
                            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                                <h4 className="font-semibold text-purple-300 mb-3">Memory Optimization Strategies</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        {label: "Use awk", desc: "Single process, less overhead", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", color: "blue"},
                                        {label: "Avoid sort", desc: "Memory intensive for large files", icon: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4", color: "red"},
                                        {label: "Use LC_ALL=C", desc: "Speed up sorting and matching", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "green"},
                                        {label: "Pre-filter", desc: "Reduce data early in pipeline", icon: "M19 9l-7 7-7-7", color: "yellow"}
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-gray-800/30 p-3 rounded-lg text-center hover:bg-gray-800/50 transition-all duration-300">
                                            <div className={`text-${item.color}-400 mb-1 flex justify-center`}>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                </svg>
                                            </div>
                                            <div className="font-semibold text-gray-200 text-sm">{item.label}</div>
                                            <div className="text-xs text-gray-400">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Parallel Processing */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-blue-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={parallelProcessing}
                                title="Parallel Processing with GNU Parallel"
                                highlightLines={[3, 6, 9, 12, 15, 18, 21]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-blue-300 mb-3">Parallel Processing Benefits</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <svg viewBox="0 0 400 200" className="w-full mb-4">
                                            {/* Sequential Processing */}
                                            <text x="50" y="30" fill="#9CA3AF" fontSize="14">Sequential</text>
                                            <g transform="translate(50, 50)">
                                                <rect x="0" y="0" width="300" height="20" rx="5" fill="#4B5563" />
                                                {[0, 60, 120, 180, 240].map((x, idx) => (
                                                    <g key={idx}>
                                                        <rect x={x} y="0" width="40" height="20" fill="#3B82F6" className="animate-[pulsePerformance_2s_infinite]" style={{ animationDelay: `${idx * 0.5}s` }}>
                                                            <animate attributeName="fill" values="#3B82F6;#1D4ED8;#3B82F6" dur="2s" repeatCount="indefinite" begin={`${idx * 0.5}s`} />
                                                        </rect>
                                                        <text x={x + 20} y="15" textAnchor="middle" fill="white" fontSize="10">CPU</text>
                                                    </g>
                                                ))}
                                            </g>
                                            
                                            {/* Parallel Processing */}
                                            <text x="50" y="100" fill="#9CA3AF" fontSize="14">Parallel (4 cores)</text>
                                            <g transform="translate(50, 120)">
                                                <rect x="0" y="0" width="300" height="80" rx="5" fill="#4B5563" />
                                                {[0, 1, 2, 3].map((core, idx) => (
                                                    <g key={idx} transform={`translate(0, ${core * 20})`}>
                                                        <rect x="0" y="0" width="300" height="20" fill="#10B981" className="animate-[flowRight_3s_linear_infinite]" style={{ animationDelay: `${idx * 0.2}s` }} />
                                                        <text x="150" y="15" textAnchor="middle" fill="white" fontSize="10">CPU {core + 1}</text>
                                                    </g>
                                                ))}
                                            </g>
                                        </svg>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="p-3 bg-gray-900/40 rounded-lg">
                                            <div className="font-semibold text-green-400">Speedup: 3-4x</div>
                                            <div className="text-sm text-gray-400">On 4-core systems for I/O bound tasks</div>
                                        </div>
                                        
                                        <div className="p-3 bg-gray-900/40 rounded-lg">
                                            <div className="font-semibold text-blue-400">Resource Utilization</div>
                                            <div className="text-sm text-gray-400">Keeps all CPU cores busy</div>
                                        </div>
                                        
                                        <div className="p-3 bg-gray-900/40 rounded-lg">
                                            <div className="font-semibold text-purple-400">Load Balancing</div>
                                            <div className="text-sm text-gray-400">Automatically distributes work</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* File Splitting Strategy */}
                        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/40 transition-all duration-300">
                            <ShellFileLoader
                                fileModule={fileSplitting}
                                title="Large File Splitting Strategy"
                                highlightLines={[3, 6, 9, 12, 15, 18, 21]}
                            />
                            
                            <div className="mt-6">
                                <h4 className="font-semibold text-yellow-300 mb-3">When to Split Files</h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/20">
                                        <div className="font-bold text-red-300 mb-1">File Size > 2GB</div>
                                        <div className="text-sm text-gray-300">Single-file processing becomes inefficient</div>
                                    </div>
                                    
                                    <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/20">
                                        <div className="font-bold text-yellow-300 mb-1">Need Parallel Processing</div>
                                        <div className="text-sm text-gray-300">Split enables true parallel execution</div>
                                    </div>
                                    
                                    <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/20">
                                        <div className="font-bold text-green-300 mb-1">Memory Constraints</div>
                                        <div className="text-sm text-gray-300">Process chunks that fit in available RAM</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Benchmarking and Measurement */}
                <div className="animate-[fadeSlideUp_1.8s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-300 border-b border-cyan-800 pb-2">
                        Benchmarking and Measurement
                    </h2>
                    
                    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/40 transition-all duration-300">
                        <ShellFileLoader
                            fileModule={benchmarkingScript}
                            title="Performance Benchmarking Script"
                            highlightLines={[4, 8, 12, 16, 20, 24, 28]}
                        />
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold text-cyan-300 mb-3">Key Performance Metrics</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                    <div className="text-2xl font-bold text-green-400">time</div>
                                    <div className="text-sm text-gray-400">Real execution time</div>
                                </div>
                                
                                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-400">/usr/bin/time</div>
                                    <div className="text-sm text-gray-400">Detailed resource usage</div>
                                </div>
                                
                                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-400">pv</div>
                                    <div className="text-sm text-gray-400">Progress monitoring</div>
                                </div>
                                
                                <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-400">iostat</div>
                                    <div className="text-sm text-gray-400">I/O performance</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Benchmark Results Visualization */}
                        <div className="mt-6">
                            <h4 className="font-semibold text-yellow-300 mb-3">Real-world Benchmark Results</h4>
                            <div className="overflow-x-auto">
                                <svg viewBox="0 0 700 300" className="w-full">
                                    {/* Y-axis */}
                                    <line x1="80" y1="50" x2="80" y2="250" stroke="#4B5563" strokeWidth="2" />
                                    <text x="40" y="50" fill="#9CA3AF" fontSize="12">Fast</text>
                                    <text x="40" y="150" fill="#9CA3AF" fontSize="12">Medium</text>
                                    <text x="40" y="250" fill="#9CA3AF" fontSize="12">Slow</text>
                                    
                                    {/* X-axis */}
                                    <line x1="80" y1="250" x2="650" y2="250" stroke="#4B5563" strokeWidth="2" />
                                    
                                    {/* Benchmark bars */}
                                    {[
                                        {method: "awk single pass", speed: 80, color: "#10B981"},
                                        {method: "grep + awk", speed: 120, color: "#3B82F6"},
                                        {method: "sed stream", speed: 150, color: "#8B5CF6"},
                                        {method: "multiple sorts", speed: 220, color: "#EF4444"},
                                        {method: "python script", speed: 180, color: "#F59E0B"},
                                        {method: "parallel awk", speed: 60, color: "#06B6D4"}
                                    ].map((item, idx) => (
                                        <g key={idx} transform={`translate(${100 + idx * 80}, 0)`}>
                                            <rect 
                                                x="0" 
                                                y={item.speed} 
                                                width="40" 
                                                height={250 - item.speed} 
                                                fill={item.color} 
                                                rx="3"
                                                className="hover:opacity-90 transition-opacity duration-300"
                                            >
                                                <animate attributeName="height" from="0" to={250 - item.speed} dur="1s" fill="freeze" begin={`${idx * 0.2}s`} />
                                            </rect>
                                            <text x="20" y="270" textAnchor="middle" fill="#9CA3AF" fontSize="10" transform={`rotate(45, 20, 270)`}>
                                                {item.method}
                                            </text>
                                            <text x="20" y={item.speed - 5} textAnchor="middle" fill="white" fontSize="10">
                                                {250 - item.speed}ms
                                            </text>
                                        </g>
                                    ))}
                                    
                                    {/* Legend */}
                                    <g transform="translate(500, 50)">
                                        <rect x="0" y="0" width="150" height="100" rx="5" fill="#1F2937" stroke="#374151" />
                                        <text x="10" y="20" fill="#D1D5DB" fontSize="12" fontWeight="bold">Method Colors</text>
                                        <line x1="10" y1="25" x2="140" y2="25" stroke="#4B5563" />
                                        
                                        {[
                                            {color: "#10B981", label: "Fast (awk)"},
                                            {color: "#3B82F6", label: "Good (grep+awk)"},
                                            {color: "#EF4444", label: "Slow (multiple sorts)"}
                                        ].map((item, idx) => (
                                            <g key={idx} transform={`translate(10, ${40 + idx * 20})`}>
                                                <rect x="0" y="0" width="10" height="10" fill={item.color} rx="2" />
                                                <text x="15" y="10" fill="#D1D5DB" fontSize="10">{item.label}</text>
                                            </g>
                                        ))}
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Common Pitfalls */}
                <div className="animate-[fadeSlideUp_2s_ease-out] mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-red-300 border-b border-red-800 pb-2">
                        Performance Pitfalls to Avoid
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-red-900/30 to-red-800/20 p-5 rounded-xl border border-red-700/30 hover:border-red-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-red-200">Memory-Related Mistakes</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Loading Entire Files</h4>
                                        <p className="text-sm text-gray-300">Using tools that read whole files into memory</p>
                                        <div className="text-xs text-red-400 mt-2">Solution: Always use streaming tools (grep, sed, awk)</div>
                                    </div>
                                    
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Unnecessary Sorting</h4>
                                        <p className="text-sm text-gray-300">Sorting massive files when not absolutely required</p>
                                        <div className="text-xs text-red-400 mt-2">Solution: Use associative arrays in awk instead</div>
                                    </div>
                                    
                                    <div className="p-3 bg-red-900/20 rounded-lg">
                                        <h4 className="font-semibold text-red-300 mb-1">Multiple Passes</h4>
                                        <p className="text-sm text-gray-300">Reading same file multiple times for different operations</p>
                                        <div className="text-xs text-red-400 mt-2">Solution: Combine operations in single awk script</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/20 p-5 rounded-xl border border-yellow-700/30 hover:border-yellow-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-yellow-200">I/O Optimization Mistakes</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-yellow-900/20 rounded-lg">
                                        <h4 className="font-semibold text-yellow-300 mb-1">Intermediate Files</h4>
                                        <p className="text-sm text-gray-300">Creating temp files instead of using pipes</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: command1 | command2 | command3</div>
                                    </div>
                                    
                                    <div className="p-3 bg-yellow-900/20 rounded-lg">
                                        <h4 className="font-semibold text-yellow-300 mb-1">Disk I/O vs Memory</h4>
                                        <p className="text-sm text-gray-300">Not using /dev/shm for temp files when needed</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: Use RAM disk for temporary storage</div>
                                    </div>
                                    
                                    <div className="p-3 bg-yellow-900/20 rounded-lg">
                                        <h4 className="font-semibold text-yellow-300 mb-1">Buffering Issues</h4>
                                        <p className="text-sm text-gray-300">Small I/O operations killing performance</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: Use appropriate buffer sizes</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 p-5 rounded-xl border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
                                <h3 className="font-bold text-lg mb-3 text-blue-200">Professional Optimizations</h3>
                                
                                <div className="space-y-3">
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Use LC_ALL=C</h4>
                                        <p className="text-sm text-gray-300">Speeds up sorting and pattern matching by 2-10x</p>
                                        <div className="text-xs text-green-400 mt-2">Example: LC_ALL=C sort bigfile.txt</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">AWK is Faster Than Python</h4>
                                        <p className="text-sm text-gray-300">For text processing, awk is 5-50x faster than Python</p>
                                        <div className="text-xs text-green-400 mt-2">Case: Abhronila processed 2GB in 30s with awk vs 3min with Python</div>
                                    </div>
                                    
                                    <div className="p-3 bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-300 mb-1">Profile Before Optimizing</h4>
                                        <p className="text-sm text-gray-300">Use time and strace to identify bottlenecks</p>
                                        <div className="text-xs text-green-400 mt-2">Best Practice: Measure, don't guess</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-900/30 to-green-800/20 p-5 rounded-xl border border-green-700/30 hover:border-green-500/50 transition-all duration-300">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3 text-green-200">Real-world Success Story</h3>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-gray-300">
                                                Debangshu from Ichapur reduced log processing from 4 hours to 12 minutes 
                                                by: 1) Using awk instead of Python, 2) Adding LC_ALL=C, 3) Processing in 
                                                parallel with GNU parallel. The same hardware processed 10x more data.
                                            </p>
                                            <div className="mt-2 text-sm text-green-400">
                                                20x performance improvement with optimization
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Teacher's Note */}
                <div className="animate-[fadeSlideUp_2.2s_ease-out] mb-12">
                    <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 backdrop-blur-sm rounded-2xl p-6 border border-emerald-700/50 hover:border-emerald-500/50 transition-all duration-500 group">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-emerald-600 to-green-500 p-3 rounded-xl group-hover:scale-105 transition-transform duration-300 animate-[rotateGear_10s_linear_infinite]">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300">Teacher's Note</h2>
                                <div className="mb-6 p-4 bg-gray-900/40 rounded-xl border border-gray-700">
                                    <p className="text-gray-300 leading-relaxed">
                                        Dear students, performance optimization is like tuning a car engine. You don't need 
                                        a faster car if you're driving inefficiently. I've seen Swadeep process 100MB files 
                                        in seconds while others take minutes with the same tools. The key difference? 
                                        Understanding how Unix tools work under the hood. Remember: 1) Stream, don't load, 
                                        2) Measure everything, 3) Think in pipelines, not steps.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-emerald-300">Sukanta Hui</div>
                                        <div className="text-sm text-gray-400">27 years experience</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-green-300">Performance Rule</div>
                                        <div className="text-sm text-gray-400">"Make it work, then make it fast"</div>
                                    </div>
                                    <div className="p-3 bg-gray-800/50 rounded-lg">
                                        <div className="font-semibold text-blue-300">Contact</div>
                                        <div className="text-sm text-gray-400">sukantahui@codernaccotax.co.in</div>
                                    </div>
                                </div>
                                
                                <div className="p-4 bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-xl">
                                    <h4 className="font-bold text-lg mb-2 text-yellow-200">Golden Performance Rules</h4>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                        <li>Always use <code className="bg-gray-800 px-1 rounded">time</code> to measure</li>
                                        <li>Add <code className="bg-gray-800 px-1 rounded">LC_ALL=C</code> to sort/grep</li>
                                        <li>Filter early with <code className="bg-gray-800 px-1 rounded">grep</code></li>
                                        <li>Use <code className="bg-gray-800 px-1 rounded">awk</code> for complex processing</li>
                                        <li>Consider <code className="bg-gray-800 px-1 rounded">parallel</code> for multi-core</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mini Checklist */}
                <div className="animate-[fadeSlideUp_2.4s_ease-out]">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-500/30 transition-all duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-green-800 pb-2">
                            Performance Optimization Checklist
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {[
                                    {num: "1", title: "Measure Baseline", desc: "Use time command to know current performance"},
                                    {num: "2", title: "Use Streaming", desc: "Process line-by-line, not whole file"},
                                    {num: "3", title: "Filter Early", desc: "Remove irrelevant data as soon as possible"},
                                    {num: "4", title: "Avoid Intermediate Files", desc: "Use pipes instead of temporary files"}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold">{item.num}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-green-200">{item.title}</h4>
                                            <p className="text-sm text-gray-300">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                {[
                                    {num: "5", title: "Use Appropriate Tools", desc: "awk for processing, grep for filtering"},
                                    {num: "6", title: "Set LC_ALL=C", desc: "For sorting and pattern matching speed"},
                                    {num: "7", title: "Consider Parallelism", desc: "Use GNU parallel for multi-core systems"},
                                    {num: "8", title: "Profile Bottlenecks", desc: "Find what's actually slowing you down"}
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-lg hover:bg-gray-800/60 transition-all duration-300">
                                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-bold">{item.num}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-200">{item.title}</h4>
                                            <p className="text-sm text-gray-300">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                            <h3 className="font-bold text-lg mb-3 text-blue-200">Hint Section</h3>
                            <p className="text-gray-300 italic">
                                Think about: How would you process a 50GB log file on a system with only 4GB RAM? 
                                Observe carefully: What's the bottleneck when processing slows down—CPU, memory, or disk I/O? 
                                Try changing this: Replace multiple grep/sed/awk commands with a single awk script.
                            </p>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                            <h4 className="font-semibold text-purple-300 mb-2">Professional Tip from Experience</h4>
                            <p className="text-gray-300 text-sm">
                                When Tuhina optimized the Naihati school database processing, she discovered that 
                                80% of time was spent in sorting. By using awk associative arrays instead of sort|uniq, 
                                she achieved a 15x speedup. Always question every sort command—do you really need it?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic21;