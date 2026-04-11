// Topic5.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic5_files/topic5_questions';

const Topic5 = () => {
  // Purpose: Introduce logical implication (⇒) – if-then statements
  // Return: JSX component with definition, truth table, examples, and applications
  // When & why: After basic operators (NOT, AND, OR), students need conditional reasoning

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Logical Operator: Implication (⇒)
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            If-Then reasoning — the heart of logical deduction and conditional statements
          </p>
        </div>

        {/* SVG: Implication arrow illustration */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20">
            <svg width="400" height="160" viewBox="0 0 400 160" className="w-full max-w-md">
              <defs>
                <linearGradient id="impGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#6366F1", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#A855F7", stopOpacity:1}} />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#A855F7" />
                </marker>
              </defs>
              
              <rect x="20" y="50" width="120" height="50" rx="8" fill="#1E293B" stroke="#6366F1" strokeWidth="2">
                <animate attributeName="stroke" values="#6366F1;#A855F7;#6366F1" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="80" y="80" textAnchor="middle" fill="#A5B4FC" fontSize="13">Antecedent (p)</text>
              
              <line x1="145" y1="75" x2="225" y2="75" stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrowhead)">
                <animate attributeName="stroke-dashoffset" from="80" to="0" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="185" y="65" textAnchor="middle" fill="#9CA3AF" fontSize="11">⇒</text>
              
              <rect x="235" y="50" width="120" height="50" rx="8" fill="#1E293B" stroke="#A855F7" strokeWidth="2">
                <animate attributeName="stroke" values="#A855F7;#6366F1;#A855F7" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </rect>
              <text x="295" y="80" textAnchor="middle" fill="#C4B5FD" fontSize="13">Consequent (q)</text>
              <text x="200" y="125" textAnchor="middle" fill="#9CA3AF" fontSize="12">p ⇒ q  ("if p then q")</text>
            </svg>
          </div>
        </div>

        {/* Definition */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">What is Implication (⇒)?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The implication <span className="font-mono text-indigo-400">p ⇒ q</span> (read as <span className="text-yellow-400">"if p then q"</span>) is a logical connective
            that represents <span className="text-green-400">conditional reasoning</span>. It asserts that <span className="text-yellow-400">whenever p is true, q must also be true</span>.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The proposition <span className="font-mono">p</span> is called the <span className="text-cyan-400">antecedent</span> (or hypothesis/premise), and
            <span className="font-mono">q</span> is the <span className="text-purple-400">consequent</span> (or conclusion). An implication is false
            <span className="text-red-400"> only when the antecedent is true and the consequent is false</span>.
          </p>
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border-l-4 border-indigo-500">
            <p className="text-gray-200 font-mono text-sm">📌 Formal definition: p ⇒ q is logically equivalent to ~p ∨ q.</p>
          </div>
        </div>

        {/* Truth Table */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Truth Table for Implication</h2>
          <div className="flex justify-center">
            <table className="w-64 text-center border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2 text-cyan-400">p</th>
                  <th className="p-2 text-purple-400">q</th>
                  <th className="p-2 text-indigo-400">p ⇒ q</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td className="p-2">T</td><td className="p-2">T</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td className="p-2">T</td><td className="p-2">F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td className="p-2">F</td><td className="p-2">T</td><td className="text-green-400">T</td></tr>
                <tr><td className="p-2">F</td><td className="p-2">F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            The implication is false <span className="text-red-400">only in the case</span> where p is true and q is false.<br/>
            When the antecedent is false, the implication is <span className="text-green-400">vacuously true</span> (no counterexample).
          </p>
        </div>

        {/* Understanding the tricky cases */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Understanding "False → Anything = True"</h2>
          <p className="text-gray-300 mb-3">This is the most counterintuitive part of implication. Why is (F ⇒ T) true and (F ⇒ F) also true?</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-900/20 p-3 rounded-lg">
              <p className="font-semibold text-purple-300">Example: "If the moon is made of cheese, then 2+2=4"</p>
              <p className="text-gray-300 text-sm mt-1">The antecedent is false. The statement as a whole is considered <span className="text-green-400">true</span> because a false premise can imply anything — there's no counterexample where premise true and conclusion false.</p>
            </div>
            <div className="bg-purple-900/20 p-3 rounded-lg">
              <p className="font-semibold text-purple-300">Example: "If the moon is made of cheese, then 2+2=5"</p>
              <p className="text-gray-300 text-sm mt-1">Again antecedent false. Even though the conclusion is false, the implication is still <span className="text-green-400">true</span> (vacuously). The promise "if cheese-moon then something" is not broken because cheese-moon never happens.</p>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-3">💡 Think of an implication as a promise: "If you study, you will pass." If you don't study, the promise is kept regardless of passing/failing.</p>
        </div>

        {/* Real-life examples with local context */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">📚 Real-Life Examples of Implication</h2>
          <div className="space-y-4">
            <div className="border border-indigo-700/50 rounded-lg p-3 bg-indigo-900/10">
              <p className="font-mono text-indigo-300">p = "Swadeep studies", q = "Swadeep passes exam" → p ⇒ q</p>
              <p className="text-gray-300 text-sm">"If Swadeep studies, then he passes." True except if he studies but fails.</p>
            </div>
            <div className="border border-purple-700/50 rounded-lg p-3 bg-purple-900/10">
              <p className="font-mono text-purple-300">p = "It rains in Barrackpore", q = "Ground gets wet" → p ⇒ q</p>
              <p className="text-gray-300 text-sm">"If it rains, then ground gets wet." False only if rain but ground dry (e.g., covered).</p>
            </div>
            <div className="border border-pink-700/50 rounded-lg p-3 bg-pink-900/10">
              <p className="font-mono text-pink-300">p = "Abhronila scores ≥ 90%", q = "She gets an A grade" → p ⇒ q</p>
              <p className="text-gray-300 text-sm">"If she scores ≥90%, then she gets an A." True unless high score but no A.</p>
            </div>
            <div className="border border-cyan-700/50 rounded-lg p-3 bg-cyan-900/10">
              <p className="font-mono text-cyan-300">p = "Train is on time", q = "I reach Ichapur by 9 AM" → p ⇒ q</p>
              <p className="text-gray-300 text-sm">"If train is on time, then I reach by 9 AM." False if train on time but I'm late.</p>
            </div>
          </div>
        </div>

        {/* Equivalent forms */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Logical Equivalences of Implication</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span className="text-gray-300"><span className="font-mono">p ⇒ q</span> ≡ <span className="font-mono">~p ∨ q</span> (most common transformation)</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span className="text-gray-300"><span className="font-mono">p ⇒ q</span> ≡ <span className="font-mono">~(p ∧ ~q)</span> (negation of counterexample)</span></li>
            <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span className="text-gray-300"><span className="font-mono">~(p ⇒ q)</span> ≡ <span className="font-mono">p ∧ ~q</span> (the only falsifying case)</span></li>
          </ul>
          <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
            <p className="text-gray-300 text-sm">In programming, implication is not a built-in operator, but you can use <span className="font-mono">!p || q</span> or <span className="font-mono">!(p && !q)</span>.</p>
          </div>
        </div>

        {/* Programming application */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">Implication in Programming</h2>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
            <p className="text-blue-400">// Direct representation of p ⇒ q: if (!p || q) {`{ ... }`}</p>
            <p className="text-gray-300">let p = (user.isLoggedIn);</p>
            <p className="text-gray-300">let q = (user.hasPermission);</p>
            <p className="text-gray-300">if (!p || q) {`{`}</p>
            <p className="text-gray-300 text-indent-4">console.log("Implication holds: either not logged in or has permission");</p>
            <p className="text-gray-300">{`}`}</p>
            <p className="text-blue-400 mt-2">// Equivalent: if (p && !q) is the violation case</p>
            <p className="text-gray-300">if (p && !q) {`{`}</p>
            <p className="text-gray-300 text-indent-4">console.log("Implication violated: logged in but no permission");</p>
            <p className="text-gray-300">{`}`}</p>
          </div>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Rewrite as "not p or q":</span> This often clarifies meaning and simplifies proofs.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Find the counterexample:</span> To test if p⇒q is true, look for p true and q false.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Vacuous truth:</span> If antecedent is false, the implication is automatically true — use this in mathematical proofs.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Contrapositive:</span> p⇒q ≡ ~q⇒~p (very useful for proof by contradiction).</span></li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls & Misconceptions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Thinking (F⇒F) is false — it's actually true (vacuously).</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Confusing implication with equivalence: p⇒q does NOT mean q⇒p.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Assuming "if p then q" means p causes q — logical implication does not imply causality.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Misinterpreting "only if": "p only if q" means p ⇒ q, not q ⇒ p.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Forgetting that implication is false only in one row.</span></li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">When translating "if p then q", always identify antecedent (after "if") and consequent (after "then").</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Use the equivalent ~p ∨ q to simplify complex logical expressions.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">To prove an implication, assume antecedent true and derive consequent.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">To disprove an implication, find a counterexample (p true, q false).</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">In code, prefer explicit conditionals over rewriting as !p||q for readability.</span></li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-indigo-500" /><span className="text-gray-300">I can write the truth table for p ⇒ q.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-indigo-500" /><span className="text-gray-300">I understand that false antecedent makes implication true (vacuous truth).</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-indigo-500" /><span className="text-gray-300">I know that implication is false only when p is true and q is false.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-indigo-500" /><span className="text-gray-300">I can rewrite p ⇒ q as ~p ∨ q.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-indigo-500" /><span className="text-gray-300">I can identify antecedent and consequent in English conditionals.</span></div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">"In Barrackpore, a sign says: 'If train is delayed, then passengers get a refund.' Under what situation would the sign be false? (Train delayed but no refund). What if train is on time? The sign is true regardless of refund — that's vacuous truth. Try creating your own implications about Shyamnagar or Naihati."</p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s]">
          <Teacher note="Students struggle most with vacuous truth (false antecedent). Use concrete promises: 'If you clean your room, you get candy.' If they don't clean, the promise is kept whether they get candy or not. Also clarify that logical implication is not causal. Emphasize the counterexample method for testing truth. The equivalence ~p ∨ q is extremely useful — have students practice converting back and forth." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s]">
          <FAQTemplate title="Implication Operator FAQs" questions={questions} />
        </div>

      </div>
      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.animate-\\[fadeSlideUp_.*\\]{animation:none!important}}.dark{color-scheme:dark}`}</style>
    </div>
  );
};

export default Topic5;