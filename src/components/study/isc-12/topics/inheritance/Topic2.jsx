import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";


// Import Java code examples for this topic
import basicOverriding from "./topic2_files/BasicMethodOverriding.java?raw";
import annotationExample from "./topic2_files/OverrideAnnotation.java?raw";
import realWorldOverride from "./topic2_files/RealWorldOverride.java?raw";
import rulesExample from "./topic2_files/OverridingRules.java?raw";

import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from "./topic2_files/methodOverridingFaqs";

const Topic2 = () => {
    const [visibleAnswers, setVisibleAnswers] = useState({});

    const toggleAnswer = (index) => {
        setVisibleAnswers(prev => ({ ...prev, [index]: !prev[index] }));
    };
    const [activeExample, setActiveExample] = useState('basic');

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">

            {/* Section 1: Title & Introduction */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
                    Method Overriding in Java
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Method overriding allows a subclass to provide a <strong className="text-blue-600 dark:text-blue-400">specific implementation</strong>
                    of a method that is already defined in its parent class. It's a cornerstone of runtime polymorphism
                    and enables flexible, extensible code.
                </p>
            </div>

            {/* Section 2: Core Concept with SVG */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                        🎯 What is Method Overriding?
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        {/* SVG Illustration */}
                        <div className="flex-1">
                            <svg viewBox="0 0 500 350" className="w-full max-w-md mx-auto">
                                {/* Parent Class Box */}
                                <rect x="150" y="20" width="200" height="80" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="2">
                                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                </rect>
                                <text x="250" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Parent Class</text>
                                <text x="250" y="75" textAnchor="middle" fill="white" fontSize="12">makeSound()</text>

                                {/* Arrow */}
                                <line x1="250" y1="100" x2="250" y2="140" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowOverride)">
                                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" fill="freeze" />
                                </line>
                                <text x="260" y="125" fill="#F59E0B" fontSize="12">extends</text>

                                {/* Child Class Box with Override */}
                                <rect x="100" y="150" width="300" height="160" rx="8" fill="#1F2937" stroke="#10B981" strokeWidth="2">
                                    <animate attributeName="opacity" values="0;1" dur="1.5s" begin="0.5s" fill="freeze" />
                                </rect>
                                <text x="250" y="180" textAnchor="middle" fill="#10B981" fontSize="14" fontWeight="bold">Child Class</text>

                                {/* Overridden methods */}
                                <rect x="120" y="195" width="260" height="35" rx="4" fill="#374151" stroke="#F59E0B" strokeWidth="1.5" />
                                <text x="250" y="217" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">
                                    @Override makeSound() → "Woof!"
                                </text>

                                <rect x="120" y="240" width="260" height="35" rx="4" fill="#374151" stroke="#8B5CF6" strokeWidth="1.5" />
                                <text x="250" y="262" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">
                                    @Override move() → "Run quickly!"
                                </text>

                                <rect x="120" y="285" width="260" height="35" rx="4" fill="#374151" stroke="#EC4899" strokeWidth="1.5" />
                                <text x="250" y="307" textAnchor="middle" fill="#EC4899" fontSize="12" fontWeight="bold">
                                    eat() → New method (not overridden)
                                </text>

                                <defs>
                                    <marker id="arrowOverride" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>

                        {/* Explanation */}
                        <div className="flex-1 space-y-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    <strong className="text-blue-600 dark:text-blue-400">Method Overriding</strong> happens when a child class
                                    redefines a method from its parent class with the <strong>same name, same parameters, and same return type</strong>.
                                </p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    💡 <strong>Key Point:</strong> The version of the method that gets called depends on the <strong>actual object type</strong>
                                    at runtime, not the reference variable type.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Method Signature & Rules */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">📝 Method Signature & Rules</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">✅ Allowed in Overriding</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">• Same method name</li>
                                <li className="flex items-start gap-2">• Same parameter list (type & order)</li>
                                <li className="flex items-start gap-2">• Same return type (or covariant return type)</li>
                                <li className="flex items-start gap-2">• Can have broader access modifier</li>
                                <li className="flex items-start gap-2">• Can throw fewer or narrower exceptions</li>
                            </ul>
                        </div>

                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">❌ Not Allowed in Overriding</h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">• Cannot have weaker access (public → private)</li>
                                <li className="flex items-start gap-2">• Cannot throw broader checked exceptions</li>
                                <li className="flex items-start gap-2">• Cannot override static methods (they're hidden)</li>
                                <li className="flex items-start gap-2">• Cannot override final methods</li>
                                <li className="flex items-start gap-2">• Cannot override private methods</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            💡 <strong>Remember:</strong> The <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">@Override</code> annotation is optional but highly recommended.
                            It helps the compiler catch errors if you're not actually overriding a method!
                        </p>
                    </div>
                </div>
            </div>

            {/* Section 4: Java Code Examples */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💻 Code Examples</h2>

                {/* Interactive Example Selector */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button
                        onClick={() => setActiveExample('basic')}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                            activeExample === 'basic'
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                    >
                        Basic Overriding
                    </button>
                    <button
                        onClick={() => setActiveExample('annotation')}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                            activeExample === 'annotation'
                                ? "bg-green-500 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                    >
                        @Override Annotation
                    </button>
                    <button
                        onClick={() => setActiveExample('realworld')}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                            activeExample === 'realworld'
                                ? "bg-purple-500 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                    >
                        Real-World Example
                    </button>
                    <button
                        onClick={() => setActiveExample('rules')}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                            activeExample === 'rules'
                                ? "bg-orange-500 text-white shadow-md"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        )}
                    >
                        Rules Demo
                    </button>
                </div>

                <div className="space-y-6">
                    {activeExample === 'basic' && (
                        <JavaFileLoader
                            fileModule={basicOverriding}
                            title="BasicMethodOverriding.java"
                            highlightLines={[17, 18, 19, 29, 30, 31]}
                        />
                    )}
                    {activeExample === 'annotation' && (
                        <JavaFileLoader
                            fileModule={annotationExample}
                            title="OverrideAnnotation.java"
                            highlightLines={[8, 9, 10, 20, 21, 22]}
                        />
                    )}
                    {activeExample === 'realworld' && (
                        <JavaFileLoader
                            fileModule={realWorldOverride}
                            title="RealWorldOverride.java"
                            highlightLines={[15, 16, 17, 28, 29, 30, 40, 41, 42]}
                        />
                    )}
                    {activeExample === 'rules' && (
                        <JavaFileLoader
                            fileModule={rulesExample}
                            title="OverridingRules.java"
                            highlightLines={[12, 13, 14, 27, 28, 29]}
                        />
                    )}
                </div>
            </div>

            {/* Section 5: Covariant Return Type */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">🔄 Covariant Return Type</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        Java 5+ allows an overridden method to return a <strong className="text-purple-600">subtype</strong> of the parent method's return type.
                        This is called <strong>covariant return type</strong> and makes overriding more flexible.
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-200 overflow-x-auto">
                        <pre className="whitespace-pre-wrap">
                            {`class Parent {
    Number getValue() {
        return 100;
    }
}

class Child extends Parent {
    @Override
    Integer getValue() {  // Integer is a subtype of Number
        return 200;
    }
}`}
                        </pre>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                        💡 <strong>Pro Tip:</strong> Covariant return types eliminate the need for explicit casting and make APIs more intuitive.
                    </p>
                </div>
            </div>

            {/* Section 6: Pro Tips */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💡 Professional Tips & Industry Habits</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Always use @Override annotation</strong> — It catches subtle errors like misspelled method names or incorrect parameters.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Don't change the method's purpose</strong> — Overriding should enhance or specialize behavior, not completely change it (Liskov Substitution Principle).</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Use super.method() when needed</strong> — Sometimes you want to extend parent behavior, not replace it entirely.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                            <span className="text-blue-500 text-xl">✓</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Debugging mindset:</strong> When debugging overridden methods, check the actual object type, not the reference type.</span>
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
                            <span className="text-gray-700 dark:text-gray-300"><strong>Forgetting @Override annotation:</strong> Without it, you might accidentally overload instead of override.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Changing parameter types:</strong> Different parameters = overloading, not overriding.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>Weaker access modifier:</strong> Changing public to private causes compilation error.</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors duration-300">
                            <span className="text-red-500 font-bold">•</span>
                            <span className="text-gray-700 dark:text-gray-300"><strong>IDE Error:</strong> "Method does not override method from its superclass" — Fix by checking method signature.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section 8: Best Practices Checklist */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
                <div className="bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">✅ Best Practices Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">✓ Always use @Override annotation</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">✓ Maintain same method signature</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">✓ Don't narrow access modifiers</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">✓ Call super method when appropriate</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">✓ Follow Liskov Substitution Principle</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">✓ Document overridden methods</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 9: Mini Checklist */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
                <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">📋 Student Checklist</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I understand what method overriding is</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I know the rules of overriding</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I can use @Override annotation correctly</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I understand covariant return types</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I can distinguish overriding from overloading</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-300">
                            <input type="checkbox" className="w-4 h-4 text-yellow-600 rounded" />
                            <span className="text-gray-700 dark:text-gray-300">I know why overriding is important for polymorphism</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* FAQ */}
            <FAQTemplate
                title="Inheritance FAQs"
                questions={questions}
            />
           

            {/* Teacher's Note */}
            <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
                <Teacher note={
                    "Method overriding is where polymorphism truly shines! Use the Animal example (Swadeep's pet dog vs Tuhina's pet cat) to show how the same 'makeSound()' method produces different outputs. Emphasize that overriding is about BEHAVIOR specialization, not just code reuse. Show students the difference between overriding (runtime) and overloading (compile-time). A great exercise: Have students create a 'Vehicle' class with 'start()' method, then override it in 'Car', 'Bike', and 'Auto' classes from Barrackpore, Shyamnagar, and Ichapur respectively."
                } />
            </div>

            {/* Hint Section */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 p-3 rounded">
                <p>💭 <strong>Think about:</strong> If you remove @Override but keep the same method signature, what happens? Try changing the parameter type slightly — is it still overriding?</p>
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

export default Topic2;