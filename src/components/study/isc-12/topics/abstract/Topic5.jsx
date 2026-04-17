import React, { useState } from 'react';
import clsx from 'clsx';
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';

// Import Java code examples
import employeePayroll from './topic5_files/EmployeePayrollSystem.java?raw';
import shapeAreaCalculator from './topic5_files/ShapeAreaCalculator.java?raw';
import gameCharacterSystem from './topic5_files/GameCharacterSystem.java?raw';
import bankingSystem from './topic5_files/BankingSystem.java?raw';
import schoolManagement from './topic5_files/SchoolManagementSystem.java?raw';

const Topic5 = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
            Practical Programs Using Abstract Classes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Real-world applications — from payroll systems to game engines, see abstraction in action.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* 1. Introduction */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-teal-500 pl-4 mb-4">Putting Theory into Practice</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Abstract classes shine in real-world applications where you have <strong>common behavior</strong> but need <strong>variations</strong> in implementation. This section presents complete, production-style programs that demonstrate how professionals use abstract classes.
            </p>
            <p>
              Each program solves a real problem: calculating payroll, managing shapes, building game characters, handling bank accounts, and running a school system. Study these to understand how abstraction leads to <strong>maintainable, extensible code</strong>.
            </p>
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg mt-3">
              <p className="italic">✨ <strong>Industry insight:</strong> Major frameworks like Spring, Hibernate, and Android SDK use abstract classes extensively for template methods, callbacks, and base implementations.</p>
            </div>
          </div>
        </section>

        {/* 2. Program 1: Employee Payroll System */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-4">🏢 Program 1: Employee Payroll System</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">A complete payroll system with different employee types (Full-time, Part-time, Contractor) each calculating salary differently.</p>
          <JavaFileLoader
            fileModule={employeePayroll}
            title="EmployeePayrollSystem.java"
            highlightLines={[4,5,6,9,10,11,14,15,16]}
          />
          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
            <strong>Key takeaway:</strong> Abstract class <code>Employee</code> provides common fields and <code>calculateSalary()</code> abstract method. Each subclass implements its own salary logic.
          </div>
        </section>

        {/* 3. Program 2: Shape Area Calculator */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mb-4">📐 Program 2: Shape Area Calculator</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Geometric shapes with polymorphic area calculation — used in CAD software, graphics engines, and GIS systems.</p>
          <JavaFileLoader
            fileModule={shapeAreaCalculator}
            title="ShapeAreaCalculator.java"
            highlightLines={[4,5,6,9,10,11,14,15,16]}
          />
          <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm">
            <strong>Key takeaway:</strong> Abstract class <code>Shape</code> forces subclasses to implement <code>area()</code> and <code>perimeter()</code>. The <code>displayInfo()</code> method is concrete and reused.
          </div>
        </section>

        {/* 4. Program 3: Game Character System */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-4">🎮 Program 3: Game Character System</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Role-playing game characters (Warrior, Mage, Archer) with unique attack behaviors but shared health/mana management.</p>
          <JavaFileLoader
            fileModule={gameCharacterSystem}
            title="GameCharacterSystem.java"
            highlightLines={[4,5,6,9,10,11,14,15,16]}
          />
          <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">
            <strong>Key takeaway:</strong> Abstract class <code>GameCharacter</code> defines the template method <code>takeTurn()</code> that calls abstract methods <code>attack()</code> and <code>defend()</code>.
          </div>
        </section>

        {/* 5. Program 4: Banking System */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-4 mb-4">🏦 Program 4: Banking System</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Account management with Savings, Current, and FixedDeposit accounts — each with different interest calculation and withdrawal rules.</p>
          <JavaFileLoader
            fileModule={bankingSystem}
            title="BankingSystem.java"
            highlightLines={[4,5,6,9,10,11,14,15,16]}
          />
          <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">
            <strong>Key takeaway:</strong> Abstract class <code>BankAccount</code> enforces <code>calculateInterest()</code> and <code>withdraw()</code> rules, while providing concrete deposit and balance methods.
          </div>
        </section>

        {/* 6. Program 5: School Management System */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-yellow-500 pl-4 mb-4">🏫 Program 5: School Management System</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">A system for a school in Barrackpore managing students, teachers, and staff — each person has a role-specific way to calculate salary and display duties.</p>
          <JavaFileLoader
            fileModule={schoolManagement}
            title="SchoolManagementSystem.java"
            highlightLines={[4,5,6,9,10,11,14,15,16]}
          />
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
            <strong>Key takeaway:</strong> Abstract class <code>Person</code> holds common personal data. <code>Employee</code> (abstract) adds salary calculation. Concrete classes add specific behavior.
          </div>
        </section>

        {/* 7. Professional Tips & Common Mistakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">💎 Professional Tips</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Start with one concrete class</strong>, then refactor common code into an abstract base class.</li>
              <li><strong>Document the "contract"</strong> — what each abstract method should do.</li>
              <li><strong>Use meaningful names</strong> for abstract classes (e.g., <code>AbstractPaymentProcessor</code>).</li>
              <li><strong>Keep abstract classes small</strong> — if it has too many abstract methods, consider splitting.</li>
              <li><strong>Test abstract classes</strong> by creating a test subclass or using mocks.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Mistakes in Practice</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Making concrete classes abstract unnecessarily</strong> — only abstract when needed.</li>
              <li><strong>Putting too much logic in the abstract class</strong> — violates Single Responsibility.</li>
              <li><strong>Forgetting to call super()</strong> in subclass constructors.</li>
              <li><strong>Overriding concrete methods incorrectly</strong> — losing shared behavior.</li>
              <li><strong>Using abstract classes where interfaces would be simpler</strong> (no shared state needed).</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">✅ Best Practices for Practical Programs</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Use abstract classes for <strong>"is-a" hierarchies with shared code</strong>.</li>
              <li>Keep the abstract class <strong>focused on one concept</strong>.</li>
              <li>Provide <strong>default implementations</strong> where possible (hook methods).</li>
              <li>Mark the <strong>template method as final</strong> to preserve algorithm structure.</li>
              <li>Use <strong>protected fields</strong> for subclass access, but prefer private with getters/setters.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">📋 Mini Checklist</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>✔️ Does the abstract class clearly represent a common concept?</li>
              <li>✔️ Are all abstract methods meaningful and necessary?</li>
              <li>✔️ Is the inheritance depth reasonable?</li>
              <li>✔️ Are the concrete subclasses truly "is-a" relationships?</li>
              <li>✔️ Have you avoided duplicate code across subclasses?</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-5 border-l-8 border-indigo-400 animate-fadeSlideUp">
          <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">🧠 Think about...</h3>
          <p className="italic text-gray-700 dark:text-gray-300 mt-1">In the GameCharacter example, why is <code>takeTurn()</code> marked <code>final</code>? What would happen if a subclass overrode it and didn't call <code>attack()</code> and <code>defend()</code>? How does this enforce the game rules?</p>
          <p className="text-sm text-gray-500 mt-2">Try extending the BankingSystem with a <code>PremiumSavingsAccount</code> that gives higher interest. Notice how little code you need to write — that's the power of abstraction.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeSlideUp">
          <FAQTemplate
            title="Practical Programs with Abstract Classes - FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp mt-8">
          <Teacher
            note="These five programs represent real scenarios students will encounter. Have them run each program, then modify one — e.g., add a new Employee type (Intern), add a new Shape (Triangle), add a new GameCharacter (Rogue). Emphasize how abstract classes make extensions easy without modifying existing code. Discuss the Open/Closed Principle: open for extension, closed for modification."
          />
        </div>
      </div>
    </div>
  );
};

export default Topic5;