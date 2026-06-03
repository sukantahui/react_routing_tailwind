// Topic23.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic23_files/topic23_questions';

const Topic23 = () => {
  // State for interactive truth table
  const [selectedVerification, setSelectedVerification] = useState(0);
  const [showFullTable, setShowFullTable] = useState(true);

  // Verification pairs (expression pairs to check equivalence)
  const verifications = [
    {
      name: "De Morgan's First Law",
      expr1: "¬(p ∧ q)",
      expr2: "¬p ∨ ¬q",
      compute: (p, q) => ({ left: !(p && q), right: (!p || !q) }),
      variables: ['p', 'q'],
      explanation: "De Morgan's law states that the negation of a conjunction is equivalent to the disjunction of the negations."
    },
    {
      name: "De Morgan's Second Law",
      expr1: "¬(p ∨ q)",
      expr2: "¬p ∧ ¬q",
      compute: (p, q) => ({ left: !(p || q), right: (!p && !q) }),
      variables: ['p', 'q'],
      explanation: "The negation of a disjunction is equivalent to the conjunction of the negations."
    },
    {
      name: "Implication Equivalence",
      expr1: "p ⇒ q",
      expr2: "¬p ∨ q",
      compute: (p, q) => ({ left: !p || q, right: !p || q }),
      variables: ['p', 'q'],
      explanation: "An implication p⇒q is logically equivalent to ¬p ∨ q (material implication)."
    },
    {
      name: "Contrapositive",
      expr1: "p ⇒ q",
      expr2: "¬q ⇒ ¬p",
      compute: (p, q) => ({ left: !p || q, right: !(!q) || !p }),
      variables: ['p', 'q'],
      explanation: "An implication is equivalent to its contrapositive."
    },
    {
      name: "Distributive Law (AND over OR)",
      expr1: "p ∧ (q ∨ r)",
      expr2: "(p ∧ q) ∨ (p ∧ r)",
      compute: (p, q, r) => ({ left: p && (q || r), right: (p && q) || (p && r) }),
      variables: ['p', 'q', 'r'],
      explanation: "AND distributes over OR, just like multiplication over addition."
    },
    {
      name: "Absorption Law",
      expr1: "p ∨ (p ∧ q)",
      expr2: "p",
      compute: (p, q) => ({ left: p || (p && q), right: p }),
      variables: ['p', 'q'],
      explanation: "p absorbs the larger expression."
    }
  ];

  const current = verifications[selectedVerification];
  const varCount = current.variables.length;
  const rowCount = Math.pow(2, varCount);

  // Generate all combinations of truth values
  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < rowCount; i++) {
      const values = {};
      if (varCount >= 1) values.p = !!(i & 1);
      if (varCount >= 2) values.q = !!(i & 2);
      if (varCount >= 3) values.r = !!(i & 4);
      rows.push(values);
    }
    return rows;
  };

  const rows = generateRows();

  // Compute results for each row
  const computeRow = (values) => {
    const p = values.p ?? false;
    const q = values.q ?? false;
    const r = values.r ?? false;
    return current.compute(p, q, r);
  };

  // Check if all rows match
  const allMatch = rows.every(row => {
    const result = computeRow(row);
    return result.left === result.right;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Verification Using Truth Tables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            The most reliable method to check logical equivalence and classify statements
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What is Truth Table Verification?</h2>
          <p className="leading-relaxed">
            A <strong>truth table</strong> lists all possible combinations of truth values for the variables in a logical expression and shows the resulting truth value of the expression. Truth tables are used to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Verify logical equivalence</strong> — if two expressions have identical truth table columns, they are equivalent.</li>
            <li><strong>Classify statements</strong> — tautology (all true), contradiction (all false), contingency (mixed).</li>
            <li><strong>Check validity of arguments</strong> — see if conclusion is true whenever premises are true.</li>
          </ul>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Key insight:</strong> Truth tables are exhaustive and foolproof. For expressions with up to 3 variables, they are the simplest verification method.</p>
          </div>
        </div>

        {/* How to Construct a Truth Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">How to Construct a Truth Table</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Count the number of distinct variables</strong> (n).</li>
            <li><strong>Create 2ⁿ rows</strong> — one for each combination of truth values.</li>
            <li><strong>List all variables</strong> as columns on the left.</li>
            <li><strong>Add columns for sub-expressions</strong> (optional but helpful).</li>
            <li><strong>Add a column for the final expression</strong>.</li>
            <li><strong>Fill truth values row by row</strong> using operator definitions.</li>
          </ol>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">📐 <strong>Example:</strong> For 2 variables (p, q), you need 2² = 4 rows: (T,T), (T,F), (F,T), (F,F).</p>
          </div>
        </div>

        {/* Interactive Truth Table Verifier */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">📊 Interactive Truth Table Verifier</h2>
          <p className="mb-4">Select a logical law or equivalence to see its truth table verification. All rows should match for equivalent expressions.</p>

          {/* Verification selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {verifications.map((v, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVerification(idx)}
                className={clsx(
                  "px-3 py-1 rounded transition-all duration-200 text-sm",
                  selectedVerification === idx
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {v.name}
              </button>
            ))}
          </div>

          {/* Truth Table Display */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden text-sm border border-gray-300 dark:border-gray-600">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  {current.variables.map(varName => (
                    <th key={varName} className="px-3 py-2 text-center font-bold">{varName}</th>
                  ))}
                  <th className="px-3 py-2 text-center border-l border-gray-300 dark:border-gray-600">{current.expr1}</th>
                  <th className="px-3 py-2 text-center">{current.expr2}</th>
                  <th className="px-3 py-2 text-center">Match?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {rows.map((row, idx) => {
                  const result = computeRow(row);
                  const match = result.left === result.right;
                  return (
                    <tr key={idx}>
                      {current.variables.map(varName => (
                        <td key={varName} className="px-3 py-1 text-center">{row[varName] ? 'T' : 'F'}</td>
                      ))}
                      <td className="px-3 py-1 text-center border-l border-gray-300 dark:border-gray-600">{result.left ? 'T' : 'F'}</td>
                      <td className="px-3 py-1 text-center">{result.right ? 'T' : 'F'}</td>
                      <td className="px-3 py-1 text-center">{match ? '✓' : '✗'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Verification Result */}
          <div className={clsx(
            "mt-4 p-3 rounded-lg text-center",
            allMatch ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
          )}>
            {allMatch ? (
              <p>✅ Verification PASSED — The two expressions are logically equivalent.</p>
            ) : (
              <p>❌ Verification FAILED — The two expressions are NOT equivalent.</p>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">{current.explanation}</p>
        </div>

        {/* Worked Example: Building a Truth Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">📝 Worked Example: Building a Truth Table</h2>
          <p><strong>Task:</strong> Verify that ¬(p ∨ q) is equivalent to ¬p ∧ ¬q (De Morgan's Second Law).</p>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg text-sm">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr><th>p</th><th>q</th><th>p ∨ q</th><th>¬(p ∨ q)</th><th>¬p</th><th>¬q</th><th>¬p ∧ ¬q</th><th>Same?</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                <tr><td>T</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td><td>F</td><td>✓</td></tr>
                <tr><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>✓</td></tr>
                <tr><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>✓</td></tr>
                <tr><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>✓</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2">All rows match → The expressions are logically equivalent.</p>
        </div>

        {/* Using Truth Tables for Classification */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">Classification Using Truth Tables</h2>
          <div className="space-y-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>Tautology:</strong> Final column all true. Example: p ∨ ¬p.</p>
              <div className="overflow-x-auto mt-1">
                <table className="text-xs inline-table"><tbody><tr><td>p</td><td>T</td><td>F</td></tr><tr><td>¬p</td><td>F</td><td>T</td></tr><tr><td>p∨¬p</td><td className="font-bold">T</td><td className="font-bold">T</td></tr></tbody></table>
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>Contradiction:</strong> Final column all false. Example: p ∧ ¬p.</p>
              <div className="overflow-x-auto mt-1">
                <table className="text-xs inline-table"><tbody><tr><td>p</td><td>T</td><td>F</td></tr><tr><td>¬p</td><td>F</td><td>T</td></tr><tr><td>p∧¬p</td><td className="font-bold">F</td><td className="font-bold">F</td></tr></tbody></table>
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <p><strong>Contingency:</strong> Mixed true/false. Example: p ∧ q.</p>
            </div>
          </div>
        </div>

        {/* Limitations of Truth Tables */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-yellow-700 dark:text-yellow-300 mb-4">⚠️ Limitations of Truth Tables</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Exponential growth:</strong> For n variables, you need 2ⁿ rows. For 5 variables, 32 rows; for 10 variables, 1024 rows — impractical manually.</li>
            <li><strong>Time-consuming</strong> for complex expressions.</li>
            <li><strong>Error-prone</strong> when done by hand for many rows.</li>
          </ul>
          <p className="mt-2 text-sm">For large expressions, use logical laws and algebraic simplification instead.</p>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls in Truth Table Construction</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Missing rows:</strong> For 3 variables, need 8 rows. Use binary counting (000 to 111).</li>
            <li><strong>Incorrect negation order:</strong> ¬(p∧q) vs ¬p∧¬q — different.</li>
            <li><strong>Forgetting vacuous truth:</strong> false ⇒ false is true.</li>
            <li><strong>Misaligning columns</strong> — ensure sub-expressions are evaluated correctly.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices for Truth Tables</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Use systematic row ordering</strong> (binary counting) to avoid missing combinations.</li>
            <li><strong>Add intermediate columns</strong> for sub-expressions to reduce errors.</li>
            <li><strong>Double-check the first and last rows</strong> (all true and all false) as sanity checks.</li>
            <li><strong>For verification, compare columns side by side.</strong></li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Have you included all 2ⁿ rows?</li>
              <li>☑️ Are sub-expressions evaluated before the final expression?</li>
              <li>☑️ Did you apply NOT before AND/OR correctly?</li>
              <li>☑️ For equivalence, are the final columns identical?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <Teacher note="Truth tables are the most concrete way to verify logical equivalence. Have students construct truth tables for all the basic laws (De Morgan, distributivity, etc.) themselves. Emphasize systematic row generation: for 2 variables, order TT, TF, FT, FF. For 3 variables, use binary counting. In exams, truth tables are often required for up to 3 variables. Show how to check tautology/contradiction quickly." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-1000">
          <FAQTemplate title="Truth Table Verification FAQs" questions={questions} />
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

export default Topic23;