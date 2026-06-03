// Topic0.jsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

// Common components
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from '../../../../../common/FAQTemplate';

// Java files (raw import)
import simpleInterface from './topic0_files/SimpleInterface.java?raw';
import implementingClass from './topic0_files/ImplementingClass.java?raw';
import usageDemo from './topic0_files/InterfaceUsageDemo.java?raw';

// FAQ questions (30 items)
import questions from './topic0_files/topic0_questions.js';

const Topic0 = () => {
  // Optional: scroll reveal using Intersection Observer (no external libs)
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
      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        .section-visible {
          animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
        }
        /* Default hidden only for initial animation, never stays opacity-0 */
        .section-animate {
          opacity: 0;
        }
        .section-visible {
          opacity: 1;
        }
      `}</style>

      {/* Hero Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-12 md:py-16"
        style={{ animationDelay: '0.1s' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Concept of Interface
        </h1>
        <p className="text-xl mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          An <strong className="text-blue-600 dark:text-blue-400">interface</strong> in Java is a blueprint of a class that defines a contract. It declares what a class must do, but not how it does it.
        </p>
      </section>

      {/* Detailed Explanation */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.2s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">📘 What is an Interface?</h2>
        <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            An interface is a <strong>completely abstract type</strong> that is used to specify a behavior that classes must implement. 
            It is a contract – if a class implements an interface, it promises to provide concrete implementations for all the abstract methods declared in that interface.
          </p>
          <p>
            Before Java 8, interfaces could only contain <code>public abstract</code> methods and <code>public static final</code> variables. 
            From Java 8 onward, interfaces can also have <strong>default</strong> and <strong>static</strong> methods, allowing partial implementation.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border-l-4 border-blue-500 my-6">
            <p className="font-semibold">🎯 Real‑world analogy:</p>
            <p>
              Think of an interface like a <strong>remote control</strong> – it defines buttons (methods) that you can press, but the actual working (implementation) is inside the TV, AC, or DVD player. 
              Different devices can implement the same remote control interface in their own unique way.
            </p>
          </div>
        </div>

        {/* SVG illustrating interface as a contract */}
        <div className="my-10 flex justify-center">
          <svg width="400" height="220" viewBox="0 0 400 220" className="max-w-full h-auto hover:scale-[1.02] transition-transform duration-300">
            <rect x="20" y="20" width="160" height="80" rx="8" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="2" />
            <text x="100" y="55" textAnchor="middle" fill="#3B82F6" fontSize="14" fontWeight="bold">«interface»</text>
            <text x="100" y="75" textAnchor="middle" fill="#1F2937" fontSize="13">Vehicle</text>
            <line x1="30" y1="90" x2="170" y2="90" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="100" y="108" textAnchor="middle" fill="#4B5563" fontSize="11">+ start()</text>
            <text x="100" y="125" textAnchor="middle" fill="#4B5563" fontSize="11">+ stop()</text>

            {/* Dashed arrow (realisation) */}
            <line x1="190" y1="60" x2="230" y2="60" stroke="#10B981" strokeWidth="2" strokeDasharray="6,4" />
            <polygon points="230,55 240,60 230,65" fill="#10B981" />

            <rect x="250" y="20" width="130" height="80" rx="8" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" />
            <text x="315" y="55" textAnchor="middle" fill="#10B981" fontSize="13">Car</text>
            <text x="315" y="75" textAnchor="middle" fill="#1F2937" fontSize="11">+ start()</text>
            <text x="315" y="92" textAnchor="middle" fill="#1F2937" fontSize="11">+ stop()</text>

            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" xlinkHref="#dashed" />
          </svg>
        </div>

        <h3 className="text-2xl font-semibold mt-8 mb-3">🔧 Interface Signature & Purpose</h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`// Interface declaration
[public] interface InterfaceName {
    // constants (public static final)
    // abstract methods (public abstract)
    // default/static methods (Java 8+)
}

// A class implements an interface
class ClassName implements InterfaceName {
    // must implement all abstract methods
}`}</pre>
        </div>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><strong>Return type:</strong> void, primitive, or reference type for methods.</li>
          <li><strong>Purpose:</strong> Achieve full abstraction, multiple inheritance (behaviour), and polymorphism.</li>
          <li><strong>When & why:</strong> Use interfaces when you want to define a capability that unrelated classes can share (e.g., Serializable, Comparable). Also used heavily in dependency injection and design patterns (Strategy, Factory).</li>
        </ul>
      </section>

      {/* Code Examples with JavaFileLoader */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="text-3xl font-semibold mb-6">💻 Code Examples</h2>

        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">1. Simple Interface Declaration</h3>
            <JavaFileLoader fileModule={simpleInterface} title="SimpleInterface.java" highlightLines={[]} />
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">2. Implementing an Interface</h3>
            <JavaFileLoader fileModule={implementingClass} title="ImplementingClass.java" highlightLines={[5,6,7,8]} />
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">3. Using the Interface Polymorphically</h3>
            <JavaFileLoader fileModule={usageDemo} title="InterfaceUsageDemo.java" highlightLines={[]} />
          </div>
        </div>
      </section>

      {/* Tips & Tricks, Common Pitfalls, Best Practices */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.4s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">✨ Pro Tips & Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-300">💡 Tips & Tricks</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Name interfaces after capabilities: <code>Runnable</code>, <code>Comparable</code>, <code>Serializable</code>.</li>
              <li>Use <code>@FunctionalInterface</code> annotation for single‑abstract‑method interfaces (lambdas).</li>
              <li>Prefer interfaces over abstract classes for defining types.</li>
              <li>Keep interfaces small and focused – Interface Segregation Principle (SOLID).</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Forgetting to implement all abstract methods → compilation error.</li>
              <li>Using <code>new</code> to instantiate an interface (cannot).</li>
              <li>Confusing default methods with abstract methods.</li>
              <li>Declaring methods as <code>private</code> in interface (not allowed before Java 9).</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300">✅ Mini Checklist</h3>
          <ul className="list-check pl-5 mt-2 space-y-1">
            <li>✓ Interface name is an adjective or capability.</li>
            <li>✓ All methods are public by default.</li>
            <li>✓ Variables are <code>public static final</code>.</li>
            <li>✓ A class implements all abstract methods.</li>
            <li>✓ Use interface reference for polymorphism.</li>
          </ul>
        </div>
      </section>

      {/* Hint Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.5s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🤔 Think About…</h2>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl italic border-l-8 border-indigo-400">
          <p>🔍 <strong>Observe carefully:</strong> If two interfaces contain a default method with the same signature, how does Java resolve the conflict?</p>
          <p className="mt-2">🔧 <strong>Try changing this:</strong> In <code>ImplementingClass.java</code>, remove one method implementation. What error does the compiler show?</p>
          <p className="mt-2">📐 <strong>Design thought:</strong> Why would a payment system use an interface <code>PaymentProcessor</code> instead of an abstract class?</p>
        </div>
      </section>

      {/* FAQ Section (30 questions) */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.6s' }}
      >
        <FAQTemplate title="Interface Concept FAQs" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.7s' }}
      >
        <Teacher
          note={
            "Interfaces are the backbone of abstraction in Java. " +
            "Encourage students to think of interfaces as 'contracts' before diving into implementation. " +
            "Show them real-world JDK interfaces like `List`, `Comparable`, and `Runnable`. " +
            "Remind them that from Java 8, interfaces can have method bodies via `default`, but that does not make them abstract classes. " +
            "A common mistake: using `abstract class` when an interface is sufficient – let's teach to prefer interfaces for defining behaviour."
          }
        />
      </section>
    </div>
  );
};

export default Topic0;