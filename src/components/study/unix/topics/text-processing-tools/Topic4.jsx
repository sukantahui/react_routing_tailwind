import React from 'react';
import clsx from 'clsx';

class Topic4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReducedMotion: false,
            hasMounted: false
        };
    }

    handleMotionChange = (e) => {
        this.setState({ isReducedMotion: e.matches });
    };

    componentDidMount() {
        this.setState({ hasMounted: true });

        this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.setState({ isReducedMotion: this.mediaQuery.matches });

        this.mediaQuery.addEventListener('change', this.handleMotionChange);
    }

    componentWillUnmount() {
        this.mediaQuery.removeEventListener('change', this.handleMotionChange);
    }

    render() {
        const { isReducedMotion, hasMounted } = this.state;
        const animationClass = isReducedMotion ? '' : 'animate-[fadeInUp_0.8s_ease-out]';
        
        // Tailwind-safe delay utility map
        const delayMap = [
            'animation-delay-0',
            'animation-delay-100',
            'animation-delay-200',
            'animation-delay-300',
            'animation-delay-400',
            'animation-delay-500',
            'animation-delay-600',
            'animation-delay-700',
            'animation-delay-800',
            'animation-delay-900',
            'animation-delay-1000',
            'animation-delay-1100'
        ];
        
        const staggerDelay = (index) => isReducedMotion ? '' : delayMap[index] || '';

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6">
                <style>
                    {`
                    @keyframes fadeInUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes pulseSubtle {
                        0%, 100% {
                            opacity: 1;
                        }
                        50% {
                            opacity: 0.8;
                        }
                    }
                    
                    @keyframes highlightPulse {
                        0%, 100% {
                            background-color: rgba(253, 224, 71, 0.3);
                        }
                        50% {
                            background-color: rgba(253, 224, 71, 0.6);
                        }
                    }
                    
                    .search-anim {
                        animation: pulseSubtle 2s ease-in-out infinite;
                    }
                    
                    .highlight-match {
                        animation: highlightPulse 2s ease-in-out infinite;
                        border-radius: 3px;
                        padding: 0 2px;
                    }
                    
                    .svg-hover:hover {
                        fill: #60A5FA;
                    }
                    
                    .terminal-line {
                        font-family: 'Monaco', 'Courier New', monospace;
                        font-size: 14px;
                    }
                    
                    .file-preview {
                        font-family: 'Monaco', 'Courier New', monospace;
                        font-size: 12px;
                        line-height: 1.4;
                    }
                    `}
                </style>

                {/* Header Section */}
                <div className={clsx(
                    "max-w-6xl mx-auto",
                    animationClass,
                    staggerDelay(0)
                )}>
                    <div className="mb-10 transform transition-all duration-500 hover:scale-[1.02]">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                            Topic 4: Searching Multiple Files and Highlighting Matches
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Advanced grep techniques for efficient multi-file searches with visual highlighting
                        </p>
                    </div>
                </div>

                {/* Conceptual Foundation */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-teal-300 dark:hover:border-teal-500",
                    animationClass,
                    staggerDelay(1)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900 mr-4">
                            <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Multi-File Search Concepts</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>Multi-file searching</strong> with grep allows you to search across multiple files simultaneously, while <strong>highlighting matches</strong> makes patterns stand out visually. This combination is essential for log analysis, code reviews, and data mining.
                        </p>
                        
                        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border-l-4 border-teal-500">
                            <h3 className="text-xl font-semibold mb-3 text-teal-700 dark:text-teal-400">Real-World Analogy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Imagine <strong>Abhronila</strong> needs to find all references to "Computer Lab" across hundreds of documents at <strong>Barrackpore College</strong>. Instead of opening each file, she searches all at once and highlights matches in different colors based on context.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-lg bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-teal-700 dark:text-teal-400">Multi-File Search</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Search across multiple files simultaneously</li>
                                    <li>Use wildcards and patterns</li>
                                    <li>Filter by file type/extension</li>
                                    <li>Combine with recursive search</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-emerald-700 dark:text-emerald-400">Highlighting Matches</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Visual identification of patterns</li>
                                    <li>Color-coded based on context</li>
                                    <li>Easier pattern recognition</li>
                                    <li>Better readability in terminal</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-cyan-700 dark:text-cyan-400">Context Display</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Show lines before/after matches</li>
                                    <li>Display file names and line numbers</li>
                                    <li>Group results by file</li>
                                    <li>Filter and sort output</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Searching Multiple Files */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500",
                    animationClass,
                    staggerDelay(2)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Searching Multiple Files</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Multi-file Search */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Basic Multi-file Search Patterns</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep "error" *.log</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Search "error" in all .log files in current directory</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep "TODO" *.py *.js *.java</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Search "TODO" in Python, JavaScript, and Java files</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep "pattern" file1.txt file2.txt file3.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Search specific files explicitly</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Wildcard Patterns */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Wildcard Patterns for File Selection</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Basic Wildcards</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">*.txt</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">All files ending with .txt</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">{`app*.log`}</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Files starting with "app" and ending with .log</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">2024-*.csv</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">CSV files starting with "2024-"</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-cyan-200 dark:border-cyan-800">
                                        <h4 className="font-bold text-lg mb-3 text-cyan-700 dark:text-cyan-400">Advanced Patterns</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-green-400">file[0-9].txt</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">file1.txt, file2.txt, ..., file9.txt</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-green-400">{`config{.ini,.conf}`}</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">config.ini or config.conf (brace expansion)</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-green-400">{`*.{py,js,ts}`}</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Python, JavaScript, TypeScript files</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* File Structure Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="180" className="search-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Directory structure with wildcard matching:</text>
                                        
                                        {/* Files */}
                                        <rect x="50" y="40" width="80" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="90" y="56" textAnchor="middle" fill="#1E40AF" fontSize="11">app.log</text>
                                        
                                        <rect x="140" y="40" width="80" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="180" y="56" textAnchor="middle" fill="#1E40AF" fontSize="11">server.log</text>
                                        
                                        <rect x="230" y="40" width="80" height="25" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="270" y="56" textAnchor="middle" fill="#1E40AF" fontSize="11">error.log</text>
                                        
                                        <rect x="320" y="40" width="80" height="25" rx="3" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="360" y="56" textAnchor="middle" fill="#6B7280" fontSize="11">config.txt</text>
                                        
                                        {/* Wildcard Match Animation */}
                                        <rect x="45" y="35" width="90" height="35" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#10B981;#34D399;#10B981" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        
                                        <rect x="135" y="35" width="90" height="35" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#10B981;#34D399;#10B981" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                                        </rect>
                                        
                                        <rect x="225" y="35" width="90" height="35" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#10B981;#34D399;#10B981" dur="2s" repeatCount="indefinite" begin="1s"/>
                                        </rect>
                                        
                                        {/* Command */}
                                        <rect x="50" y="90" width="350" height="40" rx="6" fill="#1F2937" stroke="#4B5563" strokeWidth="1"/>
                                        <text x="60" y="110" className="terminal-line" fill="#10B981" fontSize="12">$ grep "ERROR" *.log</text>
                                        <text x="60" y="125" className="terminal-line" fill="#9CA3AF" fontSize="11"># Matches: app.log, server.log, error.log</text>
                                        
                                        {/* Result */}
                                        <rect x="50" y="140" width="350" height="30" rx="4" fill="#064E3B" stroke="#059669" strokeWidth="1"/>
                                        <text x="225" y="160" textAnchor="middle" fill="#A7F3D0" fontSize="11">Searching 3 log files for "ERROR" pattern</text>
                                        
                                        {/* Legend */}
                                        <rect x="420" y="40" width="15" height="15" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="440" y="52" className="text-xs" fill="#6B7280">Matches *.log</text>
                                        
                                        <rect x="420" y="60" width="15" height="15" rx="3" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="440" y="72" className="text-xs" fill="#6B7280">Doesn't match</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-indigo-500">
                            <h4 className="font-bold text-xl mb-3 text-indigo-700 dark:text-indigo-400">Practical Example: Student Records Search</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to find all students with surname "Das" across multiple departments at <strong>Shyamnagar College</strong>.
                                </p>
                                <div className="font-mono bg-gray-900 text-indigo-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -i "\\bDas\\b" science/*.txt arts/*.txt commerce/*.txt
                                    </code>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">42</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Science dept</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">28</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Arts dept</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">35</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Commerce dept</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlighting Matches */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-yellow-300 dark:hover:border-yellow-500",
                    animationClass,
                    staggerDelay(3)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
                            <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Highlighting Matches</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Highlighting */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-yellow-700 dark:text-yellow-400">Highlighting Techniques</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep --color=auto "error" app.log</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Auto-detect terminal and highlight matches</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep --color=always "TODO" *.py</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Always highlight (even when piping to less)</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep --color=never "pattern" file.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Never highlight (useful for scripts)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Color Customization */}
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Customizing Highlight Colors</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-yellow-200 dark:border-yellow-800">
                                        <h4 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Environment Variables</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-amber-400">export GREP_COLOR='1;31'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Red text on default background</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-amber-400">export GREP_COLORS='mt=01;32'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Bright green matches</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-amber-400">export GREP_COLORS='mt=01;33:sl=:cx=:fn=35:ln=32'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Custom colors for different elements</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-amber-200 dark:border-amber-800">
                                        <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Color Codes</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-2 bg-gray-800/50 rounded">
                                                <div className="text-xs text-gray-400">31 = Red</div>
                                                <div className="h-2 w-full bg-red-500 rounded"></div>
                                            </div>
                                            <div className="p-2 bg-gray-800/50 rounded">
                                                <div className="text-xs text-gray-400">32 = Green</div>
                                                <div className="h-2 w-full bg-green-500 rounded"></div>
                                            </div>
                                            <div className="p-2 bg-gray-800/50 rounded">
                                                <div className="text-xs text-gray-400">33 = Yellow</div>
                                                <div className="h-2 w-full bg-yellow-500 rounded"></div>
                                            </div>
                                            <div className="p-2 bg-gray-800/50 rounded">
                                                <div className="text-xs text-gray-400">34 = Blue</div>
                                                <div className="h-2 w-full bg-blue-500 rounded"></div>
                                            </div>
                                            <div className="p-2 bg-gray-800/50 rounded">
                                                <div className="text-xs text-gray-400">35 = Magenta</div>
                                                <div className="h-2 w-full bg-purple-500 rounded"></div>
                                            </div>
                                            <div className="p-2 bg-gray-800/50 rounded">
                                                <div className="text-xs text-gray-400">36 = Cyan</div>
                                                <div className="h-2 w-full bg-cyan-500 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Highlighting Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="180" className="search-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Highlighting matches in terminal output:</text>
                                        
                                        {/* Sample Output */}
                                        <rect x="20" y="40" width="460" height="100" rx="6" fill="#1F2937" stroke="#4B5563" strokeWidth="1"/>
                                        
                                        {/* File 1 */}
                                        <text x="30" y="60" className="terminal-line" fill="#9CA3AF" fontSize="11">server.log:45: INFO: System started successfully</text>
                                        <text x="30" y="75" className="terminal-line" fill="#9CA3AF" fontSize="11">server.log:89: <tspan className="highlight-match">ERROR</tspan>: Database connection failed</text>
                                        <text x="30" y="90" className="terminal-line" fill="#9CA3AF" fontSize="11">server.log:90: DEBUG: Retrying connection...</text>
                                        
                                        {/* File 2 */}
                                        <text x="30" y="110" className="terminal-line" fill="#9CA3AF" fontSize="11">app.log:12: <tspan className="highlight-match">ERROR</tspan>: User authentication failed</text>
                                        <text x="30" y="125" className="terminal-line" fill="#9CA3AF" fontSize="11">app.log:45: INFO: Request processed</text>
                                        
                                        {/* Highlight Animation */}
                                        <rect x="130" y="70" width="45" height="12" rx="2" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3">
                                            <animate attributeName="stroke" values="#F59E0B;#FBBF24;#F59E0B" dur="1.5s" repeatCount="indefinite"/>
                                        </rect>
                                        
                                        <rect x="135" y="105" width="45" height="12" rx="2" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3">
                                            <animate attributeName="stroke" values="#F59E0B;#FBBF24;#F59E0B" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
                                        </rect>
                                        
                                        {/* Color Legend */}
                                        <rect x="20" y="150" width="15" height="15" rx="3" fill="#1F2937" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="40" y="162" className="text-xs" fill="#6B7280">Normal text</text>
                                        
                                        <rect x="120" y="150" width="15" height="15" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1"/>
                                        <text x="140" y="162" className="text-xs" fill="#6B7280">Highlighted match</text>
                                        
                                        <rect x="220" y="150" width="15" height="15" rx="3" fill="#1F2937" stroke="#10B981" strokeWidth="1"/>
                                        <text x="240" y="162" className="text-xs" fill="#6B7280">File name</text>
                                        
                                        <rect x="320" y="150" width="15" height="15" rx="3" fill="#1F2937" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="340" y="162" className="text-xs" fill="#6B7280">Line number</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-amber-500">
                            <h4 className="font-bold text-xl mb-3 text-amber-700 dark:text-amber-400">Practical Example: Code Review</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Tuhina</span> is reviewing Python code at <strong>Ichapur Tech</strong> and needs to find all print statements for debugging.
                                </p>
                                <div className="font-mono bg-gray-900 text-amber-400 p-4 rounded-lg text-sm">
                                    <code>
                                        {`grep --color=always -n "print(" *.py | head -20`}
                                    </code>
                                </div>
                                <div className="file-preview bg-gray-800 text-gray-300 p-4 rounded-lg text-sm">
                                    <div>utils.py:45: <span className="text-yellow-400 font-bold">print</span>{`(f"Processing user {user_id}")`}</div>
                                    <div>auth.py:89: <span className="text-yellow-400 font-bold">print</span>{`("DEBUG: Authentication successful")`}</div>
                                    <div>main.py:12: # <span className="text-yellow-400 font-bold">print</span>("Remove before production")</div>
                                    <div>config.py:33: logger.info("Loaded config") # Not a print statement</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Context Display Options */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500",
                    animationClass,
                    staggerDelay(4)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Context Display Options</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Context Flags */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Context Display Flags</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-1 text-center"><code>-B 3</code></div>
                                        <div className="text-sm text-gray-300 text-center">Show 3 lines Before match</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-1 text-center"><code>-A 2</code></div>
                                        <div className="text-sm text-gray-300 text-center">Show 2 lines After match</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-1 text-center"><code>-C 2</code></div>
                                        <div className="text-sm text-gray-300 text-center">Show 2 lines Context (both sides)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Context Example */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Context Display in Action</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Without Context</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-preview">
                                            <div>$ grep "connection failed" server.log</div>
                                            <div className="mt-2 text-red-400">server.log:89: ERROR: Database connection failed</div>
                                            <div className="mt-2 text-red-400">server.log:145: ERROR: Redis connection failed</div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Only error lines shown</p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-800">
                                        <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-400">With Context (<code>-C 2</code>)</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-preview">
                                            <div>$ grep -C 2 "connection failed" server.log</div>
                                            <div className="mt-2">--</div>
                                            <div>server.log:87: INFO: Attempting database connection</div>
                                            <div>server.log:88: DEBUG: Using credentials from env</div>
                                            <div className="text-red-400 font-bold">server.log:89: ERROR: Database connection failed</div>
                                            <div>server.log:90: WARNING: Falling back to cache</div>
                                            <div>server.log:91: INFO: Cache connection established</div>
                                            <div>--</div>
                                        </div>
                                        <p className="text-sm text-pink-600 dark:text-pink-400 mt-2">Full context around errors</p>
                                    </div>
                                </div>
                                
                                {/* Context Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="200" className="search-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Context display visualization:</text>
                                        
                                        {/* File Lines */}
                                        <rect x="50" y="40" width="400" height="120" rx="6" fill="#1F2937" stroke="#4B5563" strokeWidth="1"/>
                                        
                                        {/* Lines */}
                                        <text x="60" y="60" className="terminal-line" fill="#9CA3AF" fontSize="11">Line 85: INFO: Process started</text>
                                        <text x="60" y="75" className="terminal-line" fill="#9CA3AF" fontSize="11">Line 86: DEBUG: Loading configuration</text>
                                        <text x="60" y="90" className="terminal-line" fill="#9CA3AF" fontSize="11">Line 87: INFO: Database connection attempt</text>
                                        <text x="60" y="105" className="terminal-line highlight-match" fontSize="11">Line 88: ERROR: Connection failed!</text>
                                        <text x="60" y="120" className="terminal-line" fill="#9CA3AF" fontSize="11">Line 89: WARNING: Using fallback</text>
                                        <text x="60" y="135" className="terminal-line" fill="#9CA3AF" fontSize="11">Line 90: INFO: Fallback successful</text>
                                        <text x="60" y="150" className="terminal-line" fill="#9CA3AF" fontSize="11">Line 91: DEBUG: Cleanup resources</text>
                                        
                                        {/* Context Highlight - Before */}
                                        <rect x="55" y="45" width="390" height="30" rx="4" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#3B82F6;#60A5FA;#3B82F6" dur="3s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="250" y="30" textAnchor="middle" className="text-xs" fill="#3B82F6">BEFORE context (2 lines)</text>
                                        
                                        {/* Context Highlight - Match */}
                                        <rect x="55" y="75" width="390" height="15" rx="3" fill="none" stroke="#EF4444" strokeWidth="3">
                                            <animate attributeName="stroke" values="#EF4444;#F87171;#EF4444" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="250" y="82" textAnchor="middle" className="text-xs" fill="#EF4444">MATCHING line</text>
                                        
                                        {/* Context Highlight - After */}
                                        <rect x="55" y="90" width="390" height="30" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#10B981;#34D399;#10B981" dur="3s" repeatCount="indefinite" begin="1s"/>
                                        </rect>
                                        <text x="250" y="165" textAnchor="middle" className="text-xs" fill="#10B981">AFTER context (2 lines)</text>
                                        
                                        {/* Command */}
                                        <rect x="150" y="170" width="200" height="25" rx="4" fill="#1F2937" stroke="#6B7280" strokeWidth="1"/>
                                        <text x="250" y="187" textAnchor="middle" className="text-xs" fill="#10B981">grep -B 2 -A 2 "failed"</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-violet-500">
                            <h4 className="font-bold text-xl mb-3 text-violet-700 dark:text-violet-400">Practical Example: Log Analysis</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Debangshu</span> needs to analyze <strong>Naihati Server</strong> crashes with context to understand what happened before each crash.
                                </p>
                                <div className="font-mono bg-gray-900 text-violet-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -B 5 -A 3 "Segmentation fault\\|core dumped" /var/log/syslog
                                    </code>
                                </div>
                                <div className="file-preview bg-gray-800 text-gray-300 p-4 rounded-lg text-sm">
                                    <div>--</div>
                                    <div>syslog:12045: INFO: Memory usage: 45%</div>
                                    <div>syslog:12046: DEBUG: Allocating buffer (1024MB)</div>
                                    <div>syslog:12047: WARNING: High memory pressure</div>
                                    <div className="text-red-400 font-bold">syslog:12048: ERROR: Segmentation fault</div>
                                    <div>syslog:12049: INFO: Generating core dump</div>
                                    <div>syslog:12050: DEBUG: Process terminated</div>
                                    <div>syslog:12051: INFO: Restarting service</div>
                                    <div>--</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Combined Examples */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-cyan-300 dark:hover:border-cyan-500",
                    animationClass,
                    staggerDelay(5)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900 mr-4">
                            <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Powerful Combined Examples</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Advanced grep Commands</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-cyan-200 dark:border-cyan-800">
                                        <h4 className="font-bold text-lg mb-3 text-cyan-700 dark:text-cyan-400">Multi-file with Highlighting</h4>
                                        <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                                            <code>
                                                grep --color=always -n "TODO\\|FIXME" *.py *.js *.java
                                            </code>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mt-3">
                                            Find todos in multiple programming languages with line numbers and colors
                                        </p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Recursive with Context</h4>
                                        <div className="font-mono bg-gray-900 text-blue-400 p-4 rounded-lg text-sm">
                                            <code>
                                                grep -r -C 2 -i "deprecated" src/ --include="*.py"
                                            </code>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mt-3">
                                            Find deprecated code in Python files with 2 lines of context (case-insensitive)
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-teal-200 dark:border-teal-800">
                                    <h4 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Complete Production Command</h4>
                                    <div className="font-mono bg-gray-900 text-teal-400 p-4 rounded-lg text-sm">
                                        <code>
                                            grep -r --color=always -B 2 -A 1 -n "ERROR\\|CRITICAL" /var/log/ --include="*.log" | head -50
                                        </code>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                                        Find errors/critical issues in log files with context, colors, and line numbers
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-emerald-500">
                            <h4 className="font-bold text-xl mb-3 text-emerald-700 dark:text-emerald-400">Practical Example: College Database Audit</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> audits <strong>Barrackpore College</strong> database exports for sensitive student data.
                                </p>
                                <div className="font-mono bg-gray-900 text-emerald-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -r --color=always -B 1 -A 1 -i "aadhaar\\|pan\\|password" ./exports/ --include="*.csv" --include="*.sql" | tee audit_report.txt
                                    </code>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Command breakdown:</p>
                                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                            <li><code>-r</code>: Recursive search</li>
                                            <li><code>--color=always</code>: Keep colors in output</li>
                                            <li><code>-B 1 -A 1</code>: One line before/after</li>
                                            <li><code>-i</code>: Case-insensitive</li>
                                            <li><code>tee</code>: Show and save to file</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Files found:</p>
                                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                            <li>students_2024.csv: 3 matches</li>
                                            <li>backup_2023.sql: 12 matches</li>
                                            <li>admissions.csv: 0 matches ✓</li>
                                            <li>results.sql: 5 matches</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-red-300 dark:hover:border-red-500",
                    animationClass,
                    staggerDelay(6)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 mr-4">
                            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Common Pitfalls & Mistakes</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Performance Issues</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Searching too many files without <code>--include</code>/<code>--exclude</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Using <code>--color=always</code> when piping to commands that don't support colors</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Not using <code>head</code> or <code>tail</code> to limit large outputs</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">Syntax Errors</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Wrong order: <code>-B2A2</code> vs <code>-B 2 -A 2</code> (spaces matter)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Forgetting to quote patterns with spaces: <code>grep TODO FIXME</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Using <code>*</code> when you need <code>\\*</code> in regex patterns</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                            <h4 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Output Issues</h4>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span><code>--color=auto</code> doesn't work when output is redirected to file</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Context lines (<code>-B</code>/<code>-A</code>/<code>-C</code>) show separator lines (<code>--</code>) that can confuse parsing</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Binary files match patterns but show as "Binary file matches"</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-emerald-300 dark:hover:border-emerald-500",
                    animationClass,
                    staggerDelay(7)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900 mr-4">
                            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Best Practices</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                                <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Performance Optimization</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Use <code>--include</code> and <code>--exclude</code> to limit file types</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Start with small context (<code>-C 1</code>) before increasing</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Pipe to <code>head</code> or <code>less</code> for large outputs</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Output Management</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Use <code>-n</code> for line numbers in multi-file searches</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span><code>--color=auto</code> for terminal, <code>--color=never</code> for scripts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Use <code>-H</code> to always show filenames (default with multiple files)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Scripting & Automation</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🤖</span>
                                        <span>Always quote patterns in scripts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🤖</span>
                                        <span>Use <code>2>/dev/null</code> to suppress permission errors</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🤖</span>
                                        <span>Check exit codes: <code>$?</code> after grep for success/failure</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Beginner-Friendly Habits</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Test patterns on single file first: <code>grep pattern file.txt</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Add flags incrementally: start simple, add complexity</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Practice with Shyamnagar college data and Ichapur server logs</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-teal-200 dark:border-teal-800",
                    "transform transition-all duration-300 hover:shadow-2xl",
                    animationClass,
                    staggerDelay(8)
                )}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Mini Checklist: Multi-file Search Mastery</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h3 className="font-bold text-lg">Multi-file Search</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Use wildcards: <code>*.log</code>, <code>file*.txt</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Search specific files: <code>file1 file2 file3</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Combine with recursive: <code>-r</code></span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h3 className="font-bold text-lg">Highlighting</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code>--color=auto</code> (default)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code>--color=always</code> (pipes)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code>--color=never</code> (scripts)</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <h3 className="font-bold text-lg">Context Display</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code>-B N</code>: N lines Before</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code>-A N</code>: N lines After</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code>-C N</code>: N lines Context</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 shadow-xl border border-amber-300 dark:border-amber-700",
                    animationClass,
                    staggerDelay(9)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900 mr-4">
                            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Hint Section</h2>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Think about...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                How would you search for "config" in all .yml and .yaml files, but exclude backup files ending with .bak?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Observe carefully...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                What's the difference between <code>grep pattern *</code> and <code>grep pattern ./*</code>?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Try changing this...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Create a grep command that finds email addresses in all text files, shows 2 lines of context, highlights matches, and saves to a file.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/30 dark:to-cyan-900/30 shadow-2xl border-2 border-sky-300 dark:border-sky-700",
                    "transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl",
                    animationClass,
                    staggerDelay(10)
                )}>
                    <div className="flex items-start mb-6">
                        <div className="p-3 rounded-full bg-sky-100 dark:bg-sky-900 mr-4 transform transition-all duration-300 hover:scale-110">
                            <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Teacher's Note</h2>
                            <p className="text-sky-600 dark:text-sky-400 font-medium">Sukanta Hui • 27 years experience</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>Dear students,</strong> Multi-file searching with proper highlighting and context is what separates beginners from experts. Remember: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--color=always</code> preserves colors when piping, and context flags (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-B</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-A</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-C</code>) help understand the bigger picture.
                        </p>
                        
                        <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-sky-500">
                            <h4 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">Classroom Experience Tips</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>When <strong>Abhronila</strong> was analyzing Shyamnagar college logs, she used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -r -C 3 --color=always "failed" /var/log/ | less -R</code> to navigate through colored output with context.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>For Barrackpore student data analysis, we pipe to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">tee</code>: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep pattern files* | tee output.txt</code> shows results and saves them.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Always use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-n</code> with multi-file searches. When Tuhina forgot it once, she spent hours finding the right line in 5000-line files!</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-sky-200 dark:border-sky-800">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong>Skills:</strong> Programming Language, RDBMS, Operating System, Web Development
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 7003756860
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                                    "Context is king in debugging - without it, you're just seeing errors, not understanding them"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips & Tricks - Professional Level */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 shadow-xl border border-violet-300 dark:border-violet-700",
                    animationClass,
                    staggerDelay(11)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900 mr-4">
                            <svg className="w-8 h-8 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Professional Tips & Tricks</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-xl mb-4 text-violet-700 dark:text-violet-400">Advanced grep Usage</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -Z</code> with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">xargs -0</code> for files with spaces: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -l -Z pattern | xargs -0 rm</code></span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -o</code> shows only matching parts, not whole lines</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Combine with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sort | uniq -c | sort -nr</code> to count and rank matches</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-xl mb-4 text-purple-700 dark:text-purple-400">Production Scripts</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">A</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -q</code> in scripts for condition checks (silent mode)</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">B</span>
                                    </div>
                                    <span>For large files: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -m 10 pattern</code> stops after 10 matches</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">C</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">zgrep</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">bzgrep</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">xzgrep</code> for compressed files</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={clsx(
                    "max-w-6xl mx-auto pt-8 border-t border-gray-300 dark:border-gray-700",
                    animationClass,
                    staggerDelay(12)
                )}>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Topic 4: Searching Multiple Files and Highlighting Matches • Next: Using sed for find & replace and inline editing
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Practice with Barrackpore college documents and Shyamnagar server logs to master multi-file searches!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic4;