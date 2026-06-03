import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java code examples for this topic
import inheritanceExample1 from "./topic0_files/InheritanceExample1.java?raw";
import inheritanceExample2 from "./topic0_files/InheritanceExample2.java?raw";
import inheritanceExample3 from "./topic0_files/InheritanceExample3.java?raw";

import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

const Topic0 = () => {
  // State for interactive example (if needed)
  const [activeExample, setActiveExample] = useState(1);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 dark:bg-gray-900 bg-gray-50 transition-colors duration-300">

      {/* Section 1: Title & Introduction - Animated */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-4">
          Concept of Inheritance
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Inheritance is a fundamental concept in Object-Oriented Programming (OOP) that allows a class to inherit
          properties and methods from another class. It represents an <span className="font-semibold text-blue-600 dark:text-blue-400">"is-a"</span> relationship,
          promoting code reusability and establishing a natural hierarchy.
        </p>
      </div>

      {/* Section 2: Core Explanation */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]  [animation-fill-mode:forwards]">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-blue-500 text-3xl">🧬</span> What is Inheritance?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            In object-oriented programming, <strong className="text-blue-600 dark:text-blue-400">inheritance</strong> enables a new class (called the <strong>child</strong> or <strong>subclass</strong>)
            to acquire the fields and methods of an existing class (called the <strong>parent</strong> or <strong>superclass</strong>).
            The child class can also add new features or override existing ones.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Think of it like a family tree: children inherit traits from their parents but can also develop unique characteristics.
            In programming, this means you can create a general class (like <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">Vehicle</code>)
            and then create more specific classes (like <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">Car</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">Bike</code>)
            that reuse and extend the general functionality.
          </p>
        </div>
      </div>

      {/* Section 3: Real-world Analogy with SVG */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s] [animation-fill-mode:forwards]">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">🌍 Real-World Analogy</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 200 180" className="w-48 h-48 mx-auto">
                  <rect x="50" y="20" width="100" height="60" rx="8" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
                  <text x="100" y="55" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Employee</text>
                  <text x="100" y="70" textAnchor="middle" fill="white" fontSize="10">(Parent)</text>

                  {/* Arrow down */}
                  <line x1="100" y1="80" x2="100" y2="100" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrowhead)" />

                  <rect x="30" y="105" width="65" height="55" rx="6" fill="#10B981" stroke="#059669" strokeWidth="2" />
                  <text x="62" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Developer</text>
                  <text x="62" y="145" textAnchor="middle" fill="white" fontSize="9">(Child)</text>

                  <rect x="105" y="105" width="65" height="55" rx="6" fill="#10B981" stroke="#059669" strokeWidth="2" />
                  <text x="137" y="130" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Manager</text>
                  <text x="137" y="145" textAnchor="middle" fill="white" fontSize="9">(Child)</text>

                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
                    </marker>
                  </defs>
                </svg>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Inheritance Hierarchy</p>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In a school management system, a general class <strong className="text-blue-600">Employee</strong> has properties like <code>name</code>, <code>id</code>, and methods like <code>work()</code>.
                Specific employee types like <strong className="text-green-600">Developer</strong> and <strong className="text-green-600">Manager</strong> <span className="font-semibold">inherit</span> these common attributes while adding their own unique features.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  💡 <strong>Think about:</strong> How does inheritance help avoid writing duplicate code for <code>name</code> and <code>id</code> in both Developer and Manager?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Method Signature & Syntax */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]  [animation-fill-mode:forwards]">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">📝 Java Syntax for Inheritance</h2>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-200 overflow-x-auto">
            <pre className="whitespace-pre-wrap">
              {`// Parent class (Superclass)
public class Employee {
    String name;
    int id;
    
    public void work() {
        System.out.println(name + " is working");
    }
}

// Child class (Subclass) using 'extends' keyword
public class Developer extends Employee {
    String programmingLanguage;
    
    public void writeCode() {
        System.out.println(name + " is writing " + programmingLanguage + " code");
    }
}`}
            </pre>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white">🔑 Keyword: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">extends</code></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Used to declare inheritance. Java supports single inheritance (one parent only).</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white">⚙️ Return Type: N/A (class declaration)</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Purpose: Create a hierarchical relationship and enable code reuse.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Java Code Examples */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💻 Code Examples</h2>
        <div className="space-y-6">
          <JavaFileLoader
            fileModule={inheritanceExample1}
            title="BasicInheritance.java"
            highlightLines={[8, 14]}
          />
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              🔍 <strong>Observe carefully:</strong> The Developer class doesn't declare <code>name</code> or <code>id</code>, but it can access them!
              Try creating a <code>Manager</code> class that extends <code>Employee</code>.
            </p>
          </div>
        </div>
      </div>

       {/* Section 5b: Java Code Examples 2 */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💻 Code Examples 2</h2>
        <div className="space-y-6">
          <JavaFileLoader
            fileModule={inheritanceExample2}
            title="BasicInheritance.java 2"
            highlightLines={[]}
          />
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {/* 🔍 <strong>Observe carefully:</strong> The Developer class doesn't declare <code>name</code> or <code>id</code>, but it can access them!
              Try creating a <code>Manager</code> class that extends <code>Employee</code>. */}
            </p>
          </div>
        </div>
      </div>

      {/* Section 5c: Java Code Examples 2 */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]  [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💻 Code Examples 3</h2>
        <div className="space-y-6">
          <JavaFileLoader
            fileModule={inheritanceExample3}
            title="BasicInheritance.java 3"
            highlightLines={[]}
          />
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {/* 🔍 <strong>Observe carefully:</strong> The Developer class doesn't declare <code>name</code> or <code>id</code>, but it can access them!
              Try creating a <code>Manager</code> class that extends <code>Employee</code>. */}
            </p>
          </div>
        </div>
      </div>

      {/* Section 6: Tips & Tricks */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]  [animation-fill-mode:forwards]">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">💡 Pro Tips & Industry Habits</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Use inheritance for "is-a" relationships only</strong> — If a <code>Car</code> <strong>is a</strong> <code>Vehicle</code>, inheritance is appropriate. If it's "has-a" (like <code>Car</code> has an <code>Engine</code>), use composition instead.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Keep parent classes generic</strong> — The parent should contain common, reusable code. Specific behavior belongs in child classes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Think of inheritance as "specialization"</strong> — Each child class becomes a more specific version of the parent.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 7: Common Mistakes */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]  [animation-fill-mode:forwards]">
        <div className="bg-red-50 dark:bg-red-900/10 rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="text-red-500 text-2xl">⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Using inheritance when composition is better</strong> — Many beginners overuse inheritance, leading to rigid designs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Forgetting that Java doesn't support multiple inheritance</strong> — A class cannot extend more than one parent class.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span className="text-gray-700 dark:text-gray-300"><strong>Accessing private members directly</strong> — Private fields/methods are NOT inherited. Use protected or public if needed.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Section 8: Best Practices */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]  [animation-fill-mode:forwards]">
        <div className="bg-green-50 dark:bg-green-900/10 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">✅ Best Practices Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">✓ Follow the Liskov Substitution Principle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">✓ Use meaningful class names</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">✓ Document inheritance relationships</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">✓ Prefer composition over inheritance when uncertain</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 9: Mini Checklist */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s]  [animation-fill-mode:forwards]">
        <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">📋 Student Checklist</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">□ I understand what inheritance is and why it's used</li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">□ I know the syntax: <code>class Child extends Parent</code></li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">□ I can identify "is-a" relationships in real-world scenarios</li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">□ I understand that private members are not inherited</li>
          </ul>
        </div>
      </div>

      <FAQTemplate
        title="Inheritance FAQs"
        questions={questions}
      />

      {/* Teacher's Note Component */}
      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s]  [animation-fill-mode:forwards]">
        <Teacher note={
          "Inheritance is a powerful tool, but it's often misunderstood. Emphasize the 'is-a' relationship vs 'has-a'. Use analogies like 'Student (Swadeep) is a Person' or 'Tuhina is a Learner'. Point out that while inheritance promotes reusability, overuse can lead to brittle hierarchies. Always ask: 'Does the child truly need ALL parent behaviors?' If not, composition might be better. Show students how inheritance appears in Java's own libraries — every class extends Object!"
        } />
      </div>

      {/* Hint section integrated */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p>💭 <strong>Hint:</strong> Before moving to the next topic, try creating a <code>Student</code> class that extends <code>Person</code>. Add properties like <code>grade</code> and <code>rollNumber</code>.</p>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Topic0;