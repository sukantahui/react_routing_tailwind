import React from 'react';
import clsx from 'clsx';

class Topic6 extends React.Component {
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
                    
                    @keyframes addressHighlight {
                        0%, 100% {
                            background-color: rgba(249, 168, 212, 0.3);
                        }
                        50% {
                            background-color: rgba(249, 168, 212, 0.6);
                        }
                    }
                    
                    .sed-anim {
                        animation: pulseSubtle 2s ease-in-out infinite;
                    }
                    
                    .address-highlight {
                        animation: addressHighlight 2s ease-in-out infinite;
                        border-radius: 3px;
                        padding: 0 2px;
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
                    
                    .line-number {
                        color: #6B7280;
                        user-select: none;
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400">
                            Topic 6: sed Addressing: Line Numbers, Ranges, and Patterns
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Master sed's addressing system for precise, targeted text transformations
                        </p>
                    </div>
                </div>

                {/* Conceptual Foundation */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-pink-300 dark:hover:border-pink-500",
                    animationClass,
                    staggerDelay(1)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900 mr-4">
                            <svg className="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">sed Addressing System</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>sed addressing</strong> allows you to specify exactly which lines should be processed by your commands. Instead of applying transformations to every line, you can target specific line numbers, ranges of lines, or lines matching patterns.
                        </p>
                        
                        <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border-l-4 border-pink-500">
                            <h3 className="text-xl font-semibold mb-3 text-pink-700 dark:text-pink-400">Real-World Analogy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Imagine <strong>Abhronila</strong> needs to update only the header section (lines 1-10) of hundreds of student reports at <strong>Barrackpore College</strong>, while leaving the rest unchanged. With sed addressing, she can precisely target just those lines.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-lg bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-pink-700 dark:text-pink-400">Line Numbers</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Target specific line numbers</li>
                                    <li>Absolute positioning</li>
                                    <li>Perfect for fixed formats</li>
                                    <li>Example: <code>5s/old/new/</code></li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-rose-700 dark:text-rose-400">Ranges</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Target line ranges</li>
                                    <li>Inclusive operations</li>
                                    <li>Work with blocks</li>
                                    <li>Example: <code>10,20s/old/new/</code></li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-900/30 border border-fuchsia-200 dark:border-fuchsia-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-fuchsia-700 dark:text-fuchsia-400">Patterns</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Target lines matching patterns</li>
                                    <li>Regular expressions</li>
                                    <li>Dynamic addressing</li>
                                    <li>Example: <code>/pattern/s/old/new/</code></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Line Number Addressing */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500",
                    animationClass,
                    staggerDelay(2)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Line Number Addressing</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Line Number Syntax */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Basic Line Number Syntax</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2 text-center">sed '5s/foo/bar/' file</div>
                                        <div className="text-sm text-gray-300 text-center">Replace on line 5 only</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2 text-center">sed '1s/^/# /' file</div>
                                        <div className="text-sm text-gray-300 text-center">Comment out line 1</div>
                                    </div>
                                </div>
                                
                                {/* Special Line Numbers */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg">
                                    <h4 className="font-bold text-lg mb-3 text-blue-300">Special Line Numbers</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-400"><code>$</code></div>
                                            <div className="text-sm text-gray-300">Last line</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-400"><code>~</code></div>
                                            <div className="text-sm text-gray-300">Step (GNU sed)</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-400"><code>+N</code></div>
                                            <div className="text-sm text-gray-300">Relative offset</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Line Number Visualization */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Line Number Targeting in Action</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Original File</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-preview">
                                            <div><span className="line-number">1:</span> # Student Report</div>
                                            <div><span className="line-number">2:</span> Name: John Doe</div>
                                            <div><span className="line-number">3:</span> Age: 20</div>
                                            <div><span className="line-number">4:</span> Course: Computer Science</div>
                                            <div><span className="line-number">5:</span> Grade: A</div>
                                            <div><span className="line-number">6:</span> Status: Active</div>
                                            <div><span className="line-number">7:</span> # End Report</div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-cyan-200 dark:border-cyan-800">
                                        <h4 className="font-bold text-lg mb-3 text-cyan-700 dark:text-cyan-400">sed Command</h4>
                                        <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm text-center">
                                            <code>sed '3s/20/21/; 5s/A/A+/' students.txt</code>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                                            Update age on line 3 and grade on line 5
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Line Number Highlighting */}
                                <div className="mt-6">
                                    <svg width="100%" height="180" className="sed-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Line number targeting visualization:</text>
                                        
                                        {/* File with Line Numbers */}
                                        <rect x="20" y="40" width="460" height="100" rx="6" fill="#1F2937" stroke="#4B5563" strokeWidth="1"/>
                                        
                                        {/* Line 1 */}
                                        <text x="30" y="60" className="terminal-line" fill="#9CA3AF" fontSize="11">
                                            <tspan className="line-number">1:</tspan> # Student Report
                                        </text>
                                        
                                        {/* Line 2 */}
                                        <text x="30" y="75" className="terminal-line" fill="#9CA3AF" fontSize="11">
                                            <tspan className="line-number">2:</tspan> Name: John Doe
                                        </text>
                                        
                                        {/* Line 3 - Targeted */}
                                        <text x="30" y="90" className="terminal-line address-highlight" fontSize="11">
                                            <tspan className="line-number">3:</tspan> Age: <tspan className="text-red-400">20</tspan>
                                        </text>
                                        <rect x="65" y="82" width="25" height="12" rx="2" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3">
                                            <animate attributeName="stroke" values="#EF4444;#F87171;#EF4444" dur="1.5s" repeatCount="indefinite"/>
                                        </rect>
                                        
                                        {/* Line 4 */}
                                        <text x="30" y="105" className="terminal-line" fill="#9CA3AF" fontSize="11">
                                            <tspan className="line-number">4:</tspan> Course: Computer Science
                                        </text>
                                        
                                        {/* Line 5 - Targeted */}
                                        <text x="30" y="120" className="terminal-line address-highlight" fontSize="11">
                                            <tspan className="line-number">5:</tspan> Grade: <tspan className="text-red-400">A</tspan>
                                        </text>
                                        <rect x="70" y="112" width="15" height="12" rx="2" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3">
                                            <animate attributeName="stroke" values="#EF4444;#F87171;#EF4444" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
                                        </rect>
                                        
                                        {/* Line 6 */}
                                        <text x="30" y="135" className="terminal-line" fill="#9CA3AF" fontSize="11">
                                            <tspan className="line-number">6:</tspan> Status: Active
                                        </text>
                                        
                                        {/* Command Visualization */}
                                        <rect x="150" y="150" width="200" height="25" rx="4" fill="#1F2937" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="250" y="167" textAnchor="middle" className="text-xs" fill="#60A5FA">
                                            sed '3s/20/21/; 5s/A/A+/'
                                        </text>
                                        
                                        {/* Arrows */}
                                        <path d="M250 145 L250 135 L95 135 L95 90" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3,3">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite"/>
                                        </path>
                                        
                                        <path d="M250 145 L250 135 L105 135 L105 120" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3,3">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" begin="1s"/>
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-indigo-500">
                            <h4 className="font-bold text-xl mb-3 text-indigo-700 dark:text-indigo-400">Practical Example: Config File Header Update</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to update the version number in the header (line 2) of all config files at <strong>Shyamnagar College</strong>.
                                </p>
                                <div className="font-mono bg-gray-900 text-indigo-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed '2s/version: 1.0/version: 2.0/' config/*.yaml
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Before (app.yaml):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div># Application Config</div>
                                            <div>version: 1.0</div>
                                            <div>database: postgres</div>
                                            <div>port: 8080</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">After (app.yaml):</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div># Application Config</div>
                                            <div>version: 2.0</div>
                                            <div>database: postgres</div>
                                            <div>port: 8080</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Range Addressing */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-500",
                    animationClass,
                    staggerDelay(3)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Range Addressing</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Range Syntax */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Range Syntax & Examples</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed '10,20s/foo/bar/' file</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Replace on lines 10 through 20 (inclusive)</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed '5,$s/old/new/' file</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Replace from line 5 to end of file</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed '1~2s/^/# /' file</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Comment every other line (odd lines)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Range Types */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Range Types & Patterns</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">Fixed Range</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-green-400">10,20</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines 10 to 20 inclusive</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-green-400">1,5</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">First 5 lines</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-emerald-200 dark:border-emerald-800">
                                        <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Open-ended Range</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-emerald-400">5,$</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Line 5 to end of file</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-emerald-400">1,+10</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Line 1 plus next 10 lines</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-teal-200 dark:border-teal-800">
                                        <h4 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Step Range</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-teal-400">1~2</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Every 2nd line starting at 1</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-teal-400">2~3</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Every 3rd line starting at 2</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Range Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="220" className="sed-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Range addressing examples:</text>
                                        
                                        {/* File Lines */}
                                        <rect x="20" y="40" width="460" height="130" rx="6" fill="#1F2937" stroke="#4B5563" strokeWidth="1"/>
                                        
                                        {/* Lines 1-15 */}
                                        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((line, i) => (
                                            <text key={line} x="30" y={60 + i*10} className="terminal-line" fill="#9CA3AF" fontSize="11">
                                                <tspan className="line-number">{line}:</tspan> Line {line} content
                                            </text>
                                        ))}
                                        
                                        {/* Fixed Range Highlight (5-10) */}
                                        <rect x="25" y="55" width="450" height="50" rx="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#10B981;#34D399;#10B981" dur="3s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="250" y="50" textAnchor="middle" className="text-xs" fill="#10B981">Fixed: 5,10 (lines 5-10)</text>
                                        
                                        {/* Open-ended Range Highlight (12-$) */}
                                        <rect x="25" y="115" width="450" height="50" rx="4" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#3B82F6;#60A5FA;#3B82F6" dur="3s" repeatCount="indefinite" begin="1s"/>
                                        </rect>
                                        <text x="250" y="110" textAnchor="middle" className="text-xs" fill="#3B82F6">Open-ended: 12,$ (lines 12-end)</text>
                                        
                                        {/* Step Range Indicators */}
                                        <circle cx="50" cy="60" r="3" fill="#F59E0B">
                                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                                        </circle>
                                        <circle cx="50" cy="80" r="3" fill="#F59E0B">
                                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                                        </circle>
                                        <circle cx="50" cy="100" r="3" fill="#F59E0B">
                                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" begin="1s"/>
                                        </circle>
                                        <circle cx="50" cy="120" r="3" fill="#F59E0B">
                                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" begin="1.5s"/>
                                        </circle>
                                        <circle cx="50" cy="140" r="3" fill="#F59E0B">
                                            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" begin="2s"/>
                                        </circle>
                                        <text x="70" y="175" className="text-xs" fill="#F59E0B">Step: 1~3 (every 3rd line)</text>
                                        
                                        {/* Commands */}
                                        <rect x="20" y="180" width="220" height="25" rx="4" fill="#1F2937" stroke="#10B981" strokeWidth="1"/>
                                        <text x="130" y="197" textAnchor="middle" className="text-xs" fill="#10B981">sed '5,10s/old/new/'</text>
                                        
                                        <rect x="250" y="180" width="230" height="25" rx="4" fill="#1F2937" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="365" y="197" textAnchor="middle" className="text-xs" fill="#3B82F6">sed '12,$s/old/new/'</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-emerald-500">
                            <h4 className="font-bold text-xl mb-3 text-emerald-700 dark:text-emerald-400">Practical Example: Log File Extraction</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Tuhina</span> needs to extract only the error section (lines 50-100) from a large log file at <strong>Ichapur Server</strong> for analysis.
                                </p>
                                <div className="font-mono bg-gray-900 text-emerald-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed -n '50,100p' server.log > errors.log
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Original (server.log):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div>... (thousands of lines)</div>
                                            <div className="text-green-400">Line 49: INFO: Normal operation</div>
                                            <div className="text-red-400">Line 50: ERROR: Database timeout</div>
                                            <div className="text-red-400">Line 51: ERROR: Connection lost</div>
                                            <div>... (error lines 52-99)</div>
                                            <div className="text-red-400">Line 100: ERROR: Recovery failed</div>
                                            <div className="text-green-400">Line 101: INFO: Restarting service</div>
                                            <div>... (more lines)</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Extracted (errors.log):</p>
                                        <div className="font-mono bg-gray-800 text-red-400 p-3 rounded text-xs">
                                            <div>ERROR: Database timeout</div>
                                            <div>ERROR: Connection lost</div>
                                            <div>... (error lines only)</div>
                                            <div>ERROR: Recovery failed</div>
                                        </div>
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">51 lines extracted (50-100 inclusive)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pattern Addressing */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500",
                    animationClass,
                    staggerDelay(4)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Pattern Addressing</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Pattern Syntax */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Pattern Addressing Syntax</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed '/error/s/foo/bar/' file</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Replace on lines containing "error"</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed '/^#/d' file</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Delete lines starting with # (comments)</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed '/start/,/end/d' file</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Delete range between patterns</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pattern Types */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Pattern Types & Examples</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Simple Patterns</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-purple-400">/error/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines containing "error"</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-purple-400">/^DEBUG/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines starting with "DEBUG"</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-purple-400">/error$/i</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines ending with "error" (case-insensitive)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-800">
                                        <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-400">Regex Patterns</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-pink-400">/[0-9]+/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines containing numbers</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-pink-400">/^[A-Z]/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines starting with uppercase</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-pink-400">/\\.(txt|conf)$/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Lines ending with .txt or .conf</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-fuchsia-200 dark:border-fuchsia-800">
                                        <h4 className="font-bold text-lg mb-3 text-fuchsia-700 dark:text-fuchsia-400">Pattern Ranges</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-fuchsia-400">/start/,/end/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Between "start" and "end" patterns</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-fuchsia-400">/^\[/,/^\]/</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Between lines starting with [ and ]</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-fuchsia-400">/BEGIN/,/END/p</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Print range between BEGIN and END</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Pattern Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="220" className="sed-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Pattern addressing in action:</text>
                                        
                                        {/* Config File */}
                                        <rect x="20" y="40" width="460" height="130" rx="6" fill="#1F2937" stroke="#4B5563" strokeWidth="1"/>
                                        
                                        {/* File Content */}
                                        <text x="30" y="60" className="terminal-line" fill="#9CA3AF" fontSize="11"># Application Configuration</text>
                                        <text x="30" y="75" className="terminal-line" fill="#9CA3AF" fontSize="11">debug = false</text>
                                        <text x="30" y="90" className="terminal-line address-highlight" fontSize="11">[database]</text>
                                        <text x="30" y="105" className="terminal-line address-highlight" fontSize="11">host = localhost</text>
                                        <text x="30" y="120" className="terminal-line address-highlight" fontSize="11">port = 3306</text>
                                        <text x="30" y="135" className="terminal-line address-highlight" fontSize="11">user = admin</text>
                                        <text x="30" y="150" className="terminal-line" fontSize="11">[cache]</text>
                                        <text x="30" y="165" className="terminal-line" fontSize="11">enabled = true</text>
                                        
                                        {/* Pattern Range Highlight */}
                                        <rect x="25" y="85" width="450" height="45" rx="4" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#8B5CF6;#A78BFA;#8B5CF6" dur="3s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="250" y="80" textAnchor="middle" className="text-xs" fill="#8B5CF6">Pattern range: /\[database\]/,/\[.*\]/</text>
                                        
                                        {/* Individual Pattern Match */}
                                        <rect x="65" y="145" width="60" height="12" rx="2" fill="none" stroke="#EC4899" strokeWidth="2" strokeDasharray="3,3">
                                            <animate attributeName="stroke" values="#EC4899;#F472B6;#EC4899" dur="1.5s" repeatCount="indefinite" begin="1s"/>
                                        </rect>
                                        <text x="350" y="155" className="text-xs" fill="#EC4899">Single pattern: /user/</text>
                                        
                                        {/* Commands */}
                                        <rect x="20" y="180" width="220" height="25" rx="4" fill="#1F2937" stroke="#8B5CF6" strokeWidth="1"/>
                                        <text x="130" y="197" textAnchor="middle" className="text-xs" fill="#8B5CF6">sed '/\[database\]/,/\[.*\]/s/localhost/prod-db/'</text>
                                        
                                        <rect x="250" y="180" width="230" height="25" rx="4" fill="#1F2937" stroke="#EC4899" strokeWidth="1"/>
                                        <text x="365" y="197" textAnchor="middle" className="text-xs" fill="#EC4899">sed '/user/s/admin/root/'</text>
                                        
                                        {/* Pattern Flow */}
                                        <path d="M130 175 L130 165 L90 165 L90 90" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3,3">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite"/>
                                        </path>
                                        
                                        <path d="M365 175 L365 165 L95 165 L95 135" stroke="#EC4899" strokeWidth="1" strokeDasharray="3,3">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" begin="1s"/>
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-violet-500">
                            <h4 className="font-bold text-xl mb-3 text-violet-700 dark:text-violet-400">Practical Example: Comment Management</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Debangshu</span> needs to uncomment all configuration lines (remove #) but only in the [database] section at <strong>Naihati Tech</strong>.
                                </p>
                                <div className="font-mono bg-gray-900 text-violet-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed '/\\[database\\]/,/\\[.*\\]/s/^#\\s*//' app.conf
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Before (app.conf):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div>[app]</div>
                                            <div># debug = true</div>
                                            <div>port = 8080</div>
                                            <div>[database]</div>
                                            <div># host = localhost</div>
                                            <div># port = 3306</div>
                                            <div># user = admin</div>
                                            <div>[cache]</div>
                                            <div># enabled = true</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">After (app.conf):</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div>[app]</div>
                                            <div># debug = true</div>
                                            <div>port = 8080</div>
                                            <div>[database]</div>
                                            <div>host = localhost</div>
                                            <div>port = 3306</div>
                                            <div>user = admin</div>
                                            <div>[cache]</div>
                                            <div># enabled = true</div>
                                        </div>
                                        <p className="text-sm text-violet-600 dark:text-violet-400 mt-2">Only uncommented within [database] section</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Combined Addressing */}
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
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Combined & Advanced Addressing</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Advanced Addressing Techniques</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-cyan-200 dark:border-cyan-800">
                                        <h4 className="font-bold text-lg mb-3 text-cyan-700 dark:text-cyan-400">Negated Addressing</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">sed '/pattern/!s/old/new/'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Replace on lines NOT containing pattern</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">sed '1,10!d' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Delete all lines EXCEPT 1-10</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">sed '/^$/!s/$/;/'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Add semicolon to non-empty lines</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Multiple Addresses</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-blue-400">sed -e '5s/x/y/' -e '10,15s/a/b/'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Multiple commands with different addresses</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-blue-400">sed '/start/,/end/s/old/new/g'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Global replace within pattern range</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-blue-400">sed '1p; 2,5d; $s/$/ END/'</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Multiple operations in one command</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-teal-200 dark:border-teal-800">
                                    <h4 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Complex Real-world Example</h4>
                                    <div className="font-mono bg-gray-900 text-teal-400 p-4 rounded-lg text-sm">
                                        <code>
                                            sed -e '1i\\# Updated: $(date)' -e '/^#/d' -e '5,15s/old/new/g' -e '$a\\# End of file' config.txt
                                        </code>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                                        This command: 1) Adds header with date, 2) Removes comments, 3) Replaces in lines 5-15, 4) Adds footer
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-amber-500">
                            <h4 className="font-bold text-xl mb-3 text-amber-700 dark:text-amber-400">Practical Example: Report Generation</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to process student grade reports at <strong>Barrackpore College</strong>: add header, process only data lines (skip comments), and format output.
                                </p>
                                <div className="font-mono bg-gray-900 text-amber-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed -e '1i\\=== STUDENT GRADES ===' -e '/^#/d' -e '/^$/d' -e 's/,\\([A-F]\\)$/ - Grade: \\1/' grades.csv
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Input (grades.csv):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div># Student Grade Report</div>
                                            <div>John Doe,Computer Science,A</div>
                                            <div>Jane Smith,Mathematics,B</div>
                                            <div></div>
                                            <div># End of report</div>
                                            <div>Bob Johnson,Physics,C</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Output:</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div>=== STUDENT GRADES ===</div>
                                            <div>John Doe,Computer Science - Grade: A</div>
                                            <div>Jane Smith,Mathematics - Grade: B</div>
                                            <div>Bob Johnson,Physics - Grade: C</div>
                                        </div>
                                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">Added header, removed comments/empties, formatted grades</p>
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
                                <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Off-by-One Errors</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>sed line numbers start at 1, not 0</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Ranges are inclusive: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">1,5</code> includes lines 1 AND 5</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">$</code> means last line, not end of range</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">Pattern Range Issues</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Pattern ranges match first occurrence only: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/a/,/b/</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Nested patterns cause unexpected behavior</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Missing end pattern includes rest of file</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                            <h4 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Syntax Confusion</h4>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">5s/old/new/</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/5/s/old/new/</code> (first is correct)</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Missing commas in ranges: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">1 5s/old/new/</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">1,5s/old/new/</code></span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Special characters in patterns need escaping: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/[/</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/\\[/</code></span>
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
                                <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Testing & Verification</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">🧪</span>
                                        <span>Test addressing with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -n 'addressp' file</code> first</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">🧪</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">cat -n file</code> to see line numbers</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">🧪</span>
                                        <span>Check pattern matches with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">grep -n 'pattern' file</code></span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Address Selection</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">🎯</span>
                                        <span>Use line numbers for fixed format files</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">🎯</span>
                                        <span>Use patterns for variable content</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">🎯</span>
                                        <span>Combine addresses for complex operations</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Performance & Readability</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-e</code> for multiple addresses instead of semicolons in complex cases</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Store complex addresses in sed script files</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Comment your sed commands with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">#</code> in scripts</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Beginner-Friendly Habits</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎓</span>
                                        <span>Start with simple line numbers before patterns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎓</span>
                                        <span>Practice with sample files from Barrackpore College</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎓</span>
                                        <span>Always test on a copy before using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-pink-200 dark:border-pink-800",
                    "transform transition-all duration-300 hover:shadow-2xl",
                    animationClass,
                    staggerDelay(8)
                )}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Mini Checklist: sed Addressing Mastery</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">#</span>
                                </div>
                                <h3 className="font-bold text-lg">Line Numbers</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">5s/old/new/</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">$</code> = last line</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Start at 1, not 0</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">,</span>
                                </div>
                                <h3 className="font-bold text-lg">Ranges</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">10,20</code> inclusive</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">5,$</code> to end</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">1~2</code> step</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">/</span>
                                </div>
                                <h3 className="font-bold text-lg">Patterns</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">/pattern/</code> match</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">/start/,/end/</code> range</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span><code className="text-xs">/pattern/!</code> negate</span>
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
                                How would you use sed to delete all empty lines AND comment lines from a config file?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Observe carefully...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                What happens with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '/a/,/b/d'</code> when pattern "b" doesn't exist in the file?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Try changing this...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Create a sed command that updates phone numbers only in the contact section (between "[Contacts]" and next "[") of a document.
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
                            <strong>Dear students,</strong> sed addressing is what transforms sed from a simple find/replace tool into a surgical instrument for text manipulation. Remember: line numbers are absolute, patterns are dynamic, and ranges give you control over blocks.
                        </p>
                        
                        <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-sky-500">
                            <h4 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">Classroom Experience Tips</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>When <strong>Tuhina</strong> was processing Barrackpore college reports, she used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '1,5s/2023/2024/'</code> to update years only in headers. Line numbers were perfect because headers were always first 5 lines.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>For Ichapur server logs with variable structure, we use patterns: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '/ERROR:/,/^$/s/localhost/prod-host/'</code> to replace only in error blocks.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Always test pattern ranges with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -n '/start/,/end/p' file | head -20</code>. Abhronila once had a pattern range match the entire file because the end pattern was missing!</span>
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
                                    "Precision in addressing leads to precision in results - know exactly where your sed commands will strike"
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
                            <h4 className="font-bold text-xl mb-4 text-violet-700 dark:text-violet-400">Advanced Addressing</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -n '=;p' file</code> to print line numbers with content (GNU sed)</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Combine with awk for complex addressing: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">awk 'NR==5' file | sed 's/old/new/'</code></span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -z</code> for multiline patterns (GNU sed)</span>
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
                                    <span>Create sed script files for complex addressing: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -f transform.sed data.txt</code></span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">B</span>
                                    </div>
                                    <span>Use variables in scripts: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">START=5; END=10; sed "${`{START}`},${`{END}`}s/old/new/"</code></span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">C</span>
                                    </div>
                                    <span>Combine with find for batch processing: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">find . -name "*.log" -exec sed -i '1,100s/error/ERROR/g' {`{}`} \\;</code></span>
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
                            Topic 6: sed addressing: line numbers, ranges, and patterns • Next: Deleting, inserting, appending lines using sed
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Practice with Barrackpore college reports and Shyamnagar server logs to master sed addressing!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic6;