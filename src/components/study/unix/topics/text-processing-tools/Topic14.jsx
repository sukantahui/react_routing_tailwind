import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import csvBasicSh from "./topic14_files/csv_basic.sh?raw";
import csvQuotedSh from "./topic14_files/csv_quoted.sh?raw";
import csvMultiDelimiterSh from "./topic14_files/csv_multi_delimiter.sh?raw";
import csvRealWorldSh from "./topic14_files/csv_real_world.sh?raw";
import csvAdvancedSh from "./topic14_files/csv_advanced.sh?raw";

const Topic14 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                                Topic 14: CSV & Delimited Files in awk
                            </h1>
                            <p className="text-gray-400 mt-2">Mastering structured data processing with field separators</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-amber-300 mb-2">Core Concept</h3>
                            <p className="text-sm">Field separation: CSV, TSV, custom delimiters</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-orange-300 mb-2">Key Variables</h3>
                            <p className="text-sm">FS (Field Separator), OFS (Output Field Separator)</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-yellow-300 mb-2">Real-World Use</h3>
                            <p className="text-sm">Data import/export, ETL pipelines, reports</p>
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
                @keyframes delimiterPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-amber-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Understanding Delimited Files
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            Delimited files use specific <span className="text-amber-300">separator characters</span> to distinguish 
                            between fields (columns). While space is awk's default separator, real-world data uses 
                            various delimiters like commas, tabs, pipes, or custom characters.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-orange-500">
                            <h3 className="font-bold text-orange-300 mb-3">Common Delimited File Formats</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {type: "CSV", delimiter: ",", desc: "Comma Separated Values - Most common for spreadsheets", color: "bg-green-900/30"},
                                    {type: "TSV", delimiter: "\\t", desc: "Tab Separated Values - Common in logs and databases", color: "bg-blue-900/30"},
                                    {type: "PSV", delimiter: "|", desc: "Pipe Separated Values - Used in database exports", color: "bg-purple-900/30"},
                                    {type: "SSV", delimiter: ";", desc: "Semicolon Separated - European CSV alternative", color: "bg-red-900/30"}
                                ].map((format, index) => (
                                    <div 
                                        key={index}
                                        className={`p-4 rounded-lg border ${format.color} hover:scale-[1.02] transition-all duration-300`}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-lg text-white">{format.type}</h4>
                                            <code className="px-2 py-1 bg-gray-800 rounded text-sm">{format.delimiter}</code>
                                        </div>
                                        <p className="text-sm text-gray-300">{format.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Field Separators Visualization */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-orange-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        How Field Separation Works
                    </h2>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-8">
                            <svg width="700" height="250" className="hover:scale-[1.02] transition-transform duration-500">
                                <defs>
                                    <linearGradient id="csvGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#f97316', stopOpacity: 1}} />
                                    </linearGradient>
                                    <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                                    </marker>
                                </defs>
                                
                                {/* Raw CSV Line */}
                                <rect x="50" y="50" width="600" height="40" rx="8" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
                                <text x="350" y="30" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">Raw CSV Line</text>
                                
                                <text x="80" y="75" textAnchor="middle" fill="#fbbf24" fontSize="14" fontFamily="monospace">John</text>
                                <text x="80" y="95" textAnchor="middle" fill="#9ca3af" fontSize="10">Field 1</text>
                                
                                <text x="150" y="75" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">,</text>
                                <circle cx="150" cy="70" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5">
                                    <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" />
                                    <title>Field Separator (comma)</title>
                                </circle>
                                
                                <text x="220" y="75" textAnchor="middle" fill="#fbbf24" fontSize="14" fontFamily="monospace">Doe</text>
                                <text x="220" y="95" textAnchor="middle" fill="#9ca3af" fontSize="10">Field 2</text>
                                
                                <text x="290" y="75" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">,</text>
                                <circle cx="290" cy="70" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5">
                                    <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" begin="0.3s" />
                                </circle>
                                
                                <text x="360" y="75" textAnchor="middle" fill="#fbbf24" fontSize="14" fontFamily="monospace">25</text>
                                <text x="360" y="95" textAnchor="middle" fill="#9ca3af" fontSize="10">Field 3</text>
                                
                                <text x="430" y="75" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">,</text>
                                <circle cx="430" cy="70" r="15" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5">
                                    <animate attributeName="r" values="15;20;15" dur="2s" repeatCount="indefinite" begin="0.6s" />
                                </circle>
                                
                                <text x="500" y="75" textAnchor="middle" fill="#fbbf24" fontSize="14" fontFamily="monospace">"New York, NY"</text>
                                <text x="500" y="95" textAnchor="middle" fill="#9ca3af" fontSize="10">Field 4 (quoted)</text>
                                
                                {/* Processing Arrow */}
                                <path d="M350,100 L350,150" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" 
                                    strokeDasharray="5,5">
                                    <animate attributeName="stroke-dashoffset" from="0" to="10" dur="2s" repeatCount="indefinite" />
                                </path>
                                
                                {/* Parsed Result */}
                                <rect x="50" y="180" width="600" height="40" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2"/>
                                <text x="350" y="160" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">After FS="," Processing</text>
                                
                                <g>
                                    <rect x="60" y="185" width="60" height="30" rx="4" fill="#065f46" className="hover:fill-emerald-700 transition-colors duration-300">
                                        <animate attributeName="fill" values="#065f46;#047857;#065f46" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="90" y="205" textAnchor="middle" fill="#d1fae5" fontSize="12">$1="John"</text>
                                </g>
                                
                                <g>
                                    <rect x="140" y="185" width="60" height="30" rx="4" fill="#065f46" className="hover:fill-emerald-700 transition-colors duration-300">
                                        <animate attributeName="fill" values="#065f46;#047857;#065f46" dur="3s" repeatCount="indefinite" begin="0.3s" />
                                    </rect>
                                    <text x="170" y="205" textAnchor="middle" fill="#d1fae5" fontSize="12">$2="Doe"</text>
                                </g>
                                
                                <g>
                                    <rect x="220" y="185" width="60" height="30" rx="4" fill="#065f46" className="hover:fill-emerald-700 transition-colors duration-300">
                                        <animate attributeName="fill" values="#065f46;#047857;#065f46" dur="3s" repeatCount="indefinite" begin="0.6s" />
                                    </rect>
                                    <text x="250" y="205" textAnchor="middle" fill="#d1fae5" fontSize="12">$3="25"</text>
                                </g>
                                
                                <g>
                                    <rect x="300" y="185" width="120" height="30" rx="4" fill="#065f46" className="hover:fill-emerald-700 transition-colors duration-300">
                                        <animate attributeName="fill" values="#065f46;#047857;#065f46" dur="3s" repeatCount="indefinite" begin="0.9s" />
                                    </rect>
                                    <text x="360" y="205" textAnchor="middle" fill="#d1fae5" fontSize="12">$4="New York, NY"</text>
                                    <text x="360" y="220" textAnchor="middle" fill="#86efac" fontSize="8">(comma preserved in quotes)</text>
                                </g>
                            </svg>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="p-4 bg-amber-900/20 rounded-lg border border-amber-700/50">
                                <h4 className="font-bold text-amber-300 mb-2">FS - Field Separator</h4>
                                <p className="text-sm mb-2">Tells awk how to split input lines into fields</p>
                                <code className="text-xs block bg-gray-800 p-2 rounded">
                                    {`BEGIN { FS = "," }  # CSV files`}
                                </code>
                                <code className="text-xs block bg-gray-800 p-2 rounded mt-1">
                                    {`BEGIN { FS = "\\t" }  # TSV files`}
                                </code>
                            </div>
                            
                            <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-700/50">
                                <h4 className="font-bold text-orange-300 mb-2">OFS - Output Field Separator</h4>
                                <p className="text-sm mb-2">Controls separator when printing multiple fields</p>
                                <code className="text-xs block bg-gray-800 p-2 rounded">
                                    {`BEGIN { OFS = "|" }  # Output as PSV`}
                                </code>
                                <code className="text-xs block bg-gray-800 p-2 rounded mt-1">
                                    print $1, $2, $3  # Uses OFS between fields
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Basic CSV Processing */}
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
                        Basic CSV Processing
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-amber-300">Simple CSV Reading</h3>
                                <span className="px-3 py-1 bg-amber-900/50 text-amber-300 rounded-full text-sm font-semibold">
                                    FS = ","
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Swadeep</strong> from Naihati has a CSV export from his store's POS system. 
                                He needs to process sales data:
                            </p>
                            <ShellFileLoader
                                fileModule={csvBasicSh}
                                title="Basic CSV Processing with awk"
                                highlightLines={[3, 5, 6, 7]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-emerald-300 mb-2">Input CSV Structure</h4>
                                <pre className="text-sm font-mono bg-gray-900 p-3 rounded">
{`Product,Quantity,Price,Date
Laptop,5,45999.99,2024-01-15
Mouse,25,849.50,2024-01-15
Keyboard,12,1299.00,2024-01-16`}
                                </pre>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-blue-300 mb-2">Key Points</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>FS = ","</code> tells awk to split on commas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>$1, $2, $3</code> now refer to comma-separated columns</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Header row (<code>NR == 1</code>) can be skipped if needed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Handling Quoted CSV */}
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
                        Advanced: Quoted Fields & Escaping
                    </h2>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">The Quoted CSV Problem</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-red-300 mb-2">Problematic CSV:</h4>
                                <pre className="text-sm font-mono">
{`Name,Address,Age
John Doe,"123 Main St, Apt 4B",25
Jane Smith,"456 Oak Ave, Springfield",30`}
                                </pre>
                                <p className="text-sm text-gray-400 mt-2">
                                    The comma in "123 Main St, Apt 4B" should NOT be treated as a field separator!
                                </p>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Solution Approaches:</h4>
                                <ol className="space-y-3 pl-5">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300 font-bold">1.</span>
                                        <span>Use <code>FPAT</code> (Field Pattern) for complex CSV</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300 font-bold">2.</span>
                                        <span>Pre-process with <code>sed</code> to handle quotes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300 font-bold">3.</span>
                                        <span>Use <code>gawk</code>'s <code>--csv</code> option (GNU awk 4.2+)</span>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        
                        <div>
                            <ShellFileLoader
                                fileModule={csvQuotedSh}
                                title="Processing Quoted CSV Fields"
                                highlightLines={[4, 5, 6, 7, 8]}
                            />
                            <div className="mt-4 bg-purple-900/20 p-4 rounded-lg border border-purple-700/50">
                                <h4 className="font-bold text-purple-300 mb-2">How FPAT Works:</h4>
                                <p className="text-sm">
                                    <code>FPAT</code> defines what a field looks like rather than what separates fields. 
                                    The pattern <code>[^,]*|"[^"]*"</code> means: "non-comma sequence OR quoted string".
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Multiple Delimiters */}
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
                        Multiple & Custom Delimiters
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 text-blue-300">Complex Data Formats</h3>
                            <p className="mb-4">
                                <strong>Abhronila</strong> at Barrackpore College receives data from different 
                                systems with various delimiter formats. She needs a flexible solution:
                            </p>
                            <ShellFileLoader
                                fileModule={csvMultiDelimiterSh}
                                title="Handling Multiple Delimiter Formats"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-amber-300 mb-2">FS = ","</div>
                                <p className="text-sm">Standard CSV format</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    a,b,c → $1="a", $2="b", $3="c"
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-green-300 mb-2">FS = "[:;]"</div>
                                <p className="text-sm">Colon OR semicolon</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    a:b;c → $1="a", $2="b", $3="c"
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-purple-300 mb-2">FS = "\\t"</div>
                                <p className="text-sm">Tab-separated (TSV)</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    a\\tb\\tc → $1="a", $2="b", $3="c"
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Real-World Example */}
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
                        Real-World: Student Database Processing
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-emerald-300">School Database Export</h3>
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm font-semibold">
                                    Production Scenario
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Tuhina</strong>, the school administrator in Shyamnagar, needs to process 
                                student data exported from their legacy system with mixed formats:
                            </p>
                            <ShellFileLoader
                                fileModule={csvRealWorldSh}
                                title="School Database Processing Pipeline"
                                highlightLines={[4, 5, 6, 10, 11, 12, 13, 14, 15]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Input Challenges:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Mixed delimiters (comma, pipe)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Missing values (empty fields)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Inconsistent quoting</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Header rows to skip</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Processing Strategy:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Detect delimiter automatically</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Handle missing values gracefully</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Clean and normalize data</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Generate formatted reports</span>
                                    </li>
                                </ul>
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
                                <h4 className="font-bold text-red-300 mb-2">Forgot to Set FS</h4>
                                <p className="text-sm mb-2">Using default space separator on CSV data</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    John,Doe,25 → $1="John,Doe,25", $2="", $3=""
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">{`BEGIN { FS = "," }`}</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Commas in Quoted Fields</h4>
                                <p className="text-sm">Field splitting breaks quoted fields with commas</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    "New York, NY" → $1="\"New York", $2=" NY\""
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Empty/Null Fields</h4>
                                <p className="text-sm mb-2">Missing values shift field numbering</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    a,,c → $1="a", $2="", $3="c"
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Check:</p>
                                    <code className="text-xs">if ($3 == "") print "Field 3 is empty"</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Trailing Delimiters</h4>
                                <p className="text-sm">Extra delimiter creates empty last field</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    a,b, → $1="a", $2="b", $3=""
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
                        Professional Tips & Best Practices
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-amber-300">Industry Best Practices</h3>
                            <ShellFileLoader
                                fileModule={csvAdvancedSh}
                                title="Robust CSV Processing Script"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 15, 16, 17]}
                            />
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Validation Checklist</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Always check <code>NF</code> (Number of Fields) for consistency</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Use <code>OFS</code> for consistent output formatting</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Handle header rows separately (<code>NR == 1</code>)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Validate data types (strings vs numbers)</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-blue-300 mb-2">Performance Tips</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300">⚡</span>
                                        <span>Set FS/OFS in BEGIN block (not per record)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300">⚡</span>
                                        <span>Use <code>getline</code> for very large files</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300">⚡</span>
                                        <span>Process files in chunks for memory efficiency</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-amber-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-amber-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-orange-300">Remember:</strong> CSV processing is 90% about 
                                    understanding your data's structure. Before writing any awk code, 
                                    <span className="text-yellow-300"> inspect sample data</span> to identify:
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-yellow-300 mb-2">Data Inspection Checklist:</h4>
                                    <ul className="grid md:grid-cols-2 gap-2">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span>What delimiter is used?</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span>Are fields quoted?</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span>Any embedded delimiters?</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span>Missing/empty fields?</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span>Header row present?</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span>Consistent field count?</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="font-bold">Sukanta Hui</p>
                                        <p className="text-sm text-gray-400">27 years experience in Data Processing</p>
                                        <p className="text-sm text-gray-400">sukantahui@codernaccotax.co.in | 7003756860</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Skills: awk, CSV Processing, ETL, Data Migration</p>
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
                        CSV Processing Checklist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-amber-300">Setup & Configuration</h3>
                            <div className="space-y-3">
                                {[
                                    "Set FS to correct delimiter (comma, tab, pipe, etc.)",
                                    "Configure OFS for output formatting",
                                    "Handle header row if present (NR > 1)",
                                    "Validate field count consistency (check NF)",
                                    "Initialize variables in BEGIN block",
                                    "Test with small sample first"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-amber-900/50 rounded-full flex items-center justify-center group-hover:bg-amber-700 transition-colors duration-300">
                                            <span className="text-amber-300">{index + 1}</span>
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-orange-300">Data Quality & Handling</h3>
                            <div className="space-y-3">
                                {[
                                    "Check for quoted fields with embedded delimiters",
                                    "Handle empty/missing fields gracefully",
                                    "Validate data types (string vs numeric)",
                                    "Clean and normalize string values",
                                    "Handle different character encodings",
                                    "Log processing errors for debugging"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-orange-900/50 rounded-full flex items-center justify-center group-hover:bg-orange-700 transition-colors duration-300">
                                            <span className="text-orange-300">{index + 1}</span>
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
                    className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 border border-orange-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-orange-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '1s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-orange-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Debangshu receives CSV data where some fields contain the delimiter character 
                                (like addresses with commas), how can he process it without breaking fields?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "What happens when you have a CSV file with inconsistent delimiters 
                                (some lines use comma, others use semicolon)? How would you detect and handle this?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "How would you convert a pipe-delimited file to CSV format while preserving 
                                any pipes that might appear within the actual data fields?"
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
                        <p className="text-amber-200">
                            <strong>Hint:</strong> Start by examining a few lines of your data with 
                            <code className="mx-1 px-1 bg-black/50 rounded">head -n 5 file.csv</code>
                            and 
                            <code className="mx-1 px-1 bg-black/50 rounded">cat -A file.csv</code>
                            (shows invisible characters).
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 14: Working with CSV and Delimited Files Using awk</p>
                    <p className="mt-2">Next Topic: Pipelines - Combining grep, sed, awk</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic14;