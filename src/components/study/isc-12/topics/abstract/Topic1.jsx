import React, { useState } from 'react';
import clsx from 'clsx';
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';

// Import Java code examples (place these files in ./topic1_files/)
import abstractClassDemo from './topic1_files/AbstractClassDemo.java?raw';
import abstractMethodDemo from './topic1_files/AbstractMethodDemo.java?raw';
import vehicleAbstractExample from './topic1_files/VehicleAbstractExample.java?raw';

const Topic1 = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const getStaggerDelay = (index, baseDelay = 0.1) => ({
    animationDelay: `${baseDelay + index * 0.07}s`,
  });

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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Abstract Class & Abstract Methods
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Blueprints for inheritance — defining contracts that subclasses must fulfill.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* 1. What is an Abstract Class? */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-4">What is an Abstract Class?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              An <strong className="text-purple-600 dark:text-purple-400">abstract class</strong> is a class that cannot be instantiated. It serves as a blueprint for other classes. It may contain both <strong>abstract methods</strong> (without a body) and <strong>concrete methods</strong> (with implementation).
            </p>
            <p>
              Think of an abstract class as a <em>partial template</em>. For example, a "Recipe" abstract class might have a concrete method <code>boilWater()</code> and an abstract method <code>addIngredients()</code> — each specific dish decides what ingredients to add.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-3">
              <p className="italic">✨ Real-world parallel: A "Vehicle" abstract class defines common behaviors (start, stop) but leaves "refuel()" abstract because electric cars refuel differently than petrol cars.</p>
            </div>
          </div>
        </section>

        {/* 2. What is an Abstract Method? */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-pink-500 pl-4 mb-4">What is an Abstract Method?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              An <strong className="text-pink-600 dark:text-pink-400">abstract method</strong> is a method declared without an implementation (no body). It ends with a semicolon. Subclasses <strong>must</strong> override and provide a body for all abstract methods (unless the subclass is also abstract).
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm overflow-x-auto">
              <pre className="text-gray-800 dark:text-gray-200">
{`// Abstract method signature
public abstract void calculateSalary();

// No curly braces, just a semicolon`}
              </pre>
            </div>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Prototype:</strong> `access_modifier abstract return_type method_name(parameters);`</li>
              <li><strong>Return type:</strong> Can be any valid Java type (void, primitive, object).</li>
              <li><strong>Purpose:</strong> To enforce that every subclass provides its own implementation of that behavior.</li>
              <li><strong>When to use:</strong> When you want to declare a common behavior that must be implemented by all subclasses, but each subclass does it differently.</li>
            </ul>
          </div>
        </section>

        {/* 3. SVG Explanation: Abstract Class as a Blueprint */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-4 mb-4">Visualizing Abstract Class & Methods</h2>
          <div className="flex justify-center my-4">
            <svg viewBox="0 0 800 400" className="w-full max-w-3xl h-auto" aria-label="Abstract class blueprint diagram">
              {/* Abstract class box */}
              <g transform="translate(50, 20)">
                <rect x="0" y="0" width="300" height="200" rx="12" fill="#2d3748" className="dark:fill-gray-700 fill-gray-200" stroke="#a855f7" strokeWidth="2" strokeDasharray="8 4" />
                <text x="150" y="30" textAnchor="middle" fill="#d8b4fe" fontSize="14" fontWeight="bold">«abstract» Vehicle</text>
                <line x1="10" y1="45" x2="290" y2="45" stroke="#a855f7" strokeWidth="1" />
                <text x="20" y="70" fill="#cbd5e1" fontSize="12">- fuelLevel: int</text>
                <text x="20" y="90" fill="#cbd5e1" fontSize="12">+ start(): void</text>
                <text x="20" y="110" fill="#cbd5e1" fontSize="12">+ stop(): void</text>
                <text x="20" y="130" fill="#f472b6" fontSize="12" fontStyle="italic">+ refuel(): void  (abstract)</text>
                <text x="20" y="150" fill="#f472b6" fontSize="12" fontStyle="italic">+ getMileage(): double (abstract)</text>
              </g>

              {/* Arrow to Car */}
              <line x1="360" y1="120" x2="420" y2="120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)" />
              <text x="390" y="110" textAnchor="middle" fill="#f59e0b" fontSize="11">extends</text>

              <g transform="translate(430, 20)">
                <rect x="0" y="0" width="280" height="200" rx="12" fill="#1e293b" className="dark:fill-gray-800 fill-gray-100" stroke="#10b981" strokeWidth="2" />
                <text x="140" y="30" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontWeight="bold">Car</text>
                <line x1="10" y1="45" x2="270" y2="45" stroke="#10b981" strokeWidth="1" />
                <text x="20" y="70" fill="#cbd5e1" fontSize="12">+ refuel(): void {`{`}</text>
                <text x="30" y="90" fill="#9ca3af" fontSize="11">// Open fuel cap</text>
                <text x="30" y="110" fill="#9ca3af" fontSize="11">// Insert nozzle</text>
                <text x="30" y="130" fill="#9ca3af" fontSize="11">// Pump petrol</text>
                <text x="20" y="150" fill="#cbd5e1" fontSize="12">{`}`}</text>
              </g>

              {/* Arrow to ElectricCar */}
              <line x1="360" y1="280" x2="420" y2="280" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)" />
              <text x="390" y="270" textAnchor="middle" fill="#f59e0b" fontSize="11">extends</text>

              <g transform="translate(430, 230)">
                <rect x="0" y="0" width="280" height="200" rx="12" fill="#1e293b" className="dark:fill-gray-800 fill-gray-100" stroke="#3b82f6" strokeWidth="2" />
                <text x="140" y="30" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">ElectricCar</text>
                <line x1="10" y1="45" x2="270" y2="45" stroke="#3b82f6" strokeWidth="1" />
                <text x="20" y="70" fill="#cbd5e1" fontSize="12">+ refuel(): void {`{`}</text>
                <text x="30" y="90" fill="#9ca3af" fontSize="11">// Connect charger</text>
                <text x="30" y="110" fill="#9ca3af" fontSize="11">// Authenticate</text>
                <text x="30" y="130" fill="#9ca3af" fontSize="11">// Charge battery</text>
                <text x="20" y="150" fill="#cbd5e1" fontSize="12">{`}`}</text>
              </g>

              <defs>
                <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">📐 <span className="font-medium">Abstract Class</span> – Incomplete template</div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">⚙️ <span className="font-medium">Abstract Method</span> – No body, must be overridden</div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">🏎️ <span className="font-medium">Concrete Class</span> – Provides implementations</div>
          </div>
        </section>

        {/* 4. Java Code Examples */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-4">Java Implementation</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">Let's see abstract classes and methods in action:</p>
          
          <div className="space-y-6">
            <JavaFileLoader
              fileModule={abstractClassDemo}
              title="AbstractClassDemo.java"
              highlightLines={[4,5,8,9,14,15]}
            />
            <JavaFileLoader
              fileModule={abstractMethodDemo}
              title="AbstractMethodDemo.java"
              highlightLines={[5,6,11,12,17,18,22]}
            />
            <JavaFileLoader
              fileModule={vehicleAbstractExample}
              title="VehicleAbstractExample.java"
              highlightLines={[4,5,10,11,16,17,24,25]}
            />
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm">💡 <strong>Observation:</strong> Notice how each subclass provides its own version of <code>calculateArea()</code> or <code>refuel()</code>. The abstract class defines <strong>what</strong> to do, subclasses define <strong>how</strong>.</p>
          </div>
        </section>

        {/* 5. Professional Tips & Common Mistakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">💎 Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>Use abstract classes when you have <strong>common code</strong> to share among closely related classes.</li>
              <li>Abstract methods are a form of <strong>contract</strong> — they force subclasses to implement specific behavior.</li>
              <li>You can call abstract methods from concrete methods inside the abstract class (template method pattern).</li>
              <li>Debugging tip: If a subclass fails to implement an abstract method, the compiler error will tell you exactly which method is missing.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Forgetting to override all abstract methods</strong> – compiler error: "The type X must implement inherited abstract method".</li>
              <li><strong>Trying to instantiate an abstract class</strong> – error: "Cannot instantiate the type AbstractClass".</li>
              <li><strong>Using abstract when interface would be better</strong> – if no state or common code, prefer interface.</li>
              <li><strong>Making methods abstract unnecessarily</strong> – only when you truly need different implementations per subclass.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">✅ Best Practices</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Keep abstract classes focused on a single responsibility.</li>
              <li>Name abstract classes with "Base" or "Abstract" prefix (e.g., <code>AbstractEmployee</code>).</li>
              <li>Provide as much concrete functionality as possible to avoid code duplication.</li>
              <li>Use <code>@Override</code> annotation when implementing abstract methods.</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">📋 Mini Checklist</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>✔️ Is the class intended to be a base class?</li>
              <li>✔️ Does it have at least one abstract method? (optional but common)</li>
              <li>✔️ Did you mark the class as <code>abstract</code>?</li>
              <li>✔️ Did all concrete subclasses implement every abstract method?</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-5 border-l-8 border-indigo-400 animate-fadeSlideUp">
          <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">🧠 Think about...</h3>
          <p className="italic text-gray-700 dark:text-gray-300 mt-1">Observe carefully: In the Vehicle example, why is <code>start()</code> concrete but <code>refuel()</code> abstract? What would happen if <code>start()</code> were also abstract?</p>
          <p className="text-sm text-gray-500 mt-2">Try changing the abstract class to remove the abstract keyword from the class but keep the abstract method. What error do you get?</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeSlideUp">
          <FAQTemplate
            title="Abstract Class & Abstract Methods - FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp mt-8">
          <Teacher
            note="Students often confuse abstract classes with interfaces. Emphasize that abstract classes can hold state (fields) and provide partial implementation. Use the analogy of a 'partially built house' — you can't live in it (instantiate), but you can add rooms (concrete subclasses). Encourage them to identify abstract methods in Java's standard library (e.g., HttpServlet's doGet(), doPost() are abstract)."
          />
        </div>
      </div>
    </div>
  );
};

export default Topic1;