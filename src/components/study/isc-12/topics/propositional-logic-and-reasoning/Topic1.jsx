// Topic1.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic1_files/topic1_questions';

const Topic1 = () => {
  // Purpose: Define what a proposition is - a statement that is either true or false
  // Return: JSX component with complete learning material
  // When & why: Second topic after introduction; establishes the fundamental unit of logic

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Definition of Proposition
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Statements that are either True or False — the building blocks of logical reasoning
          </p>
        </div>

        {/* SVG: Truth value scale */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
            <svg width="400" height="160" viewBox="0 0 400 160" className="w-full max-w-md">
              <defs>
                <linearGradient id="trueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#10B981", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#059669", stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="falseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                </linearGradient>
              </defs>
              {/* Balance scale */}
              <line x1="200" y1="40" x2="200" y2="100" stroke="#6B7280" strokeWidth="2" />
              <circle cx="200" cy="40" r="6" fill="#9CA3AF" />
              <line x1="120" y1="80" x2="280" y2="80" stroke="#6B7280" strokeWidth="2" />
              {/* True pan */}
              <path d="M80 100 L160 100 L150 120 L90 120 Z" fill="url(#trueGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
              </path>
              <text x="120" y="115" textAnchor="middle" fill="white" fontSize="12">TRUE</text>
              {/* False pan */}
              <path d="M240 100 L320 100 L310 120 L250 120 Z" fill="url(#falseGrad)" opacity="0.8">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" begin="1s" repeatCount="indefinite" />
              </path>
              <text x="280" y="115" textAnchor="middle" fill="white" fontSize="12">FALSE</text>
              <text x="200" y="145" textAnchor="middle" fill="#9CA3AF" fontSize="12">Every proposition has exactly one truth value</text>
            </svg>
          </div>
        </div>

        {/* Definition */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">What is a Proposition?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            A <span className="text-yellow-400 font-medium">proposition</span> (also called a <span className="text-yellow-400">statement</span>) is a declarative sentence that is 
            <span className="text-green-400"> either true </span> or <span className="text-red-400"> false</span>, but not both.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Propositions are the fundamental units of propositional logic. They assert facts about the world
            that can be verified. The truth value of a proposition is its assignment of True (T) or False (F).
          </p>
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border-l-4 border-green-500">
            <p className="text-gray-200 font-mono text-sm">📌 Formal definition: A proposition is a statement that has a definite truth value (True or False).</p>
          </div>
        </div>

        {/* Characteristics */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Key Characteristics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <div>
                <h3 className="font-semibold">Declarative Form</h3>
                <p className="text-gray-400 text-sm">Makes an assertion, not a question or command</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <div>
                <h3 className="font-semibold">Definite Truth Value</h3>
                <p className="text-gray-400 text-sm">Either true or false, never both or neither</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <div>
                <h3 className="font-semibold">Objective</h3>
                <p className="text-gray-400 text-sm">Truth does not depend on opinion or perspective</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-800/40 rounded-xl">
              <span className="text-green-400 text-2xl">✓</span>
              <div>
                <h3 className="font-semibold">Verifiable</h3>
                <p className="text-gray-400 text-sm">Can be checked against facts or evidence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Extensive Examples Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">📚 Many Examples of Propositions</h2>
          <p className="text-gray-300 mb-4">Practice identifying true/false statements with these real-world examples:</p>
          
          <div className="space-y-5">
            {/* Category 1: Mathematical facts */}
            <div className="border border-green-700/50 rounded-xl p-4 bg-green-900/10">
              <h3 className="text-lg font-semibold text-green-400 mb-3">🔢 Mathematical & Arithmetic</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "7 + 3 = 10" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "9 × 4 = 35" → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "15 is divisible by 3" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "2 is an odd number" → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "√16 = 4" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "π = 3.14 exactly" → <span className="text-red-400">False</span></div>
              </div>
            </div>

            {/* Category 2: Geographic & Local */}
            <div className="border border-blue-700/50 rounded-xl p-4 bg-blue-900/10">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">📍 Geographic & Local (Barrackpore, Shyamnagar, etc.)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "Barrackpore is in West Bengal" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "Shyamnagar is the capital of India" → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "The Hooghly River flows through Naihati" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "Ichapur is in Bangladesh" → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "Kolkata is the capital of West Bengal" → <span className="text-green-400">True</span></div>
              </div>
            </div>

            {/* Category 3: About people (students) */}
            <div className="border border-purple-700/50 rounded-xl p-4 bg-purple-900/10">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">👥 Statements About People</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "Swadeep lives in Barrackpore" (if true) → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "Tuhina is 25 years old" (if she is 16) → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "Abhronila scored above 90% in math" (if verified) → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "Susmita has won a Nobel Prize" → <span className="text-red-400">False</span></div>
              </div>
            </div>

            {/* Category 4: Scientific facts */}
            <div className="border border-yellow-700/50 rounded-xl p-4 bg-yellow-900/10">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">🔬 Scientific & Natural</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "Water freezes at 0°C at sea level" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "The Sun revolves around the Earth" → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "Humans need oxygen to survive" → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "Whales are fish" → <span className="text-red-400">False</span></div>
              </div>
            </div>

            {/* Category 5: Everyday situations */}
            <div className="border border-indigo-700/50 rounded-xl p-4 bg-indigo-900/10">
              <h3 className="text-lg font-semibold text-indigo-400 mb-3">🏠 Everyday Life</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "The light is on" (if actually on) → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "It is raining right now" (if sunny) → <span className="text-red-400">False</span></div>
                <div className="flex items-center gap-2"><span className="text-green-400">✓</span> "My phone battery is above 50%" (if 75%) → <span className="text-green-400">True</span></div>
                <div className="flex items-center gap-2"><span className="text-red-400">✗</span> "The store is open 24 hours" (if closed at 10 PM) → <span className="text-red-400">False</span></div>
              </div>
            </div>

            {/* Contrast: Non-propositions */}
            <div className="border border-red-700/50 rounded-xl p-4 bg-red-900/10 mt-4">
              <h3 className="text-lg font-semibold text-red-400 mb-3">🚫 What are NOT Propositions (No truth value)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                <div>❌ "Please close the door" (command)</div>
                <div>❌ "What time is it?" (question)</div>
                <div>❌ "Wow, amazing!" (exclamation)</div>
                <div>❌ "I promise to come" (performative)</div>
                <div>❌ "This statement is false" (paradox)</div>
                <div>❌ "x + 5 = 10" (open sentence, variable)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Truth Values Explanation */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Truth Values: True (T) and False (F)</h2>
          <p className="text-gray-300 mb-4">
            Every proposition is assigned a <span className="text-yellow-400">truth value</span>: either <span className="text-green-400">True (T)</span> or <span className="text-red-400">False (F)</span>.
            This binary nature is what makes propositional logic so powerful in computing and mathematics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-xl font-semibold text-green-400 mb-2">True (T)</h3>
              <p className="text-gray-300 text-sm">The proposition correctly describes reality.</p>
              <p className="text-gray-400 text-xs mt-2">Example: "The Earth orbits the Sun" → T</p>
            </div>
            <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
              <h3 className="text-xl font-semibold text-red-400 mb-2">False (F)</h3>
              <p className="text-gray-300 text-sm">The proposition does NOT describe reality.</p>
              <p className="text-gray-400 text-xs mt-2">Example: "The Moon is made of cheese" → F</p>
            </div>
          </div>
        </div>

        {/* Real-world usage */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Real-World Applications</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">💻</span>
              <span className="text-gray-300"><span className="font-semibold">Software Validation:</span> Conditions in if statements (e.g., `if (user.isLoggedIn)`) evaluate to true/false</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">📋</span>
              <span className="text-gray-300"><span className="font-semibold">Quality Control:</span> "Product diameter is within tolerance" → true or false determines pass/fail</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">⚖️</span>
              <span className="text-gray-300"><span className="font-semibold">Legal Judgments:</span> "Defendant was at the crime scene" is a proposition that must be true for conviction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">🎮</span>
              <span className="text-gray-300"><span className="font-semibold">Game Logic:</span> "Player has enough health" or "Enemy is within range" are propositions evaluated every frame</span>
            </li>
          </ul>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">The "So..." Test:</span> If you can prefix a sentence with "It is true that..." and it makes sense, it's likely a proposition.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Watch for Variables:</span> "x > 5" is NOT a proposition until x is assigned a specific value.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Time Matters:</span> "It is raining" has a truth value that changes over time. Propositions are evaluated at a specific moment.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Avoid Opinions:</span> "Chocolate is delicious" is not a proposition because deliciousness is subjective. Instead use "Most people surveyed liked chocolate" — that's verifiable.</span>
            </li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls & Misconceptions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Mistaking Questions for Propositions:</span> "Are you coming?" cannot be true/false.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Future Statements:</span> "It will rain tomorrow" has no definite truth value today.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Open Sentences:</span> "She is a student" — who is "she"? Without reference, can't evaluate.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Paradoxes:</span> "This sentence is false" creates a self-referential loop with no consistent truth value.</span>
            </li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Always check if a sentence makes a definite claim before labeling it a proposition.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">When analyzing natural language, rephrase ambiguous statements to clarify the assertion.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Use variables (p, q) to represent propositions only after confirming they are true/false statements.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">In programming, always ensure boolean expressions are fully determined (no undefined variables).</span>
            </li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-green-500" />
              <span className="text-gray-300">I can identify a declarative sentence as a proposition.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-green-500" />
              <span className="text-gray-300">I understand that every proposition has exactly one truth value (T or F).</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-green-500" />
              <span className="text-gray-300">I can distinguish propositions from questions, commands, and exclamations.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-green-500" />
              <span className="text-gray-300">I can provide examples of true and false propositions from different domains.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-green-500" />
              <span className="text-gray-300">I can identify common pitfalls like open sentences and paradoxes.</span>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">
            "Try walking through your day and noting every declarative statement you hear or say. 
            Which ones are clearly true or false? Which ones are ambiguous? For example, in Barrackpore,
            someone says 'The train is late.' Is that a proposition? What would you need to verify it?"
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s]">
          <Teacher note="Students often confuse questions and commands with propositions. Use the 'true/false test' repeatedly: ask them to assign a truth value to every sentence. Emphasize that 'It is true that...' prefix works only for propositions. Local examples from Shyamnagar, Naihati, and Ichapur make the concept concrete. Spend extra time on open sentences (x+2=5) — they are not propositions until variables are bound." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s]">
          <FAQTemplate
            title="Proposition Definition FAQs"
            questions={questions}
          />
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_.*\\] { animation: none !important; }
        }
        .dark { color-scheme: dark; }
      `}</style>
    </div>
  );
};

export default Topic1;