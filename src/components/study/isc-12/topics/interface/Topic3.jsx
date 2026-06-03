// Topic3.jsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Java files
import vehicleDefault from './topic3_files/VehicleWithDefault.java?raw';
import carDefaultImpl from './topic3_files/CarDefaultImpl.java?raw';
import staticMethodDemo from './topic3_files/StaticMethodDemo.java?raw';
import conflictResolution from './topic3_files/ConflictResolution.java?raw';

// FAQ questions (30 items)
import questions from './topic3_files/topic3_questions.js';

const Topic3 = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
          Default & Static Methods in Interfaces
        </h1>
        <p className="text-xl mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          Java 8 revolutionized interfaces by allowing <strong>default</strong> and <strong>static</strong> methods – enabling backward compatibility and utility functions without breaking existing code.
        </p>
      </section>

      {/* Conceptual Explanation */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.2s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🚀 Evolution of Interfaces (Pre‑Java 8 vs Java 8+)</h2>
        <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            Before Java 8, interfaces were purely abstract – they could only have <code>public abstract</code> methods and <code>public static final</code> constants. 
            Adding a new method to an interface would break all existing implementations.
          </p>
          <p>
            Java 8 introduced <strong>default methods</strong> (with a body, using the <code>default</code> keyword) and <strong>static methods</strong> (belonging to the interface itself). 
            This allows API designers to evolve interfaces without breaking client code – a game changer for the Java Collections Framework (e.g., <code>Collection.stream()</code>).
          </p>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-xl border-l-4 border-orange-500 my-6">
            <p className="font-semibold">🎯 Real‑world example:</p>
            <p>
              The <code>List</code> interface gained a <code>sort()</code> default method in Java 8. 
              Millions of existing <code>ArrayList</code>, <code>LinkedList</code> etc. automatically got this functionality without any code changes.
            </p>
          </div>
        </div>

        {/* SVG illustrating default method evolution */}
        <div className="my-10 flex justify-center">
          <svg width="500" height="220" viewBox="0 0 500 220" className="max-w-full h-auto hover:scale-[1.02] transition-transform duration-300">
            <rect x="20" y="20" width="180" height="100" rx="8" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="2" />
            <text x="110" y="45" textAnchor="middle" fill="#F97316" fontSize="13" fontWeight="bold">«interface»</text>
            <text x="110" y="65" textAnchor="middle" fill="#1F2937" fontSize="13">Vehicle</text>
            <line x1="30" y1="75" x2="190" y2="75" stroke="#F97316" strokeWidth="1.5" />
            <text x="110" y="95" textAnchor="middle" fill="#4B5563" fontSize="11">+ start()</text>
            <text x="110" y="112" textAnchor="middle" fill="#4B5563" fontSize="11">+ stop()</text>

            {/* New default method */}
            <rect x="250" y="20" width="220" height="100" rx="8" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" strokeDasharray="5,5" />
            <text x="360" y="45" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold">Java 8+</text>
            <text x="360" y="65" textAnchor="middle" fill="#1F2937" fontSize="13">Vehicle (enhanced)</text>
            <line x1="260" y1="75" x2="460" y2="75" stroke="#10B981" strokeWidth="1.5" />
            <text x="360" y="95" textAnchor="middle" fill="#4B5563" fontSize="11">+ default honk()</text>
            <text x="360" y="112" textAnchor="middle" fill="#4B5563" fontSize="11">+ static getMaxSpeed()</text>

            <animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" />
          </svg>
        </div>
      </section>

      {/* Default Methods */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">📌 Default Methods</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-6">
          <pre>{`default ReturnType methodName(parameters) {
    // method body
}`}</pre>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Signature:</strong> uses <code>default</code> keyword, has a body.</li>
          <li><strong>Purpose:</strong> Add new methods to interfaces without breaking existing implementations.</li>
          <li><strong>Inheritance:</strong> Implementing classes can override default methods (or inherit them).</li>
          <li><strong>Conflict:</strong> If a class implements two interfaces with conflicting default methods, the class must override.</li>
        </ul>

        <h3 className="text-2xl font-semibold mt-8 mb-3">⚡ Static Methods in Interfaces</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-6">
          <pre>{`static ReturnType methodName(parameters) {
    // method body
}`}</pre>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Signature:</strong> uses <code>static</code> keyword, has a body.</li>
          <li><strong>Purpose:</strong> Provide utility methods relevant to the interface (e.g., <code>Comparator.naturalOrder()</code>).</li>
          <li><strong>Calling:</strong> Only via the interface name: <code>InterfaceName.staticMethod()</code>.</li>
          <li><strong>Not inherited:</strong> Implementing classes do not inherit static methods (cannot override).</li>
        </ul>
      </section>

      {/* Code Examples */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.4s' }}
      >
        <h2 className="text-3xl font-semibold mb-6">💻 Code Examples</h2>
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">1. Interface with Default & Static Methods</h3>
            <JavaFileLoader fileModule={vehicleDefault} title="VehicleWithDefault.java" highlightLines={[8,9,10,11,12,13,14,15,16]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">2. Class Implementing the Interface</h3>
            <JavaFileLoader fileModule={carDefaultImpl} title="CarDefaultImpl.java" highlightLines={[5,6,7,8,9,10]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">3. Using Static Methods</h3>
            <JavaFileLoader fileModule={staticMethodDemo} title="StaticMethodDemo.java" highlightLines={[]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">4. Resolving Default Method Conflicts</h3>
            <JavaFileLoader fileModule={conflictResolution} title="ConflictResolution.java" highlightLines={[15,16,17,18,19,20]} />
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
              <li>Use default methods sparingly – they can make code harder to follow.</li>
              <li>Default methods are great for <strong>evolution</strong> (adding methods to existing interfaces).</li>
              <li>Static methods in interfaces are ideal for <strong>factory methods</strong> or <strong>utility helpers</strong>.</li>
              <li>When overriding a default method, you can call the original using <code>InterfaceName.super.method()</code>.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Forgetting that default methods are not <code>abstract</code> – they can be overridden.</li>
              <li>Assuming static methods are inherited – they are not.</li>
              <li>Creating default methods that depend on state not guaranteed to exist (only use other interface methods).</li>
              <li>Overusing default methods leading to "multiple inheritance of behavior" confusion.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300">✅ Mini Checklist</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>✓ Default methods are used for backward compatibility, not as a primary design tool.</li>
            <li>✓ Static methods are called via interface name, not on instances.</li>
            <li>✓ Conflicting default methods are resolved by overriding in the class.</li>
            <li>✓ Avoid default methods that mutate state unless the interface provides setters.</li>
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
          <p>🔍 <strong>Observe carefully:</strong> In `VehicleWithDefault.java`, the default method `honk()` uses `System.out.println`. Could it instead call another abstract method? Try modifying it.</p>
          <p className="mt-2">🔧 <strong>Try changing this:</strong> In `CarDefaultImpl.java`, override the `honk()` method. Then call it from `main`. What happens?</p>
          <p className="mt-2">📐 <strong>Design thought:</strong> If you were designing a new interface today, would you prefer default methods or abstract classes for providing common behavior? Why?</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.7s' }}
      >
        <FAQTemplate title="Default & Static Methods – FAQs" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.8s' }}
      >
        <Teacher
          note={
            "This topic often surprises students because they've learned that interfaces cannot have method bodies. Emphasise the *why*: API evolution. " +
            "Show them the Java Collections Framework before and after Java 8 (e.g., `List` gained `sort`, `replaceAll`). " +
            "A common exam question: 'What is the difference between default and static methods in interfaces?' – have them memorise that static methods are not inherited. " +
            "Live demo: Create an interface with a default method, implement it, then later add another default method – no compilation errors in existing code. Magic!"
          }
        />
      </section>
    </div>
  );
};

export default Topic3;