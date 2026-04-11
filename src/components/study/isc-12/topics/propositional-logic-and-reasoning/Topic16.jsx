// Topic16.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic16_files/topic16_questions';

const Topic16 = () => {
  // Interactive state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Original implication: p ⇒ q
  // p = antecedent, q = consequent
  const original = !pVal || qVal;

  // Inverse: ¬p ⇒ ¬q (negate both antecedent and consequent)
  const inverse = !!pVal || !qVal; // ¬(¬p) ∨ ¬q? Wait carefully: ¬p ⇒ ¬q ≡ ¬(¬p) ∨ ¬q ≡ p ∨ ¬q
  // Better compute directly: inverse is true unless (¬p is true AND ¬q is false) i.e., (p false AND q true)
  const inverseCorrect = (!pVal) ? (!qVal) : true; // if ¬p true then need ¬q true, else true
  // Actually simpler: inverse ≡ p ∨ ¬q
  const inverseComputed = pVal || !qVal;

  // Are they equivalent? (No, generally not)
  const areEquivalent = original === inverseComputed;

  // Truth table data for implication vs inverse
  const truthTableData = [
    { p: true, q: true, imp: true, inverse: true, same: true },
    { p: true, q: false, imp: false, inverse: true, same: false },
    { p: false, q: true, imp: true, inverse: false, same: false },
    { p: false, q: false, imp: true, inverse: true, same: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Inverse of a Proposition
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Negating both hypothesis and conclusion — and why it's not equivalent
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What is the Inverse?</h2>
          <p className="leading-relaxed">
            Given an implication <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">p ⇒ q</code> (read "if p then q"), its <strong className="text-blue-600 dark:text-blue-400">inverse</strong> is formed by <strong>negating both the antecedent and the consequent</strong>: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">¬p ⇒ ¬q</code> ("if not p then not q").
          </p>
          <p className="leading-relaxed mt-3">
            <strong className="text-red-600 dark:text-red-400">Important:</strong> The inverse is <strong>not logically equivalent</strong> to the original implication. In fact, the inverse is logically equivalent to the <strong>converse</strong> (q ⇒ p), not the original. This is a common point of confusion.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Original: "If Swadeep is from Barrackpore, then he is from West Bengal." Inverse: "If Swadeep is NOT from Barrackpore, then he is NOT from West Bengal." The inverse is clearly false (he could be from Kolkata).</p>
          </div>
        </div>

        {/* Truth Table Comparison */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Truth Table: Implication vs Inverse</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-3 py-2">p</th><th className="px-3 py-2">q</th>
                  <th className="px-3 py-2">p ⇒ q (Original)</th>
                  <th className="px-3 py-2">¬p ⇒ ¬q (Inverse)</th>
                  <th className="px-3 py-2">Same?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {truthTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.imp ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.inverse ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-bold">{row.same ? '✓' : '✗'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Rows 2 and 3 show differences: inverse is not equivalent to original.</p>
        </div>

        {/* Interactive Inverse Checker */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive Inverse Checker</h2>
          <p className="mb-4">Toggle p and q to see how the inverse differs from the original implication.</p>
          
          {/* Antecedent/Consequent Reminder */}
          <div className="mb-4 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-sm">
            <p>📖 <strong>Recall:</strong> In <code>p ⇒ q</code>, <strong className="text-blue-600">p</strong> is the <strong>antecedent</strong> (hypothesis) and <strong className="text-green-600">q</strong> is the <strong>consequent</strong> (conclusion).</p>
            <p className="mt-1">The <strong>inverse</strong> negates both: <code>¬p ⇒ ¬q</code> → "if NOT p then NOT q".</p>
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
              <p className="font-mono font-bold">Inverse: ¬p ⇒ ¬q</p>
              <div className="text-2xl font-bold mt-2">{inverseComputed ? 'true' : 'false'}</div>
              <p className="text-sm text-gray-500 mt-1">If NOT p ({!pVal ? 'true' : 'false'}) then NOT q ({!qVal ? 'true' : 'false'})</p>
            </div>
          </div>
          <div className={clsx("mt-4 p-2 text-center rounded", areEquivalent ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200")}>
            {areEquivalent ? "⚠️ Currently equivalent (only when p and q have same truth value)" : "✓ Not equivalent (as expected in most cases)"}
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 Notice: The inverse differs when p and q have opposite truth values (rows 2 and 3).</p>
        </div>

        {/* Relationship with Converse and Contrapositive */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Relationship with Converse and Contrapositive</h2>
          <div className="space-y-3">
            <p>The inverse, converse, and contrapositive are three related transformations of an implication:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Original:</strong> <code>p ⇒ q</code></li>
              <li><strong>Converse:</strong> <code>q ⇒ p</code> (swap)</li>
              <li><strong>Inverse:</strong> <code>¬p ⇒ ¬q</code> (negate both)</li>
              <li><strong>Contrapositive:</strong> <code>¬q ⇒ ¬p</code> (swap AND negate)</li>
            </ul>
            <p className="mt-2"><strong className="text-green-600">Key equivalences:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Original ≡ Contrapositive (always)</li>
              <li>Converse ≡ Inverse (always)</li>
              <li>Original is <strong>not</strong> equivalent to Converse or Inverse (in general)</li>
            </ul>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
              <p className="font-mono">Inverse (¬p⇒¬q) is actually the contrapositive of the converse (q⇒p).</p>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">🌍 Real-World Examples</h2>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If Abhronila lives in Ichapur, then she lives in West Bengal." (True)</p>
              <p><strong>Inverse:</strong> "If Abhronila does NOT live in Ichapur, then she does NOT live in West Bengal." (False — she could live in Shyamnagar)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If a number is divisible by 4, then it is even." (True)</p>
              <p><strong>Inverse:</strong> "If a number is NOT divisible by 4, then it is NOT even." (False — 2 is not divisible by 4 but is even)</p>
            </div>
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <p><strong>Original:</strong> "If it is raining, then the ground is wet." (True in normal circumstances)</p>
              <p><strong>Inverse:</strong> "If it is NOT raining, then the ground is NOT wet." (False — sprinklers)</p>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Assuming inverse is equivalent to original:</strong> It's not — only contrapositive is equivalent.</li>
            <li><strong>Confusing inverse with contrapositive:</strong> Inverse negates only; contrapositive negates AND swaps.</li>
            <li><strong>Thinking inverse is same as converse:</strong> They are equivalent to each other, but not the same statement.</li>
            <li><strong>Using inverse in proofs incorrectly:</strong> Proving the inverse does NOT prove the original.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Memorize the relationships:</strong> Original ⇔ Contrapositive; Converse ⇔ Inverse.</li>
            <li><strong>To disprove an inverse, find a counterexample</strong> where ¬p is true but ¬q is false (i.e., p false and q true).</li>
            <li><strong>Use the mnemonic:</strong> "Inverse negates both; contrapositive swaps and negates."</li>
            <li><strong>In programming, avoid writing inverse conditions incorrectly:</strong> <code>{`if (!p) { ... }</code> does not imply <code>if (p) { ... }`}</code> else case.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Did you negate both antecedent and consequent correctly?</li>
              <li>☑️ Are you confusing inverse with contrapositive?</li>
              <li>☑️ Do you need to prove the inverse? (Usually not — prove contrapositive instead.)</li>
              <li>☑️ Have you checked a counterexample for the inverse?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="Students often mix up inverse, converse, and contrapositive. Use a simple chart: Original (p⇒q), Converse (q⇒p), Inverse (¬p⇒¬q), Contrapositive (¬q⇒¬p). Emphasize that only contrapositive is equivalent to original. Inverse is equivalent to converse. Provide plenty of everyday examples where the inverse is obviously false to solidify understanding." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="Inverse of a Proposition FAQs" questions={questions} />
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

export default Topic16;