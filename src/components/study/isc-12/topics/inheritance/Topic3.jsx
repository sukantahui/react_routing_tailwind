import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// Import Java files for this topic (Topic 3)
import superVariableExample from "./topic3_files/SuperVariableExample.java?raw";
import superMethodExample from "./topic3_files/SuperMethodExample.java?raw";
import superConstructorExample from "./topic3_files/SuperConstructorExample.java?raw";
import superRealWorld from "./topic3_files/SuperRealWorldExample.java?raw";

const Topic3 = () => {
  // State for FAQs - answers visibility
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // FAQ Data
  const faqs = [
    {
      question: "What is the purpose of the `super` keyword?",
      answer: "The `super` keyword in Java is a reference variable used to refer to the immediate parent class object. It is used to access parent class properties (variables, methods, constructors) when they are hidden or overridden by the subclass."
    },
    {
      question: "Can `super` be used in a static context?",
      answer: "No, `super` cannot be used in a static context (static methods or static blocks) because `super` refers to an instance of the parent class, and static contexts are class-level, not instance-level."
    },
    {
      question: "What happens if we don't call `super()` in a subclass constructor?",
      answer: "Java automatically inserts a call to the no-argument constructor of the parent class (`super()`) as the first statement in every subclass constructor. If the parent class doesn't have a no-argument constructor, you'll get a compile-time error."
    },
    {
      question: "Can we use `super` to access grandparent members directly?",
      answer: "No, `super` only refers to the immediate parent class. To access grandparent members, you would need the parent class to provide a method that calls the grandparent, or you would have to chain `super` calls through each level."
    },
    {
      question: "What is the difference between `this` and `super`?",
      answer: "`this` refers to the current class instance, while `super` refers to the immediate parent class instance. `this` can access all members of the current class, while `super` is specifically for accessing overridden or hidden members of the parent class."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center animate-[fadeSlideUp_0.6s_ease-out] motion-safe:animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            The super Keyword
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Bridging the gap between parent and child: Understanding Java's super keyword for inheritance mastery
          </p>
        </div>

        {/* Theory Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 animate-[fadeSlideUp_0.6s_ease-out_0.1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.1s]">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-indigo-500 pl-4 mb-6">
            Understanding the super Keyword
          </h2>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Imagine you're in a classroom at <strong>Barrackpore Government School</strong>. The principal (parent class) has certain rules and resources. 
              The class teacher (child class) can also have their own rules, but sometimes they need to refer to the principal's original guidelines. 
              This is exactly what the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super</code> keyword does in Java!
            </p>
            
            <p>
              The <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super</code> keyword is a reference variable used to refer to the immediate parent class object. 
              It's like a special pass that lets a child class access members of its parent class that might be hidden or overridden.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Purpose</h3>
                <p className="text-sm">Access parent class variables, methods, and constructors from a subclass</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Prototype</h3>
                <p className="text-sm font-mono text-sm">super.variable<br/>super.method()<br/>super()</p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md">
                <div className="text-2xl mb-2">⏰</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">When to Use</h3>
                <p className="text-sm">When child class hides parent variables, overrides methods, or needs parent constructor logic</p>
              </div>
            </div>
          </div>
        </div>

        {/* Types of super usage */}
        <div className="space-y-8">
          {/* 1. super for variables */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 animate-[fadeSlideUp_0.6s_ease-out_0.2s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.2s]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-indigo-500">1.</span> Accessing Parent Class Variables
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When a subclass declares a variable with the same name as a variable in its parent class, the parent class variable is hidden. 
              The <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super</code> keyword allows you to access the hidden parent variable.
            </p>
            
            <div className="my-4">
              <JavaFileLoader 
                fileModule={superVariableExample}
                title="SuperVariableExample.java"
                highlightLines={[8, 14, 20]}
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-xl my-4">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">💡 Hint</h4>
              <p className="text-amber-700 dark:text-amber-200 text-sm">
                Think about: If Tuhina (child) has a notebook with the same subject name as Swadeep's (parent) notebook, 
                how can she specifically refer to Swadeep's notebook? <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">super</code> is her answer!
              </p>
            </div>
          </div>

          {/* 2. super for methods */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 animate-[fadeSlideUp_0.6s_ease-out_0.3s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.3s]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-indigo-500">2.</span> Accessing Parent Class Methods (Overridden Methods)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              When you override a method in a subclass, the parent class method is overridden. <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super.methodName()</code> 
              allows you to call the parent's version of the method even after overriding it.
            </p>
            
            <div className="my-4">
              <JavaFileLoader 
                fileModule={superMethodExample}
                title="SuperMethodExample.java"
                highlightLines={[8, 12, 18, 24]}
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-xl my-4">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">💡 Hint</h4>
              <p className="text-amber-700 dark:text-amber-200 text-sm">
                Observe carefully: In <strong>Ichapur Public Library</strong>, the general member's borrowing rule might be overridden for student members. 
                But sometimes a student needs to know the original rule. That's when <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">super.borrowBook()</code> becomes useful!
              </p>
            </div>
          </div>

          {/* 3. super for constructors */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 animate-[fadeSlideUp_0.6s_ease-out_0.4s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <span className="text-indigo-500">3.</span> Calling Parent Class Constructor
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super()</code> call is used to invoke the constructor of the parent class. 
              It must be the <strong>first statement</strong> in the subclass constructor. Java automatically inserts <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super()</code> if you don't explicitly call it.
            </p>
            
            <div className="my-4">
              <JavaFileLoader 
                fileModule={superConstructorExample}
                title="SuperConstructorExample.java"
                highlightLines={[8, 12, 18, 21, 27]}
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-xl my-4">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">💡 Hint</h4>
              <p className="text-amber-700 dark:text-amber-200 text-sm">
                Try changing this: Remove the <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">super(bookId, title)</code> call from <strong>StudentBook.java</strong>. 
                What error do you get? This demonstrates why explicit <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">super()</code> is needed when parent lacks a no-arg constructor.
              </p>
            </div>
          </div>
        </div>

        {/* Real World Example */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 animate-[fadeSlideUp_0.6s_ease-out_0.5s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.5s]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            🌍 Real-World Usage Example
            <span className="text-sm bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full">School Management System</span>
          </h3>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Let's see how <strong>Shyamnagar School District</strong> uses the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">super</code> keyword in their school management system:
          </p>
          
          <JavaFileLoader 
            fileModule={superRealWorld}
            title="SchoolManagementSystem.java"
            highlightLines={[5, 9, 13, 19, 23, 29, 33]}
          />
          
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">🎯 Key Takeaways from this Example:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super(name, age)</code> ensures person details are initialized by the parent constructor</li>
              <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super.displayInfo()</code> reuses parent's display logic before adding student-specific details</li>
              <li>The parent's <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">role</code> variable is accessed via <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super.role</code> when shadowed</li>
            </ul>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg p-6 animate-[fadeSlideUp_0.6s_ease-out_0.6s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.6s]">
          <h3 className="text-2xl font-bold text-red-800 dark:text-red-300 mb-6 flex items-center gap-2">
            ⚠️ Common Pitfalls & Misconceptions
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">❌ Mistake 1: Using super in static context</h4>
              <p className="text-gray-700 dark:text-gray-300">Cannot use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super</code> in static methods because it refers to an instance.</p>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>{`public static void staticMethod() {
    super.display();  // ❌ COMPILE ERROR!
}`}</code>
              </pre>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">❌ Mistake 2: super() not as first statement</h4>
              <p className="text-gray-700 dark:text-gray-300"><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super()</code> must be the first statement in constructor.</p>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>{`Student() {
    System.out.println("Hello");
    super();  // ❌ COMPILE ERROR!
}`}</code>
              </pre>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">❌ Mistake 3: Forgetting parent no-arg constructor requirement</h4>
              <p className="text-gray-700 dark:text-gray-300">If parent lacks no-arg constructor, must explicitly call parameterized <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super()</code>.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">❌ Mistake 4: Assuming super can access grandparent directly</h4>
              <p className="text-gray-700 dark:text-gray-300"><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super</code> only refers to immediate parent, not grandparent or higher.</p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl shadow-lg p-6 animate-[fadeSlideUp_0.6s_ease-out_0.7s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.7s]">
          <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-6 flex items-center gap-2">
            ✅ Best Practices
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">1. Use super judiciously</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Only use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super</code> when necessary. Overusing it can make code harder to understand.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">2. Keep constructor chains clear</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Document why you're using parameterized <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super()</code> calls.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">3. Avoid variable hiding</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Consider using different names instead of hiding parent variables, unless there's a good reason.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">4. Use super for constructor chaining</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Always call <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super()</code> to ensure parent initialization happens properly.</p>
            </div>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl shadow-lg p-6 animate-[fadeSlideUp_0.6s_ease-out_0.8s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.8s]">
          <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6 flex items-center gap-2">
            💎 Professional Tips & Tricks
          </h3>
          
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong className="text-blue-700 dark:text-blue-300">Tip 1:</strong> Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super</code> in method overriding to extend parent functionality rather than completely replacing it. This follows the Open/Closed Principle.</p>
            <p><strong className="text-blue-700 dark:text-blue-300">Tip 2:</strong> In <strong>Naihati Coding Bootcamp</strong>, instructors teach students to use IDE features (Ctrl+Click in IntelliJ/Eclipse) to trace <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super</code> calls up the inheritance chain.</p>
            <p><strong className="text-blue-700 dark:text-blue-300">Tip 3:</strong> When debugging, place breakpoints in both parent and child methods to see when <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super</code> calls are executed.</p>
            <p><strong className="text-blue-700 dark:text-blue-300">Tip 4:</strong> Remember: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super()</code> (constructor call) and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">super.method()</code> (method call) are different - one initializes, the other executes logic.</p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-[fadeSlideUp_0.6s_ease-out_0.9s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_0.9s]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            📝 Student Mini Checklist
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>I understand that <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">super</code> refers to the immediate parent class</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>I know how to access hidden parent variables using <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">super.variable</code></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>I can call overridden parent methods with <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">super.methodName()</code></div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>I remember <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">super()</code> must be the first statement in constructor</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>I understand why parent needs a no-arg constructor or explicit <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">super()</code> call</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-green-500 text-xl">✓</div>
              <div>I can't use <code className="bg-gray-300 dark:bg-gray-700 px-1 rounded">super</code> in static contexts</div>
            </div>
          </div>
        </div>

        {/* FAQ Section with 20 Questions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-[fadeSlideUp_0.6s_ease-out_1s] motion-safe:animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            ❓ Frequently Asked Questions (20 Questions)
          </h3>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => toggleAnswer(idx)}
                  className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{idx + 1}. {faq.question}</span>
                  <span className="text-indigo-500 dark:text-indigo-400 text-xl">
                    {visibleAnswers[idx] ? '▲' : '▼'}
                  </span>
                </button>
                {visibleAnswers[idx] && (
                  <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            
            {/* Additional 15 questions to reach 20 */}
            {[
              { q: "Can we use super and this together in a constructor?", a: "Yes, but super() must be the first statement, and this() cannot appear with super() because both need to be first." },
              { q: "What happens if parent and child have same variable name?", a: "Child's variable hides parent's variable. Use super.variableName to access parent's variable." },
              { q: "Is super a keyword or an object reference?", a: "super is a keyword that acts as a reference variable to the parent class object." },
              { q: "Can we assign super to a variable?", a: "No, super is a reserved keyword and cannot be assigned to any variable." },
              { q: "What's the output if super method is called from child?", a: "It executes the parent's version of that method, not the overridden child version." },
              { q: "Does every class have a super class in Java?", a: "Yes, except Object class. Every class implicitly extends Object, so super always refers to some parent." },
              { q: "Can we call super.super.method() to access grandparent?", a: "No, Java doesn't support this syntax. You'd need to create a method in parent that calls grandparent." },
              { q: "What happens if parent constructor throws an exception?", a: "Child constructor must handle it or declare it in its throws clause." },
              { q: "Can super be used in enum?", a: "Enums cannot extend other classes, so super refers to java.lang.Enum, but you can't call super() explicitly." },
              { q: "Is super() called automatically for abstract classes?", a: "Yes, Java inserts super() automatically in abstract class constructors as well." },
              { q: "What if parent class has private constructor?", a: "Then child cannot extend that class, as super() call would fail. This is how Singleton pattern prevents inheritance." },
              { q: "Can we use super in interface?", a: "Interfaces don't have parent classes (except Object implicitly), so super isn't applicable." },
              { q: "How does super work with generics?", a: "super works the same with generics, but you cannot use super with type parameters." },
              { q: "What's the difference between super and parent reference?", a: "A parent reference can call only parent methods on child object. super specifically accesses parent's hidden/overridden members." },
              { q: "Can super be used in lambda expressions?", a: "No, lambda expressions cannot use super because they're in a static context." }
            ].forEach((item, idx) => {
              const questionIdx = idx + 5;
              if (!faqs[questionIdx]) {
                faqs.push({ question: item.q, answer: item.a });
              }
            })}
            
            {/* Render remaining 15 questions */}
            {faqs.slice(5).map((faq, idx) => (
              <div key={idx + 5} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                <button
                  onClick={() => toggleAnswer(idx + 5)}
                  className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{idx + 6}. {faq.question}</span>
                  <span className="text-indigo-500 dark:text-indigo-400 text-xl">
                    {visibleAnswers[idx + 5] ? '▲' : '▼'}
                  </span>
                </button>
                {visibleAnswers[idx + 5] && (
                  <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Teacher's Note */}
        <Teacher note={
          "🎓 The super keyword often confuses beginners because they think it's like a 'backup' or 'copy'. Actually, it's a reference to the same parent object! 🧠\n\n" +
          "💡 Pro Tip from my classroom: Draw the inheritance tree on board. Show how 'super' is like a pointer moving up one level. Students in Barrackpore love the 'Parent Class Phone Directory' analogy - super helps you 'call' the parent's number!\n\n" +
          "⚠️ Remember: super() in constructor is NOT optional when parent lacks no-arg constructor. I've seen many students waste hours debugging this.\n\n" +
          "🔍 Debugging strategy: Use System.out.println in both parent and child methods with labels like '[PARENT]' and '[CHILD]' to trace execution flow."
        } />
        
      </div>

      {/* Custom keyframes */}
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
          .motion-safe\\:animate-\\[fadeSlideUp_0\\.6s_ease-out\\] {
            animation: none !important;
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic3;