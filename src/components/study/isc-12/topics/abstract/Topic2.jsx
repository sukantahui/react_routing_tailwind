import React, { useState } from 'react';
import clsx from 'clsx';
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';

// Import Java code examples
import ruleViolationsDemo from './topic2_files/RuleViolationsDemo.java?raw';
import abstractClassRules from './topic2_files/AbstractClassRules.java?raw';
import constructorRulesDemo from './topic2_files/ConstructorRulesDemo.java?raw';

const Topic2 = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Custom keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes softGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(59,130,246,0)); }
          50% { filter: drop-shadow(0 0 8px rgba(59,130,246,0.5)); }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(168,85,247,0.3); }
          50% { border-color: rgba(168,85,247,0.8); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        .animate-softGlow {
          animation: softGlow 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeSlideUp, .animate-softGlow {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="max-w-5xl mx-auto animate-fadeSlideUp">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Rules for Abstract Classes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            The commandments of abstraction — what you can and cannot do with abstract classes and methods.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* 1. Introduction to Rules */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-4">Why Rules Matter</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Abstract classes and methods follow strict rules enforced by the Java compiler. Understanding these rules prevents errors and helps you design robust inheritance hierarchies. Let's explore each rule with examples and common pitfalls.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-3">
              <p className="italic">✨ <strong>Teacher's insight:</strong> Students often ask "Why can't I do X with abstract classes?" The answer is usually about preventing ambiguity or enforcing complete implementation. Think of these rules as guardrails that keep your code safe and predictable.</p>
            </div>
          </div>
        </section>

        {/* 2. The 7 Golden Rules - SVG Illustration */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4 mb-4">The 7 Golden Rules of Abstract Classes</h2>
          <div className="flex justify-center my-4">
            <svg viewBox="0 0 800 500" className="w-full max-w-4xl h-auto" aria-label="Abstract class rules diagram">
              <g transform="translate(20, 20)">
                {/* Rule 1 */}
                <g transform="translate(0, 0)">
                  <rect x="0" y="0" width="240" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#c7d2fe" fontSize="12" fontWeight="bold">Rule 1</text>
                  <text x="15" y="45" fill="#e0e7ff" fontSize="11">If a class has ≥1 abstract method,</text>
                  <text x="15" y="60" fill="#fca5a5" fontSize="11" fontWeight="bold">→ class MUST be abstract</text>
                </g>

                {/* Rule 2 */}
                <g transform="translate(260, 0)">
                  <rect x="0" y="0" width="240" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#c7d2fe" fontSize="12" fontWeight="bold">Rule 2</text>
                  <text x="15" y="45" fill="#e0e7ff" fontSize="11">Cannot instantiate abstract class</text>
                  <text x="15" y="60" fill="#fca5a5" fontSize="11" fontWeight="bold">→ new AbstractClass() ❌</text>
                </g>

                {/* Rule 3 */}
                <g transform="translate(520, 0)">
                  <rect x="0" y="0" width="240" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#c7d2fe" fontSize="12" fontWeight="bold">Rule 3</text>
                  <text x="15" y="45" fill="#e0e7ff" fontSize="11">Abstract methods: no body</text>
                  <text x="15" y="60" fill="#fca5a5" fontSize="11" fontWeight="bold">→ ends with ; not {}</text>
                </g>

                {/* Rule 4 */}
                <g transform="translate(0, 90)">
                  <rect x="0" y="0" width="240" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#c7d2fe" fontSize="12" fontWeight="bold">Rule 4</text>
                  <text x="15" y="45" fill="#e0e7ff" fontSize="11">Abstract method cannot be</text>
                  <text x="15" y="60" fill="#fca5a5" fontSize="11" fontWeight="bold">→ private, static, final</text>
                </g>

                {/* Rule 5 */}
                <g transform="translate(260, 90)">
                  <rect x="0" y="0" width="240" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#c7d2fe" fontSize="12" fontWeight="bold">Rule 5</text>
                  <text x="15" y="45" fill="#e0e7ff" fontSize="11">Abstract class can have</text>
                  <text x="15" y="60" fill="#86efac" fontSize="11" fontWeight="bold">→ constructors, fields, concrete methods</text>
                </g>

                {/* Rule 6 */}
                <g transform="translate(520, 90)">
                  <rect x="0" y="0" width="240" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="15" y="25" fill="#c7d2fe" fontSize="12" fontWeight="bold">Rule 6</text>
                  <text x="15" y="45" fill="#e0e7ff" fontSize="11">Subclass must implement ALL</text>
                  <text x="15" y="60" fill="#fca5a5" fontSize="11" fontWeight="bold">→ abstract methods (or be abstract)</text>
                </g>

                {/* Rule 7 */}
                <g transform="translate(130, 180)">
                  <rect x="0" y="0" width="500" height="70" rx="10" fill="#1e1b4b" className="dark:fill-gray-800 fill-indigo-50" stroke="#f472b6" strokeWidth="2" strokeDasharray="6 3" />
                  <text x="250" y="25" textAnchor="middle" fill="#fbcfe8" fontSize="12" fontWeight="bold">Rule 7 (The Big One)</text>
                  <text x="250" y="45" textAnchor="middle" fill="#e0e7ff" fontSize="11">Abstract class CANNOT be final</text>
                  <text x="250" y="60" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">→ final prevents inheritance, abstract requires it</text>
                </g>
              </g>
            </svg>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">🚫 <span className="font-medium">No instantiation</span></div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">📝 <span className="font-medium">No method body</span></div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">🔒 <span className="font-medium">No private/static/final abstract</span></div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">🏗️ <span className="font-medium">Constructors allowed</span></div>
          </div>
        </section>

        {/* 3. Detailed Rules with Code Examples */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-4 mb-4">Rules in Action (What Breaks & What Works)</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Let's see code that violates rules and the correct way to follow them:</p>
          
          <div className="space-y-6">
            <JavaFileLoader
              fileModule={ruleViolationsDemo}
              title="RuleViolationsDemo.java (What NOT to do)"
              highlightLines={[5,6,9,10,13,14,17,18]}
            />
            <JavaFileLoader
              fileModule={abstractClassRules}
              title="AbstractClassRules.java (Correct Usage)"
              highlightLines={[5,6,7,10,11,12,15,16]}
            />
            <JavaFileLoader
              fileModule={constructorRulesDemo}
              title="ConstructorRulesDemo.java"
              highlightLines={[8,9,10,14,15,18,19]}
            />
          </div>
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm">⚠️ <strong>Compiler Errors to Remember:</strong> "Illegal combination of modifiers", "Cannot instantiate the type", "The type must be abstract", "Missing method body".</p>
          </div>
        </section>

        {/* 4. Quick Reference Table */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mb-4">Quick Reference: Allowed vs Forbidden</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3">Modifier / Feature</th>
                  <th className="px-4 py-3">Abstract Class</th>
                  <th className="px-4 py-3">Abstract Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">public</td><td className="px-4 py-2 text-green-600">✓</td><td className="px-4 py-2 text-green-600">✓</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">protected</td><td className="px-4 py-2 text-green-600">✓</td><td className="px-4 py-2 text-green-600">✓</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">private</td><td className="px-4 py-2 text-green-600">✓ (fields/methods)</td><td className="px-4 py-2 text-red-600">❌</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">static</td><td className="px-4 py-2 text-green-600">✓</td><td className="px-4 py-2 text-red-600">❌</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">final</td><td className="px-4 py-2 text-red-600">❌ (class)</td><td className="px-4 py-2 text-red-600">❌</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">synchronized</td><td className="px-4 py-2 text-green-600">✓ (methods)</td><td className="px-4 py-2 text-red-600">❌</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">Constructors</td><td className="px-4 py-2 text-green-600">✓</td><td className="px-4 py-2">N/A</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2">Instance fields</td><td className="px-4 py-2 text-green-600">✓</td><td className="px-4 py-2">N/A</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Professional Tips & Common Mistakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">💎 Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>Use <strong>@Override annotation</strong> when implementing abstract methods — the compiler will catch signature mismatches.</li>
              <li>If you see "The type X must implement inherited abstract method", you've missed an implementation.</li>
              <li>Abstract classes can have <strong>main()</strong> — useful for testing subclasses.</li>
              <li>Remember: <strong>abstract</strong> ≠ <strong>interface</strong> — abstract classes can hold state.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Forgetting the abstract keyword on class</strong> when it has abstract methods → compiler error.</li>
              <li><strong>Trying to instantiate abstract class</strong> with <code>new</code> → error.</li>
              <li><strong>Using private abstract method</strong> → "illegal combination of modifiers".</li>
              <li><strong>Declaring abstract method in non-abstract class</strong> → "The abstract method can only be defined by an abstract class".</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">✅ Best Practices</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Always mark your abstract class as <code>abstract</code> — even if it has no abstract methods (prevents instantiation).</li>
              <li>Document which methods are abstract and why.</li>
              <li>Keep abstract methods few and focused — too many indicate a design issue.</li>
              <li>Use <code>protected</code> abstract methods when only subclasses should implement them.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">📋 Mini Checklist</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>✔️ Does every abstract method have a semicolon (no body)?</li>
              <li>✔️ Is the class marked abstract if it has any abstract method?</li>
              <li>✔️ Are all abstract methods implemented in concrete subclasses?</li>
              <li>✔️ Did I avoid private/static/final on abstract methods?</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-5 border-l-8 border-indigo-400 animate-fadeSlideUp">
          <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">🧠 Think about...</h3>
          <p className="italic text-gray-700 dark:text-gray-300 mt-1">Why can't an abstract method be static? Consider: static methods belong to the class and are not inherited polymorphically. An abstract method expects runtime polymorphism — they conflict by design.</p>
          <p className="text-sm text-gray-500 mt-2">Try removing the <code>abstract</code> keyword from the class but keep an abstract method. What error do you get? That's Rule #1 in action.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeSlideUp">
          <FAQTemplate
            title="Rules for Abstract Classes - FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp mt-8">
          <Teacher
            note="Rules can be dry, but turn them into a 'spot the violation' game. Show students broken code and ask them to identify which rule is violated. The 7 rules poster (SVG) can be printed or used as a reference. Emphasize that these rules exist to prevent ambiguity — Java forces you to be explicit about incomplete classes."
          />
        </div>
      </div>
    </div>
  );
};

export default Topic2;