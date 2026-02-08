import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import sortBasicsSh from "./topic17_files/sort_basics.sh?raw";
import uniqExamplesSh from "./topic17_files/uniq_examples.sh?raw";
import wcExamplesSh from "./topic17_files/wc_examples.sh?raw";
import combinedPipelineSh from "./topic17_files/combined_pipeline.sh?raw";
import realWorldAnalysisSh from "./topic17_files/real_world_analysis.sh?raw";

const Topic17 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-lime-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-teal-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-teal-600 to-lime-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-lime-400 bg-clip-text text-transparent">
                                Topic 17: Sorting & Filtering with sort, uniq, wc
                            </h1>
                            <p className="text-gray-400 mt-2">Data Organization, Deduplication, and Counting Essentials</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-teal-300 mb-2">sort</h3>
                            <p className="text-sm">Organize data alphabetically or numerically</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-lime-300 mb-2">uniq</h3>
                            <p className="text-sm">Remove duplicates and count occurrences</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-green-300 mb-2">wc</h3>
                            <p className="text-sm">Count lines, words, and characters</p>
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
                @keyframes pulseCount {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-teal-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        The Data Processing Trio
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            These three simple tools—<code className="bg-gray-900 px-2 py-1 rounded">sort</code>, 
                            <code className="bg-gray-900 px-2 py-1 rounded">uniq</code>, and 
                            <code className="bg-gray-900 px-2 py-1 rounded">wc</code>—form the backbone of 
                            UNIX data processing. They're often used together in pipelines to organize, 
                            clean, and analyze text data efficiently.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-lime-500">
                            <h3 className="font-bold text-lime-300 mb-3">Why These Tools Are Essential</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    {icon: "📊", title: "Data Organization", desc: "Sort data for better analysis and presentation"},
                                    {icon: "🧹", title: "Data Cleaning", desc: "Remove duplicates and clean datasets"},
                                    {icon: "🔢", title: "Quick Statistics", desc: "Get basic counts and metrics instantly"},
                                    {icon: "⚡", title: "Lightweight", desc: "Process large files efficiently"},
                                    {icon: "🔗", title: "Pipeline Friendly", desc: "Combine seamlessly with other tools"},
                                    {icon: "🎯", title: "Simple Syntax", desc: "Easy to learn and remember"}
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/80 transition-colors duration-300 hover:scale-[1.02]"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-bold text-teal-300">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tools Visualization */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-lime-500/50 hover:shadow-lg hover:shadow-lime-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-lime-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        How These Tools Transform Data
                    </h2>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-8">
                            <svg width="800" height="320" className="hover:scale-[1.02] transition-transform duration-500">
                                <defs>
                                    <linearGradient id="sortGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#0d9488', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                                    </linearGradient>
                                    <linearGradient id="uniqGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#65a30d', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#4d7c0f', stopOpacity: 1}} />
                                    </linearGradient>
                                    <linearGradient id="wcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#16a34a', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#15803d', stopOpacity: 1}} />
                                    </linearGradient>
                                    <marker id="toolArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#0d9488" />
                                    </marker>
                                </defs>
                                
                                {/* Raw Data */}
                                <rect x="50" y="50" width="150" height="80" rx="10" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
                                <text x="125" y="30" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Raw Data</text>
                                <text x="125" y="70" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="monospace">banana</text>
                                <text x="125" y="85" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="monospace">apple</text>
                                <text x="125" y="100" textAnchor="middle" fill="#d1fae5" fontSize="12" fontFamily="monospace">banana</text>
                                
                                {/* Arrow to sort */}
                                <path d="M220,90 L270,90" fill="none" stroke="url(#sortGradient)" strokeWidth="3" markerEnd="url(#toolArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
                                </path>
                                
                                {/* sort Tool */}
                                <rect x="270" y="50" width="100" height="80" rx="10" fill="#134e4a" stroke="#0d9488" strokeWidth="2"
                                    className="hover:stroke-teal-400 transition-colors duration-300">
                                    <title>sort - Organizes data</title>
                                </rect>
                                <text x="320" y="70" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="bold">sort</text>
                                <text x="320" y="95" textAnchor="middle" fill="#a7f3d0" fontSize="11">Alphabetical/Numeric</text>
                                
                                {/* Arrow to uniq */}
                                <path d="M380,90 L430,90" fill="none" stroke="url(#uniqGradient)" strokeWidth="3" markerEnd="url(#toolArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" begin="0.3s" />
                                </path>
                                
                                {/* uniq Tool */}
                                <rect x="430" y="50" width="100" height="80" rx="10" fill="#14532d" stroke="#65a30d" strokeWidth="2"
                                    className="hover:stroke-lime-400 transition-colors duration-300">
                                    <title>uniq - Removes duplicates</title>
                                </rect>
                                <text x="480" y="70" textAnchor="middle" fill="#a3e635" fontSize="14" fontWeight="bold">uniq</text>
                                <text x="480" y="95" textAnchor="middle" fill="#d9f99d" fontSize="11">Deduplicate & Count</text>
                                
                                {/* Arrow to wc */}
                                <path d="M540,90 L590,90" fill="none" stroke="url(#wcGradient)" strokeWidth="3" markerEnd="url(#toolArrow)"
                                    strokeDasharray="5,3">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" begin="0.6s" />
                                </path>
                                
                                {/* wc Tool */}
                                <rect x="590" y="50" width="100" height="80" rx="10" fill="#052e16" stroke="#16a34a" strokeWidth="2"
                                    className="hover:stroke-green-400 transition-colors duration-300">
                                    <title>wc - Counts elements</title>
                                </rect>
                                <text x="640" y="70" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold">wc</text>
                                <text x="640" y="95" textAnchor="middle" fill="#86efac" fontSize="11">Lines, Words, Chars</text>
                                
                                {/* Data Transformation Flow */}
                                <g transform="translate(50, 150)">
                                    {/* Input Data */}
                                    <rect x="0" y="0" width="150" height="40" rx="5" fill="#374151" stroke="#6b7280" strokeWidth="1"/>
                                    <text x="75" y="15" textAnchor="middle" fill="#d1d5db" fontSize="11" fontWeight="bold">Input</text>
                                    <text x="75" y="30" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="monospace">banana\napple\nbanana</text>
                                    
                                    {/* After sort */}
                                    <rect x="220" y="0" width="100" height="40" rx="5" fill="#0f766e" stroke="#14b8a6" strokeWidth="1"/>
                                    <text x="270" y="15" textAnchor="middle" fill="#99f6e4" fontSize="11" fontWeight="bold">After sort</text>
                                    <text x="270" y="30" textAnchor="middle" fill="#5eead4" fontSize="10" fontFamily="monospace">apple\nbanana\nbanana</text>
                                    
                                    {/* After uniq */}
                                    <rect x="380" y="0" width="100" height="40" rx="5" fill="#166534" stroke="#22c55e" strokeWidth="1"/>
                                    <text x="430" y="15" textAnchor="middle" fill="#bbf7d0" fontSize="11" fontWeight="bold">After uniq</text>
                                    <text x="430" y="30" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="monospace">apple\nbanana</text>
                                    
                                    {/* After wc */}
                                    <rect x="540" y="0" width="100" height="40" rx="5" fill="#14532d" stroke="#4ade80" strokeWidth="1"/>
                                    <text x="590" y="15" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">After wc -l</text>
                                    <text x="590" y="30" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="monospace">2</text>
                                </g>
                                
                                {/* Final Output */}
                                <rect x="700" y="50" width="50" height="80" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2"/>
                                <text x="725" y="70" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">→</text>
                                <text x="725" y="95" textAnchor="middle" fill="#bfdbfe" fontSize="11">Result</text>
                                
                                {/* Counting Animation */}
                                <circle cx="640" cy="140" r="15" fill="#16a34a" opacity="0.7">
                                    <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <text x="640" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
                            </svg>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            {[
                                {tool: "sort", color: "teal", desc: "Organizes lines of text alphabetically or numerically"},
                                {tool: "uniq", color: "lime", desc: "Removes consecutive duplicate lines (requires sorted input)"},
                                {tool: "wc", color: "green", desc: "Counts lines, words, and characters in input"}
                            ].map((item, index) => (
                                <div key={index} className={`p-4 bg-${item.color}-900/20 rounded-lg border border-${item.color}-700/50`}>
                                    <h4 className={`font-bold text-${item.color}-300 mb-2`}>{item.tool}</h4>
                                    <p className="text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* sort Command */}
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
                        Mastering the sort Command
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-teal-300">sort: Data Organization Powerhouse</h3>
                                <span className="px-3 py-1 bg-teal-900/50 text-teal-300 rounded-full text-sm font-semibold">
                                    Alphabetical & Numerical
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Swadeep</strong> needs to organize product lists, student grades, 
                                and log entries for his store in Naihati:
                            </p>
                            <ShellFileLoader
                                fileModule={sortBasicsSh}
                                title="sort Command Examples"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-lime-300 mb-2">Common sort Options:</h4>
                                <div className="space-y-3">
                                    {[
                                        {opt: "-r", desc: "Reverse sort order (descending)"},
                                        {opt: "-n", desc: "Numeric sort (not alphabetical)"},
                                        {opt: "-k N", desc: "Sort by column N (1-indexed)"},
                                        {opt: "-u", desc: "Unique - output only first of equal lines"},
                                        {opt: "-f", desc: "Case-insensitive sort"},
                                        {opt: "-t','", desc: "Use comma as field separator"}
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 bg-gray-900/50 rounded">
                                            <code className="text-sm text-teal-300">{item.opt}</code>
                                            <span className="text-xs text-gray-400">{item.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Real-World Examples:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>sort -nr</code> - Sort numbers in descending order</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>sort -t':' -k3 -n</code> - Sort by 3rd colon-separated field numerically</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>sort -u</code> - Sort and remove duplicates in one pass</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* uniq Command */}
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
                        The uniq Command: Deduplication Master
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Understanding uniq</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-red-300 mb-2">CRITICAL:</h4>
                                <p className="text-sm">
                                    <code>uniq</code> only removes <span className="text-yellow-300">consecutive</span> duplicate lines. 
                                    You must <code>sort</code> first for complete deduplication!
                                </p>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Common uniq Options:</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span className="text-lime-300 font-bold">-c</span>
                                        <span>Count occurrences of each line</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-lime-300 font-bold">-d</span>
                                        <span>Only show duplicate lines</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-lime-300 font-bold">-u</span>
                                        <span>Only show unique lines (non-duplicates)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-lime-300 font-bold">-i</span>
                                        <span>Case-insensitive comparison</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div>
                            <ShellFileLoader
                                fileModule={uniqExamplesSh}
                                title="uniq Command Examples"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10]}
                            />
                            <div className="mt-4 bg-purple-900/20 p-4 rounded-lg border border-purple-700/50">
                                <h4 className="font-bold text-purple-300 mb-2">Key Insight:</h4>
                                <p className="text-sm">
                                    <code>uniq -c</code> is one of the most powerful combinations. 
                                    It adds a count column showing how many times each line appeared consecutively.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* wc Command */}
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
                        wc: Word Count and Beyond
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-blue-300">Counting Made Simple</h3>
                                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-semibold">
                                    Lines, Words, Characters
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Abhronila</strong> at Barrackpore College needs to count student submissions, 
                                analyze essay lengths, and monitor log file sizes:
                            </p>
                            <ShellFileLoader
                                fileModule={wcExamplesSh}
                                title="wc Command Examples"
                                highlightLines={[4, 5, 6, 7, 8, 9]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-teal-300 mb-2">wc -l</div>
                                <p className="text-sm">Count lines</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    cat file | wc -l
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-lime-300 mb-2">wc -w</div>
                                <p className="text-sm">Count words</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    echo "hello world" | wc -w
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-green-300 mb-2">wc -c</div>
                                <p className="text-sm">Count characters</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    echo "test" | wc -c
                                </code>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                            <h4 className="font-bold text-amber-300 mb-2">Pro Tip:</h4>
                            <p className="text-sm">
                                <code>wc</code> without options shows all three counts: 
                                <span className="text-teal-300"> lines</span>, 
                                <span className="text-lime-300"> words</span>, and 
                                <span className="text-green-300"> characters</span>. 
                                Use specific flags when you need just one count.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Combined Pipelines */}
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
                        Power Combinations
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-emerald-300">Classic UNIX Pipeline Patterns</h3>
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm font-semibold">
                                    sort | uniq | wc
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Tuhina</strong>, the school administrator in Shyamnagar, needs to 
                                analyze student data and generate reports using combined tools:
                            </p>
                            <ShellFileLoader
                                fileModule={combinedPipelineSh}
                                title="Combined Pipeline Examples"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11, 12]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-teal-300 mb-2">Most Common Pipeline:</h4>
                                <code className="text-sm block bg-gray-900 p-3 rounded mb-2">
                                    sort file | uniq -c | sort -nr
                                </code>
                                <p className="text-xs text-gray-400">
                                    Sort, count occurrences, then sort by count (descending)
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-lime-300 mb-2">Quick Analysis:</h4>
                                <code className="text-sm block bg-gray-900 p-3 rounded mb-2">
                                    cat file | wc -l && sort file | uniq | wc -l
                                </code>
                                <p className="text-xs text-gray-400">
                                    Count total lines and count unique lines
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
                        Common Pitfalls & Solutions
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">uniq Without sort</h4>
                                <p className="text-sm mb-2">Expecting uniq to remove all duplicates</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    echo -e "a\\nb\\na" | uniq
                                    # Output: a, b, a (not deduplicated!)
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">echo -e "a\\nb\\na" | sort | uniq</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Wrong Column Sorting</h4>
                                <p className="text-sm">Not specifying column for tabular data</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    sort data.csv  # Sorts by first column only
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Alphabetical vs Numeric</h4>
                                <p className="text-sm mb-2">Using default sort on numbers</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    {`echo -e "10\\n2\\n100" | sort
                                    # Output: 10, 100, 2 (alphabetical!)`}
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">echo -e "10\\n2\\n100" | sort -n</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">wc Count Includes Filename</h4>
                                <p className="text-sm">wc output includes filename when given argument</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    {`wc -l file.txt  # Output: "3 file.txt"
                                    wc -l < file.txt  # Output: "3" (no filename)`}
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
                        Professional Tips & Real-World Use
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-teal-300">Production Analysis</h3>
                            <ShellFileLoader
                                fileModule={realWorldAnalysisSh}
                                title="Real-World Log Analysis Pipeline"
                                highlightLines={[]}
                            />
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Pro Tips:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{`Use <code>sort -u</code> instead of <code>sort | uniq</code> for simple deduplication`}</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>wc -l</code> is great for counting files: <code>ls | wc -l</code></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Combine with <code>find</code>: <code>find . -name "*.log" | wc -l</code></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Use <code>sort -rnk2</code> to sort by second column numerically in reverse</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Performance Tips:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span><code>sort</code> can handle very large files with <code>-S</code> (buffer size)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Use <code>LC_ALL=C</code> before sort for faster ASCII sorting</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span><code>wc</code> is extremely fast even on multi-gigabyte files</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Pipe to <code>head</code> or <code>tail</code> to limit output</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-teal-900/30 to-lime-900/30 border border-teal-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-teal-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-teal-600 to-lime-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-teal-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-lime-300">Remember:</strong> These three tools are the 
                                    <span className="text-yellow-300"> Swiss Army knife</span> of data analysis. 
                                    Master them, and you can solve 80% of text processing problems.
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-yellow-300 mb-2">Mental Model:</h4>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-teal-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-teal-300">⇅</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">sort first</p>
                                                <p className="text-sm text-gray-400">Always sort before uniq</p>
                                                <code className="text-xs">sort | uniq</code>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-lime-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-lime-300">🔢</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Count with -c</p>
                                                <p className="text-sm text-gray-400">uniq -c adds counts</p>
                                                <code className="text-xs">uniq -c</code>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-green-300">📊</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">wc for metrics</p>
                                                <p className="text-sm text-gray-400">Quick line/word counts</p>
                                                <code className="text-xs">wc -l</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="font-bold">Sukanta Hui</p>
                                        <p className="text-sm text-gray-400">27 years experience in Data Analysis</p>
                                        <p className="text-sm text-gray-400">sukantahui@codernaccotax.co.in | 7003756860</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Skills: Data Processing, Log Analysis, Statistics</p>
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
                        Essential Commands Checklist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-teal-300">Command Options</h3>
                            <div className="space-y-3">
                                {[
                                    "sort -n: Numerical sort",
                                    "sort -r: Reverse order",
                                    "sort -u: Unique (sort & deduplicate)",
                                    "uniq -c: Count occurrences",
                                    "uniq -d: Show duplicates only",
                                    "wc -l: Count lines",
                                    "wc -w: Count words",
                                    "wc -c: Count characters"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-teal-900/50 rounded-full flex items-center justify-center group-hover:bg-teal-700 transition-colors duration-300">
                                            <span className="text-teal-300">{index + 1}</span>
                                        </div>
                                        <code className="text-sm">{item}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-lime-300">Common Pipelines</h3>
                            <div className="space-y-3">
                                {[
                                    "sort file | uniq: Remove duplicates",
                                    "sort file | uniq -c | sort -nr: Frequency analysis",
                                    "wc -l file: Count lines in file",
                                    "sort -t',' -k2 -n: Sort CSV by 2nd column",
                                    "uniq -c | sort -rn: Count and sort by frequency",
                                    "find . -name '*.txt' | wc -l: Count matching files",
                                    "cat file | wc -w: Count words in file",
                                    "sort | uniq -d: Find duplicate lines"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-lime-900/50 rounded-full flex items-center justify-center group-hover:bg-lime-700 transition-colors duration-300">
                                            <span className="text-lime-300">{index + 1}</span>
                                        </div>
                                        <code className="text-sm">{item}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hint Section */}
                <section 
                    className="bg-gradient-to-br from-lime-900/20 to-teal-900/20 border border-lime-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-lime-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '1s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-lime-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Swadeep has a log file with timestamps, how can he count how many 
                                entries occurred each hour using only sort, uniq, and wc?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "What's the difference between <code>sort -u</code> and 
                                <code>sort | uniq</code>? When would you use one over the other?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "How would you find the most common word in a text file using 
                                only these three commands and basic shell tools?"
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-teal-900/20 border border-teal-700/50 rounded-lg">
                        <p className="text-teal-200">
                            <strong>Hint:</strong> Remember that <code>uniq</code> works on consecutive lines. 
                            For timestamp analysis: extract the hour field, sort, then <code>uniq -c</code>. 
                            For word frequency: convert to one word per line, sort, then <code>uniq -c | sort -nr</code>.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 17: Sorting and Filtering Output Using sort, uniq, wc</p>
                    <p className="mt-2">Next Topic: Log File Analysis Using grep and awk</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic17;