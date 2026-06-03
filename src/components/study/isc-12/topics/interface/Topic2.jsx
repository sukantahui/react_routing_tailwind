// Topic2.jsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Java files
import movableInterface from './topic2_files/Movable.java?raw';
import drawableInterface from './topic2_files/Drawable.java?raw';
import shapeClass from './topic2_files/Shape.java?raw';
import multipleDemo from './topic2_files/MultipleInheritanceDemo.java?raw';

// FAQ questions (30 items)
import questions from './topic2_files/topic2_questions.js';

const Topic2 = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
          Multiple Inheritance Using Interfaces
        </h1>
        <p className="text-xl mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          Java doesn't support multiple inheritance of classes, but it <strong>fully supports multiple inheritance of type</strong> through interfaces – a powerful way to combine behaviors.
        </p>
      </section>

      {/* Conceptual Explanation */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.2s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🧬 Multiple Inheritance of Type</h2>
        <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            Multiple inheritance is the ability to inherit from more than one parent. Java avoids the "diamond problem" of C++ by allowing a class to extend only <strong>one</strong> superclass, but it can <strong>implement many interfaces</strong>.
          </p>
          <p>
            This gives the benefits of multiple inheritance (combining unrelated behaviors) without the complexity of state inheritance conflicts.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border-l-4 border-green-500 my-6">
            <p className="font-semibold">🎯 Real‑world example:</p>
            <p>
              Consider a <strong>Drone</strong> in a delivery system. It needs to be <code>Flyable</code> (from aircraft domain) and <code>Trackable</code> (from logistics domain). 
              Java allows <code>Drone</code> to implement both interfaces, combining capabilities from completely different domains.
            </p>
          </div>
        </div>

        {/* SVG illustrating multiple interface implementation */}
        <div className="my-10 flex justify-center">
          <svg width="500" height="280" viewBox="0 0 500 280" className="max-w-full h-auto hover:scale-[1.02] transition-transform duration-300">
            {/* Movable Interface */}
            <rect x="20" y="20" width="130" height="70" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2" />
            <text x="85" y="45" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">«interface»</text>
            <text x="85" y="65" textAnchor="middle" fill="#1F2937" fontSize="13">Movable</text>
            <text x="85" y="82" textAnchor="middle" fill="#4B5563" fontSize="10">+ move()</text>

            {/* Drawable Interface */}
            <rect x="340" y="20" width="130" height="70" rx="8" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2" />
            <text x="405" y="45" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">«interface»</text>
            <text x="405" y="65" textAnchor="middle" fill="#1F2937" fontSize="13">Drawable</text>
            <text x="405" y="82" textAnchor="middle" fill="#4B5563" fontSize="10">+ draw()</text>

            {/* Dashed arrows from both to the class */}
            <line x1="150" y1="55" x2="190" y2="100" stroke="#10B981" strokeWidth="2" strokeDasharray="6,4" />
            <polygon points="188,95 195,105 182,105" fill="#10B981" />
            <line x1="340" y1="55" x2="300" y2="100" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6,4" />
            <polygon points="302,95 295,105 308,105" fill="#F59E0B" />

            {/* Class Shape */}
            <rect x="175" y="110" width="140" height="80" rx="8" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2" />
            <text x="245" y="140" textAnchor="middle" fill="#8B5CF6" fontSize="13">Shape</text>
            <line x1="190" y1="150" x2="300" y2="150" stroke="#8B5CF6" strokeWidth="1.5" />
            <text x="245" y="168" textAnchor="middle" fill="#1F2937" fontSize="11">+ move()</text>
            <text x="245" y="182" textAnchor="middle" fill="#1F2937" fontSize="11">+ draw()</text>

            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </svg>
        </div>
      </section>

      {/* Syntax and Rules */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">📜 Syntax & Rules</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-6">
          <pre>{`class ClassName extends ParentClass implements Interface1, Interface2, ... {
    // Must implement all abstract methods from all interfaces
    // Can also add its own methods and fields
}`}</pre>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Order:</strong> <code>extends</code> must come before <code>implements</code>.</li>
          <li><strong>No limit:</strong> A class can implement any number of interfaces.</li>
          <li><strong>Inheritance of defaults:</strong> If two interfaces provide conflicting default methods, the class must override.</li>
          <li><strong>Type compatibility:</strong> An object can be referred to by any of its implemented interface types.</li>
        </ul>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-semibold">📌 Prototype / Signature</p>
          <p><code>public class MyClass implements InterfaceA, InterfaceB {`{ ... }`}</code></p>
          <p className="mt-2"><strong>Purpose:</strong> To combine multiple, possibly unrelated behaviors into a single class.</p>
          <p><strong>When to use:</strong> When a class needs to fulfill multiple contracts (e.g., a `Student` that is both `Comparable` and `Serializable`).</p>
        </div>
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
            <h3 className="text-xl font-bold mb-2">1. Movable Interface</h3>
            <JavaFileLoader fileModule={movableInterface} title="Movable.java" highlightLines={[]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">2. Drawable Interface</h3>
            <JavaFileLoader fileModule={drawableInterface} title="Drawable.java" highlightLines={[]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">3. Shape Class Implementing Both</h3>
            <JavaFileLoader fileModule={shapeClass} title="Shape.java" highlightLines={[5,6,7,8,9,10,11,12,13,14,15]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">4. Demonstration of Polymorphism</h3>
            <JavaFileLoader fileModule={multipleDemo} title="MultipleInheritanceDemo.java" highlightLines={[]} />
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
              <li>Use interfaces to define <strong>roles</strong> (e.g., `Runnable`, `Comparable`).</li>
              <li>Combine small, focused interfaces rather than one large interface (ISP).</li>
              <li>When a class implements many interfaces, consider splitting responsibilities.</li>
              <li>Use default methods carefully – they can cause conflicts.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Assuming multiple inheritance of state – interfaces only give behavior contracts.</li>
              <li>Forgetting that a class must implement <strong>all</strong> methods from all interfaces.</li>
              <li>Conflicting default methods – not overriding leads to compiler error.</li>
              <li>Using `implements` instead of `extends` for interface-to-interface inheritance.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300">✅ Mini Checklist</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>✓ Each interface defines a clear capability.</li>
            <li>✓ The implementing class provides concrete implementations for all abstract methods.</li>
            <li>✓ No default method conflicts exist – overridden if necessary.</li>
            <li>✓ Polymorphic usage: variable type = interface, actual object = implementing class.</li>
            <li>✓ `extends` (if any) comes before `implements`.</li>
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
          <p>🔍 <strong>Observe carefully:</strong> In `Shape.java`, how does the class satisfy both `Movable` and `Drawable`? Can a single method serve both interfaces if they have the same signature?</p>
          <p className="mt-2">🔧 <strong>Try changing this:</strong> Add a default method `void move()` to `Drawable` with a body. What happens? How do you resolve the conflict?</p>
          <p className="mt-2">📐 <strong>Design thought:</strong> In a game, a `Player` might need to be `Attackable`, `Healable`, and `Movable`. Would you combine all into one interface or keep them separate? Why?</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.7s' }}
      >
        <FAQTemplate title="Multiple Inheritance with Interfaces – FAQs" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.8s' }}
      >
        <Teacher
          note={
            "This is where Java's design shines. Emphasise that multiple inheritance of type (interfaces) is safe because there's no state conflict. " +
            "Show students the diamond problem in C++ and contrast with Java's solution. " +
            "Use a real scenario: `Student` implements `Comparable<Student>` and `Serializable`. " +
            "Make them write a class that implements three different interfaces and use it polymorphically. " +
            "Debugging tip: When a class fails to compile due to unimplemented methods, read the error message carefully – it lists missing methods."
          }
        />
      </section>
    </div>
  );
};

export default Topic2;