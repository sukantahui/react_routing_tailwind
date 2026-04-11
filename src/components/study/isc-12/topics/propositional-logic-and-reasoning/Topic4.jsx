// Topic4.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic4_files/topic4_questions';

const Topic4 = () => {
    // Purpose: Introduce basic logical operators: NOT, AND, OR
    // Return: JSX component with operator definitions, truth tables, examples
    // When & why: After variables, students need operators to build compound propositions

    return (
        <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out]">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-4">
                        Logical Operators: NOT (~), AND (∧), OR (∨)
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        The building blocks of compound propositions — negation, conjunction, disjunction
                    </p>
                </div>

                {/* SVG: Three operators illustration */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
                    <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20">
                        <svg width="450" height="160" viewBox="0 0 450 160" className="w-full max-w-md">
                            <defs>
                                <linearGradient id="notGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: "#EC4899", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#F43F5E", stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="andGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: "#06B6D4", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
                                </linearGradient>
                                <linearGradient id="orGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: "#F59E0B", stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: "#EF4444", stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>

                            {/* NOT operator */}
                            <rect x="20" y="20" width="120" height="50" rx="6" fill="url(#notGrad)" opacity="0.8">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                            </rect>
                            <text x="80" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">NOT (~)</text>
                            <text x="80" y="85" textAnchor="middle" fill="#9CA3AF" fontSize="10">Negation</text>

                            {/* AND operator */}
                            <rect x="165" y="20" width="120" height="50" rx="6" fill="url(#andGrad)" opacity="0.8">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="0.7s" repeatCount="indefinite" />
                            </rect>
                            <text x="225" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">AND (∧)</text>
                            <text x="225" y="85" textAnchor="middle" fill="#9CA3AF" fontSize="10">Conjunction</text>

                            {/* OR operator */}
                            <rect x="310" y="20" width="120" height="50" rx="6" fill="url(#orGrad)" opacity="0.8">
                                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1.4s" repeatCount="indefinite" />
                            </rect>
                            <text x="370" y="50" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">OR (∨)</text>
                            <text x="370" y="85" textAnchor="middle" fill="#9CA3AF" fontSize="10">Disjunction</text>

                            <text x="225" y="130" textAnchor="middle" fill="#6B7280" fontSize="11">Basic logical connectives</text>
                        </svg>
                    </div>
                </div>

                {/* Introduction */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-4">What are Logical Operators?</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Logical operators (also called <span className="text-yellow-400">connectives</span>) combine propositions to form
                        <span className="text-green-400"> compound propositions</span>. They define how truth values of simpler statements
                        determine the truth value of the whole.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        The three fundamental operators are <span className="text-pink-400">NOT (~)</span> (negation),
                        <span className="text-cyan-400"> AND (∧)</span> (conjunction), and <span className="text-orange-400"> OR (∨)</span> (disjunction).
                        They correspond to logical operations of complement, intersection, and union.
                    </p>
                </div>

                {/* Operator 1: NOT */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-4">Operator 1: NOT (~) — Negation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-300"><span className="font-mono text-pink-400">~p</span> (or <span className="font-mono">¬p</span>, <span className="font-mono">!p</span>) means <span className="text-yellow-400">"not p"</span> or <span className="text-yellow-400">"It is not the case that p"</span>.</p>
                            <p className="text-gray-300 mt-2">It reverses the truth value: if p is true, ~p is false; if p is false, ~p is true.</p>
                            <div className="mt-4 bg-gray-700/30 p-3 rounded-lg">
                                <p className="font-mono text-sm">Truth Table for NOT:</p>
                                <table className="mt-2 w-full text-sm">
                                    <thead><tr><th className="text-left">p</th><th className="text-left">~p</th></tr></thead>
                                    <tbody>
                                        <tr><td>T</td><td className="text-red-400">F</td></tr>
                                        <tr><td>F</td><td className="text-green-400">T</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-pink-900/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-pink-400 mb-2">Real-Life Examples</h3>
                            <ul className="space-y-2 text-sm">
                                <li>p = "It is raining" → ~p = "It is NOT raining"</li>
                                <li>p = "Swadeep is present" → ~p = "Swadeep is absent"</li>
                                <li>p = "5 &gt; 3" → ~p = "5 ≤ 3" (false)</li>
                                <li>p = "User is logged in" → ~p = "User is NOT logged in"</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Operator 2: AND */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Operator 2: AND (∧) — Conjunction</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-300"><span className="font-mono text-cyan-400">p ∧ q</span> means <span className="text-yellow-400">"p and q"</span>. It is <span className="text-green-400">true only when BOTH p and q are true</span>.</p>
                            <p className="text-gray-300 mt-2">If either is false, the conjunction is false.</p>
                            <div className="mt-4 bg-gray-700/30 p-3 rounded-lg">
                                <p className="font-mono text-sm">Truth Table for AND:</p>
                                <table className="mt-2 w-full text-sm">
                                    <thead><tr><th>p</th><th>q</th><th>p ∧ q</th></tr></thead>
                                    <tbody>
                                        <tr><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                                        <tr><td>T</td><td>F</td><td className="text-red-400">F</td></tr>
                                        <tr><td>F</td><td>T</td><td className="text-red-400">F</td></tr>
                                        <tr><td>F</td><td>F</td><td className="text-red-400">F</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-cyan-900/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-cyan-400 mb-2">Real-Life Examples</h3>
                            <ul className="space-y-2 text-sm">
                                <li>p = "Abhronila studies", q = "Susmita practices" → p∧q = "Both study AND practice"</li>
                                <li>p = "User is admin", q = "User has permission" → p∧q = "Admin AND has permission"</li>
                                <li>p = "It's weekend", q = "It's sunny" → p∧q = "Weekend AND sunny"</li>
                                <li>p = "Age ≥ 18", q = "Has license" → p∧q = "Adult AND licensed"</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Operator 3: OR */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-orange-400 mb-4">Operator 3: OR (∨) — Disjunction</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-300"><span className="font-mono text-orange-400">p ∨ q</span> means <span className="text-yellow-400">"p or q"</span>. It is <span className="text-green-400">true if AT LEAST ONE of p or q is true</span>.</p>
                            <p className="text-gray-300 mt-2">Only false when both are false.</p>
                            <div className="mt-4 bg-gray-700/30 p-3 rounded-lg">
                                <p className="font-mono text-sm">Truth Table for OR:</p>
                                <table className="mt-2 w-full text-sm">
                                    <thead><tr><th>p</th><th>q</th><th>p ∨ q</th></tr></thead>
                                    <tbody>
                                        <tr><td>T</td><td>T</td><td className="text-green-400">T</td></tr>
                                        <tr><td>T</td><td>F</td><td className="text-green-400">T</td></tr>
                                        <tr><td>F</td><td>T</td><td className="text-green-400">T</td></tr>
                                        <tr><td>F</td><td>F</td><td className="text-red-400">F</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-orange-900/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-orange-400 mb-2">Real-Life Examples</h3>
                            <ul className="space-y-2 text-sm">
                                <li>p = "Debangshu brings lunch", q = "Tuhina buys food" → p∨q = "Either brings OR buys"</li>
                                <li>p = "Train is late", q = "Bus is cancelled" → p∨q = "Late OR cancelled"</li>
                                <li>p = "Has cash", q = "Has card" → p∨q = "Has cash OR card" (can pay)</li>
                                <li>p = "Score &gt; 90", q = "Score = 100" → p∨q = "Above 90 OR perfect"</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-gray-300">⚠️ <span className="font-semibold">Note:</span> In logic, OR is <span className="text-yellow-400">inclusive</span> (allows both). For exclusive OR (either but not both), we use a different operator (⊕).</p>
                    </div>
                </div>

                {/* Pronunciation Section */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.15s] bg-indigo-900/20 rounded-2xl p-6 border-l-4 border-indigo-500">
                    <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
                        🔊 How to Read Logical Symbols
                    </h2>

                    <div className="space-y-4 text-gray-300">

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                            <p><span className="font-mono text-pink-400">~p</span> → <span className="text-yellow-400">"NOT p"</span></p>
                            <p className="text-sm text-gray-400">Also read as: "Negation of p"</p>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                            <p><span className="font-mono text-cyan-400">p ∧ q</span> → <span className="text-yellow-400">"p AND q"</span></p>
                            <p className="text-sm text-gray-400">Also read as: "p conjunction q"</p>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                            <p><span className="font-mono text-orange-400">p ∨ q</span> → <span className="text-yellow-400">"p OR q"</span></p>
                            <p className="text-sm text-gray-400">Also read as: "p disjunction q"</p>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                            <p><span className="font-mono text-green-400">~p ∧ q</span> → <span className="text-yellow-400">"NOT p AND q"</span></p>
                            <p className="text-sm text-gray-400">Meaning: p is false and q is true</p>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                            <p><span className="font-mono text-purple-400">p ∨ ~q</span> → <span className="text-yellow-400">"p OR NOT q"</span></p>
                            <p className="text-sm text-gray-400">Meaning: either p is true or q is false</p>
                        </div>

                        <div className="p-3 bg-gray-800/40 rounded-lg">
                            <p><span className="font-mono text-blue-400">~(p ∧ q)</span> → <span className="text-yellow-400">"NOT (p AND q)"</span></p>
                            <p className="text-sm text-gray-400">Read carefully: bracket is important</p>
                        </div>

                    </div>
                </div>

                {/* Combined Examples */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gray-800/50 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-4">📚 Combined Examples with Multiple Operators</h2>
                    <div className="space-y-4">
                        <div className="border border-gray-700 rounded-lg p-3 hover:bg-gray-700/30 transition">
                            <p className="font-mono text-cyan-400">~p ∧ q</p>
                            <p className="text-gray-300 text-sm">"NOT p AND q" — true when p is false AND q is true.</p>
                            <p className="text-gray-400 text-xs mt-1">Example: p="Raining", q="Cold" → "Not raining AND cold"</p>
                        </div>
                        <div className="border border-gray-700 rounded-lg p-3 hover:bg-gray-700/30 transition">
                            <p className="font-mono text-orange-400">p ∨ ~q</p>
                            <p className="text-gray-300 text-sm">"p OR NOT q" — true if p is true OR q is false.</p>
                            <p className="text-gray-400 text-xs mt-1">Example: p="Weekend", q="Holiday" → "Weekend OR not holiday"</p>
                        </div>
                        <div className="border border-gray-700 rounded-lg p-3 hover:bg-gray-700/30 transition">
                            <p className="font-mono text-green-400">~(p ∧ q)</p>
                            <p className="text-gray-300 text-sm">"NOT (p AND q)" — true unless both p and q are true (De Morgan: ~p ∨ ~q).</p>
                            <p className="text-gray-400 text-xs mt-1">Example: "Not (Swadeep and Tuhina both come)" = "Swadeep absent OR Tuhina absent"</p>
                        </div>
                    </div>
                </div>

                {/* Real-World Applications */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-gradient-to-r from-pink-900/30 to-cyan-900/30 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-4">Real-World Applications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/40 p-3 rounded-lg">
                            <h3 className="font-semibold text-cyan-400">🔍 Search Engines</h3>
                            <p className="text-xs text-gray-300">"Apple AND iPhone NOT fruit" uses AND, OR, NOT to filter results.</p>
                        </div>
                        <div className="bg-gray-800/40 p-3 rounded-lg">
                            <h3 className="font-semibold text-orange-400">💻 Programming</h3>
                            <p className="text-xs text-gray-300">if (user.isLoggedIn && user.hasPermission) – both conditions must be true.</p>
                        </div>
                        <div className="bg-gray-800/40 p-3 rounded-lg">
                            <h3 className="font-semibold text-pink-400">⚙️ Digital Circuits</h3>
                            <p className="text-xs text-gray-300">AND gates, OR gates, NOT gates implement these operators in hardware.</p>
                        </div>
                    </div>
                </div>

                {/* Tips & Tricks */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
                    <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Memory Aid:</span> AND is like multiplication (1×1=1, else 0); OR is like addition (1+anything ≥1).</span></li>
                        <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Short-circuit evaluation:</span> In programming, && stops at first false; || stops at first true.</span></li>
                        <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Negation distribution:</span> ~(p ∧ q) = ~p ∨ ~q (De Morgan's law).</span></li>
                        <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">English to logic:</span> "but" often means AND; "unless" can be tricky (often ~p → q).</span></li>
                    </ul>
                </div>

                {/* Common Pitfalls */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
                    <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Confusing OR in logic (inclusive) with everyday "either...or" (exclusive).</span></li>
                        <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Thinking ~p ∧ ~q is the same as ~(p ∧ q) — they are different.</span></li>
                        <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Misplacing parentheses: p ∧ q ∨ r is ambiguous; use (p ∧ q) ∨ r or p ∧ (q ∨ r).</span></li>
                        <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Assuming AND and OR are interchangeable with addition/multiplication (different rules).</span></li>
                    </ul>
                </div>

                {/* Best Practices */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
                    <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Use parentheses to make precedence explicit, even when not strictly required.</span></li>
                        <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">When translating English, identify the logical structure before assigning variables.</span></li>
                        <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">In code, prefer positive conditions (if (isLoggedIn)) over negated (if (!isLoggedOut)).</span></li>
                        <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Use truth tables to verify equivalences involving multiple operators.</span></li>
                    </ul>
                </div>

                {/* Mini Checklist */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-gray-800/50 rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold text-pink-400 mb-4">📋 Student Checklist</h2>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-pink-500" /><span className="text-gray-300">I can write truth tables for ~, ∧, ∨.</span></div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-pink-500" /><span className="text-gray-300">I understand that AND is true only if both are true.</span></div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-pink-500" /><span className="text-gray-300">I understand that OR is true if at least one is true.</span></div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-pink-500" /><span className="text-gray-300">I can evaluate compound expressions with multiple operators.</span></div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-pink-500" /><span className="text-gray-300">I can translate English sentences using AND/OR/NOT into logical form.</span></div>
                    </div>
                </div>

                {/* Hint Section */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
                    <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
                    <p className="text-gray-300 italic">"In Barrackpore, if p='Train is on time', q='Bus is available', then when would you take the bus? (p ∨ q) is true if either is true. But ~p ∧ q means bus only when train is late. Try creating your own daily decisions using these operators."</p>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s]">
                    <Teacher note="Students often confuse inclusive OR with exclusive OR. Use concrete examples: 'You can have coffee or tea' (inclusive means you could have both). Also emphasize precedence: NOT before AND before OR. Use many truth table exercises with 2 and 3 variables to build fluency. Relate to programming's && and || operators." />
                </div>

                {/* FAQ Section */}
                <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s]">
                    <FAQTemplate title="Logical Operators FAQs" questions={questions} />
                </div>

            </div>
            <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.animate-\\[fadeSlideUp_.*\\]{animation:none!important}}.dark{color-scheme:dark}`}</style>
        </div>
    );
};

export default Topic4;