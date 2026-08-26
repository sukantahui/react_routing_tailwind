import React, { useState } from 'react';
import clsx from 'clsx';
import JavaFileLoader from '../../../../../common/JavaFileLoader';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';

// Import Java code examples (place these files in ./topic0_files/)
import remoteControlExample from './topic0_files/RemoteControlAbstraction.java?raw';
import bankAccountExample from './topic0_files/BankAccountAbstraction.java?raw';
import shapeAbstractionExample from './topic0_files/ShapeAbstraction.java?raw';

const Topic0 = () => {
  const [showAnswers, setShowAnswers] = useState(false); // For bonus Q&A, but FAQTemplate handles its own

  // Staggered animation helper
  const getStaggerDelay = (index, baseDelay = 0.1) => ({
    animationDelay: `${baseDelay + index * 0.07}s`,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Custom keyframes for animations */}
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Concept of Abstraction
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
            Hiding complexity, revealing essentials — the art of designing clean, scalable software.
          </p>
        </div>
      </div>

      {/* 1. What is Abstraction? */}
      <div className="max-w-5xl mx-auto space-y-12">
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 mb-4">What is Abstraction?</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              <strong className="text-blue-600 dark:text-blue-400">Abstraction</strong> is the process of hiding implementation details and exposing only the essential features of an object or system. It helps manage complexity by focusing on <em>what</em> something does instead of <em>how</em> it does it.
            </p>
            <p>
              Think of driving a car: you use the steering wheel, accelerator, and brakes without knowing the intricate workings of the engine, fuel injection, or transmission. That's abstraction in action — the car provides a simple interface while hiding the complex internals.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-3">
              <p className="italic">✨ Real-world parallel: When you withdraw cash from an ATM, you don't need to understand the banking backend, network protocols, or dispenser mechanics. The ATM screen gives you a clean abstraction: enter PIN, choose amount, get cash.</p>
            </div>
          </div>
        </section>

        {/* 2. SVG Explanation: Step-by-step Abstraction */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-4 mb-4">How Abstraction Works — Visualized</h2>
          <div className="flex justify-center my-4">
            <svg viewBox="0 0 800 320" className="w-full max-w-3xl h-auto" aria-label="Abstraction concept diagram">
              {/* Step 1: Complex Internal System */}
              <g transform="translate(30, 40)">
                <rect x="0" y="0" width="200" height="180" rx="12" fill="#1e293b" className="dark:fill-gray-700 fill-gray-200" />
                <text x="100" y="25" textAnchor="middle" fill="#94a3b8" fontSize="12">Internal Complexity</text>
                {/* Random wires/circuits */}
                <circle cx="50" cy="70" r="8" fill="#ef4444"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" /></circle>
                <circle cx="100" cy="100" r="6" fill="#3b82f6"><animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" /></circle>
                <circle cx="150" cy="80" r="10" fill="#10b981"><animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" /></circle>
                <line x1="50" y1="70" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
                <line x1="100" y1="100" x2="150" y2="80" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />
                <rect x="30" y="130" width="140" height="35" rx="6" fill="#475569" />
                <text x="100" y="152" textAnchor="middle" fill="#f8fafc" fontSize="10">Engine, wires, gears</text>
                <text x="100" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">(Hidden details)</text>
              </g>

              {/* Arrow 1 -> 2 */}
              <g>
                <line x1="240" y1="130" x2="290" y2="130" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)" />
                <text x="265" y="115" textAnchor="middle" fill="#f59e0b" fontSize="11">Abstract</text>
              </g>

              {/* Step 2: Abstracted Interface */}
              <g transform="translate(310, 40)">
                <rect x="0" y="0" width="180" height="180" rx="12" fill="#0f172a" className="dark:fill-gray-800 fill-gray-100" stroke="#3b82f6" strokeWidth="2" />
                <text x="90" y="25" textAnchor="middle" fill="#60a5fa" fontSize="12">Simple Interface</text>
                {/* Steering wheel icon */}
                <circle cx="90" cy="80" r="25" fill="none" stroke="#3b82f6" strokeWidth="3" />
                <line x1="90" y1="55" x2="90" y2="105" stroke="#3b82f6" strokeWidth="2" />
                <line x1="65" y1="80" x2="115" y2="80" stroke="#3b82f6" strokeWidth="2" />
                <text x="90" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="12">start()</text>
                <text x="90" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="12">accelerate()</text>
              </g>

              {/* Arrow 2 -> 3 */}
              <g>
                <line x1="500" y1="130" x2="550" y2="130" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowhead)" />
                <text x="525" y="115" textAnchor="middle" fill="#10b981" fontSize="11">Use</text>
              </g>

              {/* Step 3: User / Developer Benefit */}
              <g transform="translate(570, 40)">
                <rect x="0" y="0" width="190" height="180" rx="12" fill="#064e3b" className="dark:fill-emerald-900/30 fill-emerald-100" />
                <text x="95" y="25" textAnchor="middle" fill="#6ee7b7" fontSize="12">Focus on Essentials</text>
                <path d="M95,140 L75,115 L115,115 Z" fill="#34d399" />
                <circle cx="95" cy="90" r="22" fill="#2dd4bf" />
                <text x="95" y="96" textAnchor="middle" fill="#042f2e" fontSize="16">✓</text>
                <text x="95" y="160" textAnchor="middle" fill="#ccfbf1" fontSize="11">No internal clutter</text>
              </g>

              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                </marker>
              </defs>
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">🔧 <span className="font-medium">Step 1:</span> Complex internal machinery</div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">🎮 <span className="font-medium">Step 2:</span> Abstracted controls (interface)</div>
            <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">🧠 <span className="font-medium">Step 3:</span> User interacts only with essentials</div>
          </div>
        </section>

        {/* 3. Java Code Examples (Real abstraction in action) */}
        <section className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 animate-fadeSlideUp">
          <h2 className="text-2xl font-bold border-l-4 border-purple-500 pl-4 mb-4">Abstraction Through Java Code</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">In Java, abstraction is achieved using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">abstract classes</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">interfaces</code>. Here's how we hide implementation:</p>
          
          <div className="space-y-6">
            <JavaFileLoader
              fileModule={remoteControlExample}
              title="RemoteControlAbstraction.java"
              highlightLines={[6,7,12,13]}
            />
            <JavaFileLoader
              fileModule={bankAccountExample}
              title="BankAccountAbstraction.java"
              highlightLines={[8,9,14,15,20]}
            />
            <JavaFileLoader
              fileModule={shapeAbstractionExample}
              title="ShapeAbstraction.java"
              highlightLines={[4,5,10,11,16]}
            />
          </div>
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-sm">💡 <strong>Observation:</strong> The client code only knows <code>turnOn()</code>, <code>deposit()</code>, or <code>draw()</code> — not the internal wiring or database queries. That's abstraction at work!</p>
          </div>
        </section>

        {/* 4. Professional Tips, Common Mistakes, Best Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          {/* Tips & Tricks */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl p-5 border border-yellow-200 dark:border-yellow-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">💎 Tips & Tricks <span className="text-sm font-normal text-gray-500">(Industry habits)</span></h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li>Start with <strong>interfaces</strong> to define contracts before writing concrete classes.</li>
              <li>Use meaningful method names that reveal <em>intent</em> not implementation (e.g., <code>calculateTotal()</code> instead of <code>addNumbersAndMultiply()</code>).</li>
              <li>Debugging mindset: abstraction helps isolate bugs — test the interface first, then dive into implementation.</li>
              <li>Think about “change impact”: If you change a private method, only the class itself is affected.</li>
            </ul>
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold flex items-center gap-2">⚠️ Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700 dark:text-gray-300">
              <li><strong>Leaky abstraction:</strong> exposing implementation details through method names or return types.</li>
              <li><strong>Premature abstraction:</strong> creating abstractions for code that won't change or be reused.</li>
              <li><strong>Over-abstraction:</strong> too many tiny interfaces/classes confuse readability.</li>
              <li><strong>IDE error:</strong> forgetting to implement all abstract methods leads to compilation errors.</li>
            </ul>
          </div>
        </div>

        {/* Best Practices & Mini Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeSlideUp">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">✅ Best Practices</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
              <li>Favor composition over inheritance when designing abstractions.</li>
              <li>Keep interfaces small and focused (Interface Segregation Principle).</li>
              <li>Document the <em>purpose</em> of an abstraction, not just its methods.</li>
              <li>Name abstractions after roles (<code>PaymentProcessor</code>) not actions (<code>ProcessPayment</code>).</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">📋 Mini Checklist</h3>
            <ul className="space-y-2 mt-2 text-gray-700 dark:text-gray-300 list-checkbox">
              <li>✔️ Does my class hide complex implementation?</li>
              <li>✔️ Can a new developer use this without reading internal code?</li>
              <li>✔️ Are the method names intention-revealing?</li>
              <li>✔️ Have I avoided exposing internal data structures?</li>
            </ul>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-5 border-l-8 border-indigo-400 animate-fadeSlideUp">
          <h3 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">🧠 Think about...</h3>
          <p className="italic text-gray-700 dark:text-gray-300 mt-1">Observe carefully: In the BankAccount example, what would happen if the <code>updateLedger()</code> method were public? Could external code misuse it? How does making it private improve abstraction?</p>
          <p className="text-sm text-gray-500 mt-2">Try changing the visibility of <code>validatePin()</code> in RemoteControlAbstraction and see the effect.</p>
        </div>

        {/* FAQ Section */}
        <div className="animate-fadeSlideUp">
          <FAQTemplate
            title="Abstraction in OOP - FAQs"
            questions={questions}
          />
        </div>

        {/* Teacher's Note */}
        <div className="animate-fadeSlideUp mt-8">
          <Teacher
            note="Abstraction is like a car dashboard: students often confuse 'hiding' with 'secrecy'. Emphasize that abstraction is about managing complexity — not security. Use real-life remote controls, ATMs, and vending machines to make it stick. Encourage them to identify abstractions in their favorite apps (e.g., the 'like' button hides database updates)."
          />
        </div>
      </div>
    </div>
  );
};

export default Topic0;