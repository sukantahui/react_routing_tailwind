// Topic17.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic17_files/topic17_questions';

const Topic17 = () => {
  // Interactive state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Original implication: p ⇒ q
  // p = antecedent, q = consequent
  const original = !pVal || qVal;

  // Contrapositive: ¬q ⇒ ¬p
  const contrapositive = !qVal || !pVal;  // ¬(¬q) ∨ ¬p = q ∨ ¬p, same as ¬p ∨ q

  // Are they equivalent? (Yes, always)
  const areEquivalent = original === contrapositive;

  // Truth table data for implication vs contrapositive
  const truthTableData = [
    { p: true, q: true, imp: true, contra: true, same: true },
    { p: true, q: false, imp: false, contra: false, same: true },
    { p: false, q: true, imp: true, contra: true, same: true },
    { p: false, q: false, imp: true, contra: true, same: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Contrapositive of a Proposition
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            The powerful equivalent form that swaps and negates
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What is the Contrapositive?</h2>
          <p className="leading-relaxed">
            Given an implication <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">p ⇒ q</code> ("if p then q"), its <strong className="text-blue-600 dark:text-blue-400">contrapositive</strong> is formed by <strong>swapping and negating both the antecedent and the consequent</strong>: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">¬q ⇒ ¬p</code> ("if not q then not p").
          </p>
          <p className="leading-relaxed mt-3">
            <strong className="text-green-600 dark:text-green-400">Crucial fact:</strong> The contrapositive is <strong>logically equivalent</strong> to the original implication. This is one of the most useful transformations in logic and mathematical proofs.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Original: "If Swadeep is from Barrackpore, then he is from West Bengal." Contrapositive: "If Swadeep is NOT from West Bengal, then he is NOT from Barrackpore." Both are true. The contrapositive often feels more natural in reasoning.</p>
          </div>
        </div>

        {/* Truth Table Verification */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Truth Table: Implication vs Contrapositive</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-3 py-2">p</th><th className="px-3 py-2">q</th>
                  <th className="px-3 py-2">p ⇒ q (Original)</th>
                  <th className="px-3 py-2">¬q ⇒ ¬p (Contrapositive)</th>
                  <th className="px-3 py-2">Same?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {truthTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.imp ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.contra ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-bold text-green-600">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">All rows match → Contrapositive is logically equivalent to original.</p>
        </div>

        {/* Interactive Contrapositive Checker */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive Contrapositive Checker</h2>
          <p className="mb-4">Toggle p and q to see that the contrapositive always matches the original.</p>
          
          {/* Antecedent/Consequent Reminder */}
          <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-sm">
            <p>📖 <strong>Recall:</strong> In <code>p ⇒ q</code>, <strong className="text-blue-600">p</strong> is the <strong>antecedent</strong> and <strong className="text-green-600">q</strong> is the <strong>consequent</strong>.</p>
            <p className="mt-1">The <strong>contrapositive</strong> swaps AND negates both: <code>¬q ⇒ ¬p</code> → "if NOT q then NOT p".</p>
          </div>

          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p (antecedent) = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q (consequent) = {qVal ? 'true' : 'false'}</span></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
              <p className="font-mono font-bold">Original: p ⇒ q</p>
              <div className="text-2xl font-bold mt-2">{original ? 'true' : 'false'}</div>
              <p className="text-sm text-gray-500 mt-1">If {pVal ? 'p true' : 'p false'} then {qVal ? 'q true' : 'q false'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
              <p className="font-mono font-bold">Contrapositive: ¬q ⇒ ¬p</p>
              <div className="text-2xl font-bold mt-2">{contrapositive ? 'true' : 'false'}</div>
              <p className="text-sm text-gray-500 mt-1">If NOT q ({!qVal ? 'true' : 'false'}) then NOT p ({!pVal ? 'true' : 'false'})</p>
            </div>
          </div>
          <div className={clsx("mt-4 p-2 text-center rounded", "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200")}>
            ✅ Always equivalent — contrapositive preserves truth value.
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 No matter what p and q are, the contrapositive gives the same result as the original.</p>
        </div>

        {/* Why Contrapositive is Powerful */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Why the Contrapositive is So Useful</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Proof technique:</strong> To prove p ⇒ q, sometimes it's easier to prove its contrapositive ¬q ⇒ ¬p.</li>
            <li><strong>Natural language translation:</strong> Contrapositive often sounds more intuitive. "If it's not a mammal, then it's not a dog" vs "If it's a dog, then it's a mammal".</li>
            <li><strong>Logical equivalence:</strong> Since they are equivalent, you can replace one with the other in any logical expression.</li>
            <li><strong>Contradiction proofs:</strong> Proving ¬q ⇒ ¬p is a direct way to prove p ⇒ q by contradiction.</li>
          </ul>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">Example: To prove "If n² is even, then n is even", it's easier to prove its contrapositive: "If n is odd, then n² is odd".</p>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">🌍 Real-World Examples</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If Abhronila lives in Ichapur, then she lives in West Bengal." (True)</p>
              <p><strong>Contrapositive:</strong> "If Abhronila does NOT live in West Bengal, then she does NOT live in Ichapur." (Also true)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If it is raining, then the ground is wet." (True in normal circumstances)</p>
              <p><strong>Contrapositive:</strong> "If the ground is NOT wet, then it is NOT raining." (Also true)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If a number is divisible by 6, then it is divisible by 3." (True)</p>
              <p><strong>Contrapositive:</strong> "If a number is NOT divisible by 3, then it is NOT divisible by 6." (True)</p>
            </div>
          </div>
        </div>

        {/* Relationship with Converse and Inverse */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">Relationship with Converse and Inverse</h2>
          <div className="space-y-3">
            <p>Given an implication p ⇒ q, the four related statements are:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Original:</strong> p ⇒ q</li>
              <li><strong>Converse:</strong> q ⇒ p (not equivalent)</li>
              <li><strong>Inverse:</strong> ¬p ⇒ ¬q (not equivalent, but equivalent to converse)</li>
              <li><strong>Contrapositive:</strong> ¬q ⇒ ¬p (equivalent to original)</li>
            </ul>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <p className="font-mono">Contrapositive = Converse of Inverse = Inverse of Converse</p>
              <p className="mt-1">Original ⇔ Contrapositive &nbsp;&nbsp; Converse ⇔ Inverse</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Confusing contrapositive with converse:</strong> Converse is q⇒p (not equivalent). Contrapositive is ¬q⇒¬p (equivalent).</li>
            <li><strong>Forgetting to negate both parts:</strong> Some students only swap without negating.</li>
            <li><strong>Mis-negating compound antecedents:</strong> For (p∧q)⇒r, the contrapositive is ¬r ⇒ ¬(p∧q) ≡ ¬r ⇒ (¬p ∨ ¬q).</li>
            <li><strong>Assuming inverse is equivalent:</strong> Inverse is not equivalent; only contrapositive is.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always consider contrapositive when direct proof is difficult.</strong> It's a standard technique in mathematics.</li>
            <li><strong>Memorize the pattern:</strong> "Swap and negate both."</li>
            <li><strong>Use contrapositive to refute statements:</strong> To disprove p⇒q, show a counterexample to ¬q⇒¬p.</li>
            <li><strong>In programming, use contrapositive to simplify conditions:</strong> <code>{`if (!isLoggedIn) { ... }</code> is the contrapositive of some condition.`}</code></li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Did you swap the order (q becomes antecedent, p becomes consequent)?</li>
              <li>☑️ Did you negate both the new antecedent and new consequent?</li>
              <li>☑️ For compound statements, did you apply De Morgan correctly?</li>
              <li>☑️ Is your contrapositive logically equivalent to the original? (It always is.)</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <Teacher note="The contrapositive is a lifesaver in proofs. Show students the classic example: proving 'If n² is even, then n is even' by proving its contrapositive 'If n is odd, then n² is odd'. Emphasize that many mathematical theorems are actually proven via contrapositive without students realizing it. The mnemonic 'Flip and negate' works well. Also contrast with converse to avoid confusion." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1000">
          <FAQTemplate title="Contrapositive of a Proposition FAQs" questions={questions} />
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

export default Topic17;