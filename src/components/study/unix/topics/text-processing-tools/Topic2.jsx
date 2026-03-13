import React from 'react';
import clsx from 'clsx';

export default class Topic2 extends React.Component {
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
            'animation-delay-900'
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
                    
                    .regex-anim {
                        animation: pulseSubtle 2s ease-in-out infinite;
                    }
                    
                    .svg-hover:hover {
                        fill: #60A5FA;
                    }
                    
                    .highlight-step {
                        transition: all 0.3s ease;
                    }
                    
                    .highlight-step:hover {
                        transform: scale(1.05);
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                            Topic 2: Advanced Regex: Quantifiers, Anchors, Character Classes
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Mastering advanced pattern matching techniques for precise text manipulation
                        </p>
                    </div>
                </div>

                {/* Conceptual Foundation */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-500",
                    animationClass,
                    staggerDelay(1)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900 mr-4">
                            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Advanced Regex Concepts</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>Advanced Regular Expressions</strong> take pattern matching to the next level with precise control over matching behavior. Think of it like having a surgical scalpel instead of a kitchen knife for text processing.
                        </p>
                        
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border-l-4 border-purple-500">
                            <h3 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-400">Real-World Analogy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Abhronila</strong> is processing student records from <strong>Barrackpore College</strong>. She needs to extract only Indian phone numbers starting with +91, validate complex passwords, and find all academic years between 2015-2025. Advanced regex gives her this precision.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-5 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-400">Precision Matching</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Control exactly how many times patterns repeat</li>
                                    <li>Match patterns at specific positions</li>
                                    <li>Define custom character sets</li>
                                    <li>Group and capture subpatterns</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-pink-50 dark:bg-pink-900/30 border border-pink-200 dark:border-pink-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-pink-700 dark:text-pink-400">When to Use</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Complex data validation</li>
                                    <li>Log file parsing with specific patterns</li>
                                    <li>Data extraction from structured text</li>
                                    <li>Text normalization and cleanup</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-indigo-700 dark:text-indigo-400">Performance Impact</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Efficient pattern matching</li>
                                    <li>Reduced false positives</li>
                                    <li>Optimized for large datasets</li>
                                    <li>Better memory usage</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Quantifiers */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500",
                    animationClass,
                    staggerDelay(2)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Advanced Quantifiers</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Quantifier Types */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Quantifier Types & Behavior</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800">
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Quantifier</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Meaning</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Example Pattern</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Matches</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`a*`}</code></td>
                                                <td className="px-4 py-3">0 or more (greedy)</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`a.*b`}</code></td>
                                                <td className="px-4 py-3">Longest match from a to b</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`a*?`}</code></td>
                                                <td className="px-4 py-3">0 or more (lazy)</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`a.*?b`}</code></td>
                                                <td className="px-4 py-3">Shortest match from a to b</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`a+`}</code></td>
                                                <td className="px-4 py-3">1 or more (greedy)</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`\\d+`}</code></td>
                                                <td className="px-4 py-3">One or more digits</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`a{2,4}`}</code></td>
                                                <td className="px-4 py-3">2 to 4 times</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`a{2,4}`}</code></td>
                                                <td className="px-4 py-3">aa, aaa, aaaa</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`a{3,}`}</code></td>
                                                <td className="px-4 py-3">3 or more times</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`\\w{3,}`}</code></td>
                                                <td className="px-4 py-3">Words with 3+ characters</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Greedy vs Lazy Demo */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Greedy vs Lazy Quantifiers</h3>
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-blue-200 dark:border-blue-800">
                                        <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Greedy Match <code>.*</code></h4>
                                        <div className="font-mono bg-gray-900 text-green-400 p-4 rounded-lg mb-3 text-sm">
                                            <code>&lt;div&gt;.*&lt;/div&gt;</code>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>Input:</strong> <code>&lt;div&gt;Hello&lt;/div&gt;&lt;div&gt;World&lt;/div&gt;</code><br/>
                                            <strong>Matches:</strong> Entire string from first <code>&lt;div&gt;</code> to last <code>&lt;/div&gt;</code>
                                        </p>
                                    </div>
                                    
                                    <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-green-200 dark:border-green-800">
                                        <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">Lazy Match <code>.*?</code></h4>
                                        <div className="font-mono bg-gray-900 text-yellow-400 p-4 rounded-lg mb-3 text-sm">
                                            <code>&lt;div&gt;.*?&lt;/div&gt;</code>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <strong>Input:</strong> Same as above<br/>
                                            <strong>Matches:</strong> <code>&lt;div&gt;Hello&lt;/div&gt;</code> (first match only)
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Interactive SVG Visualization */}
                                <div className="mt-6">
                                    <svg width="100%" height="120" className="regex-anim">
                                        {/* Greedy Match Visualization */}
                                        <text x="20" y="20" className="text-sm" fill="#6B7280">Greedy:</text>
                                        <rect x="80" y="10" width="400" height="30" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2"/>
                                        <text x="280" y="30" textAnchor="middle" fill="#DC2626" fontSize="12">&lt;div&gt;Hello&lt;/div&gt;&lt;div&gt;World&lt;/div&gt;</text>
                                        <rect x="85" y="12" width="390" height="26" rx="3" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="5,3">
                                            <animate attributeName="stroke" values="#DC2626;#EF4444;#DC2626" dur="3s" repeatCount="indefinite"/>
                                        </rect>
                                        
                                        {/* Lazy Match Visualization */}
                                        <text x="20" y="70" className="text-sm" fill="#6B7280">Lazy:</text>
                                        <rect x="80" y="60" width="400" height="30" rx="4" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2"/>
                                        <text x="180" y="80" textAnchor="middle" fill="#16A34A" fontSize="12">&lt;div&gt;Hello&lt;/div&gt;</text>
                                        <text x="380" y="80" textAnchor="middle" fill="#6B7280" fontSize="12">&lt;div&gt;World&lt;/div&gt;</text>
                                        <rect x="85" y="62" width="190" height="26" rx="3" fill="none" stroke="#16A34A" strokeWidth="3">
                                            <animate attributeName="stroke" values="#16A34A;#22C55E;#16A34A" dur="3s" repeatCount="indefinite"/>
                                        </rect>
                                        <rect x="285" y="62" width="190" height="26" rx="3" fill="none" stroke="#6B7280" strokeWidth="1" strokeDasharray="3,3"/>
                                        
                                        {/* Arrows */}
                                        <path d="M100 45 L100 55" stroke="#6B7280" strokeWidth="2"/>
                                        <path d="M100 50 L95 50 L95 95 L100 95" stroke="#6B7280" strokeWidth="2" fill="none"/>
                                        <path d="M95 95 L90 90 L100 95 L90 100" stroke="#6B7280" fill="#6B7280"/>
                                        
                                        <text x="50" y="105" className="text-xs" fill="#6B7280">Greedy matches everything between first and last</text>
                                        <text x="330" y="105" className="text-xs" fill="#6B7280">Lazy matches minimal amount</text>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-amber-500">
                            <h4 className="font-bold text-xl mb-3 text-amber-700 dark:text-amber-400">Practical Example: Password Validation</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Swadeep</span> needs to validate passwords for <strong>Shyamnagar College</strong> student portal with these rules:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>8-20 characters</li>
                                    <li>At least one uppercase letter</li>
                                    <li>At least one lowercase letter</li>
                                    <li>At least one digit</li>
                                    <li>At least one special character</li>
                                </ul>
                                <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                                    <code>
                                        {`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$`}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Anchors & Boundaries */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-500",
                    animationClass,
                    staggerDelay(3)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Advanced Anchors & Boundaries</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                <h4 className="font-bold text-lg mb-3 text-green-700 dark:text-green-400">Line Anchors</h4>
                                <div className="space-y-4">
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <code className="font-mono text-sm block mb-1">{`^Hello`}</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Matches "Hello" only at start of line</span>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <code className="font-mono text-sm block mb-1">{`world$`}</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Matches "world" only at end of line</span>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <code className="font-mono text-sm block mb-1">{`^Hello world$`}</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Matches exact line "Hello world"</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
                                <h4 className="font-bold text-lg mb-3 text-teal-700 dark:text-teal-400">Word Boundaries</h4>
                                <div className="space-y-4">
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <code className="font-mono text-sm block mb-1">{`\\bcat\\b`}</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Matches "cat" but not "catalog" or "concatenate"</span>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <code className="font-mono text-sm block mb-1">{`\\Bcat\\B`}</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Matches "cat" inside words like "education"</span>
                                    </div>
                                    <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                        <code className="font-mono text-sm block mb-1">{`\\b\\d{3}\\b`}</code>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Matches 3-digit numbers as separate words</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Multi-line Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 border border-emerald-200 dark:border-emerald-800">
                            <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Multi-line Mode Example</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                                        <strong>Task:</strong> Extract all lines starting with "ERROR:" from a log file
                                    </p>
                                    <div className="font-mono bg-gray-900 text-green-400 p-4 rounded-lg text-sm">
                                        <code>
                                            {`(?m)^ERROR:.*$`}
                                        </code>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Scenario:</strong> <span className="font-semibold">Tuhina</span> analyzing server logs from <strong>Ichapur data center</strong> to find all error messages across multiple lines.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Character Classes & Shorthands */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-500",
                    animationClass,
                    staggerDelay(4)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 mr-4">
                            <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Character Classes & Shorthands</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Standard Character Classes */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Standard Character Classes</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800">
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Class</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Meaning</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Equivalent</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Example</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`\\d`}</code></td>
                                                <td className="px-4 py-3">Digit</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>[0-9]</code></td>
                                                <td className="px-4 py-3">Matches 0,1,2,...9</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`\\D`}</code></td>
                                                <td className="px-4 py-3">Non-digit</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>[^0-9]</code></td>
                                                <td className="px-4 py-3">Matches a, B, @, etc.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`\\w`}</code></td>
                                                <td className="px-4 py-3">Word character</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`[a-zA-Z0-9_]`}</code></td>
                                                <td className="px-4 py-3">Matches letters, digits, underscore</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`\\W`}</code></td>
                                                <td className="px-4 py-3">Non-word character</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`[^a-zA-Z0-9_]`}</code></td>
                                                <td className="px-4 py-3">Matches @, #, $, etc.</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`\\s`}</code></td>
                                                <td className="px-4 py-3">Whitespace</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`[ \\t\\n\\r]`}</code></td>
                                                <td className="px-4 py-3">Space, tab, newline</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded"><code>{`\\S`}</code></td>
                                                <td className="px-4 py-3">Non-whitespace</td>
                                                <td className="px-4 py-3 font-mono text-sm"><code>{`[^ \\t\\n\\r]`}</code></td>
                                                <td className="px-4 py-3">Any non-space character</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Custom Character Classes */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">Custom Character Classes</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
                                    <h4 className="font-bold text-lg mb-3">Inclusive Classes</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1">{`[aeiou]`}</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Matches any vowel</span>
                                        </div>
                                        <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1">{`[A-Za-z]`}</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Matches any letter (case insensitive)</span>
                                        </div>
                                        <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1">{`[0-9a-fA-F]`}</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Hex digits (0-9, a-f, A-F)</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                    <h4 className="font-bold text-lg mb-3">Exclusive Classes</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1">{`[^0-9]`}</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Anything except digits</span>
                                        </div>
                                        <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1">{`[^aeiou]`}</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Anything except vowels</span>
                                        </div>
                                        <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                            <code className="font-mono text-sm block mb-1">{`[^\\s]`}</code>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Any non-whitespace character</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Real Example */}
                        <div className="p-5 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border-l-4 border-violet-500">
                            <h4 className="font-bold text-xl mb-3 text-violet-700 dark:text-violet-400">Practical Example: Indian Vehicle Number</h4>
                            <div className="space-y-4">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Debangshu</span> needs to validate vehicle numbers from <strong>Naihati RTO</strong> with format: <strong>WB-XX-AB-1234</strong>
                                </p>
                                <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                                    <code>
                                        {`^[A-Z]{2}-[0-9]{2}-[A-Z]{2}-\\d{4}$`}
                                    </code>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">WB-04-AB-1234 ✓</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">DL-01-CD-5678 ✓</span>
                                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-full text-sm">WB04AB1234 ✗</span>
                                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-full text-sm">WB-AB-04-1234 ✗</span>
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
                    staggerDelay(5)
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
                                <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Catastrophic Backtracking</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Avoid nested quantifiers: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(a+)+</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Greedy patterns on large inputs can freeze</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Use atomic groups or possessive quantifiers when possible</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">Character Class Mistakes</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`[a-zA-Z]`}</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[A-z]</code> (includes special chars)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Remember hyphen position: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`[a-z]`}</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[a\-z]</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>Dot <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.</code> inside class loses special meaning</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                            <h4 className="font-bold text-lg mb-3 text-yellow-700 dark:text-yellow-400">Anchors Misuse</h4>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`^`}</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">$</code> match start/end of STRING by default</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Use multiline flag <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`(?m)`}</code> for line-based matching</span>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\A</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\Z</code> always match start/end of string</span>
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
                    staggerDelay(6)
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
                                        <span>Use specific character classes instead of dots</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Avoid backtracking with possessive quantifiers <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">++</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*+</code>, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">?+</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">⚡</span>
                                        <span>Precompile regex patterns in loops</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Readability & Maintainability</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Use named groups: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(?&lt;year&gt;\d{4})</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Add comments with <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(?#comment)</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">📝</span>
                                        <span>Break complex patterns into smaller, testable parts</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Testing & Debugging</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🔍</span>
                                        <span>Test with edge cases and invalid inputs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🔍</span>
                                        <span>Use online tools like regex101.com with debugger</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">🔍</span>
                                        <span>Add unit tests for each regex pattern</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Security Considerations</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🛡️</span>
                                        <span>Beware of ReDoS (Regex Denial of Service) attacks</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🛡️</span>
                                        <span>Sanitize user input before using in regex</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🛡️</span>
                                        <span>Set timeout limits for regex execution</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-purple-200 dark:border-purple-800",
                    "transform transition-all duration-300 hover:shadow-2xl",
                    animationClass,
                    staggerDelay(7)
                )}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Mini Checklist: Advanced Regex Mastery</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h3 className="font-bold text-lg">Quantifiers</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Greedy vs Lazy (<code className="text-xs">*?</code>, <code className="text-xs">+?</code>)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Exact counts (<code className="text-xs">{`{n}`}</code>, <code className="text-xs">{`{n,m}`}</code>)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Possessive quantifiers</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h3 className="font-bold text-lg">Anchors & Boundaries</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Line anchors (<code className="text-xs">^</code>, <code className="text-xs">$</code>)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Word boundaries (<code className="text-xs">\b</code>, <code className="text-xs">\B</code>)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Multiline mode</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <h3 className="font-bold text-lg">Character Classes</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Shorthand classes (<code className="text-xs">\d</code>, <code className="text-xs">\w</code>, <code className="text-xs">\s</code>)</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Custom ranges</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Negated classes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 shadow-xl border border-amber-300 dark:border-amber-700",
                    animationClass,
                    staggerDelay(8)
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
                                How would you modify the password regex to allow only specific special characters (@, #, $, %) and exclude others?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Observe carefully...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                What's the difference between <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[A-z]</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[A-Za-z]</code>? Check ASCII table.
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Try changing this...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Create a regex to match dates in format "DD-MMM-YYYY" (like 15-Jan-2023) using character classes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/30 dark:to-cyan-900/30 shadow-2xl border-2 border-sky-300 dark:border-sky-700",
                    "transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl",
                    animationClass,
                    staggerDelay(9)
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
                            <strong>Dear students,</strong> Advanced regex is where the real power lies. Remember that <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`.*`}</code> is greedy - it will match as much as possible. Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.*?</code> for lazy matching when you want minimal matches.
                        </p>
                        
                        <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-sky-500">
                            <h4 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">Classroom Experience Tips</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>When <strong>Tuhina</strong> was processing Barrackpore college logs, she used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`\bERROR\b`}</code> to find exact word "ERROR" and not "ERRORS" or "ERROR404".</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>For Shyamnagar student data, we used <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`[A-Z][a-z]{2,}`}</code> to match proper names (starts with capital, followed by 2+ lowercase).</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Always test your regex with extreme cases. What if a Naihati student enters 1000+ characters? Will your regex handle it or cause a freeze?</span>
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
                                    "Master anchors and boundaries - they're the guardrails that keep your regex on track"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips & Tricks - Professional Level */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 shadow-xl border border-violet-300 dark:border-violet-700",
                    animationClass,
                    staggerDelay(10)
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
                            <h4 className="font-bold text-xl mb-4 text-violet-700 dark:text-violet-400">Industry Patterns</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span>For log parsing: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}</code> matches timestamps</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>For CSV parsing: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)</code> splits by commas outside quotes</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>For HTML/XML: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;([a-z][a-z0-9]*)[^&gt;]*&gt;(.*?)&lt;\/\1&gt;</code> matches simple tags</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-xl mb-4 text-purple-700 dark:text-purple-400">Optimization Techniques</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">A</span>
                                    </div>
                                    <span>Use character class subtraction: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[a-z&&[^aeiou]]</code> (consonants only)</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">B</span>
                                    </div>
                                    <span>Prefer <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\d</code> over <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[0-9]</code> - it's more readable and often optimized</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">C</span>
                                    </div>
                                    <span>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[0-9a-fA-F]</code> instead of <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[0-9a-f]</code> with case-insensitive flag</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={clsx(
                    "max-w-6xl mx-auto pt-8 border-t border-gray-300 dark:border-gray-700",
                    animationClass,
                    staggerDelay(11)
                )}>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Topic 2: Advanced Regex • Next: Case-insensitive, inverted, and recursive search with grep
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Practice with Ichapur college student records and Naihati server logs to master these concepts!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

