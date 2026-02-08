import React from 'react';
import clsx from 'clsx';
import ShellFileLoader from "../../../../../common/ShellFileLoader";
import logBasicsSh from "./topic18_files/log_basics.sh?raw";
import errorAnalysisSh from "./topic18_files/error_analysis.sh?raw";
import performanceAnalysisSh from "./topic18_files/performance_analysis.sh?raw";
import securityAnalysisSh from "./topic18_files/security_analysis.sh?raw";
import productionPipelineSh from "./topic18_files/production_pipeline.sh?raw";

const Topic18 = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-200 p-6 md:p-8 lg:p-12 font-sans dark">
            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-fuchsia-900/20 rounded-3xl blur-xl"></div>
                <div 
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 
                    transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-900/30 
                    animate-[fadeIn_0.8s_ease-out]"
                    style={{
                        animation: 'fadeIn 0.8s ease-out'
                    }}
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                                Topic 18: Log File Analysis Using grep and awk
                            </h1>
                            <p className="text-gray-400 mt-2">Professional System Monitoring and Debugging Techniques</p>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-violet-300 mb-2">Real-World Application</h3>
                            <p className="text-sm">System monitoring, debugging, security auditing</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                            <h3 className="font-semibold text-fuchsia-300 mb-2">Key Tools</h3>
                            <p className="text-sm">grep for filtering, awk for processing</p>
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-gray700">
                            <h3 className="font-semibold text-purple-300 mb-2">Production Value</h3>
                            <p className="text-sm">Proactive monitoring, incident response, performance tuning</p>
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
                @keyframes pulseLog {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
            `}</style>

            <main className="max-w-6xl mx-auto space-y-12">
                {/* Theory Section */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                >
                    <h2 className="text-3xl font-bold mb-6 text-violet-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        The Art of Log Analysis
                    </h2>
                    
                    <div className="space-y-6 text-lg leading-relaxed">
                        <p>
                            Log files are the <span className="text-violet-300">black boxes</span> of computing systems. 
                            They record everything that happens, from routine operations to critical errors. 
                            Mastering log analysis with <code className="bg-gray-900 px-2 py-1 rounded">grep</code> and 
                            <code className="bg-gray-900 px-2 py-1 rounded">awk</code> turns you from a passive observer 
                            into an active <span className="text-fuchsia-300">system detective</span>.
                        </p>
                        
                        <div className="bg-gray-900/60 p-6 rounded-xl border-l-4 border-fuchsia-500">
                            <h3 className="font-bold text-fuchsia-300 mb-3">Why Log Analysis is Crucial</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {icon: "🔍", title: "Debugging", desc: "Find root causes of system failures"},
                                    {icon: "🛡️", title: "Security", desc: "Detect intrusion attempts and breaches"},
                                    {icon: "⚡", title: "Performance", desc: "Identify bottlenecks and optimize systems"},
                                    {icon: "📈", title: "Compliance", desc: "Meet audit and regulatory requirements"},
                                    {icon: "🚨", title: "Monitoring", desc: "Proactive alerting before issues escalate"},
                                    {icon: "📊", title: "Analytics", desc: "Understand user behavior and system usage"}
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800/80 transition-colors duration-300 hover:scale-[1.02]"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-bold text-violet-300">{item.title}</h4>
                                        </div>
                                        <p className="text-sm text-gray-300">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Log Anatomy Visualization */}
                <section 
                    className="bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8
                    transform transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-lg hover:shadow-fuchsia-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.1s'}}
                >
                    <h2 className="text-3xl font-bold mb-6 text-fuchsia-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Anatomy of a Log Entry
                    </h2>
                    
                    <div className="bg-gray-900/50 p-6 rounded-xl">
                        <div className="flex justify-center mb-8">
                            <svg width="800" height="320" className="hover:scale-[1.02] transition-transform duration-500">
                                <defs>
                                    <linearGradient id="logGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                                        <stop offset="25%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
                                        <stop offset="50%" style={{stopColor: '#d946ef', stopOpacity: 1}} />
                                        <stop offset="75%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor: '#f43f5e', stopOpacity: 1}} />
                                    </linearGradient>
                                    <marker id="logArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
                                    </marker>
                                </defs>
                                
                                {/* Log Entry Visualization */}
                                <rect x="50" y="50" width="700" height="60" rx="10" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
                                <text x="400" y="30" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">Apache Access Log Entry</text>
                                
                                {/* Timestamp */}
                                <rect x="60" y="55" width="140" height="50" rx="5" fill="#5b21b6" stroke="#7c3aed" strokeWidth="2"
                                    className="hover:stroke-violet-400 transition-colors duration-300">
                                    <title>Timestamp - When the event occurred</title>
                                    <animate attributeName="fill" values="#5b21b6;#7c3aed;#5b21b6" dur="3s" repeatCount="indefinite" />
                                </rect>
                                <text x="130" y="80" textAnchor="middle" fill="#c4b5fd" fontSize="12">[15/Jan/2024:10:30:45]</text>
                                <text x="130" y="95" textAnchor="middle" fill="#a78bfa" fontSize="10">Timestamp</text>
                                
                                {/* IP Address */}
                                <rect x="210" y="55" width="100" height="50" rx="5" fill="#7c2d12" stroke="#ea580c" strokeWidth="2"
                                    className="hover:stroke-orange-400 transition-colors duration-300">
                                    <title>Client IP Address - Who made the request</title>
                                    <animate attributeName="fill" values="#7c2d12;#ea580c;#7c2d12" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                </rect>
                                <text x="260" y="80" textAnchor="middle" fill="#fdba74" fontSize="12">192.168.1.1</text>
                                <text x="260" y="95" textAnchor="middle" fill="#fb923c" fontSize="10">IP Address</text>
                                
                                {/* HTTP Method */}
                                <rect x="320" y="55" width="60" height="50" rx="5" fill="#065f46" stroke="#059669" strokeWidth="2"
                                    className="hover:stroke-emerald-400 transition-colors duration-300">
                                    <title>HTTP Method - What action was requested</title>
                                    <animate attributeName="fill" values="#065f46;#059669;#065f46" dur="3s" repeatCount="indefinite" begin="1s" />
                                </rect>
                                <text x="350" y="80" textAnchor="middle" fill="#6ee7b7" fontSize="12">GET</text>
                                <text x="350" y="95" textAnchor="middle" fill="#34d399" fontSize="10">Method</text>
                                
                                {/* URL */}
                                <rect x="390" y="55" width="140" height="50" rx="5" fill="#3730a3" stroke="#4f46e5" strokeWidth="2"
                                    className="hover:stroke-indigo-400 transition-colors duration-300">
                                    <title>Requested URL - What resource was accessed</title>
                                    <animate attributeName="fill" values="#3730a3;#4f46e5;#3730a3" dur="3s" repeatCount="indefinite" begin="1.5s" />
                                </rect>
                                <text x="460" y="80" textAnchor="middle" fill="#a5b4fc" fontSize="12">/index.html</text>
                                <text x="460" y="95" textAnchor="middle" fill="#818cf8" fontSize="10">URL</text>
                                
                                {/* Status Code */}
                                <rect x="540" y="55" width="60" height="50" rx="5" fill="#7c2d12" stroke="#dc2626" strokeWidth="2"
                                    className="hover:stroke-red-400 transition-colors duration-300">
                                    <title>HTTP Status Code - Result of the request</title>
                                    <animate attributeName="fill" values="#7c2d12;#dc2626;#7c2d12" dur="3s" repeatCount="indefinite" begin="2s" />
                                </rect>
                                <text x="570" y="80" textAnchor="middle" fill="#fca5a5" fontSize="12">200</text>
                                <text x="570" y="95" textAnchor="middle" fill="#f87171" fontSize="10">Status</text>
                                
                                {/* Bytes Sent */}
                                <rect x="610" y="55" width="80" height="50" rx="5" fill="#4338ca" stroke="#6366f1" strokeWidth="2"
                                    className="hover:stroke-blue-400 transition-colors duration-300">
                                    <title>Response Size - How much data was sent</title>
                                    <animate attributeName="fill" values="#4338ca;#6366f1;#4338ca" dur="3s" repeatCount="indefinite" begin="2.5s" />
                                </rect>
                                <text x="650" y="80" textAnchor="middle" fill="#93c5fd" fontSize="12">1234</text>
                                <text x="650" y="95" textAnchor="middle" fill="#60a5fa" fontSize="10">Bytes</text>
                                
                                {/* Analysis Pipeline */}
                                <g transform="translate(50, 150)">
                                    <text x="350" y="0" textAnchor="middle" fill="#fbbf24" fontSize="16" fontWeight="bold">Log Analysis Pipeline</text>
                                    
                                    {/* grep Stage */}
                                    <rect x="50" y="20" width="120" height="60" rx="10" fill="#5b21b6" stroke="#8b5cf6" strokeWidth="2">
                                        <title>grep - Filter relevant log entries</title>
                                    </rect>
                                    <text x="110" y="45" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="bold">grep</text>
                                    <text x="110" y="65" textAnchor="middle" fill="#ddd6fe" fontSize="10">"ERROR\|WARN"</text>
                                    
                                    {/* awk Stage */}
                                    <rect x="200" y="20" width="120" height="60" rx="10" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2">
                                        <title>awk - Extract and process fields</title>
                                    </rect>
                                    <text x="260" y="45" textAnchor="middle" fill="#ddd6fe" fontSize="14" fontWeight="bold">awk</text>
                                    <text x="260" y="65" textAnchor="middle" fill="#ede9fe" fontSize="10">{`'{print $1, $9}'`}</text>
                                    
                                    {/* sort Stage */}
                                    <rect x="350" y="20" width="120" height="60" rx="10" fill="#d946ef" stroke="#f0abfc" strokeWidth="2">
                                        <title>sort - Organize results</title>
                                    </rect>
                                    <text x="410" y="45" textAnchor="middle" fill="#fae8ff" fontSize="14" fontWeight="bold">sort</text>
                                    <text x="410" y="65" textAnchor="middle" fill="#fce7f3" fontSize="10">| uniq -c</text>
                                    
                                    {/* head Stage */}
                                    <rect x="500" y="20" width="120" height="60" rx="10" fill="#ec4899" stroke="#f9a8d4" strokeWidth="2">
                                        <title>head - Limit output</title>
                                    </rect>
                                    <text x="560" y="45" textAnchor="middle" fill="#fce7f3" fontSize="14" fontWeight="bold">head</text>
                                    <text x="560" y="65" textAnchor="middle" fill="#fdf2f8" fontSize="10">-10</text>
                                    
                                    {/* Arrows */}
                                    <path d="M180,50 L200,50" fill="none" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#logArrow)"/>
                                    <path d="M330,50 L350,50" fill="none" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#logArrow)"/>
                                    <path d="M480,50 L500,50" fill="none" stroke="#f0abfc" strokeWidth="2" markerEnd="url(#logArrow)"/>
                                </g>
                                
                                {/* Log Flow Animation */}
                                <rect x="60" y="120" width="20" height="10" rx="2" fill="#8b5cf6" opacity="0.7">
                                    <animate attributeName="x" from="60" to="700" dur="4s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
                                </rect>
                            </svg>
                        </div>
                        
                        <div className="grid md:grid-cols-4 gap-4 mt-6">
                            {[
                                {field: "Timestamp", color: "violet", desc: "When event occurred"},
                                {field: "IP Address", color: "orange", desc: "Source of request"},
                                {field: "Status Code", color: "red", desc: "Success/Error indicator"},
                                {field: "Response Size", color: "blue", desc: "Data transferred"}
                            ].map((item, index) => (
                                <div key={index} className={`p-4 bg-${item.color}-900/20 rounded-lg border border-${item.color}-700/50`}>
                                    <h4 className={`font-bold text-${item.color}-300 mb-2`}>{item.field}</h4>
                                    <p className="text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Basic Log Analysis */}
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
                        Basic Log Analysis Techniques
                    </h2>
                    
                    <div className="space-y-8">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-violet-300">Essential grep + awk Patterns</h3>
                                <span className="px-3 py-1 bg-violet-900/50 text-violet-300 rounded-full text-sm font-semibold">
                                    Filter → Extract → Analyze
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Swadeep</strong> needs to monitor his web server in Naihati and 
                                quickly identify issues before they affect customers:
                            </p>
                            <ShellFileLoader
                                fileModule={logBasicsSh}
                                title="Basic Log Analysis Commands"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-emerald-300 mb-2">Common Log Patterns:</h4>
                                <div className="space-y-3">
                                    {[
                                        {pattern: "ERROR.*", desc: "Find error messages"},
                                        {pattern: "\\[error\\]", desc: "Apache error logs"},
                                        {pattern: "status [45][0-9]{2}", desc: "HTTP 4xx/5xx errors"},
                                        {pattern: "Failed.*password", desc: "Failed login attempts"}
                                    ].map((item, index) => (
                                        <div key={index} className="p-3 bg-gray-900/50 rounded">
                                            <code className="text-sm text-violet-300">{item.pattern}</code>
                                            <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-blue-300 mb-2">Key awk Fields for Logs:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>$1</code> - IP address (Apache logs)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>$9</code> - HTTP status code</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>$7</code> - Requested URL</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span><code>$4</code> - Timestamp (bracketed)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Error Analysis */}
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
                        Error Analysis and Debugging
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Systematic Error Investigation</h3>
                            <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-red-300 mb-2">The Debugging Mindset:</h4>
                                <p className="text-sm">
                                    <strong>Abhronila</strong> at Barrackpore College needs to debug 
                                    application failures systematically:
                                </p>
                                <ol className="text-xs text-gray-400 mt-2 space-y-1 pl-5">
                                    <li>1. Identify error patterns</li>
                                    <li>2. Find most frequent errors</li>
                                    <li>3. Trace error sources</li>
                                    <li>4. Monitor error trends over time</li>
                                </ol>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Error Severity Levels:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 font-bold">ERROR</span>
                                        <span>Critical failures requiring immediate attention</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-yellow-500 font-bold">WARN</span>
                                        <span>Potential issues that need monitoring</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-500 font-bold">INFO</span>
                                        <span>Normal operational messages</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gray-500 font-bold">DEBUG</span>
                                        <span>Detailed information for troubleshooting</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div>
                            <ShellFileLoader
                                fileModule={errorAnalysisSh}
                                title="Error Analysis Techniques"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10]}
                            />
                            <div className="mt-4 bg-purple-900/20 p-4 rounded-lg border border-purple-700/50">
                                <h4 className="font-bold text-purple-300 mb-2">Pro Tip:</h4>
                                <p className="text-sm">
                                    Use <code>tail -f</code> to monitor logs in real-time: 
                                    <code> tail -f error.log | grep --color=auto "ERROR"</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Performance Analysis */}
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
                        Performance Analysis
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-blue-300">Identifying Performance Bottlenecks</h3>
                                <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-semibold">
                                    Response Times, Throughput, Errors
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Tuhina</strong> needs to optimize her school's web server in Shyamnagar 
                                by analyzing performance metrics:
                            </p>
                            <ShellFileLoader
                                fileModule={performanceAnalysisSh}
                                title="Performance Analysis Script"
                                highlightLines={[]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-teal-300 mb-2">Response Time</div>
                                <p className="text-sm">Time between request and response</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    {`awk '{print $(NF-1)}' | sort -n`}
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-amber-300 mb-2">Throughput</div>
                                <p className="text-sm">Requests per minute/second</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    cut -d: -f2 | uniq -c
                                </code>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                                <div className="text-2xl font-bold text-red-300 mb-2">Error Rate</div>
                                <p className="text-sm">Percentage of failed requests</p>
                                <code className="text-xs block mt-2 bg-gray-900 p-2 rounded">
                                    awk '$9 ~ /^[45]/' | wc -l
                                </code>
                            </div>
                        </div>
                        
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                            <h4 className="font-bold text-green-300 mb-2">Performance Metrics to Track:</h4>
                            <p className="text-sm">
                                • 95th percentile response time • Error rate by endpoint • 
                                Slowest endpoints • Traffic patterns by hour/day • 
                                Geographic distribution of errors
                            </p>
                        </div>
                    </div>
                </section>

                {/* Security Analysis */}
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
                        Security Monitoring and Intrusion Detection
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-900/60 p-6 rounded-xl hover:bg-gray-900/80 transition-colors duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-emerald-300">Detecting Suspicious Activity</h3>
                                <span className="px-3 py-1 bg-emerald-900/50 text-emerald-300 rounded-full text-sm font-semibold">
                                    Security Auditing
                                </span>
                            </div>
                            <p className="mb-4">
                                <strong>Debangshu</strong> at Ichapur Systems needs to monitor for 
                                security breaches and suspicious patterns:
                            </p>
                            <ShellFileLoader
                                fileModule={securityAnalysisSh}
                                title="Security Analysis Script"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11]}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-red-300 mb-2">Common Attack Patterns:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>SQL injection attempts (<code>UNION SELECT</code>)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Directory traversal (<code>../..</code>)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Brute force attacks (many 401/403 errors)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>XSS attempts (<code>&lt;script&gt;</code>)</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-bold text-green-300 mb-2">Security Monitoring:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Failed authentication attempts</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Access to sensitive files</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Unusual request patterns</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">•</span>
                                        <span>Geographic anomalies</span>
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
                        Common Log Analysis Pitfalls
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Ignoring Time Zones</h4>
                                <p className="text-sm mb-2">Logs from different servers in different time zones</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    [15/Jan/2024:10:30:45 +0000]  # UTC
                                    [15/Jan/2024:16:00:45 +0530] # IST
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Solution:</p>
                                    <code className="text-xs">Convert to UTC before analysis</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Missing Context</h4>
                                <p className="text-sm">Analyzing errors without surrounding log entries</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    grep -A5 -B5 "ERROR" logfile  # Get context!
                                </code>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Assuming Log Format</h4>
                                <p className="text-sm mb-2">Different applications use different log formats</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded">
                                    # Apache: 192.168.1.1 - - [date] "GET" 200
                                    # Nginx: 192.168.1.1 - - [date] "GET" 200
                                    # Custom: [date] INFO [module] message
                                </code>
                                <div className="mt-2 p-2 bg-gray-800 rounded">
                                    <p className="text-xs text-green-300">Always:</p>
                                    <code className="text-xs">head -20 logfile | cat -A</code>
                                </div>
                            </div>
                            
                            <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl hover:border-red-500 transition-colors duration-300">
                                <h4 className="font-bold text-red-300 mb-2">Not Rotating Logs</h4>
                                <p className="text-sm">Running out of disk space from unchecked log growth</p>
                                <code className="text-xs block bg-gray-900 p-2 rounded mt-2">
                                    du -sh /var/log/*  # Monitor log sizes
                                    find /var/log -size +1G  # Find large logs
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
                        Professional Production Pipeline
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-violet-300">Enterprise Log Analysis</h3>
                            <ShellFileLoader
                                fileModule={productionPipelineSh}
                                title="Production Log Analysis Pipeline"
                                highlightLines={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
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
                                        <span>Use log rotation to manage file sizes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Standardize log formats across applications</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Include correlation IDs for tracing requests</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Monitor log analysis performance itself</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-gray-900/50 p-4 rounded-lg">
                                <h4 className="font-bold text-amber-300 mb-2">Advanced Techniques:</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Use <code>parallel</code> for multi-file analysis</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Create daily/weekly automated reports</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Set up real-time alerts for critical errors</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-300">⚡</span>
                                        <span>Use <code>logwatch</code> or <code>logcheck</code> for automated monitoring</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teacher's Note */}
                <section 
                    className="bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border border-violet-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-violet-900/30
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '0.8s'}}
                >
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-violet-300">Teacher's Note</h2>
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">
                                    <strong className="text-fuchsia-300">Remember:</strong> Log analysis is 
                                    <span className="text-yellow-300"> detective work</span>. You're looking for 
                                    patterns, anomalies, and stories in the data. Start with the 
                                    <span className="text-teal-300"> "5 W's"</span>:
                                </p>
                                
                                <div className="bg-black/30 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-yellow-300 mb-2">The 5 W's of Log Analysis:</h4>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-violet-300">W</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">WHAT happened?</p>
                                                <p className="text-sm text-gray-400">Error message, status code</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-fuchsia-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-fuchsia-300">W</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">WHEN did it happen?</p>
                                                <p className="text-sm text-gray-400">Timestamp, frequency</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-purple-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-purple-300">W</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">WHERE did it happen?</p>
                                                <p className="text-sm text-gray-400">IP address, endpoint</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 bg-pink-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-pink-300">W</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">WHO was involved?</p>
                                                <p className="text-sm text-gray-400">User, service, process</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2 col-span-2">
                                            <div className="w-6 h-6 bg-rose-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-rose-300">W</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">WHY did it happen?</p>
                                                <p className="text-sm text-gray-400">Root cause analysis</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                    <div>
                                        <p className="font-bold">Sukanta Hui</p>
                                        <p className="text-sm text-gray-400">27 years experience in System Administration</p>
                                        <p className="text-sm text-gray-400">sukantahui@codernaccotax.co.in | 7003756860</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Skills: Log Analysis, Security Monitoring, Performance Tuning</p>
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
                        Log Analysis Checklist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-violet-300">Basic Commands</h3>
                            <div className="space-y-3">
                                {[
                                    "grep -i error logfile - Find errors (case-insensitive)",
                                    "awk '{print $9}' - Extract HTTP status codes",
                                    "tail -f logfile - Real-time monitoring",
                                    "grep -c pattern - Count occurrences",
                                    "awk '$9 ~ /^[45]/' - Find 4xx/5xx errors",
                                    "sort | uniq -c - Count unique occurrences",
                                    "cut -d' ' -f1 - Extract first field (IP)",
                                    "grep -A5 -B5 pattern - Get context around matches"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-violet-900/50 rounded-full flex items-center justify-center group-hover:bg-violet-700 transition-colors duration-300">
                                            <span className="text-violet-300">{index + 1}</span>
                                        </div>
                                        <code className="text-sm">{item}</code>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-fuchsia-300">Analysis Tasks</h3>
                            <div className="space-y-3">
                                {[
                                    "Find most frequent errors",
                                    "Identify top IP addresses",
                                    "Calculate error rates over time",
                                    "Monitor response times",
                                    "Detect security threats",
                                    "Track resource usage patterns",
                                    "Create daily summary reports",
                                    "Set up automated alerts"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-colors duration-300 group"
                                    >
                                        <div className="w-6 h-6 bg-fuchsia-900/50 rounded-full flex items-center justify-center group-hover:bg-fuchsia-700 transition-colors duration-300">
                                            <span className="text-fuchsia-300">{index + 1}</span>
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
                    className="bg-gradient-to-br from-fuchsia-900/20 to-violet-900/20 border border-fuchsia-700/50 rounded-2xl p-8
                    transform transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-900/20
                    motion-safe:animate-[slideUp_0.6s_ease-out]"
                    style={{animationDelay: '1s'}}
                >
                    <h2 className="text-2xl font-bold mb-6 text-fuchsia-300 flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Think About This...
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "If Swadeep's web server suddenly shows a spike in 500 errors, 
                                what would be your step-by-step investigation process using grep and awk?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "How would you differentiate between a DDoS attack and normal 
                                traffic surge by analyzing access logs?"
                            </p>
                        </div>
                        
                        <div className="p-4 bg-black/30 rounded-lg">
                            <p className="italic text-lg">
                                "What patterns would you look for to detect a compromised 
                                user account from authentication logs?"
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-violet-900/20 border border-violet-700/50 rounded-lg">
                        <p className="text-violet-200">
                            <strong>Hint:</strong> Start with broad patterns, then narrow down. 
                            First check error rates over time, then isolate specific time periods, 
                            then examine individual requests. Use <code>grep -v</code> to exclude 
                            known-good traffic and focus on anomalies.
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800">
                <div className="text-center text-gray-500 text-sm">
                    <p>Topic 18: Log File Analysis Using grep and awk</p>
                    <p className="mt-2">Next Topic: Data Cleanup and Normalization Using sed</p>
                </div>
            </footer>
        </div>
    );
};

export default Topic18;