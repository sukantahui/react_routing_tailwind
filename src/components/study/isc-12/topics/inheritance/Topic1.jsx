import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java code examples for this topic
import singleInheritance from "./topic1_files/SingleInheritance.java?raw";
import multilevelInheritance from "./topic1_files/MultilevelInheritance.java?raw";
import hierarchicalInheritance from "./topic1_files/HierarchicalInheritance.java?raw";
import realWorldExample from "./topic1_files/RealWorldInheritance.java?raw";

import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/Faqs';

const Topic1 = () => {
    const [activeType, setActiveType] = useState('single');

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">

            {/* Section 1: Title & Introduction */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
                    Types of Inheritance in Java
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Java supports three main types of inheritance: <strong className="text-blue-600 dark:text-blue-400">Single</strong>,
                    <strong className="text-green-600 dark:text-green-400"> Multilevel</strong>, and
                    <strong className="text-purple-600 dark:text-purple-400"> Hierarchical</strong>.
                    Understanding when to use each type is crucial for building scalable, maintainable applications.
                </p>
            </div>

            {/* Section 2: Interactive Type Selector */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                        📊 Explore Inheritance Types
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                        <button
                            onClick={() => setActiveType('single')}
                            className={clsx(
                                "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105",
                                activeType === 'single'
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            )}
                        >
                            🔷 Single Inheritance
                        </button>
                        <button
                            onClick={() => setActiveType('multilevel')}
                            className={clsx(
                                "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105",
                                activeType === 'multilevel'
                                    ? "bg-green-500 text-white shadow-lg"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            )}
                        >
                            📚 Multilevel Inheritance
                        </button>
                        <button
                            onClick={() => setActiveType('hierarchical')}
                            className={clsx(
                                "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105",
                                activeType === 'hierarchical'
                                    ? "bg-purple-500 text-white shadow-lg"
                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            )}
                        >
                            🌳 Hierarchical Inheritance
                        </button>
                    </div>

                    {/* Dynamic SVG Illustration */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6 mb-6">
                        {activeType === 'single' && (
                            <div className="text-center">
                                <svg viewBox="0 0 500 300" className="w-full max-w-md mx-auto">
                                    <rect x="175" y="30" width="150" height="60" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="250" y="65" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Parent Class</text>

                                    <line x1="250" y1="90" x2="250" y2="140" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead)">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" fill="freeze" />
                                    </line>

                                    <rect x="175" y="150" width="150" height="60" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2">
                                        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="1s" fill="freeze" />
                                    </rect>
                                    <text x="250" y="185" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Child Class</text>

                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                                        </marker>
                                    </defs>
                                </svg>
                                <p className="text-gray-600 dark:text-gray-400 mt-4">
                                    <strong>Single Inheritance:</strong> One parent → One child (simplest form)
                                </p>
                            </div>
                        )}

                        {activeType === 'multilevel' && (
                            <div className="text-center">
                                <svg viewBox="0 0 500 400" className="w-full max-w-md mx-auto">
                                    <rect x="175" y="20" width="150" height="55" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="250" y="52" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">GrandParent</text>

                                    <line x1="250" y1="75" x2="250" y2="120" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead2)">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" fill="freeze" />
                                    </line>

                                    <rect x="175" y="130" width="150" height="55" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2">
                                        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="0.5s" fill="freeze" />
                                    </rect>
                                    <text x="250" y="162" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Parent</text>

                                    <line x1="250" y1="185" x2="250" y2="230" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead2)">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" begin="1s" fill="freeze" />
                                    </line>

                                    <rect x="175" y="240" width="150" height="55" rx="8" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2">
                                        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="1.5s" fill="freeze" />
                                    </rect>
                                    <text x="250" y="272" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Child</text>

                                    <defs>
                                        <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                                        </marker>
                                    </defs>
                                </svg>
                                <p className="text-gray-600 dark:text-gray-400 mt-4">
                                    <strong>Multilevel Inheritance:</strong> Chain of inheritance (GrandParent → Parent → Child)
                                </p>
                            </div>
                        )}

                        {activeType === 'hierarchical' && (
                            <div className="text-center">
                                <svg viewBox="0 0 500 350" className="w-full max-w-md mx-auto">
                                    <rect x="175" y="20" width="150" height="55" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="250" y="52" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Parent Class</text>

                                    <line x1="175" y1="75" x2="100" y2="140" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead3)">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" fill="freeze" />
                                    </line>
                                    <line x1="250" y1="75" x2="250" y2="140" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead3)">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" begin="0.5s" fill="freeze" />
                                    </line>
                                    <line x1="325" y1="75" x2="400" y2="140" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead3)">
                                        <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" begin="1s" fill="freeze" />
                                    </line>

                                    <rect x="50" y="150" width="100" height="55" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2">
                                        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="1.5s" fill="freeze" />
                                    </rect>
                                    <text x="100" y="182" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Child 1</text>

                                    <rect x="200" y="150" width="100" height="55" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2">
                                        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="2s" fill="freeze" />
                                    </rect>
                                    <text x="250" y="182" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Child 2</text>

                                    <rect x="350" y="150" width="100" height="55" rx="8" fill="#10B981" stroke="#059669" strokeWidth="2">
                                        <animate attributeName="opacity" values="0;1" dur="1.5s" begin="2.5s" fill="freeze" />
                                    </rect>
                                    <text x="400" y="182" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Child 3</text>

                                    <defs>
                                        <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                                        </marker>
                                    </defs>
                                </svg>
                                <p className="text-gray-600 dark:text-gray-400 mt-4">
                                    <strong>Hierarchical Inheritance:</strong> One parent → Multiple children
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Section 3: Detailed Explanation */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Single Inheritance Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-blue-500">
                        <div className="text-4xl mb-3">🔷</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Single Inheritance</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">One parent, one child</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            A class inherits from exactly one parent class. This is the simplest form and most common in Java.
                        </p>
                        <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-xs">
                            <code>class Child extends Parent { }</code>
                        </div>
                    </div>

                    {/* Multilevel Inheritance Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-green-500">
                        <div className="text-4xl mb-3">📚</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multilevel Inheritance</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Chain of inheritance</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            A chain of inheritance where a class inherits from another class, which itself inherits from another class.
                        </p>
                        <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-xs">
                            <code>class A → class B extends A → class C extends B</code>
                        </div>
                    </div>

                    {/* Hierarchical Inheritance Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-t-4 border-purple-500">
                        <div className="text-4xl mb-3">🌳</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hierarchical Inheritance</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">One parent, multiple children</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Multiple child classes inherit from a single parent class. Promotes code reuse across siblings.
                        </p>
                        <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-xs">
                            <code>class A { } → class B extends A, class C extends A</code>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 4: Java Code Examples */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💻 Code Examples</h2>
                <div className="space-y-6">
                    <JavaFileLoader
                        fileModule={singleInheritance}
                        title="SingleInheritance.java - Student & CollegeStudent Example"
                        highlightLines={[8, 9, 18]}
                    />

                    <JavaFileLoader
                        fileModule={multilevelInheritance}
                        title="MultilevelInheritance.java - Person → Employee → Manager Example"
                        highlightLines={[8, 9, 10, 30, 31]}
                    />

                    <JavaFileLoader
                        fileModule={hierarchicalInheritance}
                        title="HierarchicalInheritance.java - Shape → Circle, Rectangle, Triangle"
                        highlightLines={[8, 9, 21, 31, 41]}
                    />

                    <JavaFileLoader
                        fileModule={realWorldExample}
                        title="RealWorldInheritance.java - Complete School System"
                        highlightLines={[12, 13, 14, 15]}
                    />
                </div>
            </div>

            {/* Section 5: Comparison Table */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 overflow-x-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">📊 Comparison Table</h2>
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 text-gray-900 dark:text-white">Feature</th>
                                <th className="p-3 text-gray-900 dark:text-white">Single</th>
                                <th className="p-3 text-gray-900 dark:text-white">Multilevel</th>
                                <th className="p-3 text-gray-900 dark:text-white">Hierarchical</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                                <td className="p-3 text-gray-700 dark:text-gray-300">Number of parents</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">1</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">1 (chain)</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">1</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                                <td className="p-3 text-gray-700 dark:text-gray-300">Number of children</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">1</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">1</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Multiple</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                                <td className="p-3 text-gray-700 dark:text-gray-300">Levels</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">2</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">3+</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">2</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                                <td className="p-3 text-gray-700 dark:text-gray-300">Complexity</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Low</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Medium</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Medium</td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                                <td className="p-3 text-gray-700 dark:text-gray-300">Use case</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Simple extension</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Chain of specialization</td>
                                <td className="p-3 text-gray-700 dark:text-gray-300">Multiple specialized versions</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 6: Pro Tips */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💡 Pro Tips & Best Practices</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Keep hierarchies shallow:</strong> Deep inheritance (more than 3-4 levels) makes code hard to maintain and debug.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Use hierarchical inheritance</strong> when multiple classes share common behavior but have their own specializations.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Single inheritance is safest</strong> — Java's limitation to single inheritance prevents the diamond problem.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Think about future extensions:</strong> Design parent classes keeping in mind they might have multiple children.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section 7: Common Mistakes */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-l-4 border-red-500">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">⚠️ Common Pitfalls</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Creating unnecessarily deep hierarchies:</strong> If you find yourself at level 5+, reconsider your design.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Forgetting that Java doesn't support multiple inheritance:</strong> Use interfaces instead.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Circular inheritance attempts:</strong> A class cannot extend itself, directly or indirectly.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>IDE Error:</strong> "Cycle detected in inheritance hierarchy" - Fix by removing circular dependency.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section 8: Mini Checklist */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">📋 Student Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I understand Single Inheritance</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I understand Multilevel Inheritance</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I understand Hierarchical Inheritance</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I can choose the right type for a scenario</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I know Java doesn't support multiple inheritance</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I can identify inheritance types in code</span>
                        </div>
                    </div>
                </div>
            </div>

            <FAQTemplate
                title="Types of Inheritance FAQs"
                questions={questions}
            />

            {/* Teacher's Note */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
                <Teacher note={
                    "When teaching inheritance types, use real-world analogies that resonate with students from Barrackpore, Shyamnagar, Ichapur, and Naihati. Single inheritance is like a parent-child relationship (Tuhina inherits from her mother). Multilevel is like grandparents → parents → children (The Chatterjee family tradition passed down). Hierarchical is like a teacher (Abhronila) having multiple students (Swadeep, Debangshu). Emphasize that while multilevel can be powerful, students shouldn't go beyond 3-4 levels. Use the shape hierarchy example (Shape → Circle, Rectangle, Triangle) to show practical hierarchical inheritance."
                } />
            </div>

            {/* Hint Section */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 p-3 rounded">
                <p>💭 <strong>Think about:</strong> Which inheritance type would you use for: Animal → Dog → Puppy? What about Vehicle → Car, Bike, Truck?</p>
            </div>

            <style>{`
        @keyframes fadeSlideUp {
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
          .animate\\[fadeSlideUp.*\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Topic1;