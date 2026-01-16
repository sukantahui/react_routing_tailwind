import React from 'react';

export default class Topic10 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        // Trigger animation after component mounts
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 50);
    }

    render() {
        const { isVisible } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                {/* Main container with sequential flow */}
                <div className="max-w-4xl mx-auto">
                    {/* Header Section - First in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                                Working with Large Directories Efficiently
                            </h1>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                Mastering directory navigation and management in Linux systems when dealing with 
                                thousands or millions of files — essential for system administrators and developers.
                            </p>
                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Imagine <span className="font-semibold text-purple-600 dark:text-purple-400">Swadeep</span>'s project directory 
                                    at Barrackpore University containing millions of sensor readings — inefficient directory operations 
                                    could freeze terminal sessions for minutes.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Core Concepts - Second in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Core Concept Understanding</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                Large directories (containing 10,000+ files) present unique challenges in Unix/Linux systems. 
                                Unlike Windows or macOS, Linux stores directory contents as a simple list, which can cause 
                                performance degradation when <span className="font-semibold text-blue-600 dark:text-blue-400">listing (ls)</span>, 
                                <span className="font-semibold text-blue-600 dark:text-blue-400"> tab-completing</span>, or 
                                <span className="font-semibold text-blue-600 dark:text-blue-400"> pattern matching</span>.
                            </p>
                            
                            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Why It Matters</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-red-600 dark:text-red-300 text-sm font-bold">!</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200">Performance Impact</h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Simple <code>ls</code> on 1M files can take 30+ seconds and consume significant memory.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-yellow-600 dark:text-yellow-300 text-sm font-bold">⚠</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200">System Load</h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                High I/O operations affect overall system performance for all users.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-200">Real-world Scenario</h4>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                <span className="font-semibold">Tuhina</span> at Ichapur Tech needs to quickly find log files 
                                                among 50,000+ files in the production directory.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Process Visualization - Third in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Directory Navigation Process</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <style>
                                {`
                                    @keyframes findFile {
                                        0% { transform: translateX(-20px) translateY(0); opacity: 0; }
                                        30% { opacity: 1; }
                                        70% { opacity: 1; }
                                        100% { transform: translateX(320px) translateY(0); opacity: 0; }
                                    }
                                    @keyframes highlightPath {
                                        0% { stroke-opacity: 0.3; }
                                        50% { stroke-opacity: 1; }
                                        100% { stroke-opacity: 0.3; }
                                    }
                                `}
                            </style>
                            
                            <div className="h-64 overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 mb-6">
                                <svg className="w-full h-full" viewBox="0 0 400 200">
                                    {/* Directory Structure */}
                                    <rect x="20" y="60" width="80" height="40" rx="5" fill="#93c5fd" className="dark:fill-blue-900" />
                                    <text x="60" y="85" textAnchor="middle" fill="#1e3a8a" className="dark:fill-blue-300 text-sm font-semibold">Directory</text>
                                    
                                    {/* Files */}
                                    <rect x="130" y="30" width="60" height="20" rx="3" fill="#86efac" className="dark:fill-green-800" />
                                    <rect x="130" y="60" width="60" height="20" rx="3" fill="#86efac" className="dark:fill-green-800" />
                                    <rect x="130" y="90" width="60" height="20" rx="3" fill="#86efac" className="dark:fill-green-800" />
                                    <rect x="130" y="120" width="60" height="20" rx="3" fill="#86efac" className="dark:fill-green-800" />
                                    <rect x="130" y="150" width="60" height="20" rx="3" fill="#86efac" className="dark:fill-green-800" />
                                    
                                    {/* Many files indicator */}
                                    <text x="160" y="180" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">10,000+ files</text>
                                    
                                    {/* Search path */}
                                    <path 
                                        d="M110,80 L125,80" 
                                        stroke="#3b82f6" 
                                        strokeWidth="2" 
                                        strokeDasharray="5,5"
                                        style={{ animation: 'highlightPath 2s infinite' }}
                                    />
                                    
                                    {/* Searching file animation */}
                                    <circle 
                                        cx="20" 
                                        cy="80" 
                                        r="8" 
                                        fill="#f59e0b"
                                        style={{ 
                                            animation: 'findFile 3s infinite',
                                            animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <animate attributeName="cy" values="80;75;80;85;80" dur="1s" repeatCount="indefinite" />
                                    </circle>
                                    
                                    {/* Efficient method arrow */}
                                    <path d="M240,120 L280,120 L280,70 L360,70" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
                                    <rect x="360" y="50" width="30" height="40" rx="5" fill="#10b981" className="dark:fill-green-800" />
                                    <text x="375" y="75" textAnchor="middle" fill="white" className="text-xs font-bold">Find</text>
                                    
                                    <defs>
                                        <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                            <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                                        </marker>
                                    </defs>
                                </svg>
                                
                                <div className="absolute bottom-8 left-8 right-8 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                                        <span>Inefficient <code>ls</code> (reads all)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                                        <span>Efficient <code>find</code> (targeted)</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                The animation shows how inefficient directory listing reads ALL files (like <span className="font-semibold">Abhronila</span>'s 
                                research data at Shyamnagar Lab), while <code>find</code> searches directly without loading all entries first.
                            </p>
                        </div>
                    </div>

                    {/* Efficient Commands - Fourth in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Efficient Commands & Techniques</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <div className="space-y-6">
                                {/* Command 1 */}
                                <div className="group bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-900">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-white font-bold text-xl">1</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-3">
                                                <code className="text-xl font-mono">find . -name "*.log" -print</code>
                                                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full">Most Efficient</span>
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                Searches directly without reading all directory entries first. Uses the filesystem's own indexing.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                                <div className="text-cyan-400">Prototype:</div>
                                                <div>find [path] [options] [expression]</div>
                                                <div className="text-cyan-400 mt-2">Purpose:</div>
                                                <div>Targeted file search without loading entire directory</div>
                                            </div>
                                            <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                    <span className="font-semibold">Real use:</span> <span className="font-semibold">Swadeep</span> uses this to find specific log files in the Barrackpore University server containing 200,000+ files.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Command 2 */}
                                <div className="group bg-gradient-to-r from-green-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-900">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-white font-bold text-xl">2</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                                                <code className="text-xl font-mono">ls -f</code>
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                Disables sorting (which requires reading all entries). Fast but unsorted. The <code>-f</code> flag tells ls not to sort.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                                <div className="text-cyan-400">Return:</div>
                                                <div>Unsorted file list (as stored in directory)</div>
                                                <div className="text-cyan-400 mt-2">When to use:</div>
                                                <div>When you just need to see what's there, not in any order</div>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                                </svg>
                                                <span>Warning: Output is unsorted and includes . and .. entries</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Command 3 */}
                                <div className="group bg-gradient-to-r from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl hover:shadow-xl transition-all duration-300 border border-yellow-100 dark:border-yellow-900">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-white font-bold text-xl">3</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">
                                                <code className="text-xl font-mono">printf "%s\n" *</code>
                                            </h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                Better alternative to <code>echo *</code>. Shell expansion can be heavy with wildcards.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                                <div className="text-red-400">Avoid:</div>
                                                <div>echo * # Can cause argument list too long error</div>
                                                <div className="text-green-400 mt-2">Use instead:</div>
                                                <div>printf "%s\n" * # Handles large directories better</div>
                                            </div>
                                            <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20 rounded-lg">
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                    <span className="font-semibold">Common mistake:</span> <span className="font-semibold">Abhronila</span> learned this the hard way when her script failed with "argument list too long" error at Shyamnagar Lab.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Common Pitfalls - Fifth in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">4</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Common Pitfalls & Solutions</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 text-lg font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Using <code>ls -l</code> or <code>ls -la</code></h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                Forces <code>stat()</code> system call on every file — extremely slow on large directories. 
                                                Each file requires metadata lookup (permissions, size, timestamps).
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                                # What happens with ls -l:<br/>
                                                for each file in directory:<br/>
                                                &nbsp;&nbsp;stat(file)  # System call<br/>
                                                &nbsp;&nbsp;read metadata<br/>
                                                &nbsp;&nbsp;format output
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 bg-gradient-to-r from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 text-lg font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Tab Completion Disaster</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                Hitting Tab in shell reads entire directory. Many beginners don't realize this until their session freezes.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                                # Temporary solution:<br/>
                                                $ set +o T # Disable tab completion<br/>
                                                # Do your work...<br/>
                                                $ set -o T # Re-enable when done
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 bg-gradient-to-r from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 dark:text-green-300 text-lg font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Solution: Use <code>find</code> with <code>-maxdepth</code></h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                                                Limits search depth to avoid recursive slowdown. Essential for controlled searching.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                                # Efficient pattern:<br/>
                                                find . -maxdepth 1 -name "*.txt"<br/><br/>
                                                # What Debangshu uses at Ichapur Data Center:<br/>
                                                find /logs -maxdepth 2 -name "*error*" -mtime -7
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mini Checklist - Sixth in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '500ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">5</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">What Students Should Remember</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <div className="space-y-4">
                                {[
                                    {
                                        text: "Avoid ls -l or ls -la on huge directories",
                                        detail: "Use ls -f or find instead for better performance"
                                    },
                                    {
                                        text: "Use find instead of ls for searching",
                                        detail: "find doesn't read all entries before starting"
                                    },
                                    {
                                        text: "Disable shell tab completion in large dirs",
                                        detail: "set +o T temporarily disables tab completion"
                                    },
                                    {
                                        text: "Consider directory structure redesign",
                                        detail: "Split into dated subdirectories: YYYY-MM-DD/"
                                    },
                                    {
                                        text: "Use ls -f for unsorted quick view",
                                        detail: "Fastest way to just see what's there"
                                    },
                                    {
                                        text: "Pipe to head/tail for partial views",
                                        detail: "ls -f | head -30 shows only first 30 entries"
                                    },
                                    {
                                        text: "Remember: Directories are just special files",
                                        detail: "They contain a list of filename-inode pairs"
                                    }
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{item.text}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Professional Workflow Tip</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    When <span className="font-semibold">Tuhina</span> manages the student database at Barrackpore College, 
                                    she uses this pattern:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                    # Sample first, then process:<br/>
                                    find /data/students -type f -name "*.json" | head -20<br/>
                                    # If looks good, then:<br/>
                                    find /data/students -type f -name "*.json" -mtime -30
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teacher's Note - Seventh in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">6</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Teacher's Note</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6 group">
                            <div className="flex items-start gap-6 mb-8">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-white text-3xl font-bold">SH</span>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Sukanta Hui</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        {/* PLACEHOLDER: Teacher's professional description from JSON */}
                                        [Teacher's professional description will be loaded from JSON file]
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>System Architecture Specialist</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border-l-4 border-purple-500 mb-6">
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span>Key Insight for Students</span>
                                </h4>
                                
                                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                    The real issue isn't the number of files, but <span className="font-semibold text-purple-600 dark:text-purple-400">how you access them</span>. 
                                    In production, I've seen servers freeze because developers used <code>ls -la</code> in directories with millions of small files.
                                    Remember what happened to <span className="font-semibold">Debangshu</span> at Naihati Server Farm? A simple tab completion froze his terminal for 3 minutes!
                                </p>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                        <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-lg">Remember This:</h5>
                                        <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                                            <li className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-1">
                                                    <span className="text-purple-600 dark:text-purple-300 font-bold">1</span>
                                                </span>
                                                <span><code>find</code> is your best friend for large directories. It searches without reading everything first.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-1">
                                                    <span className="text-purple-600 dark:text-purple-300 font-bold">2</span>
                                                </span>
                                                <span>If you MUST use <code>ls</code>, add <code>| head -n 50</code> immediately. This stops output after 50 lines.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-1">
                                                    <span className="text-purple-600 dark:text-purple-300 font-bold">3</span>
                                                </span>
                                                <span>Consider reorganizing: split into dated subdirectories. Monthly or weekly structures prevent single huge directories.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Teaching point:</span> Develop efficiency mindset over brute force approach. Think before you type!
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Hint Section - Eighth in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '700ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">7</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Think About This...</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 mb-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center animate-pulse">
                                    <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                                        Subtle guidance without giving answers away. Encourage thinking, not spoon-feeding.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-yellow-500 hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-3">
                                        <span className="text-yellow-600 dark:text-yellow-400 text-2xl">🔍</span>
                                        Observe carefully...
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        What happens when you run <code>time ls -l</code> vs <code>time ls -f</code> in a directory with 10,000 files?
                                    </p>
                                    <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        $ time ls -l > /dev/null<br/>
                                        real&nbsp;&nbsp;&nbsp;0m12.45s<br/>
                                        user&nbsp;&nbsp;&nbsp;0m1.23s<br/>
                                        sys&nbsp;&nbsp;&nbsp;&nbsp;0m11.22s<br/><br/>
                                        $ time ls -f > /dev/null<br/>
                                        real&nbsp;&nbsp;&nbsp;0m0.45s<br/>
                                        user&nbsp;&nbsp;&nbsp;0m0.12s<br/>
                                        sys&nbsp;&nbsp;&nbsp;&nbsp;0m0.33s
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        Notice the system time difference. What does this tell you about what each command is doing?
                                    </p>
                                </div>
                                
                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-3">
                                        <span className="text-blue-600 dark:text-blue-400 text-2xl">💭</span>
                                        Try changing this...
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        How would you find only PDF files modified in the last 7 days without listing all files?
                                    </p>
                                    <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        # Think about combining find options:<br/>
                                        # You need: file type, name pattern, time constraint<br/>
                                        # Start with: find . -type f _____ "*.pdf" _____ -mtime _____
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        What <code>find</code> options would you use? Remember <span className="font-semibold">Swadeep</span>'s approach at Shyamnagar Research Lab.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center italic">
                                    Hint: Think about <span className="font-semibold">Abhronila</span>'s approach when searching through years of climate data at Barrackpore University.
                                    She doesn't look at every file — she uses patterns and constraints.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Tips - Ninth in sequence */}
                    <div 
                        className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '800ms' }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">8</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Professional Tips & Tricks</h2>
                        </div>
                        
                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-8">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Industry Habit</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Always test directory commands with <code>| head -5</code> first in production. 
                                                Saved <span className="font-semibold">Abhronila</span>'s team from 15-minute freeze at Shyamnagar Lab.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                                # Good habit:<br/>
                                                $ find /var/log -name "*.log" | head -5<br/>
                                                # See output, then if correct:<br/>
                                                $ find /var/log -name "*.log"<br/><br/>
                                                # Bad habit (risky):<br/>
                                                $ find /var/log -name "*.log" # Could freeze!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Debugging Mindset</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Use <code>strace</code> to see what's really happening. Eye-opening for beginners!
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                                # See system calls made by ls:<br/>
                                                $ strace ls -l 2>&1 | grep -c stat<br/>
                                                10023  # That's 10,023 stat() calls!<br/><br/>
                                                # Now try ls -f:<br/>
                                                $ strace ls -f 2>&1 | grep -c stat<br/>
                                                3  # Only 3 stat() calls
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                                This shows why <code>ls -l</code> is slow — it calls <code>stat()</code> for every file!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Structure Advice</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Organize by date: <code>YYYY-MM-DD/</code> subdirectories. 
                                                What <span className="font-semibold">Debangshu</span> implemented at Ichapur Data Center.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                                # Before (problematic):<br/>
                                                /data/logs/application.log.1<br/>
                                                /data/logs/application.log.2<br/>
                                                ... 10,000 files ...<br/><br/>
                                                # After (organized):<br/>
                                                /data/logs/2024-01-15/application.log<br/>
                                                /data/logs/2024-01-16/application.log<br/>
                                                /data/logs/2024-01-17/application.log
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                                Now each directory has ~100 files instead of 10,000. Much faster to work with!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Classroom-tested Shortcut</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Create this alias in your <code>~/.bashrc</code> or <code>~/.zshrc</code>:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                    # Safe directory peeking alias<br/>
                                    alias lsf='ls -f | head -30'<br/><br/>
                                    # Usage:<br/>
                                    $ lsf  # Shows first 30 files, unsorted, fast<br/>
                                    $ lsf /some/large/directory
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                    <span className="font-semibold">Tuhina</span> taught this to all interns at Barrackpore College — prevents terminal freezes!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer - Last in sequence */}
                    <div 
                        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        style={{ transitionDelay: '900ms' }}
                    >
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Topic 6:</span> Working with Large Directories Efficiently | Linux File Systems Mastery
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                                    <div className="text-sm text-gray-500 dark:text-gray-500">
                                        Next Topic: Counting files and directories using shell tools
                                    </div>
                                    <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-600 mt-4">
                                    Remember: Efficiency comes from understanding, not memorization
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reduced motion support */}
                <style>
                    {`
                        @media (prefers-reduced-motion: reduce) {
                            * {
                                animation-duration: 0.01ms !important;
                                animation-iteration-count: 1 !important;
                                transition-duration: 0.01ms !important;
                            }
                        }
                    `}
                </style>
            </div>
        );
    }
}

