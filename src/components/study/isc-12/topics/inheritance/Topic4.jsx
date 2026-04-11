// Topic4.jsx - Constructor in Inheritance
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java code imports (raw loader)
import constructorChainJava from "./topic4_files/ConstructorChainDemo.java?raw";
import superCallJava from "./topic4_files/SuperCallDemo.java?raw";
import defaultConstructorIssueJava from "./topic4_files/DefaultConstructorIssue.java?raw";

// 30 Questions import
import questions from "./topic4_files/topic4_questions";

const Topic4 = () => {
  // Light/Dark mode state (default dark)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply dark class to html element for Tailwind dark mode
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
        {/* Hero Section - slide-up animation */}
        <div className="text-center space-y-4 animate-[slideUp_0.6s_ease-out]">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Constructor in Inheritance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            How constructors behave when a class inherits from another.
            Chaining, super(), rules, and best practices.
          </p>
        </div>

        {/* Theory Section - staggered cards */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-l-4 border-blue-500 pl-4">What is Constructor in Inheritance?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] motion-safe:animate-[slideUp_0.5s_ease-out]">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Prototype / Signature</h3>
              <pre className="bg-gray-900 text-green-300 p-3 rounded-md text-sm overflow-x-auto mt-2">
                {`class Child extends Parent {
  Child() { super(); }
  Child(params) { super(params); }
}`}
              </pre>
              <p className="mt-3"><strong>Return type:</strong> None (constructor returns instance of class).</p>
              <p><strong>Purpose:</strong> Initialize the inherited & new members of subclass.</p>
              <p><strong>When used:</strong> Every time a subclass object is created, its constructor calls the superclass constructor first.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.6s_ease-out] motion-safe:animate-[slideUp_0.6s_ease-out]">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">Key Rule</h3>
              <p className="mt-2">If a superclass does <strong>not</strong> have a no-arg constructor, the subclass <strong>must</strong> explicitly call <code>super(parameters)</code> as the first statement in its constructor.</p>
              <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                💡 <strong>Real-world:</strong> Like building a house – you must lay the foundation (superclass constructor) before adding the roof (subclass constructor).
              </div>
            </div>
          </div>
        </div>

        {/* SVG Animation - Constructor Chaining Flow */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-center mb-6">Constructor Call Chain (SVG)</h3>
          <div className="flex justify-center">
            <svg width="600" height="240" viewBox="0 0 600 240" className="w-full max-w-2xl">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
              </defs>
              <rect x="40" y="20" width="180" height="50" rx="8" fill="#1e3a8a" className="dark:fill-blue-800" />
              <text x="130" y="50" textAnchor="middle" fill="white" fontSize="14">Parent Class</text>
              <rect x="380" y="20" width="180" height="50" rx="8" fill="#4c1d95" className="dark:fill-purple-800" />
              <text x="470" y="50" textAnchor="middle" fill="white" fontSize="14">Child Class</text>

              {/* Arrow from Child to Parent (super call) */}
              <line x1="380" y1="45" x2="230" y2="45" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)">
                <animate attributeName="stroke-dasharray" from="0 300" to="300 0" dur="2s" fill="freeze" />
              </line>
              <text x="305" y="35" textAnchor="middle" fill="#3b82f6" fontSize="12">super()</text>

              {/* Animated construction order */}
              <circle cx="130" cy="100" r="15" fill="#3b82f6">
                <animate attributeName="r" values="15;18;15" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="130" y="105" textAnchor="middle" fill="white" fontSize="12">1</text>
              <text x="160" y="105" fill="#3b82f6">Parent constructor finishes</text>

              <circle cx="470" cy="140" r="15" fill="#8b5cf6">
                <animate attributeName="r" values="15;18;15" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </circle>
              <text x="470" y="145" textAnchor="middle" fill="white" fontSize="12">2</text>
              <text x="500" y="145" fill="#8b5cf6">Child constructor executes</text>

              <path d="M130 115 L130 130 L470 130 L470 125" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="4">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Every subclass constructor must call super() – implicitly or explicitly.
          </p>
        </div>

        {/* Java Code Examples */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">Java Examples</h2>
          <div className="grid gap-6">
            <JavaFileLoader fileModule={constructorChainJava} title="ConstructorChainDemo.java" highlightLines={[]} />
            <JavaFileLoader fileModule={superCallJava} title="SuperCallDemo.java" highlightLines={[]} />
            <JavaFileLoader fileModule={defaultConstructorIssueJava} title="DefaultConstructorIssue.java" highlightLines={[]} />
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Forgetting to call super() when parent has no default constructor → compile error.</li>
              <li>Placing super() after other statements → compile error (must be first).</li>
              <li>Misunderstanding that constructors are not inherited – you must define or call explicitly.</li>
              <li>Calling overridable methods inside constructor (risky).</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Always define a no-arg constructor in parent if child may use default super().</li>
              <li>Explicitly call super() with parameters to make code self-documenting.</li>
              <li>Use constructor chaining to avoid duplication (this() within same class).</li>
              <li>Keep constructors simple – no complex logic or overridable method calls.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Hints */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">💡 Pro Tips & Hints</h3>
          <p className="mt-2"><strong>Think about:</strong> What happens if you remove super() from a subclass constructor when parent has no default constructor?</p>
          <p><strong>Observe:</strong> The output order of constructor messages shows the chain: parent → child.</p>
          <p><strong>Try changing:</strong> Swap the order of super() and any other statement – the compiler will guide you.</p>
        </div>

        {/* Mini Checklist */}
        <div className="border-2 border-dashed border-gray-400 p-5 rounded-xl">
          <h3 className="text-2xl font-bold text-center">📋 Student Checklist</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              "I know that subclass constructor must call super() first.",
              "I can differentiate between implicit and explicit super().",
              "I understand constructor chaining order.",
              "I know when a compile error occurs due to missing super().",
              "I can write parameterized constructors in inheritance.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Teacher's Note Component */}
        <Teacher note="Constructors are not inherited, but they are chained. Always ensure the parent class has a constructor that matches the child's super() call. Use @Override carefully when calling methods inside constructors." />

        {/* FAQ Section with 30 questions */}
        <FAQTemplate title="Constructor in Inheritance - FAQs" questions={questions} />
      </div>
    </div>
  );
};

export default Topic4;

/* Inline keyframes for slide-up without opacity */
<style>{`
@keyframes slideUp {
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
}
`}</style>