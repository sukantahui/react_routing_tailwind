// Topic18.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic18_files/topic18_questions';

const Topic18 = () => {
  // Interactive state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Original: p ⇒ q
  const original = !pVal || qVal;
  // Contrapositive: ¬q ⇒ ¬p
  const contrapositive = !qVal || !pVal;
  // Converse (for contrast): q ⇒ p
  const converse = !qVal || pVal;
  // Inverse (for contrast): ¬p ⇒ ¬q
  const inverse = pVal || !qVal; // ¬p ⇒ ¬q ≡ p ∨ ¬q

  // Show equivalence
  const equivalent = original === contrapositive;

  // Truth table rows for visual comparison
  const truthRows = [
    { p: true, q: true, imp: true, contra: true, conv: true, inv: true },
    { p: true, q: false, imp: false, contra: false, conv: true, inv: true },
    { p: false, q: true, imp: true, contra: true, conv: false, inv: false },
    { p: false, q: false, imp: true, contra: true, conv: true, inv: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Relationship Between Implication and Contrapositive
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Why "if p then q" is logically the same as "if not q then not p"
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">The Fundamental Equivalence</h2>
          <p className="leading-relaxed">
            The <strong>contrapositive</strong> of an implication <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">p ⇒ q</code> is <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">¬q ⇒ ¬p</code>. These two statements are <strong>logically equivalent</strong> — they always have the same truth value, regardless of what p and q represent.
          </p>
          <p className="leading-relaxed mt-3">
            This is not just a mathematical curiosity; it's a powerful tool in reasoning, proof writing, and even everyday conversation. When you say, "If it's a dog, then it's a mammal," you are also asserting, "If it's not a mammal, then it's not a dog." The two statements are two sides of the same logical coin.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Key insight:</strong> The contrapositive is the only one among converse, inverse, and contrapositive that is equivalent to the original. This makes it invaluable in proofs.</p>
          </div>
        </div>

        {/* Truth Table Comparison */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Truth Table: Implication vs Contrapositive (and others)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-3 py-2">p</th><th className="px-3 py-2">q</th>
                  <th className="px-3 py-2">p ⇒ q</th>
                  <th className="px-3 py-2">¬q ⇒ ¬p (Contrapositive)</th>
                  <th className="px-3 py-2">q ⇒ p (Converse)</th>
                  <th className="px-3 py-2">¬p ⇒ ¬q (Inverse)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {truthRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-mono">{row.imp ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-mono">{row.contra ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-mono">{row.conv ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-mono">{row.inv ? 'T' : 'F'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Notice: Original and contrapositive columns are identical. Converse and inverse are also identical to each other, but different from original.</p>
        </div>

        {/* Interactive Demonstrator */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive Equivalence Demonstrator</h2>
          <p className="mb-4">Toggle p and q to see that the contrapositive always matches the original, while converse and inverse may differ.</p>
          
          <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-sm">
            <p>📖 <strong>Definitions:</strong></p>
            <ul className="list-disc list-inside mt-1">
              <li><strong>Original:</strong> p ⇒ q  (if p then q)</li>
              <li><strong>Contrapositive:</strong> ¬q ⇒ ¬p  (if not q then not p)</li>
              <li><strong>Converse:</strong> q ⇒ p  (if q then p)</li>
              <li><strong>Inverse:</strong> ¬p ⇒ ¬q  (if not p then not q)</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="font-bold">Original: p ⇒ q</p>
              <p className="text-2xl font-mono">{original ? 'true' : 'false'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="font-bold">Contrapositive: ¬q ⇒ ¬p</p>
              <p className="text-2xl font-mono">{contrapositive ? 'true' : 'false'}</p>
              <p className={clsx("text-xs mt-1", original === contrapositive ? "text-green-600" : "text-red-600")}>
                {original === contrapositive ? "✓ Always matches original" : "✗ Should never happen"}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="font-bold">Converse: q ⇒ p</p>
              <p className="text-2xl font-mono">{converse ? 'true' : 'false'}</p>
              <p className="text-xs mt-1 text-yellow-600">May differ from original</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="font-bold">Inverse: ¬p ⇒ ¬q</p>
              <p className="text-2xl font-mono">{inverse ? 'true' : 'false'}</p>
              <p className="text-xs mt-1 text-yellow-600">May differ from original</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">💡 Observe: The contrapositive is always identical to the original. The converse and inverse are identical to each other but differ from the original when p and q have opposite truth values.</p>
        </div>

        {/* Algebraic Proof of Equivalence */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">📐 Algebraic Proof of Equivalence</h2>
          <p>Using the material implication law (<code>p ⇒ q ≡ ¬p ∨ q</code>), we can prove the equivalence algebraically:</p>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm space-y-1 mt-2">
            <p>p ⇒ q</p>
            <p className="ml-4">≡ ¬p ∨ q &nbsp;&nbsp;&nbsp;(by material implication)</p>
            <p>¬q ⇒ ¬p</p>
            <p className="ml-4">≡ ¬(¬q) ∨ ¬p &nbsp;&nbsp;&nbsp;(by material implication)</p>
            <p className="ml-8">≡ q ∨ ¬p &nbsp;&nbsp;&nbsp;(double negation)</p>
            <p className="ml-8">≡ ¬p ∨ q &nbsp;&nbsp;&nbsp;(commutativity of OR)</p>
            <p>∴ p ⇒ q ≡ ¬q ⇒ ¬p</p>
          </div>
          <p className="mt-3 text-sm">This shows the two statements are logically identical, not just similar.</p>
        </div>

        {/* Why This Relationship Matters */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">Why This Relationship Matters</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li><strong>Proof by Contrapositive:</strong> Instead of proving p ⇒ q directly, you can prove ¬q ⇒ ¬p. This is often easier because the contrapositive might give you a more convenient assumption.</li>
            <li><strong>Logical Simplification:</strong> You can replace an implication with its contrapositive in any logical expression without changing meaning.</li>
            <li><strong>Natural Reasoning:</strong> Humans often think in contrapositive terms. "If you don't study, you won't pass" is the contrapositive of "If you pass, you studied" — both convey the same logical constraint.</li>
            <li><strong>Database Query Optimization:</strong> Query optimizers use logical equivalences including contrapositive to rewrite conditions for better performance.</li>
          </ul>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">Classic example: Prove "If n² is even, then n is even" by proving its contrapositive "If n is odd, then n² is odd" — much simpler.</p>
          </div>
        </div>

        {/* Real-World Examples with Student Names */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">🌍 Real-World Examples</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If Swadeep is in Barrackpore, then he is in West Bengal." (True)</p>
              <p><strong>Contrapositive:</strong> "If Swadeep is NOT in West Bengal, then he is NOT in Barrackpore." (Also true)</p>
              <p className="text-xs text-gray-500 mt-1">Both statements convey the same geographical constraint.</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If Tuhina passes the exam, then she studied." (Debatable, but assume true)</p>
              <p><strong>Contrapositive:</strong> "If Tuhina did NOT study, then she will NOT pass." (Logically equivalent, and often how parents think!)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If a figure is a square, then it is a rectangle." (True)</p>
              <p><strong>Contrapositive:</strong> "If a figure is NOT a rectangle, then it is NOT a square." (True)</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Confusing contrapositive with converse:</strong> Converse is q⇒p, which is NOT equivalent. Only contrapositive works.</li>
            <li><strong>Forgetting to negate both parts:</strong> Some students swap but forget to add negations.</li>
            <li><strong>Misapplying to biconditionals:</strong> For p⇔q, the contrapositive of each direction is the other direction, but the whole biconditional is symmetric.</li>
            <li><strong>Assuming inverse works the same:</strong> Inverse is ¬p⇒¬q, which is NOT equivalent to original (it's equivalent to converse).</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>When stuck on a direct proof, try contrapositive.</strong> It often simplifies assumptions.</li>
            <li><strong>Always write contrapositive as ¬q ⇒ ¬p</strong> — remember: swap AND negate.</li>
            <li><strong>Use the mnemonic:</strong> "Flip it and reverse it" (but also negate).</li>
            <li><strong>In programming, use contrapositive to clarify conditions:</strong> Replace complex negated conditions with their contrapositive for readability.</li>
            <li><strong>Practice translating English statements into contrapositive form</strong> to build intuition.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Did you swap antecedent and consequent?</li>
              <li>☑️ Did you negate both the new antecedent and new consequent?</li>
              <li>☑️ Is your contrapositive logically equivalent? (It always is!)</li>
              <li>☑️ Are you sure you didn't accidentally write the converse?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <Teacher note="The relationship between implication and its contrapositive is one of the most useful logical equivalences. Spend time contrasting it with the converse and inverse. Use the classic math proof: 'If n² is even, then n is even' is much easier via contrapositive. Also point out that in everyday language, people often use contrapositive without realizing it. A good classroom exercise: give students several implications and ask them to write the contrapositive, converse, and inverse, then identify which are equivalent." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1000">
          <FAQTemplate title="Implication & Contrapositive Relationship FAQs" questions={questions} />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }
        .animate-\\[slideUp_0\\.5s_ease-out\\] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic18;