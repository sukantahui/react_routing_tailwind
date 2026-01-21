import React from 'react';
import clsx from 'clsx';

class Topic1 extends React.Component {
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
                    `}
                </style>

                {/* Header Section */}
                <div className={clsx(
                    "max-w-6xl mx-auto",
                    animationClass,
                    staggerDelay(0)
                )}>
                    <div className="mb-10 transform transition-all duration-500 hover:scale-[1.02]">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                            Topic 1: Regular Expressions Basics for Text Filtering
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                            Mastering the art of pattern matching to search, validate, and transform text data efficiently
                        </p>
                    </div>
                </div>

                {/* Conceptual Explanation */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500",
                    animationClass,
                    staggerDelay(1)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Conceptual Foundation</h2>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <strong>Regular Expressions (Regex)</strong> are sequences of characters that define search patterns. Think of them as a super-powered "Find" feature that can match complex patterns rather than exact text. Like teaching a computer to recognize specific "shapes" in text.
                        </p>
                        
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border-l-4 border-blue-500">
                            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">Real-World Analogy</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Imagine <strong>Swadeep</strong> needs to find all student email addresses in a messy document. Instead of searching for each one manually, he creates a pattern: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                    {`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`}
                                </code>
                                    . This single pattern finds ALL email addresses instantly!

                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-400">Purpose</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Validate input formats (email, phone, dates)</li>
                                    <li>Extract specific data from text</li>
                                    <li>Search for complex patterns</li>
                                    <li>Clean and transform data</li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-lg bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-400">When to Use</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>Log file analysis</li>
                                    <li>Data validation in forms</li>
                                    <li>Text processing in scripts</li>
                                    <li>Searching in code editors</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Regex Components */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-green-300 dark:hover:border-green-500",
                    animationClass,
                    staggerDelay(2)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 mr-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Basic Regex Components</h2>
                    </div>

                    <div className="space-y-8">
                        {/* Character Classes */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Character Classes</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-xl">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-800">
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Pattern</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Matches</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold">Example</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded">[abc]</td>
                                                <td className="px-4 py-3">a, b, or c</td>
                                                <td className="px-4 py-3 font-mono text-sm">"[abc]at" → cat, bat</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded">[^abc]</td>
                                                <td className="px-4 py-3">Any character except a, b, c</td>
                                                <td className="px-4 py-3 font-mono text-sm">"[^0-9]" → a, B, #</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded">[a-z]</td>
                                                <td className="px-4 py-3">Lowercase a to z</td>
                                                <td className="px-4 py-3 font-mono text-sm">"[a-z]+" → hello</td>
                                            </tr>
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="px-4 py-3 font-mono bg-gray-200 dark:bg-gray-700 rounded">\d</td>
                                                <td className="px-4 py-3">Any digit (0-9)</td>
                                                <td className="px-4 py-3 font-mono text-sm">"\d{3}" → 123</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Meta Characters */}
                        <div className="transform transition-all duration-300 hover:scale-[1.01]">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Meta Characters</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                    <h4 className="font-bold text-lg mb-3">Anchors</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <span className="font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded mr-2">^</span>
                                            <span>Start of line</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded mr-2">$</span>
                                            <span>End of line</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="font-mono bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded mr-2">\b</span>
                                            <span>Word boundary</span>
                                        </li>
                                    </ul>
                                </div>
                                
                                <div className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <h4 className="font-bold text-lg mb-3">Quantifiers</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <span className="font-mono bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded mr-2">*</span>
                                            <span>0 or more times</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="font-mono bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded mr-2">+</span>
                                            <span>1 or more times</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="font-mono bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded mr-2">?</span>
                                            <span>0 or 1 time</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="font-mono bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded mr-2">{`{n}`}</span>
                                            <span>Exactly n times</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Interactive SVG Example */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-2xl border border-gray-300 dark:border-gray-600">
                            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Visualizing Regex Pattern</h3>
                            <div className="flex flex-col md:flex-row items-center justify-between">
                                <div className="mb-6 md:mb-0 md:mr-8">
                                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                                        Pattern: <code className="text-xl font-bold text-green-600 dark:text-green-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">
                                            {`^\d{3}-\d{3}-\d{4}$`}</code>
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        This regex matches US phone numbers like <strong>123-456-7890</strong>
                                    </p>
                                </div>
                                
                                <div className="flex-shrink-0">
                                    <svg width="300" height="100" className="regex-anim">
                                        <rect x="10" y="30" width="280" height="40" rx="8" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="5,5"/>
                                        
                                        {/* Start anchor */}
                                        <circle cx="20" cy="50" r="8" fill="#10B981">
                                            <animate attributeName="fill" values="#10B981;#059669;#10B981" dur="2s" repeatCount="indefinite"/>
                                        </circle>
                                        <text x="20" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="12">^</text>
                                        
                                        {/* Digits */}
                                        <rect x="40" y="35" width="40" height="30" rx="4" fill="#93C5FD" className="svg-hover">
                                            <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite"/>
                                        </rect>
                                        <text x="60" y="50" textAnchor="middle" fill="#1E3A8A" fontSize="14">\d{3}</text>
                                        
                                        {/* Hyphen */}
                                        <text x="95" y="50" textAnchor="middle" fill="#6B7280" fontSize="20">-</text>
                                        
                                        {/* More sections */}
                                        <rect x="110" y="35" width="40" height="30" rx="4" fill="#93C5FD" className="svg-hover">
                                            <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" begin="0.3s"/>
                                        </rect>
                                        <text x="130" y="50" textAnchor="middle" fill="#1E3A8A" fontSize="14">\d{3}</text>
                                        
                                        <text x="165" y="50" textAnchor="middle" fill="#6B7280" fontSize="20">-</text>
                                        
                                        <rect x="180" y="35" width="40" height="30" rx="4" fill="#93C5FD" className="svg-hover">
                                            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" begin="0.6s"/>
                                        </rect>
                                        <text x="200" y="50" textAnchor="middle" fill="#1E3A8A" fontSize="14">\d{4}</text>
                                        
                                        {/* End anchor */}
                                        <circle cx="260" cy="50" r="8" fill="#EF4444">
                                            <animate attributeName="fill" values="#EF4444;#DC2626;#EF4444" dur="2s" repeatCount="indefinite"/>
                                        </circle>
                                        <text x="260" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="12">$</text>
                                        
                                        {/* Flow arrows */}
                                        <path d="M30 50 L35 50" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                                        <path d="M85 50 L90 50" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                                        <path d="M155 50 L160 50" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                                        <path d="M225 50 L250 50" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                                        
                                        <defs>
                                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                                <path d="M0,0 L0,6 L9,3 z" fill="#6B7280"/>
                                            </marker>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real-World Examples */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700",
                    "transform transition-all duration-300 hover:shadow-2xl hover:border-yellow-300 dark:hover:border-yellow-500",
                    animationClass,
                    staggerDelay(3)
                )}>
                    <div className="flex items-center mb-6">
                        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mr-4">
                            <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Real-World Applications</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 border border-blue-200 dark:border-blue-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-xl mb-3 text-blue-700 dark:text-blue-400">Example 1: Email Validation</h4>
                                <div className="font-mono bg-gray-900 text-green-400 p-4 rounded-lg mb-3 text-sm">
                                    {`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Tuhina</span> is building a student registration form for Barrackpore College. She uses this regex to ensure valid email formats.
                                </p>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border border-purple-200 dark:border-purple-800 transform transition-all duration-300 hover:scale-[1.02]">
                                <h4 className="font-bold text-xl mb-3 text-purple-700 dark:text-purple-400">Example 2: Phone Number Extraction</h4>
                                <div className="font-mono bg-gray-900 text-yellow-400 p-4 rounded-lg mb-3 text-sm">
                                    \+\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <strong>Scenario:</strong> <span className="font-semibold">Debangshu</span> needs to extract international phone numbers from customer service logs in Ichapur call center.
                                </p>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border-l-4 border-green-500">
                            <h4 className="font-bold text-xl mb-3 text-green-700 dark:text-green-400">Example 3: Date Format Conversion</h4>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <p className="mb-3 text-gray-700 dark:text-gray-300">
                                        Convert <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{`DD/MM/YYYY`}</code> to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{`YYYY-MM-DD`}</code>
                                    </p>
                                    <div className="font-mono bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm">
                                        {`^(\d{2})/(\d{2})/(\d{4})$`}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <strong>Use Case:</strong> <span className="font-semibold">Abhronila</span> is migrating student records from an old system in Shyamnagar school to a new database.
                                    </p>
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
                    staggerDelay(4)
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
                                <h4 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">Beginner Mistakes</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Forgetting to escape special characters: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.</code> (dot) matches any character</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Greedy matching causing unexpected results</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">✗</span>
                                        <span>Not anchoring patterns (matches inside strings)</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                                <h4 className="font-bold text-lg mb-3 text-orange-700 dark:text-orange-400">Misconceptions</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>"Regex is too complex" - Start with basics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>"One regex fits all" - Context matters</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2">!</span>
                                        <span>"Always use regex" - Sometimes simple string functions are better</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                            <h4 className="font-bold text-lg mb-3">Debugging Tips</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                                        <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                                    </div>
                                    <span>Test with simple cases first</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                                        <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                                    </div>
                                    <span>Use online regex testers (regex101.com)</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                                        <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                                    </div>
                                    <span>Add comments in complex patterns</span>
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
                    staggerDelay(5)
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
                                <h4 className="font-bold text-lg mb-3 text-emerald-700 dark:text-emerald-400">Coding Standards</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">✓</span>
                                        <span>Use raw strings in Python: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`r"\d+"`}</code></span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">✓</span>
                                        <span>Add comments for complex patterns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-500 mr-2">✓</span>
                                        <span>Precompile regex for repeated use</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <h4 className="font-bold text-lg mb-3 text-blue-700 dark:text-blue-400">Performance Tips</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">⚡</span>
                                        <span>Avoid catastrophic backtracking</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">⚡</span>
                                        <span>Use non-capturing groups <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">(?:...)</code> when possible</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2">⚡</span>
                                        <span>Be specific in patterns (avoid <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`.*`}</code> when possible)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="p-5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
                                <h4 className="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">Readability & Maintainability</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">📝</span>
                                        <span>Break complex regex into named groups</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">📝</span>
                                        <span>Use verbose mode in supported languages</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-500 mr-2">📝</span>
                                        <span>Include test cases with patterns</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                                <h4 className="font-bold text-lg mb-3 text-amber-700 dark:text-amber-400">Beginner-Friendly Habits</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Start with simple patterns</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Practice with real data from Naihati college logs</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-amber-500 mr-2">🎯</span>
                                        <span>Learn common patterns by heart</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mini Checklist */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-xl border border-blue-200 dark:border-blue-800",
                    "transform transition-all duration-300 hover:shadow-2xl",
                    animationClass,
                    staggerDelay(6)
                )}>
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Mini Checklist: What to Remember</h2>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">1</span>
                                </div>
                                <h3 className="font-bold text-lg">Basic Syntax</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Character classes: [...], [^...]</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>{`Quantifiers: *, +, ?, {n}`}</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>{`Anchors: ^, $, \b`}</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">2</span>
                                </div>
                                <h3 className="font-bold text-lg">Common Patterns</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Email validation</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Phone numbers</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Date formats</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="p-5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.03]">
                            <div className="flex items-center mb-3">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">3</span>
                                </div>
                                <h3 className="font-bold text-lg">Best Practices</h3>
                            </div>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Escape special chars</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Test with edge cases</span>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Use online testers</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 shadow-xl border border-amber-300 dark:border-amber-700",
                    animationClass,
                    staggerDelay(7)
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
                                How would you modify the email regex to also allow numbers and hyphens in the domain part?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Observe carefully...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                What happens when you use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.*</code> vs <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`.*?`}</code> in a pattern?
                            </p>
                        </div>
                        
                        <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            <h4 className="font-bold text-lg mb-2 text-amber-700 dark:text-amber-400">Try changing this...</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                Modify the phone number regex to also accept spaces instead of hyphens as separators.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/30 dark:to-cyan-900/30 shadow-2xl border-2 border-sky-300 dark:border-sky-700",
                    "transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl",
                    animationClass,
                    staggerDelay(8)
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
                            <strong>Dear students,</strong> Regular expressions are like learning a new language for text. Don't be intimidated by the symbols - each one has a specific meaning. Start by mastering the basic building blocks before moving to complex patterns.
                        </p>
                        
                        <div className="p-5 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-l-4 border-sky-500">
                            <h4 className="font-bold text-lg mb-3 text-sky-700 dark:text-sky-400">Tips from Classroom Experience</h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Always test your regex with both valid and invalid examples. For instance, when Swadeep worked on student data from Barrackpore, he found edge cases he hadn't considered.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Use mnemonic devices: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\d</code> for "digit", <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\s</code> for "space", <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">\w</code> for "word".</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-sky-500 mr-2">💡</span>
                                    <span>Remember: A pattern that's too broad (like <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{`.*`}</code>) can match more than you want. Be specific!</span>
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
                                    "Regex mastery comes from practice, not memorization"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips & Tricks - Professional Level */}
                <div className={clsx(
                    "max-w-6xl mx-auto mb-12 p-8 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 shadow-xl border border-violet-300 dark:border-violet-700",
                    animationClass,
                    staggerDelay(9)
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
                            <h4 className="font-bold text-xl mb-4 text-violet-700 dark:text-violet-400">Industry Habits</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">1</span>
                                    </div>
                                    <span>Store common regex patterns in a shared library or config file for team consistency</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">2</span>
                                    </div>
                                    <span>Use regex flags wisely: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">i</code> for case-insensitive, <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">g</code> for global</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">3</span>
                                    </div>
                                    <span>Combine regex with other tools (grep, sed, awk) for powerful text processing pipelines</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-xl mb-4 text-purple-700 dark:text-purple-400">Debugging Mindset</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">A</span>
                                    </div>
                                    <span>When debugging, test each component of your regex separately</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">B</span>
                                    </div>
                                    <span>Use lookahead and lookbehind assertions for complex validation rules</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                        <span className="text-white text-xs">C</span>
                                    </div>
                                    <span>Remember: Different languages may have slightly different regex implementations</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={clsx(
                    "max-w-6xl mx-auto pt-8 border-t border-gray-300 dark:border-gray-700",
                    animationClass,
                    staggerDelay(10)
                )}>
                    <div className="text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Topic 1: Regular Expressions Basics • Next: Advanced Regex Concepts
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            Remember to practice with real datasets from Ichapur college logs or Shyamnagar school records!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic1;