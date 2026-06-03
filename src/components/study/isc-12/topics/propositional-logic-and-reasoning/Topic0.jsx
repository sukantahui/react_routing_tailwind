// Topic0.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic0_files/topic0_questions';

const Topic0 = () => {
  // Purpose: Introduction to Propositional Logic - the foundation of logical reasoning
  // Return: JSX component with complete learning material
  // When & why: Used as first topic in propositional logic curriculum

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Main container with vertical stacking */}
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section with animation */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Introduction to Propositional Logic
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            The foundation of mathematical reasoning and computer science
          </p>
        </div>

        {/* SVG Illustration - Animated Logic Concept */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
            <svg width="400" height="200" viewBox="0 0 400 200" className="w-full max-w-md">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#8B5CF6", stopOpacity:1}} />
                </linearGradient>
              </defs>
              
              {/* Proposition Box */}
              <rect x="20" y="70" width="120" height="60" rx="8" fill="url(#grad1)" opacity="0.9">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="80" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                Proposition
              </text>
              
              {/* Arrow */}
              <line x1="140" y1="100" x2="180" y2="100" stroke="#60A5FA" strokeWidth="2">
                <animate attributeName="stroke-dashoffset" from="40" to="0" dur="2s" repeatCount="indefinite" />
              </line>
              <line x1="140" y1="100" x2="180" y2="100" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
              </line>
              
              {/* True/False Split */}
              <rect x="190" y="40" width="80" height="50" rx="6" fill="#10B981" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
              </rect>
              <text x="230" y="70" textAnchor="middle" fill="white" fontSize="13">TRUE</text>
              
              <rect x="190" y="110" width="80" height="50" rx="6" fill="#EF4444" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" begin="1s" repeatCount="indefinite" />
              </rect>
              <text x="230" y="140" textAnchor="middle" fill="white" fontSize="13">FALSE</text>
              
              <text x="80" y="170" textAnchor="middle" fill="#9CA3AF" fontSize="12">Statement</text>
              <text x="230" y="180" textAnchor="middle" fill="#9CA3AF" fontSize="12">Truth Values</text>
            </svg>
          </div>
        </div>

        {/* What is Propositional Logic Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">What is Propositional Logic?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Propositional logic (also called sentential logic) is the branch of logic that deals with 
            <span className="text-yellow-400 font-medium"> propositions </span> 
            — statements that are either true or false — and how they combine using logical operators.
          </p>
          <p className="text-gray-300 leading-relaxed">
            It provides the mathematical foundation for reasoning, allowing us to determine the validity of arguments,
            design digital circuits, write bug-free code, and build artificial intelligence systems.
          </p>
        </div>

        {/* Real-World Usage Examples */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Real-World Usage Examples</h2>
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-4 py-2 transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-200"><span className="font-semibold text-green-400">Programming:</span> "If user is logged in AND has admin role, then show dashboard"</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2 transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-200"><span className="font-semibold text-purple-400">Digital Circuits:</span> AND gates, OR gates, NOT gates — all based on propositional logic</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2 transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-200"><span className="font-semibold text-yellow-400">AI & Expert Systems:</span> Decision trees, rule-based systems, automated reasoning</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2 transition-all duration-300 hover:translate-x-2">
              <p className="text-gray-200"><span className="font-semibold text-red-400">Legal Reasoning:</span> "If the defendant is guilty AND the evidence is valid, THEN conviction"</p>
            </div>
          </div>
        </div>

        {/* Core Concepts with staggered cards */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s]">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Core Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/60">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">📝 Proposition</h3>
              <p className="text-gray-300 text-sm">A declarative sentence that is either true or false, but not both.</p>
              <p className="text-gray-400 text-xs mt-2">Example: "Swadeep is from Barrackpore"</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/60">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">🎯 Truth Value</h3>
              <p className="text-gray-300 text-sm">The assignment of True (T) or False (F) to a proposition.</p>
              <p className="text-gray-400 text-xs mt-2">Example: "2+2=4" has truth value True</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/60">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">🔤 Logical Variables</h3>
              <p className="text-gray-300 text-sm">Letters (p, q, r) representing propositions for symbolic manipulation.</p>
              <p className="text-gray-400 text-xs mt-2">Example: p = "Tuhina studies in Shyamnagar"</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/60">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">🔗 Logical Operators</h3>
              <p className="text-gray-300 text-sm">Connectives like AND (∧), OR (∨), NOT (~) to form compound statements.</p>
              <p className="text-gray-400 text-xs mt-2">Example: p ∧ q means both p AND q are true</p>
            </div>
          </div>
        </div>

        {/* NEW: Examples of Propositional Logic Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.45s] bg-gray-800/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">📚 Examples of Propositional Logic</h2>
          <p className="text-gray-300 mb-4">Understanding propositions through everyday examples:</p>
          
          <div className="space-y-6">
            {/* Example 1 */}
            <div className="border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/30">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Example 1: Mathematical Propositions</h3>
              <div className="space-y-2 text-gray-300">
                <p>✓ "2 + 2 = 4" → <span className="text-green-400 font-mono">TRUE</span> (objective fact)</p>
                <p>✓ "5 &lt; 3" → <span className="text-red-400 font-mono">FALSE</span> (5 is greater than 3)</p>
                <p>✓ "π is a rational number" → <span className="text-red-400 font-mono">FALSE</span> (π is irrational)</p>
                <p className="text-gray-400 text-sm mt-2">💡 Mathematical statements are always propositions because they have definite truth values.</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/30">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Example 2: Geographic Propositions (Local Context)</h3>
              <div className="space-y-2 text-gray-300">
                <p>✓ "Barrackpore is in West Bengal" → <span className="text-green-400 font-mono">TRUE</span></p>
                <p>✓ "Shyamnagar is the capital of India" → <span className="text-red-400 font-mono">FALSE</span></p>
                <p>✓ "The Ganges flows through Naihati" → <span className="text-green-400 font-mono">TRUE</span></p>
                <p className="text-gray-400 text-sm mt-2">💡 Geographic facts are clear propositions — verifiable through maps and records.</p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/30">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Example 3: Everyday Statements About People</h3>
              <div className="space-y-2 text-gray-300">
                <p>✓ "Abhronila scored 95% on her math test" → <span className="text-green-400 font-mono">TRUE</span> (if verified)</p>
                <p>✓ "Susmita is taller than 6 feet" → <span className="text-red-400 font-mono">FALSE</span> (if actual height is 5'5")</p>
                <p>✓ "Debangshu plays cricket every Sunday" → Truth value depends on actual behavior</p>
                <p className="text-gray-400 text-sm mt-2">💡 Statements about specific people become propositions when we can verify them.</p>
              </div>
            </div>

            {/* Example 4 */}
            <div className="border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/30">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Example 4: Compound Propositions (Using Logical Operators)</h3>
              <div className="space-y-2 text-gray-300">
                <p>✓ "Swadeep studies AND Tuhina practices" → <span className="text-yellow-400">(p ∧ q)</span> — true only if both study</p>
                <p>✓ "It is raining OR it is snowing" → <span className="text-yellow-400">(p ∨ q)</span> — true if at least one occurs</p>
                <p>✓ "NOT (Susmita is late)" → <span className="text-yellow-400">(~p)</span> — true if Susmita is on time</p>
                <p className="text-gray-400 text-sm mt-2">💡 Compound propositions combine simple propositions with operators like AND, OR, NOT.</p>
              </div>
            </div>

            {/* Example 5 */}
            <div className="border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-green-500/50 hover:bg-gray-800/30">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Example 5: Programming Conditions as Propositions</h3>
              <div className="space-y-2 text-gray-300">
                <p className="font-mono text-sm">✓ <span className="text-blue-400">age >= 18</span> → true if age is 18 or more</p>
                <p className="font-mono text-sm">✓ <span className="text-blue-400">user.hasPermission && user.isActive</span> → true only if both are true</p>
                <p className="font-mono text-sm">✓ <span className="text-blue-400">!isEmpty(cart) || isGuest</span> → true if cart not empty OR user is guest</p>
                <p className="text-gray-400 text-sm mt-2">💡 Every condition in an if-statement is a proposition evaluated at runtime.</p>
              </div>
            </div>

            {/* Example 6 - Non-propositions for contrast */}
            <div className="border border-red-700/50 rounded-xl p-4 bg-red-900/10 transition-all duration-300 hover:border-red-500/70">
              <h3 className="text-lg font-semibold text-red-400 mb-2">⚠️ What are NOT Propositions?</h3>
              <div className="space-y-2 text-gray-300">
                <p>✗ "Please close the door" → Command (imperative)</p>
                <p>✗ "What time is it?" → Question (interrogative)</p>
                <p>✗ "Wow, what a beautiful day!" → Exclamation (emotional)</p>
                <p>✗ "This statement is false" → Self-referential paradox</p>
                <p className="text-gray-400 text-sm mt-2">💡 Non-propositions lack a clear truth value — they cannot be classified as true or false.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips & Tricks Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/20">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✓</span>
              <span className="text-gray-300"><span className="font-semibold">Think in Binary:</span> Always reduce statements to True/False, eliminating ambiguity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✓</span>
              <span className="text-gray-300"><span className="font-semibold">Use Parentheses:</span> Like arithmetic, parentheses clarify operator precedence</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✓</span>
              <span className="text-gray-300"><span className="font-semibold">Break Complex Conditions:</span> Split compound statements into atomic propositions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">✓</span>
              <span className="text-gray-300"><span className="font-semibold">Name Variables Meaningfully:</span> Use p, q, r consistently or descriptive names like isRaining, hasPermission</span>
            </li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls & Misconceptions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Questions are NOT propositions:</span> "What time is it?" has no truth value</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Commands/Imperatives:</span> "Close the door" cannot be true or false</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Opinions without clear truth value:</span> "Ice cream is delicious" is subjective</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300"><span className="font-semibold">Self-referential statements:</span> "This statement is false" creates paradox</span>
            </li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Always verify a sentence is declarative before treating it as a proposition</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Use truth tables to validate logical arguments systematically</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Start with simple propositions before combining with operators</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Document assumptions when converting natural language to logic</span>
            </li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" />
              <span className="text-gray-300">I can identify declarative sentences as propositions</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" />
              <span className="text-gray-300">I understand that every proposition has exactly one truth value</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" />
              <span className="text-gray-300">I know the difference between propositions and non-propositions</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" />
              <span className="text-gray-300">I can recognize where propositional logic applies in real life</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-gray-700/50">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500" />
              <span className="text-gray-300">I can identify compound propositions and their components</span>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">
            "Every decision you make — from choosing what to eat to complex programming logic — follows propositional reasoning.
            Try observing how many 'if-then' situations you encounter today in Ichapur or Naihati. Can you identify the propositions?"
          </p>
        </div>

        {/* Teacher's Note Component */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s]">
          <Teacher note="Propositional logic is the alphabet of logical thinking. Spend extra time ensuring students can confidently distinguish between propositions and non-propositions — this is the most common stumbling block. Use everyday examples from Barrackpore, Shyamnagar, and local contexts to make it relatable. Remember: mastery of propositions is essential before introducing operators!" />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s]">
          <FAQTemplate
            title="Propositional Logic Fundamentals FAQs"
            questions={questions}
          />
        </div>

      </div>

      {/* Custom Keyframes Animation */}
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
          .animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
          }
        }
        
        .dark {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default Topic0;