// Topic2.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic2_files/topic2_questions';

const Topic2 = () => {
  // Purpose: Distinguish between propositions (true/false statements) and non-propositions
  // Return: JSX component with classification and examples
  // When & why: After defining propositions, students need to recognize what is NOT a proposition

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
            Proposition vs Non-Proposition
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Learning to separate statements that have truth value from those that don't
          </p>
        </div>

        {/* SVG: Classification diagram */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
            <svg width="400" height="200" viewBox="0 0 400 200" className="w-full max-w-md">
              <defs>
                <linearGradient id="propGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#10B981", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#059669", stopOpacity:1}} />
                </linearGradient>
                <linearGradient id="nonPropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#EF4444", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#DC2626", stopOpacity:1}} />
                </linearGradient>
              </defs>
              {/* Large container */}
              <rect x="20" y="20" width="360" height="160" rx="12" fill="#1F2937" stroke="#374151" strokeWidth="2" />
              <text x="200" y="45" textAnchor="middle" fill="#9CA3AF" fontSize="12">All Statements</text>
              {/* Proposition circle */}
              <circle cx="140" cy="110" r="55" fill="url(#propGrad)" opacity="0.8">
                <animate attributeName="r" values="55;60;55" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="140" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Propositions</text>
              <text x="140" y="125" textAnchor="middle" fill="#D1D5DB" fontSize="11">True / False</text>
              {/* Non-proposition circle */}
              <circle cx="260" cy="110" r="55" fill="url(#nonPropGrad)" opacity="0.8">
                <animate attributeName="r" values="55;60;55" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </circle>
              <text x="260" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Non-Propositions</text>
              <text x="260" y="125" textAnchor="middle" fill="#D1D5DB" fontSize="11">No truth value</text>
            </svg>
          </div>
        </div>

        {/* Core classification */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Two Fundamental Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 p-5 rounded-xl border border-green-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✓</span>
                <h3 className="text-xl font-semibold text-green-400">Propositions</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">Statements that can be assigned a truth value (True or False).</p>
              <div className="text-xs text-gray-400 space-y-1">
                <p>✅ "Swadeep is from Barrackpore"</p>
                <p>✅ "2 + 2 = 4"</p>
                <p>✅ "It is raining"</p>
              </div>
            </div>
            <div className="bg-red-900/20 p-5 rounded-xl border border-red-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✗</span>
                <h3 className="text-xl font-semibold text-red-400">Non-Propositions</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">Statements that cannot be true or false.</p>
              <div className="text-xs text-gray-400 space-y-1">
                <p>❌ "Please close the door" (command)</p>
                <p>❌ "What time is it?" (question)</p>
                <p>❌ "Wow!" (exclamation)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed breakdown of non-proposition types */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Types of Non-Propositions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2 transition-all hover:translate-x-2">
              <h3 className="font-semibold text-blue-400">1. Interrogative (Questions)</h3>
              <p className="text-gray-300 text-sm">Ask for information but assert nothing.</p>
              <p className="text-gray-400 text-xs mt-1">Examples: "Where is Shyamnagar?", "Are you coming?", "What is your name?"</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2 transition-all hover:translate-x-2">
              <h3 className="font-semibold text-red-400">2. Imperative (Commands/Requests)</h3>
              <p className="text-gray-300 text-sm">Direct someone to do something.</p>
              <p className="text-gray-400 text-xs mt-1">Examples: "Close the window.", "Please study hard.", "Go to Ichapur."</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2 transition-all hover:translate-x-2">
              <h3 className="font-semibold text-yellow-400">3. Exclamatory (Exclamations)</h3>
              <p className="text-gray-300 text-sm">Express strong emotion, no truth value.</p>
              <p className="text-gray-400 text-xs mt-1">Examples: "What a beautiful day!", "Oh no!", "Hurray!"</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2 transition-all hover:translate-x-2">
              <h3 className="font-semibold text-purple-400">4. Performative Utterances</h3>
              <p className="text-gray-300 text-sm">The utterance itself performs an action.</p>
              <p className="text-gray-400 text-xs mt-1">Examples: "I promise to pay you.", "I apologize.", "I now pronounce you married."</p>
            </div>
            <div className="border-l-4 border-cyan-500 pl-4 py-2 transition-all hover:translate-x-2">
              <h3 className="font-semibold text-cyan-400">5. Open Sentences (with variables)</h3>
              <p className="text-gray-300 text-sm">Truth depends on unknown values.</p>
              <p className="text-gray-400 text-xs mt-1">Examples: "x + 2 = 5", "He is a teacher" (if 'he' unspecified), "Some students passed" (vague quantifier).</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4 py-2 transition-all hover:translate-x-2">
              <h3 className="font-semibold text-pink-400">6. Paradoxes & Self-Referential Loops</h3>
              <p className="text-gray-300 text-sm">No consistent truth value assignment.</p>
              <p className="text-gray-400 text-xs mt-1">Examples: "This statement is false.", "The barber shaves all who do not shave themselves."</p>
            </div>
          </div>
        </div>

        {/* Extensive comparison table */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Comparison Table</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-3 text-green-400">Propositions</th>
                <th className="text-left py-2 px-3 text-red-400">Non-Propositions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800"><td className="py-2 px-3">Declarative sentences</td><td className="py-2 px-3">Questions, commands, exclamations</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">Have truth value (T/F)</td><td className="py-2 px-3">No truth value</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">Can be negated meaningfully</td><td className="py-2 px-3">Negation doesn't make sense</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">Used in logical arguments</td><td className="py-2 px-3">Cannot be premises/conclusions</td></tr>
              <tr className="border-b border-gray-800"><td className="py-2 px-3">Can be combined with AND, OR, NOT</td><td className="py-2 px-3">Cannot be logically combined</td></tr>
              <tr><td className="py-2 px-3">Example: "Tuhina studies in Shyamnagar"</td><td className="py-2 px-3">Example: "Does Tuhina study in Shyamnagar?"</td></tr>
            </tbody>
          </table>
        </div>

        {/* Many examples: proposition vs non-proposition side by side */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">📚 20+ Examples: Proposition vs Non-Proposition</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-green-900/10 p-3 rounded-lg hover:bg-green-900/20 transition">
                <span className="text-green-400">✓ Proposition:</span> "Abhronila scored 95% on math"
              </div>
              <div className="bg-red-900/10 p-3 rounded-lg hover:bg-red-900/20 transition">
                <span className="text-red-400">✗ Non-prop:</span> "Did Abhronila score 95% on math?"
              </div>
              <div className="bg-green-900/10 p-3 rounded-lg hover:bg-green-900/20 transition">
                <span className="text-green-400">✓ Proposition:</span> "Barrackpore is in West Bengal"
              </div>
              <div className="bg-red-900/10 p-3 rounded-lg hover:bg-red-900/20 transition">
                <span className="text-red-400">✗ Non-prop:</span> "Please tell me about Barrackpore"
              </div>
              <div className="bg-green-900/10 p-3 rounded-lg hover:bg-green-900/20 transition">
                <span className="text-green-400">✓ Proposition:</span> "The sun rises in the east"
              </div>
              <div className="bg-red-900/10 p-3 rounded-lg hover:bg-red-900/20 transition">
                <span className="text-red-400">✗ Non-prop:</span> "Wow, the sun is rising!"
              </div>
              <div className="bg-green-900/10 p-3 rounded-lg hover:bg-green-900/20 transition">
                <span className="text-green-400">✓ Proposition:</span> "Susmita is taller than 150 cm"
              </div>
              <div className="bg-red-900/10 p-3 rounded-lg hover:bg-red-900/20 transition">
                <span className="text-red-400">✗ Non-prop:</span> "x + 3 = 10" (open sentence)
              </div>
              <div className="bg-green-900/10 p-3 rounded-lg hover:bg-green-900/20 transition">
                <span className="text-green-400">✓ Proposition:</span> "Debangshu plays cricket every Sunday"
              </div>
              <div className="bg-red-900/10 p-3 rounded-lg hover:bg-red-900/20 transition">
                <span className="text-red-400">✗ Non-prop:</span> "I promise to play cricket" (performative)
              </div>
              <div className="bg-green-900/10 p-3 rounded-lg hover:bg-green-900/20 transition">
                <span className="text-green-400">✓ Proposition:</span> "Naihati is on the banks of Hooghly"
              </div>
              <div className="bg-red-900/10 p-3 rounded-lg hover:bg-red-900/20 transition">
                <span className="text-red-400">✗ Non-prop:</span> "What a lovely river!"
              </div>
            </div>
          </div>
        </div>

        {/* Real-world importance */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">Why Distinguish Propositions from Non-Propositions?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">🔍</span>
              <span className="text-gray-300"><span className="font-semibold">Logical Reasoning:</span> Only propositions can be premises or conclusions in arguments.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">💻</span>
              <span className="text-gray-300"><span className="font-semibold">Programming:</span> Conditions in if/while must be propositions (boolean expressions).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">⚖️</span>
              <span className="text-gray-300"><span className="font-semibold">Legal Documents:</span> Facts in court must be propositions; rhetorical questions are not evidence.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">📊</span>
              <span className="text-gray-300"><span className="font-semibold">Database Queries:</span> WHERE clause requires propositional conditions.</span>
            </li>
          </ul>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">The "Truth-Value Test":</span> If you can answer "True" or "False" to the statement (not to a question), it's a proposition.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Remove Interrogatives:</span> Convert "Is it raining?" → "It is raining." Now test truth value.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Commands become propositions when reported:</span> "He ordered to close the door" is a proposition (true/false about the order).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">🎯</span>
              <span className="text-gray-300"><span className="font-semibold">Open sentences need binding:</span> "x > 5" → assign x a value to become a proposition.</span>
            </li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls & Misconceptions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Thinking rhetorical questions are propositions — they are still questions, not declarative.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Believing all English sentences are propositions — many are not.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Confusing performative utterances with statements about performatives: "I promise" vs "He promised" (the latter is a proposition).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <span className="text-gray-300">Assuming that if a sentence ends with a period it's automatically a proposition — exclamations can end with periods too.</span>
            </li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Always apply the truth-value test: "Is this sentence either true or false?"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">When analyzing natural language, rephrase ambiguous utterances into declarative form.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">In programming, ensure all conditions are boolean expressions; don't use assignments as conditions accidentally.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 text-xl">→</span>
              <span className="text-gray-300">Remember: a false proposition is still a proposition — false ≠ non-proposition.</span>
            </li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" />
              <span className="text-gray-300">I can distinguish declarative sentences from questions, commands, exclamations.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" />
              <span className="text-gray-300">I understand that non-propositions have no truth value.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" />
              <span className="text-gray-300">I can identify open sentences and paradoxes as non-propositions.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" />
              <span className="text-gray-300">I can convert questions into propositional form for analysis.</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50 transition-all">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-orange-500" />
              <span className="text-gray-300">I know that false propositions are still valid propositions.</span>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">
            "Next time you're in Shyamnagar or Ichapur, listen to conversations. Count how many sentences are declarative (propositions) vs questions or commands. Notice that 'Please pass the salt' is not a proposition, but 'He asked me to pass the salt' is a proposition about the request."
          </p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s]">
          <Teacher note="Students often struggle with the idea that false statements are still propositions. Emphasize that 'proposition' is about form (declarative with truth value), not truth. Use role-play: give commands, ask questions, exclaim, and then ask 'Can this be true or false?' The distinction is crucial for later topics like truth tables and logical equivalence." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s]">
          <FAQTemplate
            title="Proposition vs Non-Proposition FAQs"
            questions={questions}
          />
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_.*\\] { animation: none !important; }
        }
        .dark { color-scheme: dark; }
      `}</style>
    </div>
  );
};

export default Topic2;