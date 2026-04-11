// Topic11.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic11_files/topic11_questions';

const Topic11 = () => {
  // Interactive equivalence checker state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Two equivalent expressions: p ⇒ q and ¬p ∨ q
  const expr1 = !pVal || qVal;        // p ⇒ q
  const expr2 = !pVal || qVal;        // ¬p ∨ q (same)
  const areEquivalent = expr1 === expr2;

  // Another pair: p ⇔ q and (p⇒q)∧(q⇒p)
  const bicond = pVal === qVal;
  const bicondExpanded = (!pVal || qVal) && (!qVal || pVal);
  const bicondEquivalent = bicond === bicondExpanded;

  // Truth table data for equivalence demonstration
  const equivalenceTable = [
    { p: true, q: true, pImpliesQ: true, notPOrQ: true },
    { p: true, q: false, pImpliesQ: false, notPOrQ: false },
    { p: false, q: true, pImpliesQ: true, notPOrQ: true },
    { p: false, q: false, pImpliesQ: true, notPOrQ: true },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Logical Equivalence of Propositions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            When two different logical expressions always yield the same truth value
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What is Logical Equivalence?</h2>
          <p className="leading-relaxed">
            Two propositions (or compound statements) are <strong className="text-blue-600 dark:text-blue-400">logically equivalent</strong> if they have the <strong>same truth value</strong> for every possible assignment of truth values to their variables. We write this as <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">A ≡ B</code> or <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">A ⇔ B</code> (as a logical relation, not a connective).
          </p>
          <p className="leading-relaxed mt-3">
            For example, the implication <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">p ⇒ q</code> is logically equivalent to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">¬p ∨ q</code>. No matter what truth values p and q take, both expressions evaluate to the same result.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> "If Swadeep studies, then he will pass" is equivalent to "Either Swadeep does not study, or he passes." Both sentences convey the same logical constraint.</p>
          </div>
        </div>

        {/* Why Equivalence Matters */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Why Logical Equivalence Matters</h2>
          <ul className="space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Simplification:</strong> Replace complex expressions with simpler, equivalent ones (e.g., in programming, simplify boolean conditions).</li>
            <li><strong>Proof Techniques:</strong> Show two statements are equivalent by proving they imply each other.</li>
            <li><strong>Circuit Design:</strong> Optimize digital logic gates using equivalent forms (De Morgan's laws, etc.).</li>
            <li><strong>Database Queries:</strong> Query optimizers rewrite SQL conditions into equivalent but faster forms.</li>
            <li><strong>Natural Language Understanding:</strong> Recognize that different English sentences can mean the same logical thing.</li>
          </ul>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">🧠 <strong>Think about:</strong> Why might a programmer prefer <code>if (!(a && b))</code> over <code>if (!a || !b)</code>? (They are equivalent, but one may be clearer.)</p>
          </div>
        </div>

        {/* Truth Table Demonstration */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Truth Table Method for Equivalence</h2>
          <p>To check if two expressions are equivalent, construct a truth table with columns for each expression. If the columns are identical for all rows, they are equivalent.</p>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr><th className="px-3 py-2">p</th><th className="px-3 py-2">q</th><th className="px-3 py-2">p ⇒ q</th><th className="px-3 py-2">¬p ∨ q</th><th className="px-3 py-2">Same?</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                {equivalenceTable.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.pImpliesQ ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center">{row.notPOrQ ? 'T' : 'F'}</td>
                    <td className="px-3 py-1 text-center font-bold text-green-600">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2">Identical columns → p⇒q ≡ ¬p∨q</p>
        </div>

        {/* Interactive Equivalence Checker */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔁 Interactive Equivalence Checker</h2>
          <p className="mb-4">Toggle p and q to see how two equivalent expressions always match.</p>
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-mono text-sm">p ⇒ q</p>
              <div className="mt-2 font-bold px-2 py-1 rounded-full inline-block bg-blue-100 dark:bg-blue-800">Result: {expr1 ? 'true' : 'false'}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-mono text-sm">¬p ∨ q</p>
              <div className="mt-2 font-bold px-2 py-1 rounded-full inline-block bg-blue-100 dark:bg-blue-800">Result: {expr2 ? 'true' : 'false'}</div>
            </div>
          </div>
          <div className="mt-4 text-center p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            <p className="font-bold">Equivalent? {areEquivalent ? <span className="text-green-600">✅ YES</span> : <span className="text-red-600">❌ NO</span>}</p>
          </div>
          <p className="text-xs text-gray-500 mt-3">💡 No matter what p and q are, both expressions always match.</p>
        </div>

        {/* Another Example: Biconditional Equivalence */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">Example: Biconditional Equivalence</h2>
          <p>The biconditional <code>p ⇔ q</code> is equivalent to <code>(p ⇒ q) ∧ (q ⇒ p)</code>.</p>
          <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-mono">Current values: p = {pVal ? 'T' : 'F'}, q = {qVal ? 'T' : 'F'}</p>
            <p>p ⇔ q evaluates to <strong>{bicond ? 'true' : 'false'}</strong></p>
            <p>(p⇒q) ∧ (q⇒p) evaluates to <strong>{bicondExpanded ? 'true' : 'false'}</strong></p>
            <p className={clsx("font-bold mt-2", bicondEquivalent ? "text-green-600" : "text-red-600")}>{bicondEquivalent ? "✅ Equivalent" : "❌ Not equivalent (should never happen)"}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">This shows that two different syntactic forms can be logically equivalent.</p>
        </div>

        {/* Common Logical Equivalences (Laws) */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">Important Logical Equivalences (Preview)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Double Negation:</strong> ¬¬p ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Idempotent:</strong> p ∧ p ≡ p, p ∨ p ≡ p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Commutative:</strong> p∧q ≡ q∧p, p∨q ≡ q∨p</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Associative:</strong> (p∧q)∧r ≡ p∧(q∧r)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Distributive:</strong> p∧(q∨r) ≡ (p∧q)∨(p∧r)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>De Morgan's:</strong> ¬(p∧q) ≡ ¬p∨¬q, ¬(p∨q) ≡ ¬p∧¬q</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Implication:</strong> p⇒q ≡ ¬p∨q</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Contrapositive:</strong> p⇒q ≡ ¬q⇒¬p</div>
          </div>
          <p className="text-xs text-gray-500 mt-3">These laws form the foundation for simplifying logical expressions.</p>
        </div>

        {/* How to Prove Equivalence */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold border-l-4 border-teal-500 pl-3 mb-4">Methods to Prove Logical Equivalence</h2>
          <ul className="space-y-3">
            <li><strong>1. Truth Table:</strong> Exhaustively compare columns. Works for small number of variables.</li>
            <li><strong>2. Using Logical Laws:</strong> Transform one expression into the other using known equivalences (e.g., De Morgan, distributivity).</li>
            <li><strong>3. Equivalence Proof:</strong> Show A ⇒ B and B ⇒ A are both tautologies.</li>
            <li><strong>4. Semantic Reasoning:</strong> Argue why both expressions must have same truth value in all cases.</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-mono text-sm">⚡ <strong>Pro Tip:</strong> For exams, use truth tables for ≤3 variables; for complex expressions, use algebraic simplification with laws.</p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Confusing equivalence with implication:</strong> A ≡ B means they always have same truth value, not just that A implies B.</li>
            <li><strong>Assuming syntactic similarity means equivalence:</strong> Different forms can be equivalent (e.g., p⇒q and ¬p∨q).</li>
            <li><strong>Forgetting double negation:</strong> ¬¬p is equivalent to p, but beginners sometimes think it's different.</li>
            <li><strong>Misapplying De Morgan's:</strong> ¬(p∧q) is ¬p∨¬q, not ¬p∧¬q.</li>
            <li><strong>Equivalence vs Biconditional connective:</strong> The symbol ⇔ can mean logical equivalence (meta-level) or the biconditional operator (object-level). Context matters.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always simplify before comparing:</strong> Use laws to reduce both expressions to a normal form (like DNF or CNF).</li>
            <li><strong>Use truth tables for small expressions:</strong> They are foolproof and easy to verify.</li>
            <li><strong>Memorize basic equivalences:</strong> Implication, De Morgan, distributivity — they save time.</li>
            <li><strong>In programming, refactor boolean conditions</strong> using equivalence to improve readability without changing logic.</li>
            <li><strong>Check for tautology/contradiction:</strong> An expression equivalent to True is a tautology; to False is a contradiction.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Have you listed all possible truth assignments?</li>
              <li>☑️ Are the final columns identical?</li>
              <li>☑️ Did you apply laws correctly (no sign errors)?</li>
              <li>☑️ Is your simplified expression truly equivalent to the original?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1000">
          <Teacher note="Logical equivalence is the bedrock of all simplification in logic and programming. Use vivid examples: 'If Swadeep is late, he misses the bus' ≡ 'Swadeep is not late or he misses the bus.' Encourage students to build truth tables for every new equivalence they encounter. In code reviews, point out when a complex condition can be replaced by a simpler equivalent — that's where theory meets practice." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1100">
          <FAQTemplate title="Logical Equivalence FAQs" questions={questions} />
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
        .animation-delay-1100 { animation-delay: 1.1s; }
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

export default Topic11;