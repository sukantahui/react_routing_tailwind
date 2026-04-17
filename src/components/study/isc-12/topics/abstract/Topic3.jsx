import React, { useState } from 'react';
import clsx from 'clsx';
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';

// Import Java code examples
import inheritanceDemo from './topic3_files/InheritanceDemo.java?raw';
import abstractInheritanceChain from './topic3_files/AbstractInheritanceChain.java?raw';
import templateMethodPattern from './topic3_files/TemplateMethodPattern.java?raw';

const Topic3 = () => {
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Use of Abstract Class in Inheritance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Building powerful hierarchies — how abstract classes enable code reuse and polymorphism.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* 1. Introduction: Role of Abstract Classes in Inheritance */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-4">Why Abstract Classes Matter in Inheritance</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Abstract classes are the <strong>cornerstone of inheritance hierarchies</strong>. They provide a <strong>partial implementation</strong> that multiple subclasses can share, while forcing subclasses to implement specific behaviors. This creates a clean <strong>"is-a" relationship</strong> with built-in flexibility.
            </p>
            <p>
              Think of a <strong>school system</strong>: An abstract class <code>Person</code> might have fields like <code>name</code>, <code>age</code>, and concrete methods like <code>getAddress()</code>, but abstract methods like <code>calculateFee()</code> because students and teachers calculate fees differently. That's inheritance with abstraction in action.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-3">
              <p className="italic">✨ <strong>Real-world parallel:</strong> A blueprint for a "Vehicle" defines common properties (wheels, engine) and behaviors (start, stop). But "refuel()" is abstract because electric cars charge, petrol cars pump gas. Subclasses inherit the common parts and implement the rest.</p>
            </div>
          </div>
        </section>

        {/* 2. SVG: Inheritance Hierarchy with Abstract Class */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-cyan-500 pl-4 mb-4">Visualizing Abstract Class in Inheritance</h2>
          <div className="flex justify-center my-4">
            <svg viewBox="0 0 800 450" className="w-full max-w-3xl h-auto" aria-label="Abstract class inheritance hierarchy">
              <g transform="translate(20, 20)">
                {/* Abstract class at top */}
                <g transform="translate(250, 0)">
                  <rect x="0" y="0" width="260" height="90" rx="12" fill="#1e293b" className="dark:fill-gray-800 fill-gray-200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 4" />
                  <text x="130" y="25" textAnchor="middle" fill="#93c5fd" fontSize="14" fontWeight="bold">«abstract» Employee</text>
                  <line x1="10" y1="38" x2="250" y2="38" stroke="#3b82f6" strokeWidth="1" />
                  <text x="15" y="55" fill="#cbd5e1" fontSize="11">- name: String</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="11">- id: int</text>
                  <text x="15" y="85" fill="#f472b6" fontSize="11" fontStyle="italic">+ calculateSalary(): double (abstract)</text>
                </g>

                {/* Arrow to FullTimeEmployee */}
                <line x1="380" y1="90" x2="380" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)" />
                <text x="390" y="115" fill="#f59e0b" fontSize="11">extends</text>

                <g transform="translate(240, 140)">
                  <rect x="0" y="0" width="260" height="100" rx="10" fill="#0f172a" className="dark:fill-gray-900 fill-gray-100" stroke="#10b981" strokeWidth="2" />
                  <text x="130" y="25" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontWeight="bold">FullTimeEmployee</text>
                  <line x1="10" y1="38" x2="250" y2="38" stroke="#10b981" strokeWidth="1" />
                  <text x="15" y="55" fill="#cbd5e1" fontSize="11">- bonus: double</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="11">+ calculateSalary(): double {`{`}</text>
                  <text x="25" y="85" fill="#9ca3af" fontSize="10">return salary + bonus;</text>
                  <text x="15" y="98" fill="#cbd5e1" fontSize="11">{`}`}</text>
                </g>

                {/* Arrow to Contractor */}
                <line x1="140" y1="90" x2="140" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)" />
                <text x="100" y="115" fill="#f59e0b" fontSize="11">extends</text>

                <g transform="translate(0, 140)">
                  <rect x="0" y="0" width="260" height="100" rx="10" fill="#0f172a" className="dark:fill-gray-900 fill-gray-100" stroke="#f97316" strokeWidth="2" />
                  <text x="130" y="25" textAnchor="middle" fill="#fdba74" fontSize="13" fontWeight="bold">Contractor</text>
                  <line x1="10" y1="38" x2="250" y2="38" stroke="#f97316" strokeWidth="1" />
                  <text x="15" y="55" fill="#cbd5e1" fontSize="11">- hourlyRate: double</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="11">- hours: int</text>
                  <text x="15" y="85" fill="#cbd5e1" fontSize="11">+ calculateSalary(): double {`{`}</text>
                  <text x="25" y="98" fill="#9ca3af" fontSize="10">return hourlyRate * hours;</text>
                  <text x="15" y="111" fill="#cbd5e1" fontSize="11">{`}`}</text>
                </g>

                {/* Arrow to Intern */}
                <line x1="620" y1="90" x2="620" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowOrange)" />
                <text x="630" y="115" fill="#f59e0b" fontSize="11">extends</text>

                <g transform="translate(480, 140)">
                  <rect x="0" y="0" width="260" height="100" rx="10" fill="#0f172a" className="dark:fill-gray-900 fill-gray-100" stroke="#8b5cf6" strokeWidth="2" />
                  <text x="130" y="25" textAnchor="middle" fill="#c4b5fd" fontSize="13" fontWeight="bold">Intern</text>
                  <line x1="10" y1="38" x2="250" y2="38" stroke="#8b5cf6" strokeWidth="1" />
                  <text x="15" y="55" fill="#cbd5e1" fontSize="11">- stipend: double</text>
                  <text x="15" y="70" fill="#cbd5e1" fontSize="11">+ calculateSalary(): double {`{`}</text>
                  <text x="25" y="85" fill="#9ca3af" fontSize="10">return stipend;</text>
                  <text x="15" y="98" fill="#cbd5e1" fontSize="11">{`}`}</text>
                </g>
              </g>

              <defs>
                <marker id="arrowOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">🏛️ <span className="font-medium">Abstract Class</span> – Common blueprint</div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">📦 <span className="font-medium">Inheritance</span> – Reuse & extend</div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all">🎯 <span className="font-medium">Polymorphism</span> – Treat all uniformly</div>
          </div>
        </section>

        {/* 3. Java Code Examples */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mb-4">Inheritance in Action</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">See how abstract classes enable powerful inheritance hierarchies:</p>
          
          <div className="space-y-6">
            <JavaFileLoader
              fileModule={inheritanceDemo}
              title="InheritanceDemo.java"
              highlightLines={[4,5,6,9,10,11,14,15,16]}
            />
            <JavaFileLoader
              fileModule={abstractInheritanceChain}
              title="AbstractInheritanceChain.java"
              highlightLines={[4,5,6,10,11,12,16,17,18]}
            />
            <JavaFileLoader
              fileModule={templateMethodPattern}
              title="TemplateMethodPattern.java"
              highlightLines={[5,6,7,8,9,12,13,14,17,18]}
            />
          </div>
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm">💡 <strong>Observation:</strong> Notice how the abstract class <code>Employee</code> provides common fields and concrete methods (<code>getName()</code>, <code>getId()</code>), while abstract method <code>calculateSalary()</code> is implemented differently by each subclass. This is the essence of inheritance with abstraction.</p>
          </div>
        </section>

        {/* 4. Professional Tips & Common Mistakes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">💎 Tips & Tricks</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>Use abstract classes to define <strong>common behavior</strong> and <strong>state</strong> that multiple subclasses share.</li>
              <li>Place <strong>template methods</strong> (concrete methods that call abstract ones) in the abstract class to define algorithms.</li>
              <li>Use <strong>protected fields</strong> in abstract classes when subclasses need direct access, otherwise keep them private with getters/setters.</li>
              <li>Consider the <strong>depth of hierarchy</strong> – too many levels can become hard to maintain.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Overusing inheritance</strong> – not every relationship is "is-a". Composition is often better.</li>
              <li><strong>Deep inheritance trees</strong> – more than 3-4 levels make code hard to understand.</li>
              <li><strong>Forgetting to call super()</strong> – constructors in abstract classes must be explicitly called.</li>
              <li><strong>Modifying abstract class breaks all subclasses</strong> – design abstract classes carefully as they are a strong contract.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">✅ Best Practices</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Keep abstract classes <strong>focused</strong> – one clear responsibility.</li>
              <li>Document the <strong>intended usage</strong> of abstract methods.</li>
              <li>Prefer <strong>interfaces</strong> for pure contracts, abstract classes for code reuse.</li>
              <li>Use meaningful names that reflect the abstraction (e.g., <code>AbstractPaymentProcessor</code>).</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">📋 Mini Checklist</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>✔️ Does the abstract class represent a genuine "is-a" relationship?</li>
              <li>✔️ Are common fields and methods properly factored into the abstract class?</li>
              <li>✔️ Do subclasses override all abstract methods?</li>
              <li>✔️ Is the inheritance depth reasonable (≤ 3 levels)?</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-5 border-l-8 border-indigo-400 animate-fadeSlideUp">
          <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">🧠 Think about...</h3>
          <p className="italic text-gray-700 dark:text-gray-300 mt-1">In the Employee example, why is <code>calculateSalary()</code> abstract while <code>getName()</code> is concrete? What would happen if we made <code>getName()</code> abstract as well? Would that make sense?</p>
          <p className="text-sm text-gray-500 mt-2">Try adding a new subclass <code>Manager</code> that extends <code>FullTimeEmployee</code>. Does it need to implement <code>calculateSalary()</code> again? Why or why not?</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeSlideUp">
          <FAQTemplate
            title="Abstract Class in Inheritance - FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp mt-8">
          <Teacher
            note="Emphasize the 'is-a' test: if a Student 'is-a' Person, inheritance makes sense. Abstract classes are perfect for 'partially defined' concepts like Shape, Employee, Animal. Use the analogy of a restaurant menu: abstract class = 'Appetizer' (common properties: price, name), concrete subclasses = 'SpringRolls', 'Soup' (specific preparation). Students should practice building small hierarchies with 1 abstract parent and 2-3 concrete children."
          />
        </div>
      </div>
    </div>
  );
};

export default Topic3;