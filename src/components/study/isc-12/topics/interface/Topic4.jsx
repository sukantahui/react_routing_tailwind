// Topic4.jsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Java files
import vehicleAbstract from './topic4_files/VehicleAbstract.java?raw';
import vehicleInterface from './topic4_files/VehicleInterface.java?raw';
import carAbstractImpl from './topic4_files/CarAbstractImpl.java?raw';
import carInterfaceImpl from './topic4_files/CarInterfaceImpl.java?raw';
import comparisonDemo from './topic4_files/ComparisonDemo.java?raw';

// FAQ questions (30 items)
import questions from './topic4_files/topic4_questions.js';

const Topic4 = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <style>{`
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        .section-visible {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-12 md:py-16"
        style={{ animationDelay: '0.1s' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
          Interface vs Abstract Class
        </h1>
        <p className="text-xl mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          Both are used for abstraction, but <strong>when to use which</strong> is a critical design decision. Understand the key differences, strengths, and trade‑offs.
        </p>
      </section>

      {/* Conceptual Explanation */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.2s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🎭 Abstraction: Two Powerful Tools</h2>
        <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            Both <strong>abstract classes</strong> and <strong>interfaces</strong> allow you to define abstract methods that subclasses must implement. 
            However, they serve different purposes and have distinct characteristics.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-l-4 border-blue-500 my-6">
            <p className="font-semibold">🎯 Real‑world analogy:</p>
            <p>
              Think of an <strong>abstract class</strong> as a <strong>blueprint for a family</strong> – it provides common structure and state (e.g., "Vehicle" has fuel level, engine). 
              An <strong>interface</strong> is like a <strong>contract for a role</strong> – it defines capabilities (e.g., "Flyable", "Runnable") without any internal state.
            </p>
          </div>
        </div>

        {/* SVG Comparison Diagram */}
        <div className="my-10 flex justify-center">
          <svg width="550" height="280" viewBox="0 0 550 280" className="max-w-full h-auto hover:scale-[1.02] transition-transform duration-300">
            {/* Abstract Class box */}
            <rect x="20" y="20" width="240" height="240" rx="10" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="2" />
            <text x="140" y="50" textAnchor="middle" fill="#3B82F6" fontSize="15" fontWeight="bold">Abstract Class</text>
            <line x1="35" y1="60" x2="245" y2="60" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="35" y="85" fill="#1F2937" fontSize="12">✔ Can have instance variables</text>
            <text x="35" y="105" fill="#1F2937" fontSize="12">✔ Can have constructors</text>
            <text x="35" y="125" fill="#1F2937" fontSize="12">✔ Can have concrete methods</text>
            <text x="35" y="145" fill="#1F2937" fontSize="12">✔ Can have abstract methods</text>
            <text x="35" y="165" fill="#1F2937" fontSize="12">✔ Can have final / static</text>
            <text x="35" y="185" fill="#1F2937" fontSize="12">✔ Single inheritance only</text>
            <text x="35" y="205" fill="#1F2937" fontSize="12">✔ Access modifiers (protected)</text>
            <text x="35" y="225" fill="#1F2937" fontSize="12">✔ Represents "is-a" relationship</text>

            {/* Interface box */}
            <rect x="290" y="20" width="240" height="240" rx="10" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" />
            <text x="410" y="50" textAnchor="middle" fill="#10B981" fontSize="15" fontWeight="bold">Interface</text>
            <line x1="305" y1="60" x2="515" y2="60" stroke="#10B981" strokeWidth="1.5" />
            <text x="305" y="85" fill="#1F2937" fontSize="12">✔ Only public static final fields</text>
            <text x="305" y="105" fill="#1F2937" fontSize="12">✘ No constructors</text>
            <text x="305" y="125" fill="#1F2937" fontSize="12">✔ Abstract + default + static methods</text>
            <text x="305" y="145" fill="#1F2937" fontSize="12">✔ All methods public by default</text>
            <text x="305" y="165" fill="#1F2937" fontSize="12">✔ Multiple inheritance of type</text>
            <text x="305" y="185" fill="#1F2937" fontSize="12">✔ No instance fields</text>
            <text x="305" y="205" fill="#1F2937" fontSize="12">✔ Represents "can-do" relationship</text>
            <text x="305" y="225" fill="#1F2937" fontSize="12">✔ Default methods (Java 8+)</text>

            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </svg>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">📊 Detailed Comparison</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Feature</th>
                <th className="px-4 py-3 text-left">Abstract Class</th>
                <th className="px-4 py-3 text-left">Interface</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr><td className="px-4 py-2">Keyword</td><td className="px-4 py-2"><code>abstract class</code></td><td className="px-4 py-2"><code>interface</code></td></tr>
              <tr><td className="px-4 py-2">Multiple inheritance</td><td className="px-4 py-2">No (single inheritance)</td><td className="px-4 py-2">Yes (multiple inheritance of type)</td></tr>
              <tr><td className="px-4 py-2">Instance variables</td><td className="px-4 py-2">Yes</td><td className="px-4 py-2">No (only public static final)</td></tr>
              <tr><td className="px-4 py-2">Constructors</td><td className="px-4 py-2">Yes</td><td className="px-4 py-2">No</td></tr>
              <tr><td className="px-4 py-2">Access modifiers</td><td className="px-4 py-2">All (private, protected, public)</td><td className="px-4 py-2">public (default methods can be private from Java 9)</td></tr>
              <tr><td className="px-4 py-2">Method implementation</td><td className="px-4 py-2">Can have concrete methods</td><td className="px-4 py-2">Abstract (until Java 8: default/static)</td></tr>
              <tr><td className="px-4 py-2">When to use</td><td className="px-4 py-2">Share code among closely related classes</td><td className="px-4 py-2">Define capability for unrelated classes</td></tr>
              <tr><td className="px-4 py-2">Evolution</td><td className="px-4 py-2">Easy to add new methods (but breaks subclasses)</td><td className="px-4 py-2">Default methods allow backward compatible evolution</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Code Examples */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.4s' }}
      >
        <h2 className="text-3xl font-semibold mb-6">💻 Code Examples – Same Problem, Two Solutions</h2>
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">1. Abstract Class Definition (Vehicle)</h3>
            <JavaFileLoader fileModule={vehicleAbstract} title="VehicleAbstract.java" highlightLines={[5,6,7,8,9,10,11]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">2. Interface Definition (Vehicle)</h3>
            <JavaFileLoader fileModule={vehicleInterface} title="VehicleInterface.java" highlightLines={[5,6,7,8,9]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">3. Using Abstract Class (Car)</h3>
            <JavaFileLoader fileModule={carAbstractImpl} title="CarAbstractImpl.java" highlightLines={[5,6,7,8,9,10,11,12,13]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">4. Using Interface (Car)</h3>
            <JavaFileLoader fileModule={carInterfaceImpl} title="CarInterfaceImpl.java" highlightLines={[5,6,7,8,9,10]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">5. Demonstration of Differences</h3>
            <JavaFileLoader fileModule={comparisonDemo} title="ComparisonDemo.java" highlightLines={[]} />
          </div>
        </div>
      </section>

      {/* Tips, Pitfalls, Best Practices */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.5s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">✨ Pro Tips & Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-300">💡 Tips & Tricks</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Prefer interfaces</strong> for defining capabilities (e.g., `Runnable`, `Comparable`).</li>
              <li>Use abstract classes when you need to share <strong>state</strong> (fields) or <strong>common code</strong> among closely related classes.</li>
              <li>From Java 8, interfaces with default methods can partially replace abstract classes.</li>
              <li>Remember: a class can extend only one abstract class but implement many interfaces.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Using an abstract class when an interface would suffice (tight coupling).</li>
              <li>Forgetting that abstract classes can have constructors – they are called via `super()`.</li>
              <li>Assuming default methods in interfaces can access instance variables – they cannot.</li>
              <li>Misunderstanding that `abstract` class can be instantiated – no, only concrete subclasses.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300">✅ Mini Checklist</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>✓ Need state or constructor? → Abstract class.</li>
            <li>✓ Need multiple inheritance of behavior? → Interface.</li>
            <li>✓ Adding methods later without breaking clients? → Interface with default methods.</li>
            <li>✓ Group of unrelated classes should share a capability? → Interface.</li>
            <li>✓ Template method pattern? → Abstract class.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.6s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🤔 Think About…</h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl italic border-l-8 border-indigo-400">
          <p>🔍 <strong>Observe carefully:</strong> In `CarAbstractImpl`, we use `super()` to call the abstract class constructor. Can an interface have a constructor?</p>
          <p className="mt-2">🔧 <strong>Try changing this:</strong> Convert `VehicleAbstract` to an interface with a default method `getFuelLevel()` returning 0. What's lost?</p>
          <p className="mt-2">📐 <strong>Design thought:</strong> You are designing a plugin system. Should plugin authors extend an abstract class or implement an interface? Why?</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.7s' }}
      >
        <FAQTemplate title="Interface vs Abstract Class – FAQs" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.8s' }}
      >
        <Teacher
          note={
            "This is a classic interview question and a design decision students will face daily. " +
            "I like to use the 'is-a vs can-do' heuristic: abstract class = 'is-a' (a Car is a Vehicle), interface = 'can-do' (a Car can be Drivable, Parkable). " +
            "Show them real examples: `ArrayList extends AbstractList` (abstract class) and implements `List`, `RandomAccess`, `Cloneable` (interfaces). " +
            "Emphasise that from Java 8, the line blurs – but state remains the key differentiator. " +
            "Common mistake: using abstract class because 'I might need to add methods later' – but default methods solve that for interfaces."
          }
        />
      </section>
    </div>
  );
};

export default Topic4;