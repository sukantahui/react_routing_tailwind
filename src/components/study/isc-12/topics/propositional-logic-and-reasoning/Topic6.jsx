// Topic6.jsx
import React from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import Teacher from '../../../../../common/TeacherSukantaHui';
import questions from './topic6_files/topic6_questions';

const Topic6 = () => {
  // Purpose: Introduce biconditional operator (⇔) – if and only if (iff)
  // Return: JSX component with definition, truth table, examples, applications
  // When & why: After implication, students need equivalence (both directions)

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-4">
            Logical Operator: Biconditional (⇔)
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            "If and only if" — the two‑way implication that expresses logical equivalence
          </p>
        </div>

        {/* SVG: Double arrow illustration */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.1s] flex justify-center">
          <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20">
            <svg width="420" height="160" viewBox="0 0 420 160" className="w-full max-w-md">
              <defs>
                <linearGradient id="biGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor:"#10B981", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#14B8A6", stopOpacity:1}} />
                </linearGradient>
                <marker id="arrowLeft" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto-start-reverse">
                  <polygon points="10 0, 0 3.5, 10 7" fill="#14B8A6" />
                </marker>
                <marker id="arrowRight" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#14B8A6" />
                </marker>
              </defs>
              
              <rect x="20" y="50" width="120" height="50" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2">
                <animate attributeName="stroke" values="#10B981;#14B8A6;#10B981" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x="80" y="80" textAnchor="middle" fill="#A7F3D0" fontSize="13">p</text>
              
              <rect x="260" y="50" width="120" height="50" rx="8" fill="#1E293B" stroke="#14B8A6" strokeWidth="2">
                <animate attributeName="stroke" values="#14B8A6;#10B981;#14B8A6" dur="3s" begin="1.5s" repeatCount="indefinite" />
              </rect>
              <text x="320" y="80" textAnchor="middle" fill="#99F6E4" fontSize="13">q</text>
              
              <line x1="145" y1="75" x2="255" y2="75" stroke="#14B8A6" strokeWidth="2" markerStart="url(#arrowLeft)" markerEnd="url(#arrowRight)">
                <animate attributeName="stroke-dashoffset" from="110" to="0" dur="2s" repeatCount="indefinite" />
              </line>
              <text x="200" y="65" textAnchor="middle" fill="#9CA3AF" fontSize="11">⇔</text>
              <text x="200" y="125" textAnchor="middle" fill="#9CA3AF" fontSize="12">p ⇔ q  ("p if and only if q")</text>
            </svg>
          </div>
        </div>

        {/* Definition */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">What is the Biconditional (⇔)?</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The biconditional <span className="font-mono text-emerald-400">p ⇔ q</span> (read as <span className="text-yellow-400">"p if and only if q"</span> or
            <span className="text-yellow-400"> "p iff q"</span>) means that <span className="text-green-400">p and q have the same truth value</span>.
          </p>
          <p className="text-gray-300 leading-relaxed">
            It is true when <span className="text-cyan-400">both are true</span> or <span className="text-purple-400">both are false</span>.
            It is false when one is true and the other is false.
            The biconditional is essentially <span className="text-yellow-400">two implications combined</span>: (p ⇒ q) ∧ (q ⇒ p).
          </p>
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border-l-4 border-emerald-500">
            <p className="text-gray-200 font-mono text-sm">📌 Formal definition: p ⇔ q ≡ (p ⇒ q) ∧ (q ⇒ p) ≡ (p ∧ q) ∨ (~p ∧ ~q).</p>
          </div>
        </div>

        {/* Truth Table */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.3s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Truth Table for Biconditional</h2>
          <div className="flex justify-center">
            <table className="w-64 text-center border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2 text-cyan-400">p</th>
                  <th className="p-2 text-purple-400">q</th>
                  <th className="p-2 text-emerald-400">p ⇔ q</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800"><td className="p-2">T</td><td className="p-2">T</td><td className="text-green-400">T</td></tr>
                <tr className="border-b border-gray-800"><td className="p-2">T</td><td className="p-2">F</td><td className="text-red-400">F</td></tr>
                <tr className="border-b border-gray-800"><td className="p-2">F</td><td className="p-2">T</td><td className="text-red-400">F</td></tr>
                <tr><td className="p-2">F</td><td className="p-2">F</td><td className="text-green-400">T</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            The biconditional is true <span className="text-green-400">whenever p and q agree</span> (both true or both false).<br/>
            It is false when they <span className="text-red-400">disagree</span> (one true, one false).
          </p>
        </div>

        {/* Understanding with Examples */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.4s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Understanding p ⇔ q</h2>
          <p className="text-gray-300 mb-3">Think of it as a <span className="text-yellow-400">two‑way street</span>: p implies q AND q implies p. So p and q are logically equivalent.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-900/20 p-3 rounded-lg">
              <p className="font-semibold text-emerald-300">When both true: T ⇔ T = T</p>
              <p className="text-gray-300 text-sm mt-1">Example: "It is raining ⇔ ground is wet" — if rain and wet, biconditional holds (if both true).</p>
            </div>
            <div className="bg-emerald-900/20 p-3 rounded-lg">
              <p className="font-semibold text-emerald-300">When both false: F ⇔ F = T</p>
              <p className="text-gray-300 text-sm mt-1">Example: "No rain ⇔ ground dry" — if both false, biconditional also true (agreement).</p>
            </div>
            <div className="bg-red-900/20 p-3 rounded-lg">
              <p className="font-semibold text-red-300">When one true, one false: T ⇔ F = F, F ⇔ T = F</p>
              <p className="text-gray-300 text-sm mt-1">Example: "Rain ⇔ ground dry" — impossible; biconditional false.</p>
            </div>
          </div>
        </div>

        {/* Many Real-Life Examples */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">📚 Real-Life Examples of Biconditional</h2>
          <div className="space-y-4">
            <div className="border border-emerald-700/50 rounded-lg p-3 bg-emerald-900/10">
              <p className="font-mono text-emerald-300">p = "A triangle is equilateral", q = "A triangle is equiangular" → p ⇔ q</p>
              <p className="text-gray-300 text-sm">"A triangle is equilateral if and only if it is equiangular." Both properties always occur together.</p>
            </div>
            <div className="border border-teal-700/50 rounded-lg p-3 bg-teal-900/10">
              <p className="font-mono text-teal-300">p = "Swadeep passes the exam", q = "Swadeep scores ≥ 40%" → p ⇔ q</p>
              <p className="text-gray-300 text-sm">If the passing mark is exactly 40%, then passing iff score ≥40%. They always agree.</p>
            </div>
            <div className="border border-cyan-700/50 rounded-lg p-3 bg-cyan-900/10">
              <p className="font-mono text-cyan-300">p = "Abhronila is a citizen", q = "Abhronila can vote" (in a country where only citizens vote) → p ⇔ q</p>
              <p className="text-gray-300 text-sm">Citizen iff can vote — they are equivalent.</p>
            </div>
            <div className="border border-blue-700/50 rounded-lg p-3 bg-blue-900/10">
              <p className="font-mono text-blue-300">p = "It is a leap year", q = "February has 29 days" → p ⇔ q</p>
              <p className="text-gray-300 text-sm">Leap year iff February has 29 days — they are logically equivalent.</p>
            </div>
            <div className="border border-purple-700/50 rounded-lg p-3 bg-purple-900/10">
              <p className="font-mono text-purple-300">p = "The train from Barrackpore is on time", q = "I reach Ichapur by 9 AM" — only if train on time is necessary and sufficient for reaching by 9 AM, then p ⇔ q.</p>
              <p className="text-gray-300 text-sm">But careful: usually not biconditional (other factors affect arrival).</p>
            </div>
          </div>
        </div>

        {/* Equivalences */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.6s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Logical Equivalences of Biconditional</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-emerald-400">•</span><span className="text-gray-300"><span className="font-mono">p ⇔ q</span> ≡ <span className="font-mono">(p ⇒ q) ∧ (q ⇒ p)</span> (definition)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-400">•</span><span className="text-gray-300"><span className="font-mono">p ⇔ q</span> ≡ <span className="font-mono">(p ∧ q) ∨ (~p ∧ ~q)</span> (both true or both false)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-400">•</span><span className="text-gray-300"><span className="font-mono">p ⇔ q</span> ≡ <span className="font-mono">~(p ⊕ q)</span> (negation of exclusive OR)</span></li>
            <li className="flex items-start gap-3"><span className="text-emerald-400">•</span><span className="text-gray-300"><span className="font-mono">~(p ⇔ q)</span> ≡ <span className="font-mono">p ⊕ q</span> (exclusive OR)</span></li>
          </ul>
        </div>

        {/* Programming application */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.7s] bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Biconditional in Programming</h2>
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
            <p className="text-blue-400">// In most languages, there is no built‑in ⇔ operator.</p>
            <p className="text-blue-400">// Implement as equality comparison for booleans:</p>
            <p className="text-gray-300">let p = (age >= 18);</p>
            <p className="text-gray-300">let q = hasLicense;</p>
            <p className="text-gray-300">let biconditional = (p === q);   // true if both true or both false</p>
            <p className="text-blue-400 mt-2">// Or using logical operators:</p>
            <p className="text-gray-300">let biconditional2 = (p && q) || (!p && !q);</p>
            <p className="text-blue-400 mt-2">// Or using implication:</p>
            <p className="text-gray-300">let biconditional3 = (!p || q) && (!q || p);</p>
          </div>
          <p className="text-gray-400 text-xs mt-3">💡 In Python, `==` works for booleans. In JavaScript, `===` works.</p>
        </div>

        {/* Tips & Tricks */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.8s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Professional Tips & Tricks</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">"Iff" is shorthand:</span> Remember "if and only if" means two implications.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Equivalence check:</span> p ⇔ q is true exactly when p and q have same truth value.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Rewrite as (p∧q)∨(~p∧~q):</span> Useful for truth table construction.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">In proofs:</span> To prove p⇔q, prove p⇒q and q⇒p separately.</span></li>
            <li className="flex items-start gap-3"><span className="text-yellow-400">🎯</span><span className="text-gray-300"><span className="font-semibold">Negation:</span> ~(p⇔q) ≡ p⊕q (exactly one is true).</span></li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_0.9s] bg-red-900/20 rounded-2xl p-6 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">⚠️ Common Pitfalls & Misconceptions</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Confusing biconditional with implication: p⇔q is stronger than p⇒q.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Thinking p⇔q means p causes q and q causes p — it's just truth value agreement.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Forgetting that both false makes biconditional true.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Misreading "if and only if" as just "if" — missing the reverse direction.</span></li>
            <li className="flex items-start gap-3"><span className="text-red-400">✗</span><span className="text-gray-300">Using = instead of ⇔ in symbolic logic (equals sign is for identity).</span></li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1s] bg-green-900/20 rounded-2xl p-6 border border-green-500/20">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">When translating "if and only if", explicitly split into two directions.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">Use truth tables to verify biconditional equivalences.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">In programming, compare booleans with `===` instead of rewriting as (p&&q)||(!p&&!q) for clarity.</span></li>
            <li className="flex items-start gap-3"><span className="text-green-400">→</span><span className="text-gray-300">In proofs, label the two directions: (⇒) and (⇐).</span></li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.1s] bg-gray-800/50 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-4">📋 Student Checklist</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500" /><span className="text-gray-300">I can write the truth table for p ⇔ q.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500" /><span className="text-gray-300">I understand that p⇔q is true when p and q agree (both T or both F).</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500" /><span className="text-gray-300">I can rewrite p⇔q as (p⇒q) ∧ (q⇒p).</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500" /><span className="text-gray-300">I can translate English "if and only if" correctly.</span></div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50"><input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-emerald-500" /><span className="text-gray-300">I know the negation of p⇔q is exclusive OR.</span></div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s] bg-yellow-900/20 rounded-2xl p-6 border-l-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-yellow-400 mb-3">💭 Think About This...</h2>
          <p className="text-gray-300 italic">"In Barrackpore, consider: 'You can board the train if and only if you have a ticket.' This means: if you have ticket → you can board, and if you board → you have ticket. What happens if someone boards without ticket? Then the biconditional is false. Try creating a biconditional for a rule in Shyamnagar or Naihati."</p>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.3s]">
          <Teacher note="Students often forget that both false makes biconditional true. Emphasize that biconditional is about agreement, not just both true. Use examples like 'You pass iff you score ≥40' — if you score 30 (false for pass) and also false for ≥40, the biconditional holds (both false). Practice splitting 'iff' into two implications. Relate to programming equality checks." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[fadeSlideUp_0.6s_ease-out_1.4s]">
          <FAQTemplate title="Biconditional Operator FAQs" questions={questions} />
        </div>

      </div>
      <style>{`@keyframes fadeSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@media (prefers-reduced-motion:reduce){.animate-\\[fadeSlideUp_.*\\]{animation:none!important}}.dark{color-scheme:dark}`}</style>
    </div>
  );
};

export default Topic6;