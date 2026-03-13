import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import redirectionBasicsSh from "./topic16_files/redirection_basics.sh?raw";
import advancedRedirectionSh from "./topic16_files/advanced_redirection.sh?raw";
import teeExampleSh from "./topic16_files/tee_example.sh?raw";
import processSubstitutionSh from "./topic16_files/process_substitution.sh?raw";
import realWorldPipelineSh from "./topic16_files/real_world_pipeline.sh?raw";

const Topic16 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 to-sky-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-rose-600 to-sky-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent">
                                Topic 16: Text Processing with Pipes & Redirection
                            </h1>
                            <p className="text-gray-400 mt-2">Mastering UNIX I/O Streams: stdin, stdout, stderr</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-rose-300 mb-2">Core Concept</h3>
                            <p className="text-sm">Controlling where command input/output goes</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-sky-300 mb-2">Key Operators</h3>
                            <p className="text-sm">{`>, >>, <, |, 2>, &>, >>, <<`}</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-blue-300 mb-2">Real-World Use</h3>
                            <p className="text-sm">Logging, data pipelines, automation scripts</p>
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
                @keyframes pulseArrow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-rose-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Understanding UNIX Streams
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            Every UNIX process has three standard streams: 
                            <span className="text-rose-300"> stdin (0)</span> for input, 
                            <span className="text-sky-300"> stdout (1)</span> for normal output, and 
                            <span className="text-amber-300"> stderr (2)</span> for error messages. 
                            Redirection controls where these streams go.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-sky-500">
                            <h3 className="font-bold text-sky-300 mb-3">Why Redirection Matters</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    {icon: "📁", title: "Save Output", desc: "Store results in files for later use"},
                                    {icon: "📝", title: "Log Management", desc: "Separate logs from normal output"},
                                    {icon: "⚡", title: "Automation", desc: "Scripts that run without interaction"},
                                    {icon: "🔀", title: "Data Flow", desc: "Control where data goes in pipelines"},
                                    {icon: "🚫", title: "Error Handling", desc: "Capture and process error messages"},
                                    {icon: "🔄", title: "Feedback Loops", desc: "Output becomes input for other commands"}
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/80 transition-colors duration-300 hover:scale-[1.02]"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-bold text-rose-300">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Streams Visualization */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-sky-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        The Three Standard Streams
                    </h2>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-8">
                            <svg width="800" height="320" className="hover:scale-[1.02] transition-transform duration-500">
                                <defs>
                                    <linearGradient id="stdinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#f43f5e', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#be185d', stopOpacity: 1}} />
                                    </linearGradient>
                                    <linearGradient id="stdoutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#0ea5e9', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#0369a1', stopOpacity: 1}} />
                                    </linearGradient>
                                    <linearGradient id="stderrGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#b45309', stopOpacity: 1}} />
                                    </linearGradient>
                                    <marker id="arrowHead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9" />
                                    </marker>
                                </defs>
                                
                                {/* Command Process */}
                                <rect x="300" y="100" width="200" height="120" rx="15" fill="#1e293b" stroke="#475569" strokeWidth="3"/>
                                <text x="400" y="140" textAnchor="middle" fill="#f8fafc" fontSize="20" fontWeight="bold">Command</text>
                                <text x="400" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="14">ls -la</text>
                                
                                {/* stdin (0) - Input */}
                                <path d="M100,160 L300,160" fill="none" stroke="url(#stdinGradient)" strokeWidth="4" 
                                    strokeDasharray="10,5" markerEnd="url(#arrowHead)">
                                    <animate attributeName="stroke-dashoffset" from="0" to="15" dur="2s" repeatCount="indefinite" />
                                </path>
                                <rect x="50" y="130" width="50" height="60" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2">
                                    <title>Standard Input (0)</title>
                                </rect>
                                <text x="75" y="160" textAnchor="middle" fill="#fda4af" fontSize="14" fontWeight="bold">stdin</text>
                                <text x="75" y="180" textAnchor="middle" fill="#fda4af" fontSize="10">(0)</text>
                                
                                {/* stdout (1) - Output */}
                                <path d="M500,160 L700,160" fill="none" stroke="url(#stdoutGradient)" strokeWidth="4" 
                                    strokeDasharray="10,5" markerEnd="url(#arrowHead)">
                                    <animate attributeName="stroke-dashoffset" from="0" to="15" dur="2s" repeatCount="indefinite" begin="0.5s" />
                                </path>
                                <rect x="700" y="130" width="50" height="60" rx="8" fill="#0c4a6e" stroke="#0ea5e9" strokeWidth="2">
                                    <title>Standard Output (1)</title>
                                </rect>
                                <text x="725" y="160" textAnchor="middle" fill="#7dd3fc" fontSize="14" fontWeight="bold">stdout</text>
                                <text x="725" y="180" textAnchor="middle" fill="#7dd3fc" fontSize="10">(1)</text>
                                
                                {/* stderr (2) - Error */}
                                <path d="M500,200 L700,240" fill="none" stroke="url(#stderrGradient)" strokeWidth="4" 
                                    strokeDasharray="10,5" markerEnd="url(#arrowHead)">
                                    <animate attributeName="stroke-dashoffset" from="0" to="15" dur="2s" repeatCount="indefinite" begin="1s" />
                                </path>
                                <rect x="700" y="230" width="50" height="60" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2">
                                    <title>Standard Error (2)</title>
                                </rect>
                                <text x="725" y="260" textAnchor="middle" fill="#fcd34d" fontSize="14" fontWeight="bold">stderr</text>
                                <text x="725" y="280" textAnchor="middle" fill="#fcd34d" fontSize="10">(2)</text>
                                
                                {/* Legend */}
                                <g transform="translate(50, 250)">
                                    <rect x="0" y="0" width="300" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                                    <text x="150" y="20" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">Redirection Operators</text>
                                    <g transform="translate(20, 35)">
                                        <rect x="0" y="0" width="20" height="20" rx="4" fill="#881337"/>
                                        <text x="10" y="14" textAnchor="middle" fill="#fda4af" fontSize="10">stdin</text>
                                        <text x="40" y="14" textAnchor="start" fill="#cbd5e1" fontSize="12">&lt;, &lt;&lt;</text>
                                        
                                        <rect x="80" y="0" width="20" height="20" rx="4" fill="#0c4a6e"/>
                                        <text x="90" y="14" textAnchor="middle" fill="#7dd3fc" fontSize="10">stdout</text>
                                        <text x="120" y="14" textAnchor="start" fill="#cbd5e1" fontSize="12">&gt;, &gt;&gt;, |</text>
                                        
                                        <rect x="180" y="0" width="20" height="20" rx="4" fill="#78350f"/>
                                        <text x="190" y="14" textAnchor="middle" fill="#fcd34d" fontSize="10">stderr</text>
                                        <text x="220" y="14" textAnchor="start" fill="#cbd5e1" fontSize="12">2&gt;, 2&gt;&gt;</text>
                                    </g>
                                </g>
                                
                                {/* Data Flow Animation */}
                                <circle cx="100" cy="160" r="6" fill="#f43f5e" opacity="0.8">
                                    <animate attributeName="cx" from="100" to="300" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="500" cy="160" r="6" fill="#0ea5e9" opacity="0.8">
                                    <animate attributeName="cx" from="500" to="700" dur="3s" repeatCount="indefinite" begin="1s" />
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
                                </circle>
                                <circle cx="500" cy="200" r="6" fill="#f59e0b" opacity="0.8">
                                    <animate attributeName="cx" from="500" to="700" dur="3s" repeatCount="indefinite" begin="2s" />
                                    <animate attributeName="cy" from="200" to="240" dur="3s" repeatCount="indefinite" begin="2s" />
                                    <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="2s" />
                                </circle>
                            </svg>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mt-6">
                            {[
                                {stream: "stdin (0)", color: "rose", desc: "Standard Input - Keyboard or file input"},
                                {stream: "stdout (1)", color: "sky", desc: "Standard Output - Normal program output"},
                                {stream: "stderr (2)", color: "amber", desc: "Standard Error - Error messages"}
                            ].map((item, index) => (
                                <div key={index} className={`p-4 bg-${item.color}-900/20 rounded-lg border border-${item.color}-700/50`}>
                                    <h4 className={`font-bold text-${item.color}-300 mb-2`}>{item.stream}</h4>
                                    <p className="text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Basic Redirection */}
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
                        Basic Redirection Operators
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-rose-300">Essential Redirection Patterns</h3>
                                <span className="px-3 py-1 bg-rose-900/50 text-rose-300 rounded-full text-sm font-semibold">
                                    {`>, >>, <, 2>`}
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Swadeep</strong> needs to save command output to files, append to logs, 
                                and handle errors properly in his automation scripts:
                            </p>
                            <ShellFileLoader
                                fileModule={redirectionBasicsSh}
                                title="Basic Redirection Examples"
                                highlightLines={[]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-sky-300 mb-2">Output Redirection:</h4>
                                <div className="space-y-4">
                                    <div className="p-3 bg-gray-900/50 rounded">
                                        <code className="text-sm">{`command > file.txt`}</code>
                                        <p className="text-xs text-gray-400 mt-1">Overwrite file with output</p>
                                    </div>
                                    <div className="p-3 bg-gray-900/50 rounded">
                                        <code className="text-sm">{`command >> file.txt`}</code>
                                        <p className="text-xs text-gray-400 mt-1">Append output to file</p>
                                    </div>
                                    <div className="p-3 bg-gray-900/50 rounded">
                                        <code className="text-sm">{`command 2> error.log`}</code>
                                        <p className="text-xs text-gray-400 mt-1">Redirect errors to file</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-rose-300 mb-2">Input Redirection:</h4>
                                <div className="space-y-4">
                                    <div className="p-3 bg-gray-900/50 rounded">
                                        <code className="text-sm">{`command < input.txt`}</code>
                                        <p className="text-xs text-gray-400 mt-1">Read input from file</p>
                                    </div>
                                    <div className="p-3 bg-gray-900/50 rounded">
                                        <code className="text-sm">{`command << "EOF"`}</code>
                                        <p className="text-xs text-gray-400 mt-1">Here document - inline input</p>
                                    </div>
                                    <div className="p-3 bg-gray-900/50 rounded">
                                        <code className="text-sm">command1 | command2</code>
                                        <p className="text-xs text-gray-400 mt-1">Pipe stdout to stdin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advanced Redirection */}
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
                        Advanced Redirection Techniques
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Professional Redirection Patterns</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-amber-300 mb-2">Real-World Challenge:</h4>
                                <p className="text-sm">
                                    <strong>Abhronila</strong> needs to run scripts that:
                                </p>
                                <ul className="text-xs text-gray-400 mt-2 space-y-1">
                                    <li>• Save both output AND errors to different files</li>
                                    <li>• Discard error messages completely</li>
                                    <li>• Send output to multiple places simultaneously</li>
                                    <li>• Use output as input for other commands</li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Advanced Operators:</h4>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="text-rose-300 font-bold">&</span>
                                        <span><code>&></code> - Redirect both stdout and stderr</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sky-300 font-bold">|&</span>
                                        <span><code>|&</code> - Pipe both stdout and stderr</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-300 font-bold">{`>&`}</span>
                                        <span><code>2>&1</code> - Redirect stderr to stdout</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-purple-300 font-bold">{`>()`}</span>
                                        <span><code>>(command)</code> - Process substitution</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div>
                            <ShellFileLoader
                                fileModule={advancedRedirectionSh}
                                title="Advanced Redirection Examples"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11]}
                            />
                            <div className="mt-4 bg-purple-900/20 p-4 rounded-lg border border-purple-700/50">
                                <h4 className="font-bold text-purple-300 mb-2">Key Patterns:</h4>
                                <p className="text-sm">
                                    <code>2>&1</code> is read as "redirect file descriptor 2 (stderr) 
                                    to where file descriptor 1 (stdout) currently goes"
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* tee Command */}
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
                        The Power of tee: Split Streams
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-blue-300">tee - T-shaped Pipe</h3>
                                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-semibold">
                                    Split Output
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Tuhina</strong> needs to both see output on screen AND save it to a file 
                                simultaneously for debugging her scripts:
                            </p>
                            <ShellFileLoader
                                fileModule={teeExampleSh}
                                title="Using tee for Output Splitting"
                                highlightLines={[4, 5, 6, 7, 8, 9]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-rose-300 mb-2">tee file.txt</div>
                                <p className="text-sm">Save to file AND pass to next command</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    command | tee output.log
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-sky-300 mb-2">tee -a</div>
                                <p className="text-sm">Append instead of overwrite</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    command | tee -a logfile
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-amber-300 mb-2">tee /dev/tty</div>
                                <p className="text-sm">Force output to terminal</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    command | tee /dev/tty | wc -l
                                </code>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">Debugging with tee:</h4>
                            <p className="text-sm">
                                Use <code>tee</code> in pipelines to save intermediate results. 
                                For example: <code>grep pattern file | tee filtered.txt | wc -l</code> 
                                saves filtered results while counting lines.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Process Substitution */}
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
                        Process Substitution: Next Level Redirection
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-emerald-300">Treat Output as Files</h3>
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm font-semibold">
                                    {`<( ) and >( )`}
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Debangshu</strong> needs to compare output of two commands or 
                                feed command output to tools that expect filenames:
                            </p>
                            <ShellFileLoader
                                fileModule={processSubstitutionSh}
                                title="Process Substitution Examples"
                                highlightLines={[]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-rose-300 mb-2">Input Substitution</h4>
                                <code className="text-sm block bg-gray-900 p-3 rounded mb-2">
                                    diff &lt;(sort file1) &lt;(sort file2)
                                </code>
                                <p className="text-xs text-gray-400">
                                    Compare sorted versions without creating temporary files
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-sky-300 mb-2">Output Substitution</h4>
                                <code className="text-sm block bg-gray-900 p-3 rounded mb-2">
                                    command &gt;(grep pattern) &gt;(wc -l)
                                </code>
                                <p className="text-xs text-gray-400">
                                    Send output to multiple commands simultaneously
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-700/50">
                            <h4 className="font-bold text-amber-300 mb-2">How It Works:</h4>
                            <p className="text-sm">
                                Bash creates a named pipe (FIFO) or uses <code>/dev/fd</code> to make 
                                command output appear as a file. The command inside <code>&lt;( )</code> 
                                runs, and its output is presented as a file path that the outer command can read.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Real-World Pipeline */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.6s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-amber-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.338 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Common Pitfalls & Solutions
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Order Matters!</h4>
                                <p className="text-sm mb-2">Redirection order affects results</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    {`command 2>&1 > file.txt  # WRONG!`}
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Correct order:</p>
                                    <code className="text-xs">{`command > file.txt 2>&1`}</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Truncating Files</h4>
                                <p className="text-sm"><code>&gt;</code> overwrites, <code>&gt;&gt;</code> appends</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    {`echo "test" > file.txt  # Overwrites entire file!`}
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Here Document Traps</h4>
                                <p className="text-sm">Whitespace matters in here documents</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    {`cat << EOF
                                        indented text
                                    EOF  # Includes indentation!`}
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">{`cat <<-EOF`}</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Pipe vs Redirect</h4>
                                <p className="text-sm">Pipes connect processes, redirects connect to files</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    {`echo "data" > grep "pattern"  # WRONG!
                                    echo "data" | grep "pattern"  # CORRECT`}
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
                        Professional Pipeline Patterns
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-rose-300">Production-Grade Pipelines</h3>
                            <ShellFileLoader
                                fileModule={realWorldPipelineSh}
                                title="Complete Production Pipeline"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11, 12]}
                            />
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Best Practices:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Always redirect stderr for production scripts</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Use <code>tee</code> for debugging complex pipelines</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Clean up temporary files with <code>trap</code></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Use process substitution to avoid temp files</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Performance Tips:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Use <code>{`&>`}</code> instead of <code>&gt; file 2&gt;&1</code> for brevity</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span><code>/dev/null</code> discards output efficiently</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Group commands with <code>{`{ }`}</code> for single redirection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Use <code>exec</code> to redirect all subsequent output</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-rose-900/30 to-sky-900/30 border border-rose-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-rose-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-rose-600 to-sky-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-rose-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-sky-300">Remember:</strong> Redirection is about 
                                    <span className="text-yellow-300"> controlling data flow</span>. Think of 
                                    <code>&gt;</code> and <code>&lt;</code> as arrows showing where data goes.
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-yellow-300 mb-2">Mental Model:</h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-rose-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-rose-300">→</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Output Redirection</p>
                                                <p className="text-sm text-gray-400">Command → File</p>
                                                <code className="text-xs">ls &gt; files.txt</code>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-sky-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-sky-300">←</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Input Redirection</p>
                                                <p className="text-sm text-gray-400">File → Command</p>
                                                <code className="text-xs">sort &lt; data.txt</code>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-amber-300">⇄</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Pipes</p>
                                                <p className="text-sm text-gray-400">Command → Command</p>
                                                <code className="text-xs">ls | wc -l</code>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-300">↻</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">Process Substitution</p>
                                                <p className="text-sm text-gray-400">Command → "File" → Command</p>
                                                <code className="text-xs">diff &lt;(cmd1) &lt;(cmd2)</code>
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
                                        <p className="text-sm text-gray-400">Skills: Shell Scripting, I/O Redirection, System Automation</p>
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
                        Redirection & Pipeline Checklist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-rose-300">Basic Operations</h3>
                            <div className="space-y-3">
                                {[
                                    "> file - Overwrite file with output",
                                    ">> file - Append output to file",
                                    "< file - Read input from file",
                                    "2> file - Redirect errors to file",
                                    "| command - Pipe output to another command",
                                    "&> file - Redirect both stdout and stderr"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-rose-900/50 rounded-full flex items-center justify-center group-hover:bg-rose-700 transition-colors duration-300">
                                            <span className="text-rose-300">{index + 1}</span>
                                        </div>
                                        <code className="text-sm">{item}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-sky-300">Advanced Techniques</h3>
                            <div className="space-y-3">
                                {[
                                    "tee file - Save AND display output",
                                    "2>&1 - Redirect stderr to stdout",
                                    "<< EOF - Here document (multiline input)",
                                    ">(cmd) - Process substitution output",
                                    "<(cmd) - Process substitution input",
                                    "exec > file - Redirect all subsequent output"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-sky-900/50 rounded-full flex items-center justify-center group-hover:bg-sky-700 transition-colors duration-300">
                                            <span className="text-sky-300">{index + 1}</span>
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
                    className="bg-gradient-to-br from-sky-900/20 to-rose-900/20 border border-sky-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-sky-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '1s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-sky-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Swadeep runs <code>command &gt; file 2&gt;&amp;1</code> and 
                                <code>command 2&gt;&amp;1 &gt; file</code>, what's the difference in output?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "How would you create a pipeline that saves normal output to one file, 
                                errors to another, AND displays everything on screen simultaneously?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "What happens when you redirect to <code>/dev/null</code> vs 
                                <code>/dev/zero</code> vs <code>/dev/random</code>?"
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-rose-900/20 border border-rose-700/50 rounded-lg">
                        <p className="text-rose-200">
                            <strong>Hint:</strong> Remember the order: redirection happens left to right. 
                            <code>2&gt;&amp;1 &gt; file</code> means "send stderr to current stdout (terminal), 
                            THEN redirect stdout to file". Test with: <code>ls nofile &gt; out 2&gt;&amp;1</code> 
                            vs <code>ls nofile 2&gt;&amp;1 &gt; out</code>
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 16: Text Processing with Pipes and Redirection</p>
                    <p className="mt-2">Next Topic: Sorting and Filtering Output Using sort, uniq, wc</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic16;