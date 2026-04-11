// Topic15.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic15_files/topic15_questions';

const Topic15 = () => {
  // Interactive state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Original implication: p ⇒ q
  const original = !pVal || qVal;

  // Converse: q ⇒ p
  const converse = !qVal || pVal;

  // Are they equivalent? (they shouldn't be in general)
  const areEquivalent = original === converse;

  // Truth table data for implication vs converse
  const truthTableData = [
    { p: true, q: true, imp: true, conv: true, same: true },
    { p: true, q: false, imp: false, conv: true, same: false },
    { p: false, q: true, imp: true, conv: false, same: false },
    { p: false, q: false, imp: true, conv: true, same: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Converse of a Proposition
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Understanding the reversed conditional and why it's not equivalent
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What is the Converse?</h2>
          <p className="leading-relaxed">
            Given an implication <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">p ⇒ q</code> (read as "if p then q"), its <strong className="text-blue-600 dark:text-blue-400">converse</strong> is the statement <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">q ⇒ p</code> ("if q then p"). The converse simply <strong>swaps the antecedent and consequent</strong>.
          </p>
          <p className="leading-relaxed mt-3">
            <strong className="text-red-600 dark:text-red-400">Important:</strong> The converse is <strong>not logically equivalent</strong> to the original implication in general. A true implication may have a false converse, and vice versa. This is a common source of logical fallacies.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Original: "If Swadeep is from Barrackpore, then he is from West Bengal." Converse: "If Swadeep is from West Bengal, then he is from Barrackpore." The original is true, but the converse is false (he could be from Kolkata).</p>
          </div>
        </div>

        {/* Interactive Converse Checker */}
        <div className="...">
          <h2 className="...">🔄 Interactive Converse Checker</h2>
          <p className="mb-4">Toggle p and q to see how the converse differs from the original implication.</p>

          {/* Add a small reminder box before the toggles */}
          <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-sm">
            <p>📖 <strong>Recall:</strong> In <code>p ⇒ q</code>, <strong className="text-blue-600">p</strong> is the <strong>antecedent</strong> (hypothesis) and <strong className="text-green-600">q</strong> is the <strong>consequent</strong> (conclusion).</p>
            <p className="mt-1">The <strong>converse</strong> swaps them: <code>q ⇒ p</code> → now <strong className="text-green-600">q</strong> becomes antecedent, <strong className="text-blue-600">p</strong> becomes consequent.</p>
          </div>

          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" />
              <span className="font-mono font-bold">p (antecedent) = {pVal ? 'true' : 'false'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" />
              <span className="font-mono font-bold">q (consequent) = {qVal ? 'true' : 'false'}</span>
            </label>
          </div>

          {/* Rest of the component remains the same */}
        </div>

        {/* Truth Table Comparison */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Truth Table: Implication vs Converse</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-3 py-2">p</th><th className="px-3 py-2">q</th>
                  <th className="px-3 py-2">p ⇒ q (Original)</th>
                  <th className="px-3 py-2">q ⇒ p (Converse)</th>
                  <th className="px-3 py-2">Same?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {truthTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.imp ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.conv ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-bold">{row.same ? '✓' : '✗'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Rows 2 and 3 show differences: implication and converse are not equivalent.</p>
        </div>

        {/* Interactive Converse Checker */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive Converse Checker</h2>
          <p className="mb-4">Toggle p and q to see how the converse differs from the original implication.</p>
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
              <p className="font-mono font-bold">Original: p ⇒ q</p>
              <div className="text-2xl font-bold mt-2">{original ? 'true' : 'false'}</div>
              <p className="text-sm text-gray-500 mt-1">{pVal ? 'p is true' : 'p is false'} and {qVal ? 'q is true' : 'q is false'}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
              <p className="font-mono font-bold">Converse: q ⇒ p</p>
              <div className="text-2xl font-bold mt-2">{converse ? 'true' : 'false'}</div>
              <p className="text-sm text-gray-500 mt-1">{qVal ? 'q is true' : 'q is false'} and {pVal ? 'p is true' : 'p is false'}</p>
            </div>
          </div>
          <div className={clsx("mt-4 p-2 text-center rounded", areEquivalent ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200")}>
            {areEquivalent ? "⚠️ Currently equivalent (only when p and q have same truth value)" : "✓ Not equivalent (as expected in most cases)"}
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Notice: The converse differs when p and q have opposite truth values.</p>
        </div>

        {/* When is Converse Equivalent? */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">When is the Converse Equivalent to the Original?</h2>
          <p>The converse <code>q ⇒ p</code> is logically equivalent to the original <code>p ⇒ q</code> only when <strong>p and q have the same truth value</strong> (i.e., when <code>p ⇔ q</code> is true). This happens in two cases:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Both p and q are true</li>
            <li>Both p and q are false</li>
          </ul>
          <p className="mt-3">In all other cases, the converse differs. Therefore, you cannot assume an implication's converse is true just because the original is true — that's the <strong>fallacy of affirming the consequent</strong>.</p>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">p ⇔ q ≡ (p ⇒ q) ∧ (q ⇒ p)</p>
            <p className="mt-1">The biconditional is the conjunction of an implication and its converse.</p>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">🌍 Real-World Examples</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If Abhronila lives in Ichapur, then she lives in West Bengal." (True)</p>
              <p><strong>Converse:</strong> "If Abhronila lives in West Bengal, then she lives in Ichapur." (False — she could live in Shyamnagar)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If a number is divisible by 4, then it is even." (True)</p>
              <p><strong>Converse:</strong> "If a number is even, then it is divisible by 4." (False — 2 is even but not divisible by 4)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If it is raining, then the ground is wet." (True in normal circumstances)</p>
              <p><strong>Converse:</strong> "If the ground is wet, then it is raining." (False — sprinklers could have wet the ground)</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Assuming converse is automatically true:</strong> Just because p⇒q is true does NOT mean q⇒p is true.</li>
            <li><strong>Confusing converse with contrapositive:</strong> Contrapositive (¬q⇒¬p) is equivalent; converse is not.</li>
            <li><strong>Using converse in proofs incorrectly:</strong> Many beginners accidentally prove the converse instead of the original.</li>
            <li><strong>Thinking biconditional is same as implication:</strong> The biconditional requires both directions; implication only one.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always check if you need the converse or the original:</strong> In problem statements, read carefully.</li>
            <li><strong>Use counterexamples:</strong> To disprove a converse, find one case where q is true but p is false.</li>
            <li><strong>Remember the mnemonic:</strong> "Converse swaps, contrapositive swaps and negates."</li>
            <li><strong>In programming, beware of reversing conditions:</strong> <code>{`if (isAdmin) { allowDelete(); }`}</code> does not mean <code>{`if (allowDelete()) { isAdmin; }`}</code>.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Have you identified the antecedent and consequent correctly?</li>
              <li>☑️ Did you swap them to form the converse?</li>
              <li>☑️ Are you assuming the converse is true? (Don't!)</li>
              <li>☑️ Do you need the biconditional (both directions)?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="Students often mistakenly believe that 'if p then q' means 'if q then p'. Use everyday counterexamples to drive the point home: 'If it's a square, then it's a rectangle' is true, but the converse is false. Emphasize that the converse is a different statement that must be proven separately. In proofs, when asked to prove an 'if and only if' statement, they must prove both the implication and its converse." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="Converse of a Proposition FAQs" questions={questions} />
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

export default Topic15;