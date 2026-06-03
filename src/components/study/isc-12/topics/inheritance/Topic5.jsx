// Topic5.jsx - Dynamic Method Dispatch (Runtime Polymorphism)
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Java code imports (raw loader)
import dispatchDemoJava from "./topic5_files/DynamicMethodDispatchDemo.java?raw";
import upcastingDemoJava from "./topic5_files/UpcastingDemo.java?raw";
import runtimePolyJava from "./topic5_files/RuntimePolymorphismDemo.java?raw";

// 30 Questions import
import questions from "./topic5_files/topic5_questions";

const Topic5 = () => {
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
            Dynamic Method Dispatch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Runtime polymorphism: How Java decides which overridden method to call
            based on the actual object type, not the reference variable.
          </p>
        </div>

        {/* Theory Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-l-4 border-blue-500 pl-4">
            What is Dynamic Method Dispatch?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out]">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Prototype / Signature</h3>
              <pre className="bg-gray-900 text-green-300 p-3 rounded-md text-sm overflow-x-auto mt-2">
                {`ParentClass ref;
ref = new ChildClass();
ref.overriddenMethod(); // calls Child's version`}
              </pre>
              <p className="mt-3"><strong>Return type:</strong> Depends on the method (same as overridden method).</p>
              <p><strong>Purpose:</strong> Enable runtime polymorphism – decide which method implementation to execute based on actual object type.</p>
              <p><strong>When used:</strong> Whenever a superclass reference refers to a subclass object and an overridden method is called.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.6s_ease-out]">
              <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">Key Concept: Virtual Method Invocation</h3>
              <p className="mt-2">Java uses <strong>late binding</strong> – the method to execute is determined at runtime, not compile time.</p>
              <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                💡 <strong>Real-world analogy:</strong> A "Play" button on a media player – pressing it on a MusicPlayer plays music, on a VideoPlayer plays video. The reference is "MediaPlayer", but the actual object decides the behavior.
              </div>
            </div>
          </div>
        </div>

        {/* SVG Animation - Method Resolution Flow */}
        <div className="bg-gray-100 dark:bg-gray-800/50 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-center mb-6">How Java Resolves the Method Call</h3>
          <div className="flex justify-center">
            <svg width="700" height="280" viewBox="0 0 700 280" className="w-full max-w-3xl">
              <defs>
                <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                </marker>
                <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                </marker>
              </defs>

              {/* Reference variable box */}
              <rect x="30" y="20" width="160" height="50" rx="8" fill="#1e3a8a" className="dark:fill-blue-800" />
              <text x="110" y="50" textAnchor="middle" fill="white" fontSize="14">Animal ref</text>

              {/* Object creation arrow */}
              <line x1="190" y1="45" x2="290" y2="45" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowBlue)" />
              <text x="240" y="35" textAnchor="middle" fill="#3b82f6" fontSize="12">= new Dog()</text>

              {/* Dog object */}
              <rect x="300" y="20" width="140" height="50" rx="8" fill="#047857" className="dark:fill-green-800" />
              <text x="370" y="50" textAnchor="middle" fill="white" fontSize="14">Dog object</text>

              {/* Method call arrow */}
              <path d="M370 70 L370 120 L200 120 L200 160" stroke="#f97316" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" strokeDasharray="6">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
              </path>
              <text x="280" y="115" textAnchor="middle" fill="#f97316" fontSize="12">ref.sound()</text>

              {/* Decision diamond */}
              <polygon points="200,170 260,210 200,250 140,210" fill="#d97706" className="dark:fill-yellow-700" />
              <text x="200" y="215" textAnchor="middle" fill="white" fontSize="12">Which sound()?</text>

              {/* Two outcomes */}
              <line x1="140" y1="210" x2="60" y2="210" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowBlue)" />
              <text x="100" y="200" textAnchor="middle" fill="#ef4444" fontSize="12">Compile-time: Animal</text>
              <rect x="10" y="225" width="100" height="40" rx="6" fill="#ef4444" />
              <text x="60" y="250" textAnchor="middle" fill="white" fontSize="11">Animal.sound()</text>

              <line x1="260" y1="210" x2="340" y2="210" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)" />
              <text x="300" y="200" textAnchor="middle" fill="#10b981" fontSize="12">Runtime: Dog</text>
              <rect x="290" y="225" width="100" height="40" rx="6" fill="#10b981" />
              <text x="340" y="250" textAnchor="middle" fill="white" fontSize="11">Dog.sound() ✓</text>

              <animateTransform attributeName="transform" type="scale" values="1;1.02;1" dur="2s" repeatCount="indefinite" xlinkHref="#decision" />
            </svg>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            The method to execute is determined by the <strong>actual object type (Dog)</strong>, not the reference type (Animal).
          </p>
        </div>

        {/* Java Code Examples */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold border-l-4 border-green-500 pl-4">Java Examples</h2>
          <div className="grid gap-6">
            <JavaFileLoader fileModule={dispatchDemoJava} title="DynamicMethodDispatchDemo.java" highlightLines={[]} />
            <JavaFileLoader fileModule={upcastingDemoJava} title="UpcastingDemo.java" highlightLines={[]} />
            <JavaFileLoader fileModule={runtimePolyJava} title="RuntimePolymorphismDemo.java" highlightLines={[]} />
          </div>
        </div>

        {/* Common Mistakes & Best Practices */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">⚠️ Common Pitfalls</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Expecting compile-time binding for overridden methods – methods are always virtual in Java (except static, private, final).</li>
              <li>Forgetting that static methods are <strong>not</strong> dynamically dispatched – they are resolved at compile time based on reference type.</li>
              <li>Confusing overloaded methods (compile-time) with overridden methods (runtime).</li>
              <li>Assuming private methods can be overridden – they are not visible to subclasses.</li>
              <li>Using downcasting without <code>instanceof</code> check → risk of ClassCastException.</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">✅ Best Practices</h3>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Use superclass references for flexibility – program to an interface/superclass, not implementation.</li>
              <li>Always annotate overridden methods with <code>@Override</code> to avoid mistakes.</li>
              <li>Remember: dynamic dispatch only works for <strong>instance methods</strong> (non-static, non-private, non-final).</li>
              <li>Use <code>instanceof</code> before downcasting to ensure type safety.</li>
              <li>Design inheritance hierarchies with clear “is-a” relationships for meaningful polymorphism.</li>
            </ul>
          </div>
        </div>

        {/* Tips & Hints */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">💡 Pro Tips & Hints</h3>
          <p className="mt-2"><strong>Think about:</strong> What would happen if the method in the parent class were declared <code>final</code>?</p>
          <p><strong>Observe carefully:</strong> In the output, which class's method is printed – the reference type or the actual object type?</p>
          <p><strong>Try changing this:</strong> Make the method <code>static</code> in both parent and child – then call it using a superclass reference pointing to subclass object. What changes?</p>
          <p className="mt-3 italic">Professional insight: Dynamic dispatch is the foundation of the <strong>Strategy Pattern</strong> and many other OOP design patterns.</p>
        </div>

        {/* Mini Checklist */}
        <div className="border-2 border-dashed border-gray-400 p-5 rounded-xl">
          <h3 className="text-2xl font-bold text-center">📋 Student Checklist</h3>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              "I understand that dynamic dispatch = runtime polymorphism.",
              "I know that method resolution depends on actual object type, not reference.",
              "I can differentiate between overloading (compile-time) and overriding (runtime).",
              "I know that static, private, and final methods are not dynamically dispatched.",
              "I can use upcasting to write flexible, reusable code.",
              "I use instanceof before downcasting to avoid ClassCastException.",
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Teacher's Note */}
        <Teacher note="Dynamic method dispatch is the magic behind polymorphism. Remember: 'What you see (reference) is not always what you get (object)'. Always test with small examples to see which method actually runs. Use @Override religiously!" />

        {/* FAQ Section */}
        <FAQTemplate title="Dynamic Method Dispatch - FAQs" questions={questions} />
      </div>
    </div>
  );
};

export default Topic5;

<style>{`
@keyframes slideUp {
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
}
`}</style>