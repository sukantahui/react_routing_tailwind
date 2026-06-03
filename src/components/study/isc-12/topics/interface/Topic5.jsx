// Topic5.jsx
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';

// Java files
import paymentInterface from './topic5_files/Payment.java?raw';
import creditCardPayment from './topic5_files/CreditCardPayment.java?raw';
import paypalPayment from './topic5_files/PayPalPayment.java?raw';
import paymentProcessor from './topic5_files/PaymentProcessor.java?raw';
import studentClass from './topic5_files/Student.java?raw';
import sortDemo from './topic5_files/SortDemo.java?raw';
import userDAO from './topic5_files/UserDAO.java?raw';
import userDAOMySQL from './topic5_files/UserDAOMySQL.java?raw';
import daoDemo from './topic5_files/DAODemo.java?raw';

// FAQ questions (30 items)
import questions from './topic5_files/topic5_questions.js';

const Topic5 = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Practical Programs Using Interfaces
        </h1>
        <p className="text-xl mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
          See how interfaces solve <strong>real‑world problems</strong> – from payment systems and sorting algorithms to database abstraction layers.
        </p>
      </section>

      {/* Practical Scenario 1: Payment Processing */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.2s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">💳 Scenario 1: Payment Gateway Integration</h2>
        <p className="mb-4 leading-relaxed">
          An e‑commerce system needs to support multiple payment methods (Credit Card, PayPal, UPI). 
          By defining a <code>Payment</code> interface, we can add new payment types without changing the checkout logic.
        </p>
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-xl border-l-4 border-indigo-500 my-6">
          <p className="font-semibold">🎯 Real‑world context:</p>
          <p>
            At <strong>Shyamnagar</strong> online store, students like <strong>Swadeep</strong> and <strong>Tuhina</strong> can pay via Credit Card or PayPal. 
            The interface allows easy addition of <strong>Google Pay</strong> later.
          </p>
        </div>
        <div className="space-y-6 mt-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={paymentInterface} title="Payment.java" highlightLines={[]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={creditCardPayment} title="CreditCardPayment.java" highlightLines={[5,6,7,8,9,10,11,12]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={paypalPayment} title="PayPalPayment.java" highlightLines={[5,6,7,8,9,10,11,12]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={paymentProcessor} title="PaymentProcessor.java" highlightLines={[10,11,12,13,14,15,16,17]} />
          </div>
        </div>
      </section>

      {/* Scenario 2: Sorting with Comparable */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">📊 Scenario 2: Sorting Students by Marks</h2>
        <p className="mb-4 leading-relaxed">
          The <code>Comparable</code> interface is used to define <strong>natural ordering</strong> of objects. 
          Here, we sort a list of students based on their marks – a common requirement in school report systems.
        </p>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={studentClass} title="Student.java" highlightLines={[5,6,7,8,9,10,11,12,13]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={sortDemo} title="SortDemo.java" highlightLines={[10,11,12,13,14,15,16]} />
          </div>
        </div>
      </section>

      {/* Scenario 3: Data Access Object (DAO) Pattern */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.4s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🗄️ Scenario 3: Database Abstraction with DAO Pattern</h2>
        <p className="mb-4 leading-relaxed">
          In large applications, switching databases (MySQL → PostgreSQL) should not affect business logic. 
          A <code>UserDAO</code> interface defines CRUD operations, and concrete classes implement them for specific databases.
        </p>
        <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl border-l-4 border-teal-500 my-6">
          <p className="font-semibold">🏫 Classroom example:</p>
          <p>
            At <strong>Ichapur High School</strong>, the admin system needs to store student records. 
            Initially using MySQL, later migrating to MongoDB – only the DAO implementation changes.
          </p>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={userDAO} title="UserDAO.java" highlightLines={[]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={userDAOMySQL} title="UserDAOMySQL.java" highlightLines={[5,6,7,8,9,10,11,12,13,14]} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-all duration-300">
            <JavaFileLoader fileModule={daoDemo} title="DAODemo.java" highlightLines={[8,9,10,11,12,13,14]} />
          </div>
        </div>
      </section>

      {/* Summary: When to Use Interfaces in Practice */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.5s' }}
      >
        <h2 className="text-3xl font-semibold mb-4">🎓 Key Takeaways for Real Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-300">💡 Industry Best Practices</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Program to an interface, not an implementation</strong> – increases flexibility.</li>
              <li>Use interfaces for <strong>dependency injection</strong> (Spring, Guice).</li>
              <li>Define <strong>service interfaces</strong> in layered architecture (Controller → Service → Repository).</li>
              <li>Interface-based design makes <strong>unit testing</strong> easier (mock implementations).</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl hover:shadow-md transition">
            <h3 className="text-xl font-bold text-green-700 dark:text-green-300">✅ Mini Checklist for Projects</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>✓ Identify extension points – define interfaces there.</li>
              <li>✓ Keep interfaces focused (single responsibility).</li>
              <li>✓ Use default methods for backward compatibility only.</li>
              <li>✓ Name interfaces as adjectives or capabilities (`Runnable`, `Payment`).</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold text-red-700 dark:text-red-300">⚠️ Common Mistakes in Practical Code</h3>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Creating <strong>fat interfaces</strong> with too many methods – violates Interface Segregation Principle.</li>
            <li>Using interfaces when a simple class would suffice (premature abstraction).</li>
            <li>Forgetting that <strong>default methods</strong> can lead to subtle bugs if overused.</li>
            <li>Not using <code>@Override</code> annotation – leads to hard-to-find typos.</li>
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
          <p>🔍 <strong>Observe carefully:</strong> In `PaymentProcessor.java`, the `processPayment` method accepts any `Payment` object. What happens if you pass a `null`?</p>
          <p className="mt-2">🔧 <strong>Try changing this:</strong> Implement a new `UPIPayment` class that implements `Payment`. Does `PaymentProcessor` need any change? Why?</p>
          <p className="mt-2">📐 <strong>Design thought:</strong> In a real project, would you make `UserDAO` an interface or an abstract class? Why?</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.7s' }}
      >
        <FAQTemplate title="Practical Interface Usage – FAQs" questions={questions} />
      </section>

      {/* Teacher's Note */}
      <section
        ref={addToRefs}
        className="section-animate max-w-5xl mx-auto px-6 py-10 border-t border-gray-200 dark:border-gray-700"
        style={{ animationDelay: '0.8s' }}
      >
        <Teacher
          note={
            "Practical examples make interfaces come alive. I always start with a payment processing demo – students immediately see the value. " +
            "Then I show them sorting with `Comparable` – they've used `Collections.sort()` but never thought about the interface behind it. " +
            "The DAO pattern is advanced but crucial for real work; emphasise that changing from MySQL to PostgreSQL would be trivial with an interface. " +
            "Assignment idea: Ask them to implement a `Notification` interface with `EmailNotification` and `SMSNotification`, then a `NotificationService` that sends messages to a list of recipients. " +
            "Common mistake: students try to instantiate interfaces – remind them again that interfaces cannot be instantiated directly."
          }
        />
      </section>
    </div>
  );
};

export default Topic5;