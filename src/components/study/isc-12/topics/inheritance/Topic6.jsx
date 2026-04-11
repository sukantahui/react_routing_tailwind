// Topic6.jsx - Practical Programs on Inheritance
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java code imports (raw loader)
import employeeHierarchyJava from "./topic6_files/EmployeeHierarchy.java?raw";
import shapeHierarchyJava from "./topic6_files/ShapeHierarchy.java?raw";
import vehiclePolymorphismJava from "./topic6_files/VehiclePolymorphism.java?raw";
import bankInheritanceJava from "./topic6_files/BankInheritance.java?raw";

// 30 Questions import
import questions from "./topic6_files/topic6_questions";

const Topic6 = () => {
  // Light/Dark mode state (default dark)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-md"
          aria-label="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-[slideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Practical Programs on Inheritance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Putting theory into practice: real‑world inheritance hierarchies,
            code reusability, and polymorphic behaviour.
          </p>
        </div>

        {/* Theory Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-l-4 border-blue-500 pl-4">
            Why Practical Programs Matter
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out]">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Learning by Doing</h3>
              <p className="mt-2">
                Writing complete programs that use inheritance forces you to think about
                <strong> “is‑a” relationships</strong>, constructor chaining, method overriding,
                and dynamic dispatch – all working together.
              </p>
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                🎯 <strong>Goal:</strong> Build reusable, extensible, and maintainable code
                like professional developers do.
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.6s_ease-out]">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">Common Use Cases</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Employee management systems (Manager, Developer, Intern)</li>
                <li>Geometric shapes (Circle, Rectangle, Triangle)</li>
                <li>Vehicles (Car, Bike, Truck)</li>
                <li>Bank accounts (Savings, Current, FixedDeposit)</li>
                <li>UI components (Button, TextField, Checkbox)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SVG Animation - Practical Program Flow */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-center mb-6">Program Flow: Employee Hierarchy</h3>
          <div className="flex justify-center">
            <svg width="700" height="300" viewBox="0 0 700 300" className="w-full max-w-3xl">
              <defs>
                <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>

              {/* Root class */}
              <rect x="280" y="20" width="140" height="45" rx="8" fill="#1e3a8a" className="dark:fill-blue-800" />
              <text x="350" y="48" textAnchor="middle" fill="white" fontSize="14">Employee</text>

              {/* Subclasses */}
              <rect x="80" y="110" width="130" height="45" rx="8" fill="#047857" className="dark:fill-green-800" />
              <text x="145" y="138" textAnchor="middle" fill="white" fontSize="13">Manager</text>

              <rect x="285" y="110" width="130" height="45" rx="8" fill="#b45309" className="dark:fill-orange-700" />
              <text x="350" y="138" textAnchor="middle" fill="white" fontSize="13">Developer</text>

              <rect x="490" y="110" width="130" height="45" rx="8" fill="#6d28d9" className="dark:fill-purple-800" />
              <text x="555" y="138" textAnchor="middle" fill="white" fontSize="13">Intern</text>

              {/* Arrows */}
              <line x1="350" y1="65" x2="145" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
              <line x1="350" y1="65" x2="350" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />
              <line x1="350" y1="65" x2="555" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />

              {/* Animated method call */}
              <circle cx="350" cy="180" r="15" fill="#ef4444">
                <animate attributeName="r" values="15;18;15" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="350" y="185" textAnchor="middle" fill="white" fontSize="12">1</text>
              <text x="380" y="185" fill="#ef4444">new Manager()</text>

              <circle cx="145" cy="220" r="15" fill="#10b981">
                <animate attributeName="r" values="15;18;15" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <text x="145" y="225" textAnchor="middle" fill="white" fontSize="12">2</text>
              <text x="175" y="225" fill="#10b981">super(name, id)</text>

              <circle cx="350" cy="260" r="15" fill="#f59e0b">
                <animate attributeName="r" values="15;18;15" dur="1.5s" begin="1s" repeatCount="indefinite" />
              </circle>
              <text x="350" y="265" textAnchor="middle" fill="white" fontSize="12">3</text>
              <text x="380" y="265" fill="#f59e0b">work() → dynamic dispatch</text>
            </svg>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Each program demonstrates a different inheritance pattern and polymorphism in action.
          </p>
        </div>

        {/* Java Code Examples - Practical Programs */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">
            Complete Java Programs
          </h2>
          <div className="grid gap-6">
            <JavaFileLoader fileModule={employeeHierarchyJava} title="EmployeeHierarchy.java" highlightLines={[]} />
            <JavaFileLoader fileModule={shapeHierarchyJava} title="ShapeHierarchy.java" highlightLines={[]} />
            <JavaFileLoader fileModule={vehiclePolymorphismJava} title="VehiclePolymorphism.java" highlightLines={[]} />
            <JavaFileLoader fileModule={bankInheritanceJava} title="BankInheritance.java" highlightLines={[]} />
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls in Practical Programs</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Creating unnecessarily deep hierarchies when composition would be better.</li>
              <li>Forgetting to call super() in subclass constructors, causing hidden bugs.</li>
              <li>Overriding methods but not using @Override – typos lead to accidental overloading.</li>
              <li>Using inheritance for “has‑a” relationships instead of “is‑a”.</li>
              <li>Not designing for polymorphism – using concrete types everywhere.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Favor <strong>composition over inheritance</strong> when behavior can be shared without a strict “is‑a”.</li>
              <li>Keep hierarchies shallow (max 3‑4 levels).</li>
              <li>Use abstract classes or interfaces to define contracts.</li>
              <li>Write small, focused programs that test one inheritance concept at a time.</li>
              <li>Always include a <code>main()</code> method that demonstrates polymorphism.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Hints */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">💡 Pro Tips & Hints</h3>
          <p className="mt-2"><strong>Think about:</strong> In the Employee program, why does <code>Manager</code> have a <code>teamSize</code> but <code>Intern</code> doesn’t?</p>
          <p><strong>Observe carefully:</strong> The <code>calculateSalary()</code> method is overridden in each subclass – see how dynamic dispatch picks the right version when using an array of <code>Employee</code> references.</p>
          <p><strong>Try changing:</strong> Add a new subclass <code>Freelancer</code> that extends <code>Employee</code>. What methods must you implement? Does the existing array code work without changes?</p>
          <p className="mt-3 italic">Professional insight: Real projects often start with one concrete class and refactor into inheritance hierarchies when duplication appears – YAGNI (You Aren’t Gonna Need It) principle.</p>
        </div>

        {/* Mini Checklist */}
        <div className="border-2 border-dashed border-gray-400 p-5 rounded-xl">
          <h3 className="text-2xl font-bold text-center">📋 Student Checklist</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              "I can write a complete inheritance hierarchy with 3+ classes.",
              "I use super() correctly in subclass constructors.",
              "I override methods and use @Override annotation.",
              "I can create an array of superclass references and call overridden methods.",
              "I understand when to use inheritance vs composition.",
              "I can debug common inheritance errors (missing super constructor, etc.).",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Teacher's Note */}
        <Teacher note="Practical programming is where theory solidifies. Run these examples, modify them, break them, and fix them. Pay special attention to the constructor chain and how dynamic dispatch works with arrays. The best way to master inheritance is to write small programs from scratch – start with a simple Person → Student → GradStudent hierarchy and expand." />

        {/* FAQ Section */}
        <FAQTemplate title="Practical Inheritance Programs - FAQs" questions={questions} />
      </div>
    </div>
  );
};

export default Topic6;

<style>{`
@keyframes slideUp {
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
}
`}</style>