// Topic10.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';

const Topic10 = () => {
  // Interactive checker state
  const [pVal, setPVal] = useState(true);
  const [qVal, setQVal] = useState(true);

  // Define expressions for interactive demonstration
  const tautologyExpr = (p, q) => {
    // (p ∧ q) ⇒ p is always true
    return !(p && q) || p; // logical implication: (p∧q) → p ≡ ¬(p∧q) ∨ p
  };

  const contradictionExpr = (p, q) => {
    // p ∧ ¬p is always false (independent of q)
    return p && !p;
  };

  const contingencyExpr = (p, q) => {
    // p ∧ q can be true or false depending on p,q
    return p && q;
  };

  const isTautology = tautologyExpr(pVal, qVal);
  const isContradiction = contradictionExpr(pVal, qVal);
  const isContingency = contingencyExpr(pVal, qVal);

  // Truth table data for tautology example
  const tautologyTable = [
    { p: true, q: true, pAndQ: true, result: true },
    { p: true, q: false, pAndQ: false, result: true },
    { p: false, q: true, pAndQ: false, result: true },
    { p: false, q: false, pAndQ: false, result: true },
  ];

  const contradictionTable = [
    { p: true, pAndNotP: false, result: false },
    { p: false, pAndNotP: false, result: false },
  ];

  const contingencyTable = [
    { p: true, q: true, result: true },
    { p: true, q: false, result: false },
    { p: false, q: true, result: false },
    { p: false, q: false, result: false },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Main container with stacked divs */}
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section with slide-up animation */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Tautology, Contradiction & Contingency
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Classify logical expressions based on their truth values across all possibilities
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What are Tautology, Contradiction, and Contingency?</h2>
          <p className="leading-relaxed">
            Every logical expression falls into one of three categories based on its truth values across <strong>all possible assignments</strong> to its variables.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-700 dark:text-green-300">✅ Tautology</h3>
              <p className="text-sm">Always true, regardless of input. Example: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">p ∨ ¬p</code></p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border-l-4 border-red-500">
              <h3 className="font-bold text-red-700 dark:text-red-300">❌ Contradiction</h3>
              <p className="text-sm">Always false, regardless of input. Example: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">p ∧ ¬p</code></p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-300">🟡 Contingency</h3>
              <p className="text-sm">Sometimes true, sometimes false. Most real-world statements. Example: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">p ∧ q</code></p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> "It is raining or it is not raining" is a tautology (always true). "It is raining and it is not raining" is a contradiction (always false). "It is raining" is a contingency (depends on weather).</p>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Detailed Classification</h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-medium text-green-600 dark:text-green-400">🔰 Tautology</h3>
              <p>A statement that is <strong>true under every possible interpretation</strong>. In truth tables, the final column contains all <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">true</code> values.</p>
              <p className="mt-1 text-sm">Tautologies are logically valid statements — they give no information but are the foundation of logical reasoning.</p>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">Examples: p ∨ ¬p, (p ∧ q) ⇒ p, p ⇒ (p ∨ q)</div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-red-600 dark:text-red-400">🔰 Contradiction</h3>
              <p>A statement that is <strong>false under every possible interpretation</strong>. In truth tables, the final column contains all <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">false</code> values.</p>
              <p className="mt-1 text-sm">Contradictions are logically inconsistent — they can never happen in reality.</p>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">Examples: p ∧ ¬p, (p ∧ q) ∧ (¬p ∨ ¬q), (p ⇒ q) ∧ (p ∧ ¬q)</div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-yellow-600 dark:text-yellow-400">🔰 Contingency</h3>
              <p>A statement that is <strong>true for some assignments and false for others</strong>. Most propositions we encounter in daily life and programming are contingencies.</p>
              <p className="mt-1 text-sm">A contingency is neither a tautology nor a contradiction — it provides actual information about the world.</p>
              <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">Examples: p, p ∧ q, p ∨ q, p ⇒ q</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm">🧠 <strong>Think about:</strong> Why can't a tautology be used as a condition in an if-statement? (Because it's always true, the else branch would never execute).</p>
          </div>
        </div>

        {/* Truth Tables for Each Type */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">Truth Table Examples</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-600">Tautology: (p ∧ q) ⇒ p</h3>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 dark:bg-gray-600">
                  <tr><th className="px-3 py-2">p</th><th className="px-3 py-2">q</th><th className="px-3 py-2">p ∧ q</th><th className="px-3 py-2">(p ∧ q) ⇒ p</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                  {tautologyTable.map((row, idx) => (
                    <tr key={idx}><td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td><td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td><td className="px-3 py-1 text-center">{row.pAndQ ? 'T' : 'F'}</td><td className="px-3 py-1 text-center font-bold text-green-600">{row.result ? 'T' : 'F'}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-1">All results are T → Tautology</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-red-600">Contradiction: p ∧ ¬p</h3>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 dark:bg-gray-600"><tr><th className="px-3 py-2">p</th><th className="px-3 py-2">¬p</th><th className="px-3 py-2">p ∧ ¬p</th></tr></thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                  {contradictionTable.map((row, idx) => (
                    <tr key={idx}><td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td><td className="px-3 py-1 text-center">{!row.p ? 'T' : 'F'}</td><td className="px-3 py-1 text-center font-bold text-red-600">{row.result ? 'T' : 'F'}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-1">All results are F → Contradiction</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-600">Contingency: p ∧ q</h3>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 dark:bg-gray-600"><tr><th className="px-3 py-2">p</th><th className="px-3 py-2">q</th><th className="px-3 py-2">p ∧ q</th></tr></thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                  {contingencyTable.map((row, idx) => (
                    <tr key={idx}><td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td><td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td><td className="px-3 py-1 text-center font-bold">{row.result ? 'T' : 'F'}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-1">Mixed results → Contingency</p>
          </div>
        </div>

        {/* Interactive Checker */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🧪 Interactive Classifier</h2>
          <p className="mb-4">Toggle p and q to see how different expressions behave. Observe which expression always yields the same result.</p>
          
          <div className="flex flex-wrap gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-mono text-sm">(p ∧ q) ⇒ p</p>
              <div className={clsx("mt-2 font-bold px-2 py-1 rounded-full inline-block", isTautology ? "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100" : "bg-red-200 dark:bg-red-800")}>Result: {isTautology ? 'true' : 'false'}</div>
              <p className="text-xs text-gray-500 mt-2">Always true → Tautology</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-mono text-sm">p ∧ ¬p</p>
              <div className={clsx("mt-2 font-bold px-2 py-1 rounded-full inline-block", isContradiction ? "bg-red-200 dark:bg-red-800" : "bg-green-200 dark:bg-green-800")}>Result: {isContradiction ? 'true' : 'false'}</div>
              <p className="text-xs text-gray-500 mt-2">Always false → Contradiction</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-mono text-sm">p ∧ q</p>
              <div className="mt-2 font-bold px-2 py-1 rounded-full inline-block bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100">Result: {isContingency ? 'true' : 'false'}</div>
              <p className="text-xs text-gray-500 mt-2">Depends on inputs → Contingency</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">💡 Try changing p and q — the tautology stays true, contradiction stays false, contingency changes.</p>
        </div>

        {/* How to Identify */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-indigo-500 pl-3 mb-4">How to Identify Tautology, Contradiction, Contingency</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li><strong>Truth Table Method:</strong> Compute all rows. If final column all T → tautology; all F → contradiction; mixed → contingency.</li>
            <li><strong>Simplification using Laws:</strong> Reduce expression using logical equivalences. If reduces to True → tautology; False → contradiction; else contingency.</li>
            <li><strong>Tree/Tableau Method:</strong> Attempt to find a counterexample. If none exists → tautology; if no satisfying assignment → contradiction.</li>
          </ul>
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="font-mono text-sm">⚡ <strong>Pro Tip:</strong> For small expressions (≤3 variables), truth tables are fastest. For larger, use logical simplification or semantic reasoning.</p>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Confusing tautology with valid argument:</strong> Tautology is a single statement always true; a valid argument has premises implying conclusion.</li>
            <li><strong>Assuming all familiar statements are contingencies:</strong> Some are tautologies (e.g., "It's raining or not").</li>
            <li><strong>Overlooking vacuous truth:</strong> Implications with false antecedent are true, which can create tautologies.</li>
            <li><strong>Mistaking contingency for contradiction:</strong> Check all rows, not just one.</li>
          </ul>
        </div>

        {/* Best Practices & Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Always construct complete truth tables</strong> for expressions with up to 3 variables to avoid missing edge cases.</li>
            <li><strong>Use De Morgan's laws</strong> to simplify negations before evaluating.</li>
            <li><strong>In programming, avoid tautologies as conditions</strong> (they are dead code) and contradictions (unreachable code).</li>
            <li><strong>Contradictions are useful in proofs by contradiction</strong> — assume negation and derive false.</li>
            <li><strong>Industry habit:</strong> Linters flag conditions that are always true/false. Write clear boolean expressions.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Mini Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Have you listed all possible truth assignments?</li>
              <li>☑️ Is the final column all true, all false, or mixed?</li>
              <li>☑️ Have you simplified the expression using laws?</li>
              <li>☑️ Could a tautology be mistaken for a contingency?</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <Teacher note="Tautologies and contradictions are the extremes of logical expressions. Use everyday examples: 'It will rain or it will not rain' (tautology) vs 'It will rain and it will not rain' (contradiction). Encourage students to create their own examples. In coding, tautologies often indicate logic errors — a condition like 'if (x > 5 || x <= 5)' is always true." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
          <FAQTemplate title="Tautology, Contradiction & Contingency FAQs" questions={questions} />
        </div>
      </div>

      {/* Inline keyframes for slide-up animation without opacity */}
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

export default Topic10;