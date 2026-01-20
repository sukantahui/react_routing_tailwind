// Topic0.jsx - Basic Gates (AND, OR, NOT, NAND, NOR, XOR)
import React from 'react';
import clsx from 'clsx';

class Topic0 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredGate: null,
            activeExample: 0,
            reducedMotion: false
        };
    }

    componentDidMount() {
        // Check for reduced motion preference
        this.checkReducedMotion();
        window.addEventListener('resize', this.checkReducedMotion);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkReducedMotion);
    }

    checkReducedMotion = () => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.setState({ reducedMotion: mediaQuery.matches });
    };

    handleGateHover = (gate) => {
        this.setState({ hoveredGate: gate });
    };

    handleExampleSelect = (index) => {
        this.setState({ activeExample: index });
    };

    renderGateSVG = (gate) => {
        const { hoveredGate, reducedMotion } = this.state;
        const isHovered = hoveredGate === gate;
        const animationDuration = reducedMotion ? '0s' : '0.5s';

        const gates = {
            AND: {
                shape: (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <defs>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Input lines */}
                        <line x1="10" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="2">
                            <animate attributeName="stroke" from="currentColor" to="#3b82f6" dur={animationDuration}
                                begin={isHovered ? "0s" : "indefinite"} fill="freeze" />
                        </line>
                        <line x1="10" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="2">
                            <animate attributeName="stroke" from="currentColor" to="#3b82f6" dur={animationDuration}
                                begin={isHovered ? "0s" : "indefinite"} fill="freeze" />
                        </line>

                        {/* Gate body */}
                        <path d="M40 20 L40 60 Q70 60 80 40 Q70 20 40 20 Z"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            className={clsx("transition-all duration-300", isHovered && "filter drop-shadow-lg")}>
                            <animate attributeName="stroke-width" from="2" to="3" dur={animationDuration}
                                begin={isHovered ? "0s" : "indefinite"} fill="freeze" />
                        </path>

                        {/* Output line */}
                        <line x1="80" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2">
                            <animate attributeName="stroke" from="currentColor" to="#10b981" dur={animationDuration}
                                begin={isHovered ? "0.3s" : "indefinite"} fill="freeze" />
                        </line>

                        <text x="60" y="43" textAnchor="middle" className="text-sm fill-current">AND</text>
                    </svg>
                ),
                truthTable: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]
            },
            OR: {
                shape: (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <line x1="10" y1="30" x2="35" y2="30" stroke="currentColor" strokeWidth="2" />
                        <line x1="10" y1="50" x2="35" y2="50" stroke="currentColor" strokeWidth="2" />

                        <path d="M35 20
                                Q55 40 35 60
                                Q65 60 80 40
                                Q65 20 35 20 Z"
                            fill="none" stroke="currentColor" strokeWidth="2" />

                        <line x1="80" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />

                        <text x="55" y="44" textAnchor="middle" className="text-sm fill-current">OR</text>
                    </svg>
                ),
                truthTable: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 1]]
            },
            NOT: {
                shape: (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <line x1="10" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="2" />

                        <polygon points="40,25 70,40 40,55"
                            fill="none" stroke="currentColor" strokeWidth="2" />

                        <circle cx="75" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="2" />

                        <line x1="79" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2" />

                        <text x="55" y="70" textAnchor="middle" className="text-sm fill-current">NOT</text>
                    </svg>

                ),
                truthTable: [[0, 1], [1, 0]]
            },
            NAND: {
                shape: (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                    <line x1="10" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="2"/>
                    <line x1="10" y1="50" x2="40" y2="50" stroke="currentColor" strokeWidth="2"/>

                    <path d="M40 20 L40 60 Q75 60 75 40 Q75 20 40 20 Z"
                            fill="none" stroke="currentColor" strokeWidth="2"/>

                    <circle cx="80" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <line x1="84" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2"/>

                    <text x="60" y="70" textAnchor="middle" className="text-sm fill-current">NAND</text>
                    </svg>
                )
            },
            NOR: {
                shape: (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                    <line x1="10" y1="30" x2="35" y2="30" stroke="currentColor" strokeWidth="2"/>
                    <line x1="10" y1="50" x2="35" y2="50" stroke="currentColor" strokeWidth="2"/>

                    <path d="M35 20
                            Q55 40 35 60
                            Q65 60 75 40
                            Q65 20 35 20 Z"
                            fill="none" stroke="currentColor" strokeWidth="2"/>

                    <circle cx="80" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <line x1="84" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2"/>

                    <text x="55" y="70" textAnchor="middle" className="text-sm  fill-current">NOR</text>
                    </svg>
                )
            },

            XOR: {
                shape: (
                    <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
                        <line x1="10" y1="30" x2="30" y2="30" stroke="currentColor" strokeWidth="2"/>
                        <line x1="10" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="2"/>

                        <path d="M30 20 Q45 40 30 60"
                                fill="none" stroke="currentColor" strokeWidth="2"/>

                        <path d="M35 20
                                Q55 40 35 60
                                Q65 60 80 40
                                Q65 20 35 20 Z"
                                fill="none" stroke="currentColor" strokeWidth="2"/>

                        <line x1="80" y1="40" x2="110" y2="40" stroke="currentColor" strokeWidth="2"/>

                        <text x="55" y="70" textAnchor="middle" className="text-sm fill-current">XOR</text>
                    </svg>

                ),
                truthTable: [[0, 0, 0], [0, 1, 1], [1, 0, 1], [1, 1, 0]]
            }
        };

        return gates[gate] || gates.AND;
    };

    render() {
        const { hoveredGate, activeExample, reducedMotion } = this.state;
        const gates = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR'];

        const examples = [
            {
                title: "Security System in Barrackpore School",
                description: "Swadeep designed a security system where the alarm triggers only when BOTH motion sensor AND door sensor are activated (AND gate). If either window break sensor OR emergency button is pressed, alarm triggers (OR gate)."
            },
            {
                title: "Automatic Bell System in Shyamnagar College",
                description: "Tuhina implemented a bell system that rings when (period timer AND teacher present) OR (emergency override) conditions are met. A NOT gate ensures bell doesn't ring during breaks."
            },
            {
                title: "Library Access Control in Ichapur",
                description: "Abhronila designed a system where access requires (valid ID XOR temporary pass) - either one but not both, preventing dual authentication issues."
            }
        ];

        const animationClass = reducedMotion
            ? ""
            : "animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0";

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <style>
                    {`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `}
                </style>

                {/* Header */}
                <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-relaxed">
                        Basic Logic Gates: The Building Blocks of Digital Systems
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Understanding AND, OR, NOT, NAND, NOR, and XOR gates - the fundamental components
                        that power every computer, smartphone, and digital device around us.
                    </p>
                </header>

                <main className="max-w-6xl mx-auto">
                    {/* Gate Grid */}
                    <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.1s" }}>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
                            The Six Basic Gates
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gates.map((gate, index) => {
                                const gateData = this.renderGateSVG(gate);
                                const isHovered = hoveredGate === gate;

                                return (
                                    <div
                                        key={gate}
                                        className={clsx(
                                            "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm",
                                            "border border-gray-200 dark:border-gray-700",
                                            "transition-all duration-300 motion-safe:hover:scale-[1.02]",
                                            "motion-safe:hover:shadow-lg motion-safe:hover:border-blue-300 dark:motion-safe:hover:border-blue-600",
                                            isHovered && "ring-2 ring-blue-500 ring-opacity-50"
                                        )}
                                        onMouseEnter={() => this.handleGateHover(gate)}
                                        onMouseLeave={() => this.handleGateHover(null)}
                                        style={{
                                            animationDelay: reducedMotion ? "0s" : `${0.2 + index * 0.1}s`
                                        }}
                                    >
                                        <div className="mb-4">
                                            {gateData.shape}
                                        </div>

                                        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-3">
                                            {gate} Gate
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                            {gate === 'AND' && "Outputs 1 only when ALL inputs are 1"}
                                            {gate === 'OR' && "Outputs 1 when AT LEAST ONE input is 1"}
                                            {gate === 'NOT' && "Inverts the input (also called an inverter)"}
                                            {gate === 'NAND' && "AND gate followed by NOT - outputs 0 only when all inputs are 1"}
                                            {gate === 'NOR' && "OR gate followed by NOT - outputs 1 only when all inputs are 0"}
                                            {gate === 'XOR' && "Exclusive OR - outputs 1 when inputs are DIFFERENT"}
                                        </p>

                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                                Boolean Expression:
                                            </h4>
                                            <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
                                                {gate === 'AND' && "Y = A · B"}
                                                {gate === 'OR' && "Y = A + B"}
                                                {gate === 'NOT' && "Y = Ā"}
                                                {gate === 'NAND' && "Y = A · B"}
                                                {gate === 'NOR' && "Y = A + B"}
                                                {gate === 'XOR' && "Y = A ⊕ B"}
                                            </code>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Truth Tables */}
                    <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.3s" }}>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
                            Truth Tables & Boolean Algebra
                        </h2>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-900">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">A</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">B</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AND</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">OR</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NAND</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">NOR</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">XOR</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {[[0, 0], [0, 1], [1, 0], [1, 1]].map(([a, b], idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                                            >
                                                <td className="px-4 py-3 text-center font-medium">{a}</td>
                                                <td className="px-4 py-3 text-center font-medium">{b}</td>
                                                <td className="px-4 py-3 text-center font-bold text-blue-600 dark:text-blue-400">{a & b}</td>
                                                <td className="px-4 py-3 text-center font-bold text-green-600 dark:text-green-400">{a | b}</td>
                                                <td className="px-4 py-3 text-center font-bold text-purple-600 dark:text-purple-400">{!(a & b) ? 1 : 0}</td>
                                                <td className="px-4 py-3 text-center font-bold text-red-600 dark:text-red-400">{!(a | b) ? 1 : 0}</td>
                                                <td className="px-4 py-3 text-center font-bold text-yellow-600 dark:text-yellow-400">{a ^ b}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Key Insight:</h4>
                                <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed">
                                    NAND and NOR gates are <strong>universal gates</strong> - you can create ANY logic function
                                    using only NAND gates or only NOR gates. This is why they're fundamental in chip design!
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Real-World Examples */}
                    <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.4s" }}>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
                            Real-World Applications
                        </h2>

                        <div className="space-y-6">
                            {examples.map((example, index) => (
                                <div
                                    key={index}
                                    className={clsx(
                                        "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700",
                                        "transition-all duration-300 cursor-pointer",
                                        activeExample === index
                                            ? "ring-2 ring-blue-500 ring-opacity-50 border-blue-300 dark:border-blue-600"
                                            : "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
                                    )}
                                    onClick={() => this.handleExampleSelect(index)}
                                >
                                    <div className="flex items-start">
                                        <div className={clsx(
                                            "w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0",
                                            activeExample === index
                                                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                        )}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                                                {example.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {example.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Common Pitfalls */}
                    <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.5s" }}>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
                            Common Pitfalls & Misconceptions
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800">
                                <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-4">Beginner Mistakes</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span className="text-red-700 dark:text-red-400">Confusing AND with OR (Swadeep's common error)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span className="text-red-700 dark:text-red-400">Forgetting that XOR means "exactly one", not "at least one"</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">•</span>
                                        <span className="text-red-700 dark:text-red-400">Thinking NAND is just "opposite of AND" (it's AND+NOT)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-100 dark:border-yellow-800">
                                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-300 mb-4">Conceptual Clarifications</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span className="text-yellow-700 dark:text-yellow-400">Gates are electronic circuits, not just symbols</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span className="text-yellow-700 dark:text-yellow-400">Truth tables define gates completely</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-yellow-500 mr-2">•</span>
                                        <span className="text-yellow-700 dark:text-yellow-400">Boolean algebra is the mathematical foundation</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Tips & Best Practices */}
                    <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.6s" }}>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
                            Professional Tips & Best Practices
                        </h2>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Industry Habits</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Always draw truth tables before implementing circuits</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Use NAND/NOR gates for simpler chip layouts</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Label all inputs/outputs clearly (A, B, Y, etc.)</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Debugging Mindset</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="text-blue-600 dark:text-blue-400 text-sm">🔍</span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Test with all input combinations (00, 01, 10, 11)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="text-blue-600 dark:text-blue-400 text-sm">🔍</span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Check for floating inputs (always connect to 0 or 1)</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="text-blue-600 dark:text-blue-400 text-sm">🔍</span>
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300">Use simulation tools before physical implementation</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hint Section */}
                    <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.7s" }}>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                            <h3 className="text-xl font-medium text-purple-800 dark:text-purple-300 mb-4">Think About This...</h3>
                            <p className="text-purple-700 dark:text-purple-400 mb-4 leading-relaxed">
                                How would Debangshu design a voting system for the Naihati student council
                                where a motion passes only if:
                                (President AND Vice-President agree) OR (President AND 2 of 3 secretaries agree)?
                            </p>
                            <div className="text-sm text-purple-600 dark:text-purple-500 italic">
                                Hint: Start by identifying which gates you need for each condition...
                            </div>
                        </div>
                    </section>

                    {/* Teacher's Note */}
                    <section className={`${animationClass}`} style={{ animationDelay: "0.8s" }}>
                        <div className={clsx(
                            "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30",
                            "rounded-xl p-6 border border-blue-200 dark:border-blue-800",
                            "transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700"
                        )}>
                            <div className="flex items-start">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                    <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">SH</span>
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">Teacher's Note</h3>
                                        <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                                            Sukanta Hui
                                        </span>
                                    </div>

                                    <p className="text-blue-700 dark:text-blue-400 mb-3 leading-relaxed">
                                        <strong>Remember this analogy:</strong> Logic gates are like the alphabets of digital language.
                                        Just as you form words with alphabets, you build circuits with gates.
                                        Students in Barrackpore often confuse gate symbols - draw them daily for a week until they're automatic.
                                    </p>

                                    <div className="text-sm text-blue-600 dark:text-blue-500">
                                        <p><strong>Pro Tip:</strong> Teach NAND and NOR as "universal gates" early.
                                            Show students in Shyamnagar how to build AND, OR, NOT using only NAND gates.</p>

                                        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                                            <p className="text-xs text-blue-500 dark:text-blue-600">
                                                Experience: 27 years | {window.innerWidth < 768 ? '📧' : 'sukantahui@codernaccotax.co.in'} |
                                                Programming, RDBMS, OS, Web Dev
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mini Checklist */}
                    <div className={`mt-12 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 ${animationClass}`} style={{ animationDelay: "0.9s" }}>
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Quick Checklist - What to Remember</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">All six gate symbols & truth tables</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">Boolean expressions for each gate</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">NAND/NOR are universal gates</span>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        Topic 1: Basic Logic Gates • Next: Combinational Circuits
                    </p>
                </footer>
            </div>
        );
    }
}

export default Topic0;