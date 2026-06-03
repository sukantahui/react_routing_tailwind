// Topic1.jsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Java files
import vehicleInterface from './topic1_files/VehicleInterface.java?raw';
import carImplementation from './topic1_files/Car.java?raw';
import multipleDemo from './topic1_files/MultipleInterfacesDemo.java?raw';

// FAQ questions (30 items)
import questions from './topic1_files/topic1_questions.js';

const Topic1 = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Defining & Implementing Interfaces
        </h1>
        <p className="text-xl mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          Learn how to <strong>declare an interface</strong> and <strong>implement it in a class</strong> – the foundation of abstraction and polymorphism in Java.
        </p>
      </section>

      {/* Definition Syntax */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.2s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">📜 Defining an Interface</h2>
        <div className="space-y-4 leading-relaxed text-gray-700 dark:text-gray-300">
          <p>
            An interface is defined using the <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">interface</code> keyword. 
            It can contain <strong>abstract methods</strong> (no body), <strong>default/static methods</strong> (Java 8+), and <strong>constants</strong>.
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`// Basic interface definition
[public] interface InterfaceName {
    // constants (implicitly public static final)
    int MAX_SPEED = 120;

    // abstract methods (implicitly public abstract)
    void accelerate();
    void brake();
}`}</pre>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl border-l-4 border-purple-500 my-6">
            <p className="font-semibold">🎯 Real‑world example:</p>
            <p>
              In a school system, an interface <code>Gradable</code> can define <code>calculateGrade()</code>. 
              Both <code>StudentExam</code> and <code>ProjectSubmission</code> implement it differently.
            </p>
          </div>
        </div>

        {/* SVG illustrating interface definition structure */}
        <div className="my-10 flex justify-center">
          <svg width="450" height="200" viewBox="0 0 450 200" className="max-w-full h-auto hover:scale-[1.02] transition-transform duration-300">
            <rect x="20" y="20" width="410" height="160" rx="10" fill="#9333EA" fillOpacity="0.1" stroke="#9333EA" strokeWidth="2" />
            <text x="225" y="50" textAnchor="middle" fill="#9333EA" fontSize="16" fontWeight="bold">public interface Vehicle</text>
            <line x1="40" y1="65" x2="410" y2="65" stroke="#9333EA" strokeWidth="1.5" />
            <text x="40" y="90" fill="#4B5563" fontSize="13">// constant</text>
            <text x="40" y="110" fill="#1F2937" fontSize="13">int MAX_SPEED = 180;</text>
            <text x="40" y="135" fill="#4B5563" fontSize="13">// abstract methods</text>
            <text x="40" y="155" fill="#1F2937" fontSize="13">void startEngine();</text>
            <text x="40" y="172" fill="#1F2937" fontSize="13">void stopEngine();</text>
          </svg>
        </div>
      </section>

      {/* Implementing an Interface */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">⚙️ Implementing an Interface</h2>
        <p className="mb-4">
          A class uses the <code className="bg-gray-200 dark:bg-gray-800 px-1 rounded">implements</code> keyword to implement one or more interfaces. 
          It must provide concrete implementations for <strong>all abstract methods</strong> (unless the class is abstract).
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto mb-6">
          <pre>{`class ClassName implements Interface1, Interface2 {
    // Implement all abstract methods from Interface1 and Interface2
    @Override
    public void methodFromInterface1() { ... }

    @Override
    public void methodFromInterface2() { ... }
}`}</pre>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-3">📝 Method Signature & Return Type</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Signature:</strong> The implementing method must have the exact same name, parameter list, and return type (or a covariant return type).</li>
          <li><strong>Return type:</strong> Must match the interface method's return type or a subclass (covariant).</li>
          <li><strong>Purpose:</strong> To fulfill the contract defined by the interface.</li>
          <li><strong>When & why:</strong> Whenever you want a class to promise certain behaviors (e.g., <code>Comparable</code> for sorting).</li>
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
            <h3 className="text-xl font-bold mb-2">1. Interface Definition (Vehicle)</h3>
            <JavaFileLoader fileModule={vehicleInterface} title="VehicleInterface.java" highlightLines={[]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">2. Implementing Class (Car)</h3>
            <JavaFileLoader fileModule={carImplementation} title="Car.java" highlightLines={[5,6,7,8,9,10,11,12,13,14]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-2">3. Multiple Interfaces & Polymorphism</h3>
            <JavaFileLoader fileModule={multipleDemo} title="MultipleInterfacesDemo.java" highlightLines={[]} />
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
              <li>Use <code>@Override</code> annotation – helps catch mistakes at compile time.</li>
              <li>Name interfaces as adjectives: <code>Runnable</code>, <code>Serializable</code>, <code>Comparable</code>.</li>
              <li>Keep interfaces focused – follow Interface Segregation Principle.</li>
              <li>Prefer interfaces over abstract classes for defining capabilities.</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-red-700 dark:text-red-300">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Forgetting to implement <strong>all</strong> abstract methods → compiler error.</li>
              <li>Using weaker access modifier (e.g., <code>protected</code> instead of <code>public</code>).</li>
              <li>Implementing an interface but not using it polymorphically.</li>
              <li>Confusing <code>extends</code> (class/interface) with <code>implements</code> (class to interface).</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300">✅ Mini Checklist</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>✓ Interface name is clear and capability‑focused.</li>
            <li>✓ All abstract methods are implemented in the class.</li>
            <li>✓ <code>@Override</code> annotation is used.</li>
            <li>✓ Access modifiers are <code>public</code> for implementing methods.</li>
            <li>✓ Interface type is used for variables/parameters where possible.</li>
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
          <p>🔍 <strong>Observe carefully:</strong> In <code>Car.java</code>, what happens if you remove the <code>@Override</code> annotation? Does the code still compile?</p>
          <p className="mt-2">🔧 <strong>Try changing this:</strong> Change the return type of <code>getFuelLevel()</code> in the class to <code>int</code> instead of <code>double</code>. What error do you get?</p>
          <p className="mt-2">📐 <strong>Design thought:</strong> Why would a library like Java Collections define <code>List</code> as an interface rather than a class?</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.7s' }}
      >
        <FAQTemplate title="Defining & Implementing Interfaces – FAQs" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.8s' }}
      >
        <Teacher
          note={
            "When teaching 'defining and implementing interfaces', emphasise the contract metaphor. " +
            "Use live coding: write an interface and then a class that implements it, deliberately missing a method to show the compiler error. " +
            "Encourage students to always use `@Override` – it's a lifesaver. " +
            "Show them real-world JDK interfaces like `Comparable` and how classes like `String` and `Integer` implement it. " +
            "A common confusion: interfaces are not classes, so they cannot be instantiated with `new`. Clarify that with an example of anonymous class if needed."
          }
        />
      </section>
    </div>
  );
};

export default Topic1;