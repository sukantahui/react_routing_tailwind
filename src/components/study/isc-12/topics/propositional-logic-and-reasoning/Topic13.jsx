// Topic13.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic13_files/topic13_questions';

const Topic13 = () => {
  // Interactive state for checking De Morgan laws
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Original expressions
  const notAndOriginal = !(pVal && qVal);      // ¬(p ∧ q)
  const deMorganAnd = !pVal || !qVal;          // ¬p ∨ ¬q

  const notOrOriginal = !(pVal || qVal);       // ¬(p ∨ q)
  const deMorganOr = !pVal && !qVal;           // ¬p ∧ ¬q

  const andLawHolds = notAndOriginal === deMorganAnd;
  const orLawHolds = notOrOriginal === deMorganOr;

  // Truth table data for De Morgan's laws
  const truthTableData = [
    { p: true, q: true, notAnd: false, demorganAnd: false, notOr: false, demorganOr: false },
    { p: true, q: false, notAnd: true, demorganAnd: true, notOr: false, demorganOr: false },
    { p: false, q: true, notAnd: true, demorganAnd: true, notOr: false, demorganOr: false },
    { p: false, q: false, notAnd: true, demorganAnd: true, notOr: true, demorganOr: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            De Morgan's Laws in Propositional Logic
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            The fundamental rules for negating conjunctions and disjunctions
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What are De Morgan's Laws?</h2>
          <p className="leading-relaxed">
            Named after the British mathematician <strong>Augustus De Morgan</strong>, these laws provide a systematic way to <strong>distribute negation</strong> over AND and OR operators. They are among the most frequently used logical equivalences in mathematics, computer science, and digital circuit design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-700 dark:text-green-300 text-lg">First Law</h3>
              <p className="font-mono text-xl mt-1">¬(p ∧ q) ≡ ¬p ∨ ¬q</p>
              <p className="text-sm mt-1">The negation of a conjunction is the disjunction of the negations.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-700 dark:text-blue-300 text-lg">Second Law</h3>
              <p className="font-mono text-xl mt-1">¬(p ∨ q) ≡ ¬p ∧ ¬q</p>
              <p className="text-sm mt-1">The negation of a disjunction is the conjunction of the negations.</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> Swadeep says "It is not true that I have a car AND a bike." That means: "I don't have a car OR I don't have a bike." Similarly, "It's not true that I have a car OR a bike" means "I don't have a car AND I don't have a bike."</p>
          </div>
        </div>

        {/* Truth Table Demonstration */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Truth Table Verification</h2>
          <p>The truth tables below confirm that both sides of each law produce identical outputs for all inputs.</p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-3 py-2">p</th><th className="px-3 py-2">q</th>
                  <th className="px-3 py-2">¬(p ∧ q)</th><th className="px-3 py-2">¬p ∨ ¬q</th><th className="px-3 py-2">Match?</th>
                  <th className="px-3 py-2">¬(p ∨ q)</th><th className="px-3 py-2">¬p ∧ ¬q</th><th className="px-3 py-2">Match?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {truthTableData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.notAnd ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.demorganAnd ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-bold text-green-600">✓</td>
                    <td className="px-3 py-1 text-center">{row.notOr ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.demorganOr ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-bold text-green-600">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Identical columns → De Morgan's laws hold.</p>
        </div>

        {/* Interactive Checker */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive De Morgan Verifier</h2>
          <p className="mb-4">Toggle p and q to see both laws in action — the two expressions should always match.</p>
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="font-mono text-sm font-bold">First Law: ¬(p ∧ q) ≡ ¬p ∨ ¬q</p>
              <div className="flex justify-around mt-3">
                <div><span className="text-gray-500">¬(p ∧ q) =</span> <span className="font-bold text-blue-600">{notAndOriginal ? 'true' : 'false'}</span></div>
                <div><span className="text-gray-500">¬p ∨ ¬q =</span> <span className="font-bold text-blue-600">{deMorganAnd ? 'true' : 'false'}</span></div>
              </div>
              <div className={clsx("mt-2 p-1 rounded", andLawHolds ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900 text-red-800")}>
                {andLawHolds ? "✅ Equivalent" : "❌ Not equivalent (should never happen)"}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
              <p className="font-mono text-sm font-bold">Second Law: ¬(p ∨ q) ≡ ¬p ∧ ¬q</p>
              <div className="flex justify-around mt-3">
                <div><span className="text-gray-500">¬(p ∨ q) =</span> <span className="font-bold text-blue-600">{notOrOriginal ? 'true' : 'false'}</span></div>
                <div><span className="text-gray-500">¬p ∧ ¬q =</span> <span className="font-bold text-blue-600">{deMorganOr ? 'true' : 'false'}</span></div>
              </div>
              <div className={clsx("mt-2 p-1 rounded", orLawHolds ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900 text-red-800")}>
                {orLawHolds ? "✅ Equivalent" : "❌ Not equivalent (should never happen)"}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">💡 Observe: When you push a NOT inside parentheses, AND becomes OR and OR becomes AND.</p>
        </div>

        {/* Extending to More Variables */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Extending to More Variables</h2>
          <p>De Morgan's laws can be extended to any number of propositions. For example:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">¬(p ∧ q ∧ r) ≡ ¬p ∨ ¬q ∨ ¬r</code></li>
            <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">¬(p ∨ q ∨ r ∨ s) ≡ ¬p ∧ ¬q ∧ ¬r ∧ ¬s</code></li>
          </ul>
          <p className="mt-3">In general: The negation of an AND of many terms is the OR of the negations of each term, and vice versa.</p>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">Example: ¬(p ∧ ¬q ∧ r) ≡ ¬p ∨ ¬(¬q) ∨ ¬r ≡ ¬p ∨ q ∨ ¬r</p>
          </div>
        </div>

        {/* Applications in Programming */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">💻 Application in Programming</h2>
          <p>De Morgan's laws are used daily by developers to simplify complex boolean conditions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="font-mono text-sm">Original: <code>if (!(isLoggedIn && hasPermission))</code></p>
              <p className="font-mono text-sm mt-1">De Morgan: <code>if (!isLoggedIn || !hasPermission)</code></p>
              <p className="text-xs text-gray-500 mt-1">Often more readable.</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <p className="font-mono text-sm">Original: <code>while (!(x &gt 0 || y &gt 0))</code></p>
              <p className="font-mono text-sm mt-1">De Morgan: <code>while (x &lt= 0 && y &lt= 0)</code></p>
              <p className="text-xs text-gray-500 mt-1">Avoids double negation.</p>
            </div>
          </div>
          <p className="mt-3 text-sm">Many linters suggest using De Morgan to simplify negated conditions, improving code clarity.</p>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Forgetting to flip the operator:</strong> ¬(p ∧ q) becomes ¬p ∨ ¬q, <span className="font-bold">not</span> ¬p ∧ ¬q.</li>
            <li><strong>Misapplying to implications:</strong> De Morgan does not directly apply to ⇒. First rewrite implication: ¬(p ⇒ q) ≡ p ∧ ¬q.</li>
            <li><strong>Overlooking nested negations:</strong> ¬(¬p ∧ q) becomes p ∨ ¬q (double negation on p).</li>
            <li><strong>Applying to biconditionals incorrectly:</strong> ¬(p ⇔ q) ≡ p ⇔ ¬q, not a simple De Morgan pattern.</li>
            <li><strong>Not distributing to all terms:</strong> When negating a conjunction of three or more, each term must be negated and operators flipped.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Memorize the mnemonic:</strong> "Break the line, change the sign." (Negation line becomes AND/OR flip).</li>
            <li><strong>Always double-check operator flip:</strong> ∧ ↔ ∨ when applying De Morgan.</li>
            <li><strong>Use De Morgan to push negations inward</strong> for normalization (e.g., converting to CNF or DNF).</li>
            <li><strong>In code reviews, prefer the form that is most readable</strong> — sometimes the negated form is clearer, sometimes the De Morgan form.</li>
            <li><strong>Practice with truth tables</strong> until the laws become intuitive.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Did you flip AND to OR (or OR to AND)?</li>
              <li>☑️ Did you negate every sub-proposition?</li>
              <li>☑️ For nested negations, apply De Morgan recursively?</li>
              <li>☑️ Is the resulting expression simpler or more readable?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="De Morgan's laws are often where students make sign errors. Use the 'break the line, change the sign' chant. In class, draw a NOT bar over an AND gate and show it becomes an OR gate with NOTs on inputs. Relate to everyday language: 'not (A and B)' means 'not A or not B'. Give plenty of examples with student names: 'It is not true that Swadeep and Tuhina both passed' means 'Swadeep did not pass or Tuhina did not pass'." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="De Morgan's Laws FAQs" questions={questions} />
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

export default Topic13;