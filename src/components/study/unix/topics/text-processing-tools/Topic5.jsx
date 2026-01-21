import React from 'react';
import clsx from 'clsx';

class Topic5 extends React.Component {
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
                    
                    @keyframes sedFlow {
                        0% {
                            stroke-dashoffset: 100;
                        }
                        100% {
                            stroke-dashoffset: 0;
                        }
                    }
                    
                    .sed-anim {
                        animation: pulseSubtle 2s ease-in-out infinite;
                    }
                    
                    .flow-path {
                        stroke-dasharray: 10;
                        animation: sedFlow 3s linear infinite;
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
                    
                    .highlight-change {
                        background-color: rgba(253, 224, 71, 0.3);
                        border-radius: 3px;
                        padding: 0 2px;
                        transition: background-color 0.3s ease;
                    }
                    
                    .highlight-change:hover {
                        background-color: rgba(253, 224, 71, 0.6);
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                            Topic 5: Using sed for Find & Replace and Inline Editing
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Master the stream editor for powerful text transformation and automated editing
                        </p>
                    </div>
                </div>

                {/* Conceptual Foundation */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-500",
                    animationClass,
                    staggerDelay(1)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 mr-4">
                            <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">sed - The Stream Editor</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>sed</strong> (Stream EDitor) is a Unix utility that parses and transforms text, using a simple, compact programming language. It's designed for stream editing - processing text line by line, making it perfect for automated text manipulation.
                        </p>
                        
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border-l-4 border-indigo-500">
                            <h3 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400">Real-World Analogy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Imagine <strong>Tuhina</strong> needs to update hundreds of student email addresses at <strong>Barrackpore College</strong> from "@oldcollege.edu" to "@barrackpore.edu". Instead of editing each file manually, she writes one sed command that updates all files automatically.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-400">Find & Replace</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Search and replace text patterns</li>
                                    <li>Use regular expressions</li>
                                    <li>Global or specific replacements</li>
                                    <li>Most common sed usage</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-400">Inline Editing</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Modify files directly</li>
                                    <li>Backup original files</li>
                                    <li>Batch processing</li>
                                    <li>Script automation</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-cyan-700 dark:text-cyan-400">Advanced Operations</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Delete/insert lines</li>
                                    <li>Pattern-based operations</li>
                                    <li>Multiple commands</li>
                                    <li>Conditional editing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic sed Syntax */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500",
                    animationClass,
                    staggerDelay(2)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Basic sed Syntax & Structure</h2>
                    </div>

                    <div className="space-y-8">
                        {/* sed Command Structure */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Command Structure</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2 text-center">sed 's/pattern/replacement/flags' file</div>
                                        <div className="text-sm text-gray-300 text-center">Basic substitution syntax</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2 text-center">sed -e 'cmd1' -e 'cmd2' file</div>
                                        <div className="text-sm text-gray-300 text-center">Multiple commands</div>
                                    </div>
                                </div>
                                
                                {/* Command Breakdown */}
                                <div className="mt-6 p-4 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg">
                                    <h4 className="font-bold text-lg mb-3 text-purple-300">Command Breakdown</h4>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-400">s</div>
                                            <div className="text-sm text-gray-300">Substitute command</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-yellow-400">/</div>
                                            <div className="text-sm text-gray-300">Delimiter</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-400">pattern</div>
                                            <div className="text-sm text-gray-300">Search regex</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-400">replacement</div>
                                            <div className="text-sm text-gray-300">Replacement text</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-cyan-400">flags</div>
                                            <div className="text-sm text-gray-300">Options (g, i, p)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* sed Flow Visualization */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">How sed Processes Text</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-purple-200 dark:border-purple-800">
                                        <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Input Stream</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-preview">
                                            <div>Line 1: Hello World</div>
                                            <div>Line 2: Welcome to Linux</div>
                                            <div>Line 3: Hello sed</div>
                                            <div>Line 4: Goodbye World</div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-pink-200 dark:border-pink-800">
                                        <h4 className="font-bold text-lg mb-3 text-pink-700 dark:text-pink-400">sed Command</h4>
                                        <div className="font-mono bg-gray-900 text-pink-400 p-4 rounded-lg text-sm text-center">
                                            <code>sed 's/Hello/Hi/g'</code>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                                            Replace "Hello" with "Hi" globally
                                        </p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">Output Stream</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-preview">
                                            <div>Line 1: <span className="highlight-change">Hi</span> World</div>
                                            <div>Line 2: Welcome to Linux</div>
                                            <div>Line 3: <span className="highlight-change">Hi</span> sed</div>
                                            <div>Line 4: Goodbye World</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* sed Flow Animation */}
                                <div className="mt-6">
                                    <svg width="100%" height="120" className="sed-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">sed processing flow:</text>
                                        
                                        {/* Input */}
                                        <rect x="20" y="30" width="120" height="40" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                                        <text x="80" y="55" textAnchor="middle" fill="#1E40AF" fontSize="12" fontWeight="bold">Input File</text>
                                        
                                        <path d="M140 50 L160 50" stroke="#6B7280" strokeWidth="2" className="flow-path"/>
                                        <polygon points="160,45 170,50 160,55" fill="#6B7280"/>
                                        
                                        {/* sed Processor */}
                                        <rect x="170" y="30" width="100" height="40" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2">
                                            <animate attributeName="fill" values="#FEF3C7;#FDE68A;#FEF3C7" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="220" y="55" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">sed Engine</text>
                                        
                                        <path d="M270 50 L290 50" stroke="#6B7280" strokeWidth="2" className="flow-path"/>
                                        <polygon points="290,45 300,50 290,55" fill="#6B7280"/>
                                        
                                        {/* Output */}
                                        <rect x="300" y="30" width="120" height="40" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2"/>
                                        <text x="360" y="55" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">Output</text>
                                        
                                        {/* Pattern Match Visualization */}
                                        <rect x="40" y="80" width="80" height="25" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1"/>
                                        <text x="80" y="97" textAnchor="middle" fill="#DC2626" fontSize="11">"Hello"</text>
                                        
                                        <path d="M80 105 L80 120 L220 120 L220 105" stroke="#DC2626" strokeWidth="1" strokeDasharray="3,3">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite"/>
                                        </path>
                                        
                                        <rect x="340" y="80" width="40" height="25" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1"/>
                                        <text x="360" y="97" textAnchor="middle" fill="#166534" fontSize="11">"Hi"</text>
                                        
                                        <text x="220" y="115" className="text-xs" fill="#6B7280">Pattern matched and replaced</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-indigo-500">
                            <h4 className="font-bold text-xl mb-3 text-indigo-700 dark:text-indigo-400">Practical Example: Config File Update</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to update the database host in all configuration files at <strong>Shyamnagar College</strong> from "localhost" to "db.cluster.college.edu".
                                </p>
                                <div className="font-mono bg-gray-900 text-indigo-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed 's/localhost/db.cluster.college.edu/g' config/*.conf
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Before:</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div>database.host = localhost</div>
                                            <div>cache.host = localhost</div>
                                            <div>api.endpoint = http://localhost:8080</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">After:</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div>database.host = db.cluster.college.edu</div>
                                            <div>cache.host = db.cluster.college.edu</div>
                                            <div>api.endpoint = http://db.cluster.college.edu:8080</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Find & Replace Operations */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-500",
                    animationClass,
                    staggerDelay(3)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Find & Replace Operations</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Basic Substitution */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Basic Substitution Examples</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed 's/foo/bar/' file.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Replace first "foo" with "bar" on each line</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed 's/foo/bar/g' file.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Replace ALL "foo" with "bar" on each line (global)</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed 's/foo/bar/2' file.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Replace second occurrence of "foo" on each line</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flags and Modifiers */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">sed Replacement Flags</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">Global (<code>g</code>)</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm text-gray-300">Line: foo foo foo</div>
                                                <div className="text-sm text-green-400">sed 's/foo/bar/g' → bar bar bar</div>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm text-gray-300">Without g: only first match</div>
                                                <div className="text-sm text-green-400">sed 's/foo/bar/' → bar foo foo</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-emerald-200 dark:border-emerald-800">
                                        <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Case-insensitive (<code>i</code>)</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm text-gray-300">Line: Hello HELLO hello</div>
                                                <div className="text-sm text-emerald-400">sed 's/hello/Hi/gi' → Hi Hi Hi</div>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm text-gray-300">Case-sensitive default</div>
                                                <div className="text-sm text-emerald-400">sed 's/hello/Hi/g' → Hello HELLO Hi</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-teal-200 dark:border-teal-800">
                                        <h4 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Print (<code>p</code>)</h4>
                                        <div className="space-y-2">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm text-gray-300">With -n: print only changed lines</div>
                                                <div className="text-sm text-teal-400">sed -n 's/foo/bar/p'</div>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <div className="text-sm text-gray-300">Without -n: prints all lines</div>
                                                <div className="text-sm text-teal-400">sed 's/foo/bar/p'</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Flag Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="150" className="sed-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Flag behavior comparison:</text>
                                        
                                        {/* Original Text */}
                                        <rect x="20" y="30" width="460" height="25" rx="4" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="250" y="46" textAnchor="middle" fill="#6B7280" fontSize="12" fontWeight="bold">apple Apple APPLE apple</text>
                                        
                                        {/* No Flag */}
                                        <text x="30" y="70" className="text-xs" fill="#6B7280">No flags (default):</text>
                                        <rect x="150" y="60" width="200" height="25" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1"/>
                                        <text x="250" y="76" textAnchor="middle" fill="#DC2626" fontSize="11">orange Apple APPLE apple</text>
                                        <text x="250" y="90" className="text-xs" fill="#DC2626">Only first exact match replaced</text>
                                        
                                        {/* g Flag */}
                                        <text x="30" y="115" className="text-xs" fill="#6B7280">With <code>g</code> flag:</text>
                                        <rect x="150" y="105" width="200" height="25" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1"/>
                                        <text x="250" y="121" textAnchor="middle" fill="#16A34A" fontSize="11">orange Apple APPLE orange</text>
                                        <text x="250" y="135" className="text-xs" fill="#16A34A">All exact matches replaced</text>
                                        
                                        {/* gi Flags */}
                                        <text x="30" y="160" className="text-xs" fill="#6B7280">With <code>gi</code> flags:</text>
                                        <rect x="150" y="150" width="200" height="25" rx="4" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1"/>
                                        <text x="250" y="166" textAnchor="middle" fill="#1E40AF" fontSize="11">orange orange orange orange</text>
                                        <text x="250" y="180" className="text-xs" fill="#1E40AF">All case-insensitive matches replaced</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-emerald-500">
                            <h4 className="font-bold text-xl mb-3 text-emerald-700 dark:text-emerald-400">Practical Example: Date Format Conversion</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Abhronila</span> needs to convert date formats in <strong>Ichapur College</strong> student records from "DD-MM-YYYY" to "YYYY/MM/DD".
                                </p>
                                <div className="font-mono bg-gray-900 text-emerald-400 p-4 rounded-lg text-sm">
                                    <code>
                                        {`sed 's/\\([0-9]\\{2\\}\\)-\\([0-9]\\{2\\}\\)-\\([0-9]\\{4\\}\\)/\\3\\/\\2\\/\\1/g' students.csv`}
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Before (DD-MM-YYYY):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div>15-01-2023,John Doe,Computer Science</div>
                                            <div>23-11-2022,Jane Smith,Mathematics</div>
                                            <div>07-06-2023,Bob Johnson,Physics</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">After (YYYY/MM/DD):</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div>2023/01/15,John Doe,Computer Science</div>
                                            <div>2022/11/23,Jane Smith,Mathematics</div>
                                            <div>2023/06/07,Bob Johnson,Physics</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inline Editing */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-red-300 dark:hover:border-red-500",
                    animationClass,
                    staggerDelay(4)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 mr-4">
                            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Inline File Editing</h2>
                    </div>

                    <div className="space-y-8">
                        {/* In-place Editing */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">In-place Editing with <code>-i</code></h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed -i 's/foo/bar/g' file.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Edit file.txt in-place (NO backup)</div>
                                        <div className="terminal-line text-red-300 text-sm mt-1">⚠️ Original file is overwritten!</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed -i.bak 's/foo/bar/g' file.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Create backup as file.txt.bak before editing</div>
                                        <div className="terminal-line text-green-300 text-sm mt-1">✓ Safe with backup</div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-800 rounded-lg">
                                        <div className="terminal-line text-green-400 mb-2">$ sed -i'.backup' 's/foo/bar/g' *.txt</div>
                                        <div className="terminal-line text-gray-300 text-sm"># Edit multiple files with .backup extension</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* In-place Editing Visualization */}
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">In-place Editing Process</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-red-200 dark:border-red-800">
                                        <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Original File</h4>
                                        <div className="font-mono bg-gray-900 text-gray-300 p-4 rounded-lg text-sm file-preview">
                                            <div># config.txt (original)</div>
                                            <div>host = localhost</div>
                                            <div>port = 8080</div>
                                            <div>debug = true</div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Size: 45 bytes</p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-orange-200 dark:border-orange-800">
                                        <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">sed Command</h4>
                                        <div className="font-mono bg-gray-900 text-orange-400 p-4 rounded-lg text-sm text-center">
                                            <code>sed -i.bak 's/localhost/production-host/g' config.txt</code>
                                        </div>
                                        <div className="mt-3 space-y-2">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">Creates backup first</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">Processes file</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">Overwrites original</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">After sed -i.bak</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">config.txt (updated):</div>
                                                <div className="font-mono bg-gray-900 text-green-400 p-3 rounded text-xs">
                                                    <div>host = production-host</div>
                                                    <div>port = 8080</div>
                                                    <div>debug = true</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">config.txt.bak (backup):</div>
                                                <div className="font-mono bg-gray-900 text-gray-400 p-3 rounded text-xs">
                                                    <div>host = localhost</div>
                                                    <div>port = 8080</div>
                                                    <div>debug = true</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* In-place Editing Animation */}
                                <div className="mt-6">
                                    <svg width="100%" height="180" className="sed-anim">
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">In-place editing with backup:</text>
                                        
                                        {/* Step 1: Original File */}
                                        <rect x="20" y="40" width="120" height="60" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                                        <text x="80" y="70" textAnchor="middle" fill="#1E40AF" fontSize="12" fontWeight="bold">config.txt</text>
                                        <text x="80" y="85" textAnchor="middle" fill="#1E40AF" fontSize="10">(Original)</text>
                                        
                                        <path d="M140 70 L160 70" stroke="#6B7280" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite"/>
                                        </path>
                                        <polygon points="160,65 170,70 160,75" fill="#6B7280"/>
                                        
                                        {/* Step 2: Backup Creation */}
                                        <rect x="170" y="40" width="120" height="60" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2">
                                            <animate attributeName="fill" values="#FEF3C7;#FDE68A;#FEF3C7" dur="2s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="230" y="70" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="bold">Backup</text>
                                        <text x="230" y="85" textAnchor="middle" fill="#92400E" fontSize="10">Create .bak file</text>
                                        
                                        <path d="M290 70 L310 70" stroke="#6B7280" strokeWidth="2">
                                            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                                        </path>
                                        <polygon points="310,65 320,70 310,75" fill="#6B7280"/>
                                        
                                        {/* Step 3: Processing */}
                                        <rect x="320" y="40" width="120" height="60" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2">
                                            <animate attributeName="fill" values="#FEE2E2;#FECACA;#FEE2E2" dur="1.5s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="380" y="70" textAnchor="middle" fill="#B91C1C" fontSize="12" fontWeight="bold">sed Process</text>
                                        <text x="380" y="85" textAnchor="middle" fill="#B91C1C" fontSize="10">Apply changes</text>
                                        
                                        {/* Backup File */}
                                        <rect x="20" y="120" width="120" height="40" rx="4" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1"/>
                                        <text x="80" y="145" textAnchor="middle" fill="#6B7280" fontSize="11">config.txt.bak</text>
                                        
                                        {/* Updated File */}
                                        <rect x="320" y="120" width="120" height="40" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1"/>
                                        <text x="380" y="145" textAnchor="middle" fill="#166534" fontSize="11">config.txt (updated)</text>
                                        
                                        {/* Arrows */}
                                        <path d="M80 100 L80 115" stroke="#6B7280" strokeWidth="1" strokeDasharray="3,3"/>
                                        <path d="M80 115 L20 115 L20 120" stroke="#6B7280" strokeWidth="1" strokeDasharray="3,3"/>
                                        
                                        <path d="M380 100 L380 115" stroke="#6B7280" strokeWidth="1" strokeDasharray="3,3"/>
                                        <path d="M380 115 L440 115 L440 120" stroke="#6B7280" strokeWidth="1" strokeDasharray="3,3"/>
                                        <polygon points="440,115 435,120 445,120" fill="#6B7280"/>
                                        
                                        <text x="80" y="165" className="text-xs" fill="#6B7280">Original preserved</text>
                                        <text x="380" y="165" className="text-xs" fill="#6B7280">File updated</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-orange-500">
                            <h4 className="font-bold text-xl mb-3 text-orange-700 dark:text-orange-400">Practical Example: Batch File Updates</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Debangshu</span> needs to remove all debug statements from Python files at <strong>Naihati Tech</strong> before production deployment.
                                </p>
                                <div className="font-mono bg-gray-900 text-orange-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed -i.bak '/^\\s*print(/d' *.py
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Before (app.py):</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div>def process_data(data):</div>
                                            <div>    print("DEBUG: Processing started")</div>
                                            <div>    result = data * 2</div>
                                            <div>    {`print(f"DEBUG: Result: {result}")`}</div>
                                            <div>    return result</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">After (app.py):</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div>def process_data(data):</div>
                                            <div>    result = data * 2</div>
                                            <div>    return result</div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">app.py.bak contains original with debug statements</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced sed Patterns */}
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
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Advanced sed Patterns</h2>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Advanced sed Commands</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-cyan-200 dark:border-cyan-800">
                                        <h4 className="font-bold text-lg mb-3 text-cyan-700 dark:text-cyan-400">Delete Lines</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">sed '/pattern/d' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Delete lines matching pattern</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">sed '1,5d' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Delete lines 1-5</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-cyan-400">sed '$d' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Delete last line</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Insert/Append</h4>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-blue-400">sed '2i\\New Line' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Insert before line 2</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-blue-400">sed '/pattern/a\\Appended' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Append after pattern</span>
                                            </div>
                                            <div className="p-3 bg-gray-800/50 rounded-lg">
                                                <code className="font-mono text-sm block mb-1 text-blue-400">sed '1c\\Replaced First Line' file</code>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">Change/replace line 1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-teal-200 dark:border-teal-800">
                                    <h4 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Pattern Ranges & Groups</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1 text-teal-400">sed -n '/start/,/end/p' file</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Print range between patterns</span>
                                        </div>
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1 text-teal-400">sed 's/\\(word\\)/\\U\\1/' file</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Uppercase captured group</span>
                                        </div>
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1 text-teal-400">sed 's/.*/\L&/' file</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Lowercase entire line (&)</span>
                                        </div>
                                        <div className="p-3 bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1 text-teal-400">sed 's/^/# /' file</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Comment out all lines</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-violet-500">
                            <h4 className="font-bold text-xl mb-3 text-violet-700 dark:text-violet-400">Practical Example: Config File Transformation</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to transform a legacy config format at <strong>Barrackpore College</strong> to a new format.
                                </p>
                                <div className="font-mono bg-gray-900 text-violet-400 p-4 rounded-lg text-sm">
                                    <code>
                                        sed -e 's/^\\[\\\(.*\\\)\\]/\\# Section: \\1/; s/^\\([^#].*\\)=\\(.*\\)/\\1: "\\2"/' old.conf > new.conf
                                    </code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Old Format:</p>
                                        <div className="font-mono bg-gray-800 text-gray-400 p-3 rounded text-xs">
                                            <div>[database]</div>
                                            <div>host=localhost</div>
                                            <div>port=3306</div>
                                            <div>[app]</div>
                                            <div>debug=true</div>
                                            <div>timeout=30</div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">New Format:</p>
                                        <div className="font-mono bg-gray-800 text-green-400 p-3 rounded text-xs">
                                            <div># Section: database</div>
                                            <div>host: "localhost"</div>
                                            <div>port: "3306"</div>
                                            <div># Section: app</div>
                                            <div>debug: "true"</div>
                                            <div>timeout: "30"</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-yellow-300 dark:hover:border-yellow-500",
                    animationClass,
                    staggerDelay(6)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
                            <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Common Pitfalls & Mistakes</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                <h4 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">In-place Editing Dangers</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">⚠️</span>
                                        <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -i</code> without backup destroys original data</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">⚠️</span>
                                        <span>Running sed twice can cause unintended changes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">⚠️</span>
                                        <span>Patterns with slashes need escaping: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">s/\\/path\\/to\\/file/\\/new\\/path/g</code></span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Regex Escaping Issues</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">!</span>
                                        <span>Forgetting to escape dots: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.</code> matches ANY character</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">!</span>
                                        <span>Shell vs sed escaping: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\\</code> becomes <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\</code> in sed</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">!</span>
                                        <span>Special characters in replacements: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\\</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\n</code></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                            <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Critical Errors</h4>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed 's/ *$//'</code> removes trailing spaces (good), but <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed 's/^ *//'</code> removes leading spaces</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.*</code> greedily: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">s/foo.*bar/baz/</code> replaces from first "foo" to last "bar"</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Not testing with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '...' file | head</code> before using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code></span>
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
                                <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Safety First</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">🛡️</span>
                                        <span>Always use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i.bak</code> or test without <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code> first</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">🛡️</span>
                                        <span>Use version control (git) for important files</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">🛡️</span>
                                        <span>Keep backups of critical data before batch operations</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Testing & Validation</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">🧪</span>
                                        <span>Test patterns with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '...' sample.txt</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">🧪</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">echo "test" | sed '...'</code> for quick checks</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">🧪</span>
                                        <span>Diff original and modified files: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">diff file file.bak</code></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Performance & Efficiency</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Combine multiple operations: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -e 'cmd1' -e 'cmd2'</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">; </code> to separate commands in same string</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">⚡</span>
                                        <span>Process files in parallel when possible: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">find . -name "*.txt" -exec sed -i '...' {`{}`} \\;</code></span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Beginner-Friendly Habits</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Start with simple substitutions before complex patterns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Use different delimiters for paths: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">s|/old/path|/new/path|g</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Practice with Shyamnagar college config files and Ichapur server logs</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-indigo-200 dark:border-indigo-800",
                    "transform transition-all duration-300 hover:shadow-2xl",
                    animationClass,
                    staggerDelay(8)
                )}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Mini Checklist: sed Mastery</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">s</span>
                                </div>
                                <h3 className="font-bold text-lg">Substitution</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Basic: <code className="text-xs">s/old/new/</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Global: <code className="text-xs">s/old/new/g</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Case-insensitive: <code className="text-xs">s/old/new/gi</code></span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">-i</span>
                                </div>
                                <h3 className="font-bold text-lg">Inline Editing</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>With backup: <code className="text-xs">-i.bak</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Without backup: <code className="text-xs">-i</code> (dangerous)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Test first without <code className="text-xs">-i</code></span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">d/i/a</span>
                                </div>
                                <h3 className="font-bold text-lg">Line Operations</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Delete: <code className="text-xs">/pattern/d</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Insert: <code className="text-xs">2i\\text</code></span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Append: <code className="text-xs">/pattern/a\\text</code></span>
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
                                How would you use sed to swap two columns in a CSV file (change "col1,col2" to "col2,col1")?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Observe carefully...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                What's the difference between <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed 's/foo/bar/'</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed 's/foo/bar/g'</code> when processing "foo foo foo"?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Try changing this...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Create a sed command that converts a multi-line address format to a single line format.
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
                            <strong>Dear students,</strong> sed is a powerful tool but with great power comes great responsibility. Always remember: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i.bak</code> is your friend! I've seen too many students lose data by using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code> without testing.
                        </p>
                        
                        <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-sky-500">
                            <h4 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">Classroom Experience Tips</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>When <strong>Tuhina</strong> was updating Barrackpore college email addresses, she used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -i.bak 's/@old\\.college\\.edu/@barrackpore\\.edu/g' *.csv</code> and saved hours of manual work.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>For Shyamnagar server logs, we use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -n 's/.*ERROR: \\(.*\\)/\\1/p'</code> to extract just error messages. The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-n</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">p</code> combination is powerful!</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Always test with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">cat file | sed '...' | head -5</code> before using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">-i</code>. This habit saved Abhronila from a disastrous config file overwrite!</span>
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
                                    "sed transforms text like magic - but always check your spell before casting it on important files"
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
                            <h4 className="font-bold text-xl mb-4 text-violet-700 dark:text-violet-400">Advanced sed Techniques</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -E</code> for extended regex (avoid excessive backslashes)</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Process specific lines: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '10,20s/old/new/g'</code> (lines 10-20 only)</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Use hold space for complex operations: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed '1h;1!H;$!d;g;s/\\n/,/g'</code> joins all lines with commas</span>
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
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">sed -f script.sed file</code> for complex operations stored in files</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">B</span>
                                    </div>
                                    <span>Combine with find for batch processing: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">find . -name "*.log" -exec sed -i 's/old/new/g' {`{}`} +</code></span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">C</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">#!/bin/sed -f</code> as shebang for sed scripts</span>
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
                            Topic 5: Using sed for Find & Replace and Inline Editing • Next: sed addressing: line numbers, ranges, and patterns
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Practice with Barrackpore college config files and Shyamnagar server logs to master sed transformations!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic5;