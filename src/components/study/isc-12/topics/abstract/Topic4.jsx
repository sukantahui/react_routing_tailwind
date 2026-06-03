import React, { useState } from 'react';
import clsx from 'clsx';
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';

// Import Java code examples
import comparisonDemo from './topic4_files/ComparisonDemo.java?raw';
import abstractVsConcrete from './topic4_files/AbstractVsConcrete.java?raw';
import whenToUseWhat from './topic4_files/WhenToUseWhat.java?raw';

const Topic4 = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
            Abstract Class vs Concrete Class
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Understanding when to use which — the blueprint vs the finished product.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* 1. Introduction */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-orange-500 pl-4 mb-4">Abstract vs Concrete: The Core Distinction</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Every class in Java is either <strong className="text-orange-600 dark:text-orange-400">abstract</strong> or <strong className="text-green-600 dark:text-green-400">concrete</strong>. The difference is fundamental: <strong>concrete classes</strong> are fully implemented and can be instantiated, while <strong>abstract classes</strong> are incomplete blueprints that cannot be instantiated.
            </p>
            <p>
              Think of a <strong>concrete class</strong> as a finished house — you can live in it. An <strong>abstract class</strong> is a blueprint — you can't live in it, but you can build houses (concrete subclasses) from it.
            </p>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg mt-3">
              <p className="italic">✨ <strong>Real-world parallel:</strong> A "Recipe" is abstract (steps, but missing specifics like "add 2 cups flour"). A "ChocolateCakeRecipe" is concrete — you can follow it to bake a cake.</p>
            </div>
          </div>
        </section>

        {/* 2. SVG Comparison Table */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-4">Visual Comparison</h2>
          <div className="flex justify-center my-4">
            <svg viewBox="0 0 800 380" className="w-full max-w-4xl h-auto" aria-label="Abstract vs Concrete comparison">
              <g transform="translate(20, 20)">
                {/* Abstract Class Box */}
                <g transform="translate(0, 0)">
                  <rect x="0" y="0" width="360" height="320" rx="15" fill="#1e293b" className="dark:fill-gray-800 fill-gray-100" stroke="#f97316" strokeWidth="2" strokeDasharray="8 4" />
                  <text x="180" y="30" textAnchor="middle" fill="#fdba74" fontSize="16" fontWeight="bold">ABSTRACT CLASS</text>
                  <line x1="15" y1="45" x2="345" y2="45" stroke="#f97316" strokeWidth="1" />
                  
                  <text x="20" y="70" fill="#cbd5e1" fontSize="13">✗ Cannot be instantiated</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="13">✗ May have abstract methods (no body)</text>
                  <text x="20" y="120" fill="#cbd5e1" fontSize="13">✓ Can have constructors (called by subclasses)</text>
                  <text x="20" y="145" fill="#cbd5e1" fontSize="13">✓ Can have instance variables (state)</text>
                  <text x="20" y="170" fill="#cbd5e1" fontSize="13">✓ Can have concrete methods</text>
                  <text x="20" y="195" fill="#cbd5e1" fontSize="13">✓ Can have static methods</text>
                  <text x="20" y="220" fill="#cbd5e1" fontSize="13">✓ Can extend another class (abstract/concrete)</text>
                  <text x="20" y="245" fill="#cbd5e1" fontSize="13">✓ Can implement multiple interfaces</text>
                  
                  <rect x="20" y="265" width="320" height="40" rx="6" fill="#f97316" opacity="0.2" />
                  <text x="180" y="290" textAnchor="middle" fill="#fdba74" fontSize="12" fontWeight="bold">Used as: Blueprint / Template</text>
                </g>

                {/* VS Badge */}
                <g transform="translate(380, 140)">
                  <circle cx="30" cy="30" r="35" fill="#ef4444" />
                  <text x="30" y="36" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">VS</text>
                </g>

                {/* Concrete Class Box */}
                <g transform="translate(440, 0)">
                  <rect x="0" y="0" width="340" height="320" rx="15" fill="#0f172a" className="dark:fill-gray-900 fill-gray-50" stroke="#10b981" strokeWidth="2" />
                  <text x="170" y="30" textAnchor="middle" fill="#6ee7b7" fontSize="16" fontWeight="bold">CONCRETE CLASS</text>
                  <line x1="15" y1="45" x2="325" y2="45" stroke="#10b981" strokeWidth="1" />
                  
                  <text x="20" y="70" fill="#cbd5e1" fontSize="13">✓ Can be instantiated (new)</text>
                  <text x="20" y="95" fill="#cbd5e1" fontSize="13">✓ All methods have bodies (no abstract)</text>
                  <text x="20" y="120" fill="#cbd5e1" fontSize="13">✓ Can have constructors</text>
                  <text x="20" y="145" fill="#cbd5e1" fontSize="13">✓ Can have instance variables</text>
                  <text x="20" y="170" fill="#cbd5e1" fontSize="13">✓ Can have any methods (concrete, static, final)</text>
                  <text x="20" y="195" fill="#cbd5e1" fontSize="13">✓ Can extend another class</text>
                  <text x="20" y="220" fill="#cbd5e1" fontSize="13">✓ Can implement multiple interfaces</text>
                  <text x="20" y="245" fill="#cbd5e1" fontSize="13">✓ Can be final (no further extension)</text>
                  
                  <rect x="20" y="265" width="300" height="40" rx="6" fill="#10b981" opacity="0.2" />
                  <text x="170" y="290" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">Used as: Ready-to-use object</text>
                </g>
              </g>
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">
              <span className="font-medium text-orange-600">Abstract Class</span><br />
              "Incomplete — must be extended"
            </div>
            <div className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">
              <span className="font-medium text-green-600">Concrete Class</span><br />
              "Complete — ready to use"
            </div>
          </div>
        </section>

        {/* 3. Detailed Comparison Table */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-4">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3 text-orange-600 dark:text-orange-400">Abstract Class</th>
                  <th className="px-4 py-3 text-green-600 dark:text-green-400">Concrete Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Instantiation</td><td className="px-4 py-2 text-red-600">❌ Not allowed</td><td className="px-4 py-2 text-green-600">✅ Allowed (new)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Abstract Methods</td><td className="px-4 py-2">✅ Can have (0 or more)</td><td className="px-4 py-2">❌ Cannot have any</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Constructors</td><td className="px-4 py-2">✅ Allowed (called via super)</td><td className="px-4 py-2">✅ Allowed</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Instance Variables</td><td className="px-4 py-2">✅ Allowed</td><td className="px-4 py-2">✅ Allowed</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Concrete Methods</td><td className="px-4 py-2">✅ Allowed</td><td className="px-4 py-2">✅ Allowed</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Static Methods</td><td className="px-4 py-2">✅ Allowed</td><td className="px-4 py-2">✅ Allowed</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Final Modifier</td><td className="px-4 py-2">❌ Not allowed on class</td><td className="px-4 py-2">✅ Allowed (prevents extension)</td></tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-4 py-2 font-medium">Purpose</td><td className="px-4 py-2">Blueprint / Template</td><td className="px-4 py-2">Ready-to-use object</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Java Code Examples */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mb-4">Code Comparison</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">See the difference in syntax and usage:</p>
          
          <div className="space-y-6">
            <JavaFileLoader
              fileModule={comparisonDemo}
              title="ComparisonDemo.java"
              highlightLines={[4,5,6,9,10,11,14,15,16]}
            />
            <JavaFileLoader
              fileModule={abstractVsConcrete}
              title="AbstractVsConcrete.java"
              highlightLines={[4,5,6,10,11,12,16,17,18]}
            />
            <JavaFileLoader
              fileModule={whenToUseWhat}
              title="WhenToUseWhat.java"
              highlightLines={[4,5,6,9,10,11,14,15,16]}
            />
          </div>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm">💡 <strong>Key Insight:</strong> The abstract class defines a contract and provides common code. The concrete class completes the contract and can be instantiated.</p>
          </div>
        </section>

        {/* 5. When to Use Which */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">📐 Use Abstract Class When...</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>You want to provide a <strong>common base</strong> with shared code and state.</li>
              <li>You need to enforce that subclasses implement certain methods.</li>
              <li>You have a clear "is-a" hierarchy with natural parent-child relationships.</li>
              <li>You want to define a <strong>template method</strong> algorithm.</li>
              <li>You need non-final instance variables (state) shared across subclasses.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">🏗️ Use Concrete Class When...</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>The class is <strong>complete</strong> and ready to be instantiated.</li>
              <li>You don't need to force subclasses to implement anything.</li>
              <li>You want to create utility classes (like Math, Collections).</li>
              <li>The class represents a <strong>leaf node</strong> in an inheritance hierarchy.</li>
              <li>You want to mark the class as <code>final</code> to prevent extension.</li>
            </ul>
          </div>
        </div>

        {/* 6. Professional Tips & Common Mistakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">💎 Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>Start with a concrete class, then <strong>refactor to abstract</strong> when you see duplication across subclasses.</li>
              <li>Use abstract classes for <strong>framework hooks</strong> (methods that subclasses must implement).</li>
              <li>Concrete classes can be <strong>final</strong> to prevent misuse through inheritance.</li>
              <li>Prefer <strong>interfaces</strong> for pure contracts; abstract classes for code reuse.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Making a class abstract unnecessarily</strong> — if it can be concrete, make it concrete.</li>
              <li><strong>Leaving abstract methods unimplemented</strong> in a concrete subclass → compiler error.</li>
              <li><strong>Trying to instantiate an abstract class</strong> → "Cannot instantiate the type".</li>
              <li><strong>Overusing abstract classes</strong> when composition or interfaces would be simpler.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">✅ Best Practices</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Keep abstract classes <strong>small and focused</strong> — one clear responsibility.</li>
              <li>Document why a class is abstract and what subclasses must implement.</li>
              <li>Prefer <strong>concrete classes</strong> by default; only make classes abstract when needed.</li>
              <li>Use meaningful class names that reflect the abstraction level.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">📋 Mini Checklist</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>✔️ Does the class need to be instantiated? → Concrete.</li>
              <li>✔️ Does it have abstract methods? → Must be abstract.</li>
              <li>✔️ Should it serve only as a base class? → Consider abstract.</li>
              <li>✔️ Is it a leaf in the hierarchy? → Probably concrete.</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-5 border-l-8 border-indigo-400 animate-fadeSlideUp">
          <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">🧠 Think about...</h3>
          <p className="italic text-gray-700 dark:text-gray-300 mt-1">If a class has no abstract methods but is marked abstract, can you instantiate it? No — the abstract keyword alone prevents instantiation. When would you do that? (Hint: when you want a class to be only a base class, even if fully implemented.)</p>
          <p className="text-sm text-gray-500 mt-2">Try converting an abstract class to concrete by removing the abstract keyword. What changes? Now try to instantiate it.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeSlideUp">
          <FAQTemplate
            title="Abstract Class vs Concrete Class - FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp mt-8">
          <Teacher
            note="Students often struggle with when to make a class abstract. A simple rule: if you find yourself saying 'I don't want anyone to instantiate this class directly,' make it abstract. Use real examples: Vehicle (abstract), Car (concrete). Have students practice by taking a concrete class hierarchy and identifying which classes should be abstract. Emphasize that abstract classes are a design choice, not a technical necessity."
          />
        </div>
      </div>
    </div>
  );
};

export default Topic4;