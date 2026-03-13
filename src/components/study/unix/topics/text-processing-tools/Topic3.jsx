import React from 'react';
import clsx from 'clsx';

class Topic3 extends React.Component {
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
            'animation-delay-1000'
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
                    
                    .grep-anim {
                        animation: pulseSubtle 2s ease-in-out infinite;
                    }
                    
                    .svg-hover:hover {
                        fill: #60A5FA;
                    }
                    
                    .file-structure {
                        font-family: 'Monaco', 'Courier New', monospace;
                        font-size: 12px;
                    }
                    
                    .terminal-line {
                        font-family: 'Monaco', 'Courier New', monospace;
                        font-size: 14px;
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
                            Topic 3: Case-insensitive, Inverted, and Recursive Search with grep
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Mastering grep's powerful flags for flexible file searching in Unix/Linux systems
                        </p>
                    </div>
                </div>

                {/* Conceptual Foundation */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-orange-300 dark:hover:border-orange-500",
                    animationClass,
                    staggerDelay(1)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900 mr-4">
                            <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">grep Power Flags</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>grep</strong> (Global Regular Expression Print) is a Unix/Linux command-line utility for searching plain-text data for lines matching a regular expression. With advanced flags, it becomes a powerhouse for text searching.
                        </p>
                        
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border-l-4 border-orange-500">
                            <h3 className="text-xl font-semibold mb-3 text-orange-700 dark:text-orange-400">Real-World Analogy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Imagine <strong>Swadeep</strong> needs to search through thousands of student files at <strong>Barrackpore College</strong> for "marksheet" but doesn't know if it's spelled "Marksheet", "marksheet", or "MARKsheet". With case-insensitive grep, he finds them all instantly!
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-lg bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-orange-700 dark:text-orange-400">Case-insensitive (<code>-i</code>)</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Ignore letter case differences</li>
                                    <li>Find "error", "Error", "ERROR" all at once</li>
                                    <li>Perfect for inconsistent data</li>
                                    <li>Most commonly used flag</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">Inverted (<code>-v</code>)</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Find lines that DON'T match</li>
                                    <li>Filter out unwanted patterns</li>
                                    <li>Clean data by removing matches</li>
                                    <li>Great for log filtering</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Recursive (<code>-r</code> or <code>-R</code>)</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Search through directories</li>
                                    <li>Find patterns in nested files</li>
                                    <li>Project-wide searching</li>
                                    <li>Essential for codebases</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Case-insensitive Search (-i) */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500",
                    animationClass,
                    staggerDelay(2)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Case-insensitive Search (<code>-i</code>)</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Usage */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Basic Usage & Syntax</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -i "error" app.log</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Finds: error, Error, ERROR, eRrOr, etc.</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -i "database" *.sql</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Searches all .sql files for case-insensitive "database"</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -i -n "warning" system.log</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Shows line numbers with case-insensitive "warning"</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Comparison Visualization */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Case-sensitive vs Case-insensitive</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-red-200 dark:border-red-800">
                                        <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Case-sensitive (default)</h4>
                                        <div className="font-mono bg-gray-900 text-red-400 p-4 rounded-lg mb-3 text-sm">
                                            grep "Error" logfile.txt
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">Matches: Error</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                                                <span className="text-sm text-gray-500 dark:text-gray-500">Misses: error, ERROR, eRrOr</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">Case-insensitive (<code>-i</code>)</h4>
                                        <div className="font-mono bg-gray-900 text-green-400 p-4 rounded-lg mb-3 text-sm">
                                            grep -i "Error" logfile.txt
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">Matches: Error, error, ERROR, eRrOr</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">All case variations found!</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Interactive SVG Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="180" className="grep-anim">
                                        {/* Case-sensitive Search */}
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Case-sensitive search for "Error":</text>
                                        <rect x="20" y="30" width="460" height="30" rx="4" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="240" y="50" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">Error warning error ERROR eRrOr</text>
                                        
                                        <rect x="80" y="32" width="40" height="26" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2">
                                            <animate attributeName="stroke" values="#DC2626;#EF4444;#DC2626" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="100" y="50" textAnchor="middle" fill="#DC2626" fontSize="12">Error</text>
                                        
                                        {/* Case-insensitive Search */}
                                        <text x="20" y="90" className="text-sm" fill="#6B7280">Case-insensitive search for "Error":</text>
                                        <rect x="20" y="100" width="460" height="30" rx="4" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="240" y="120" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">Error warning error ERROR eRrOr</text>
                                        
                                        <rect x="80" y="102" width="40" height="26" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2">
                                            <animate attributeName="stroke" values="#16A34A;#22C55E;#16A34A" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="100" y="120" textAnchor="middle" fill="#16A34A" fontSize="12">Error</text>
                                        
                                        <rect x="170" y="102" width="40" height="26" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2">
                                            <animate attributeName="stroke" values="#16A34A;#22C55E;#16A34A" dur="2s" repeatCount="indefinite" begin="0.3s"/>
                                        </rect>
                                        <text x="190" y="120" textAnchor="middle" fill="#16A34A" fontSize="12">error</text>
                                        
                                        <rect x="260" y="102" width="40" height="26" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2">
                                            <animate attributeName="stroke" values="#16A34A;#22C55E;#16A34A" dur="2s" repeatCount="indefinite" begin="0.6s"/>
                                        </rect>
                                        <text x="280" y="120" textAnchor="middle" fill="#16A34A" fontSize="12">ERROR</text>
                                        
                                        <rect x="350" y="102" width="40" height="26" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2">
                                            <animate attributeName="stroke" values="#16A34A;#22C55E;#16A34A" dur="2s" repeatCount="indefinite" begin="0.9s"/>
                                        </rect>
                                        <text x="370" y="120" textAnchor="middle" fill="#16A34A" fontSize="12">eRrOr</text>
                                        
                                        {/* Legend */}
                                        <rect x="20" y="150" width="15" height="15" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1"/>
                                        <text x="40" y="162" className="text-xs" fill="#6B7280">Case-sensitive match (1 match)</text>
                                        
                                        <rect x="200" y="150" width="15" height="15" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1"/>
                                        <text x="220" y="162" className="text-xs" fill="#6B7280">Case-insensitive match (4 matches)</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-cyan-500">
                            <h4 className="font-bold text-xl mb-3 text-cyan-700 dark:text-cyan-400">Practical Example: Student Data Search</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Abhronila</span> needs to find all references to "Computer Science" in <strong>Shyamnagar College</strong> documents, but the text appears as "computer science", "Computer Science", "COMPUTER SCIENCE", etc.
                                </p>
                                <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -i "computer science" *.txt *.doc *.pdf 2>/dev/null
                                    </code>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">computer science department ✓</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">Computer Science Lab ✓</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">COMPUTER SCIENCE syllabus ✓</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">Computer science professor ✓</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inverted Search (-v) */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-500",
                    animationClass,
                    staggerDelay(3)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Inverted Search (<code>-v</code>)</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Usage */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Basic Usage & Syntax</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -v "debug" app.log</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Shows all lines EXCEPT those containing "debug"</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -v "^#" config.conf</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Remove comment lines (lines starting with #)</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -v "^$" data.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Remove empty lines (lines with nothing)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visualization */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Filtering with Inverted Search</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Original File</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm leading-relaxed">
                                            <div>1: INFO: System started</div>
                                            <div>2: DEBUG: Loading config</div>
                                            <div>3: ERROR: Database connection failed</div>
                                            <div>4: DEBUG: Retrying connection</div>
                                            <div>5: INFO: Connection established</div>
                                            <div>6: DEBUG: User login</div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Total: 6 lines</p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">After <code>grep -v "DEBUG"</code></h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm leading-relaxed">
                                            <div className="text-green-400">1: INFO: System started</div>
                                            <div className="text-red-400 line-through">2: DEBUG: Loading config</div>
                                            <div className="text-green-400">3: ERROR: Database connection failed</div>
                                            <div className="text-red-400 line-through">4: DEBUG: Retrying connection</div>
                                            <div className="text-green-400">5: INFO: Connection established</div>
                                            <div className="text-red-400 line-through">6: DEBUG: User login</div>
                                        </div>
                                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">Filtered: 3 lines remain</p>
                                    </div>
                                </div>
                                
                                {/* Interactive SVG Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="120" className="grep-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Inverted search process:</text>
                                        
                                        {/* Input */}
                                        <rect x="20" y="30" width="460" height="20" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="250" y="43" textAnchor="middle" fill="#1E40AF" fontSize="11">All log lines (including DEBUG)</text>
                                        
                                        <path d="M250 50 L250 70" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" repeatCount="indefinite"/>
                                        </path>
                                        
                                        {/* Filter */}
                                        <rect x="180" y="70" width="140" height="30" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2">
                                            <animate attributeName="fill" values="#FEF3C7;#FDE68A;#FEF3C7" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="250" y="90" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">grep -v "DEBUG"</text>
                                        
                                        <path d="M250 100 L250 120" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)">
                                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
                                        </path>
                                        
                                        {/* Output */}
                                        <rect x="20" y="120" width="460" height="20" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1"/>
                                        <text x="250" y="133" textAnchor="middle" fill="#166534" fontSize="11">Filtered logs (DEBUG lines removed)</text>
                                        
                                        <defs>
                                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                                <path d="M0,0 L0,6 L9,3 z" fill="#6B7280"/>
                                            </marker>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-emerald-500">
                            <h4 className="font-bold text-xl mb-3 text-emerald-700 dark:text-emerald-400">Practical Example: Clean Configuration Files</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Tuhina</span> needs to extract only active configuration lines from <strong>Ichapur server</strong> config files, removing all comments and empty lines.
                                </p>
                                <div className="font-mono bg-gray-900 text-emerald-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -v "^#" nginx.conf | grep -v "^$" | grep -v "^\\s*$"
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Before (with comments):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div># Server configuration</div>
                                            <div>server {`{`}</div>
                                            <div>  listen 80;</div>
                                            <div>  # Server name</div>
                                            <div>  server_name localhost;</div>
                                            <div>{`}`}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">After (clean):</p>
                                        <div className="font-mono bg-gray-800 text-emerald-400 p-3 rounded text-xs">
                                            <div>server {`{`}</div>
                                            <div>  listen 80;</div>
                                            <div>  server_name localhost;</div>
                                            <div>{`}`}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recursive Search (-r/-R) */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500",
                    animationClass,
                    staggerDelay(4)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Recursive Search (<code>-r</code>/<code>-R</code>)</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Usage */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Basic Usage & Syntax</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -r "TODO" .</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Search "TODO" in current directory and all subdirectories</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -r -i "password" /etc/</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Case-insensitive search for "password" in /etc directory</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ grep -r -l "deprecated" src/</div>
                                        <div className="terminal-line text-gray-300 text-sm"># List only filenames containing "deprecated"</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* File Structure Visualization */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Recursive Search Through Directories</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Directory Structure</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-structure">
                                            <div>project/</div>
                                            <div className="ml-4">src/</div>
                                            <div className="ml-8">main.py</div>
                                            <div className="ml-8">utils.py</div>
                                            <div className="ml-8">config/</div>
                                            <div className="ml-12">database.py</div>
                                            <div className="ml-12">settings.py</div>
                                            <div className="ml-4">tests/</div>
                                            <div className="ml-8">test_main.py</div>
                                            <div className="ml-8">test_utils.py</div>
                                            <div className="ml-4">docs/</div>
                                            <div className="ml-8">README.md</div>
                                            <div className="ml-8">CHANGELOG.md</div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-800">
                                        <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-400">Recursive Search Result</h4>
                                        <div className="font-mono bg-gray-900 text-pink-400 p-4 rounded-lg text-sm">
                                            <div>$ grep -r "def test_" project/</div>
                                            <div className="mt-2 text-green-400">project/src/utils.py:def test_connection():</div>
                                            <div className="text-green-400">project/tests/test_main.py:def test_addition():</div>
                                            <div className="text-green-400">project/tests/test_main.py:def test_subtraction():</div>
                                            <div className="text-green-400">project/tests/test_utils.py:def test_validation():</div>
                                        </div>
                                        <p className="text-sm text-pink-600 dark:text-pink-400 mt-2">Searched through 8 files across 3 directories</p>
                                    </div>
                                </div>
                                
                                {/* Interactive SVG Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="200" className="grep-anim">
                                        {/* Directory Tree */}
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Recursive search flow:</text>
                                        
                                        {/* Root */}
                                        <rect x="50" y="40" width="100" height="30" rx="4" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                                        <text x="100" y="60" textAnchor="middle" fill="#3730A3" fontSize="12">project/</text>
                                        
                                        {/* Level 1 */}
                                        <rect x="30" y="90" width="80" height="30" rx="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5"/>
                                        <text x="70" y="110" textAnchor="middle" fill="#5B21B6" fontSize="11">src/</text>
                                        
                                        <rect x="140" y="90" width="80" height="30" rx="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5"/>
                                        <text x="180" y="110" textAnchor="middle" fill="#5B21B6" fontSize="11">tests/</text>
                                        
                                        <rect x="250" y="90" width="80" height="30" rx="4" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="1.5"/>
                                        <text x="290" y="110" textAnchor="middle" fill="#5B21B6" fontSize="11">docs/</text>
                                        
                                        {/* Level 2 - src */}
                                        <rect x="20" y="140" width="60" height="25" rx="3" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="50" y="156" textAnchor="middle" fill="#BE185D" fontSize="10">main.py</text>
                                        
                                        <rect x="90" y="140" width="60" height="25" rx="3" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="120" y="156" textAnchor="middle" fill="#BE185D" fontSize="10">utils.py</text>
                                        
                                        {/* Level 2 - tests */}
                                        <rect x="140" y="140" width="70" height="25" rx="3" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="175" y="156" textAnchor="middle" fill="#BE185D" fontSize="10">test_main.py</text>
                                        
                                        <rect x="220" y="140" width="70" height="25" rx="3" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="255" y="156" textAnchor="middle" fill="#BE185D" fontSize="10">test_utils.py</text>
                                        
                                        {/* Level 2 - docs */}
                                        <rect x="250" y="140" width="80" height="25" rx="3" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="290" y="156" textAnchor="middle" fill="#BE185D" fontSize="10">README.md</text>
                                        
                                        {/* Search Path Animation */}
                                        <circle cx="100" cy="75" r="3" fill="#10B981">
                                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                                            <animateMotion path="M0,0 L0,15 L-70,15 L-50,50 L-20,50 M0,0 L0,15 L40,15 L30,50 L0,50 M0,0 L0,15 L150,15 L150,50" dur="6s" repeatCount="indefinite"/>
                                        </circle>
                                        
                                        {/* Legend */}
                                        <rect x="350" y="40" width="15" height="15" rx="3" fill="#E0E7FF" stroke="#6366F1" strokeWidth="1"/>
                                        <text x="370" y="52" className="text-xs" fill="#6B7280">Directory</text>
                                        
                                        <rect x="350" y="60" width="15" height="15" rx="3" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="370" y="72" className="text-xs" fill="#6B7280">File</text>
                                        
                                        <circle cx="358" y="90" r="5" fill="#10B981">
                                            <animate attributeName="r" values="5;7;5" dur="1s" repeatCount="indefinite"/>
                                        </circle>
                                        <text x="370" y="92" className="text-xs" fill="#6B7280">Search cursor</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-violet-500">
                            <h4 className="font-bold text-xl mb-3 text-violet-700 dark:text-violet-400">Practical Example: Finding Security Issues</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Debangshu</span> needs to audit <strong>Naihati College</strong> codebase for hardcoded passwords or API keys before deployment.
                                </p>
                                <div className="font-mono bg-gray-900 text-violet-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -r -i "password\\|apikey\\|secret\\|token" ./ --include="*.py" --include="*.js" --include="*.java"
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">Security findings:</p>
                                        <div className="font-mono bg-gray-800 text-red-400 p-3 rounded text-xs">
                                            <div>config.py:password = "admin123"</div>
                                            <div>auth.js:API_KEY = "sk_live_123456"</div>
                                            <div>database.py:secret = "super_secret"</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">Safe patterns:</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div>config.py:password = os.getenv("DB_PASS")</div>
                                            <div>auth.js:API_KEY = process.env.API_KEY</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Combined Usage */}
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
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Combined Flag Usage</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Powerful Combinations</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-cyan-200 dark:border-cyan-800">
                                        <h4 className="font-bold text-lg mb-3 text-cyan-700 dark:text-cyan-400">Case-insensitive + Recursive</h4>
                                        <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                                            <code>
                                                grep -r -i "configuration" /etc/
                                            </code>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mt-3">
                                            Search for "configuration" (any case) in all files under /etc directory
                                        </p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Inverted + Recursive</h4>
                                        <div className="font-mono bg-gray-900 text-blue-400 p-4 rounded-lg text-sm">
                                            <code>
                                                grep -r -v "TODO\\|FIXME" src/
                                            </code>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 mt-3">
                                            Show files that don't contain TODO or FIXME comments in source directory
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-purple-200 dark:border-purple-800">
                                    <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">All Three Combined</h4>
                                    <div className="font-mono bg-gray-900 text-purple-400 p-4 rounded-lg text-sm">
                                        <code>
                                            grep -r -i -v "test\\|debug\\|temp" project/ --include="*.py"
                                        </code>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                                        Recursively search Python files for lines NOT containing "test", "debug", or "temp" (case-insensitive)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-amber-500">
                            <h4 className="font-bold text-xl mb-3 text-amber-700 dark:text-amber-400">Practical Example: Production Log Analysis</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to find all critical errors (excluding debug/info) in <strong>Barrackpore College</strong> production logs across multiple servers.
                                </p>
                                <div className="font-mono bg-gray-900 text-amber-400 p-4 rounded-lg text-sm">
                                    <code>
                                        grep -r -i "error\\|fatal\\|critical" /var/log/ --exclude="*debug*" | grep -v "info\\|warning" | head -20
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-red-600">15</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">CRITICAL errors</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">42</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">ERROR messages</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">0</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">FATAL errors</div>
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
                                        <span>Recursive search on large directories without filters</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Not using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--include</code>/<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--exclude</code> patterns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Searching binary files accidentally</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">Flag Confusion</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-r</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-R</code> (usually same, but check man page)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Order matters: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -i -v</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -v -i</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Forgetting to quote patterns with spaces</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                            <h4 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Common Errors</h4>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <div>
                                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -r .</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Matches EVERYTHING (dot matches any character)</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <div>
                                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -v "^$" file | grep -v "^#"</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Pipe order matters - remove empties first</span>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <div>
                                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -r "pattern" /path 2>/dev/null</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Suppress permission errors</span>
                                    </div>
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
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--include="*.ext"</code> to limit file types</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Exclude directories: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--exclude-dir="node_modules"</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-l</code> flag to list only filenames when searching many files</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Command Construction</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Always quote patterns: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -i "search term"</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-E</code> for extended regex when using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">|</code> (OR)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Test with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-n</code> first to see line numbers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Security & Safety</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🔒</span>
                                        <span>Avoid searching sensitive directories (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/etc/shadow</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/proc</code>)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🔒</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">2>/dev/null</code> to hide permission errors</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🔒</span>
                                        <span>Check command with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">echo</code> before executing destructive operations</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Beginner-Friendly Habits</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Start with simple <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep "pattern" file</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Add flags one by one: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code> → <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i -v</code> → <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i -v -r</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Practice with Shyamnagar college log files and Ichapur server data</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-orange-200 dark:border-orange-800",
                    "transform transition-all duration-300 hover:shadow-2xl",
                    animationClass,
                    staggerDelay(8)
                )}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Mini Checklist: grep Mastery</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">-i</span>
                                </div>
                                <h3 className="font-bold text-lg">Case-insensitive</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Use for inconsistent data</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Finds Error, error, ERROR</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Most commonly used flag</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">-v</span>
                                </div>
                                <h3 className="font-bold text-lg">Inverted</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Filter OUT matches</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Remove comments/empty lines</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Clean configuration files</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">-r</span>
                                </div>
                                <h3 className="font-bold text-lg">Recursive</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Search directories</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Use with --include/--exclude</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Project-wide searches</span>
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
                                How would you use grep to find all Python files that contain the word "class" but NOT the word "test"?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Observe carefully...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                What happens when you combine <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-v</code>? Does order matter?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Try changing this...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Modify a recursive search to exclude backup files (files ending with ~ or .bak).
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
                            <strong>Dear students,</strong> The power of grep lies in combining flags. Remember: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code> makes your search case-insensitive, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-v</code> inverts it, and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-r</code> makes it recursive.
                        </p>
                        
                        <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-sky-500">
                            <h4 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">Classroom Experience Tips</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>When <strong>Tuhina</strong> was searching Barrackpore student records, she used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -r -i "marks" . --include="*.csv"</code> to find all marks-related data in CSV files.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>For Ichapur server logs, we pipe grep commands: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep "ERROR" | grep -v "DEBUG" | head -50</code> shows recent errors without debug messages.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Always use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">--color=auto</code> to highlight matches. It's saved my eyes countless times during late-night debugging!</span>
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
                                    "grep is the Swiss Army knife of text processing - master its flags and you master text search"
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
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -c</code> to count matches instead of displaying them</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -l</code> lists only filenames, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -L</code> lists files WITHOUT matches</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Combine with find: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">find . -name "*.py" -exec grep -l "def " {`{}`} \\;</code></span>
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
                                    <span>Always use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -E</code> for extended regex with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">|</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">+</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">?</code></span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">B</span>
                                    </div>
                                    <span>For performance: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -F</code> for fixed strings (no regex overhead)</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">C</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">zgrep</code> for compressed files and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">pgrep</code> for process searching</span>
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
                            Topic 3: Case-insensitive, Inverted, and Recursive Search with grep • Next: Searching multiple files and highlighting matches
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Practice with Barrackpore college logs and Shyamnagar server files to master grep flags!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic3;