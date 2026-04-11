// Topic14.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic14_files/topic14_questions';

const Topic14 = () => {
    // Interactive state
    const [pVal, setPVal] = useState(true);
    const [qVal, setQVal] = useState(true);
    const [rVal, setRVal] = useState(false);

    // Implication law: p ⇒ q ≡ ¬p ∨ q
    const originalImp = !pVal || qVal;
    const transformedImp = !pVal || qVal; // same, but we'll show equivalence

    // Contrapositive: p ⇒ q ≡ ¬q ⇒ ¬p
    const contrapositive = !qVal || !pVal; // ¬q ⇒ ¬p = ¬(¬q) ∨ ¬p = q ∨ ¬p, same as ¬p ∨ q
    const contrapositiveHolds = originalImp === contrapositive;

    // Exportation: p ⇒ (q ⇒ r) ≡ (p ∧ q) ⇒ r
    const leftExport = !pVal || (!qVal || rVal); // p ⇒ (q ⇒ r)
    const rightExport = !(pVal && qVal) || rVal; // (p ∧ q) ⇒ r
    const exportationHolds = leftExport === rightExport;

    // Implication chain: (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) (hypothetical syllogism, not equivalence but valid)
    const hypSyl = (!pVal || qVal) && (!qVal || rVal);
    const hypSylResult = !pVal || rVal;
    const hypSylValid = !hypSyl || hypSylResult; // tautology check

    // Truth table data for p⇒q vs ¬p∨q
    const impEquivTable = [
        { p: true, q: true, imp: true, disj: true },
        { p: true, q: false, imp: false, disj: false },
        { p: false, q: true, imp: true, disj: true },
        { p: false, q: false, imp: true, disj: true },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                {/* Title Section */}
                <div className="animate-[slideUp_0.5s_ease-out]">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Implication Laws and Transformations
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                        Mastering the rules that govern conditional statements
                    </p>
                </div>

                {/* Introduction Card */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
                    <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What are Implication Laws?</h2>
                    <p className="leading-relaxed">
                        Implication (<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">p ⇒ q</code>) is one of the most important but often misunderstood logical connectives. Implication laws allow us to <strong>transform implications into equivalent forms</strong> using other operators (OR, AND, NOT). These transformations are essential for simplifying logical expressions, writing proofs, and optimizing code conditions.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border-l-4 border-green-500">
                            <h3 className="font-bold">Implication as Disjunction</h3>
                            <p className="font-mono">p ⇒ q ≡ ¬p ∨ q</p>
                            <p className="text-sm">"If p then q" means "either not p, or q".</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border-l-4 border-blue-500">
                            <h3 className="font-bold">Contrapositive</h3>
                            <p className="font-mono">p ⇒ q ≡ ¬q ⇒ ¬p</p>
                            <p className="text-sm">Reverse and negate both sides.</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg border-l-4 border-purple-500">
                            <h3 className="font-bold">Exportation</h3>
                            <p className="font-mono">p ⇒ (q ⇒ r) ≡ (p ∧ q) ⇒ r</p>
                            <p className="text-sm">Combine nested implications.</p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border-l-4 border-yellow-500">
                            <h3 className="font-bold">Hypothetical Syllogism</h3>
                            <p className="font-mono">(p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r)</p>
                            <p className="text-sm">Chain implications (transitivity).</p>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                        <p className="text-sm italic">💡 <strong>Real-world analogy:</strong> "If Swadeep studies, then he will pass" ≡ "Either Swadeep does not study, or he passes." Also equivalent to "If Swadeep does not pass, then he did not study."</p>
                    </div>
                </div>

                {/* Truth Table: Implication ≡ Disjunction */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-200">
                    <h2 className="text-2xl font-semibold border-l-4 border-green-500 pl-3 mb-4">Truth Table: p ⇒ q ≡ ¬p ∨ q</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-600">
                                <tr><th className="px-3 py-2">p</th><th className="px-3 py-2">q</th><th className="px-3 py-2">p ⇒ q</th><th className="px-3 py-2">¬p ∨ q</th><th className="px-3 py-2">Equivalent?</th></tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-500">
                                {impEquivTable.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="px-3 py-1 text-center">{row.p ? 'T' : 'F'}</td>
                                        <td className="px-3 py-1 text-center">{row.q ? 'T' : 'F'}</td>
                                        <td className="px-3 py-1 text-center">{row.imp ? 'T' : 'F'}</td>
                                        <td className="px-3 py-1 text-center">{row.disj ? 'T' : 'F'}</td>
                                        <td className="px-3 py-1 text-center font-bold text-green-600">✓</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Identical columns confirm the law.</p>
                </div>

                {/* Interactive Law Checker */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">🔄 Interactive Imputation Transformer</h2>
                    <p className="mb-4">Toggle p, q, r to see how different forms of implication are equivalent.</p>
                    <div className="flex flex-wrap gap-6 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={pVal} onChange={() => setPVal(!pVal)} className="w-5 h-5" /> <span className="font-mono font-bold">p = {pVal ? 'true' : 'false'}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={qVal} onChange={() => setQVal(!qVal)} className="w-5 h-5" /> <span className="font-mono font-bold">q = {qVal ? 'true' : 'false'}</span></label>
                        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={rVal} onChange={() => setRVal(!rVal)} className="w-5 h-5" /> <span className="font-mono font-bold">r = {rVal ? 'true' : 'false'}</span></label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <p><strong>Implication → Disjunction:</strong></p>
                            <p className="font-mono">p ⇒ q = {originalImp ? 'true' : 'false'}</p>
                            <p className="font-mono">¬p ∨ q = {transformedImp ? 'true' : 'false'}</p>
                            <p className="text-green-600">✓ Always equivalent</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <p><strong>Contrapositive:</strong></p>
                            <p className="font-mono">p ⇒ q = {originalImp ? 'true' : 'false'}</p>
                            <p className="font-mono">¬q ⇒ ¬p = {contrapositive ? 'true' : 'false'}</p>
                            <p className={clsx(contrapositiveHolds ? "text-green-600" : "text-red-600")}>{contrapositiveHolds ? "✓ Equivalent" : "✗ Not equivalent"}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg md:col-span-2">
                            <p><strong>Exportation: p ⇒ (q ⇒ r) ≡ (p ∧ q) ⇒ r</strong></p>
                            <p className="font-mono">p ⇒ (q ⇒ r) = {leftExport ? 'true' : 'false'}</p>
                            <p className="font-mono">(p ∧ q) ⇒ r = {rightExport ? 'true' : 'false'}</p>
                            <p className={clsx(exportationHolds ? "text-green-600" : "text-red-600")}>{exportationHolds ? "✓ Equivalent" : "✗ Not equivalent"}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg md:col-span-2">
                            <p><strong>Hypothetical Syllogism (transitivity):</strong> (p⇒q) ∧ (q⇒r) ⇒ (p⇒r)</p>
                            <p className="font-mono">Premises true? {(pVal ? 'p' : '¬p')} ⇒ {qVal ? 'q' : '¬q'} and {qVal ? 'q' : '¬q'} ⇒ {rVal ? 'r' : '¬r'} both hold: {hypSyl ? 'true' : 'false'}</p>
                            <p className="font-mono">Conclusion p⇒r = {hypSylResult ? 'true' : 'false'}</p>
                            <p className="text-green-600">✓ Valid argument (tautology)</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">💡 Notice: The contrapositive is always equivalent; exportation combines nested implications.</p>
                </div>

                {/* Detailed Laws Explanation */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
                    <h2 className="text-2xl font-semibold border-l-4 border-purple-500 pl-3 mb-4">📖 Detailed Implication Transformations</h2>
                    <div className="space-y-4">
                        <div>
                            <strong className="text-blue-600">1. Implication as Disjunction (Material Implication):</strong>
                            <p><code>p ⇒ q ≡ ¬p ∨ q</code>. This is the most fundamental transformation. It shows that implication is a kind of "OR" with the antecedent negated. Example: "If it rains, then the ground gets wet" ≡ "Either it does not rain, or the ground gets wet."</p>
                        </div>
                        <div>
                            <strong className="text-blue-600">2. Contrapositive:</strong>
                            <p><code>p ⇒ q ≡ ¬q ⇒ ¬p</code>. Swapping and negating both sides preserves logical equivalence. This is extremely useful in proofs: proving ¬q ⇒ ¬p is often easier. Example: "If Swadeep is late, he misses the bus" ≡ "If Swadeep did not miss the bus, he was not late."</p>
                        </div>
                        <div>
                            <strong className="text-blue-600">3. Exportation:</strong>
                            <p><code>p ⇒ (q ⇒ r) ≡ (p ∧ q) ⇒ r</code>. Nested implications can be "flattened" into a single implication with a conjunction of antecedents. This is key in logic and programming: "If p, then (if q then r)" means the same as "If p and q, then r".</p>
                        </div>
                        <div>
                            <strong className="text-blue-600">4. Hypothetical Syllogism (Transitivity of Implication):</strong>
                            <p><code>(p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r)</code>. While not an equivalence (it's a valid argument form), it allows chaining implications. Used extensively in mathematical proofs and rule-based systems.</p>
                        </div>
                        <div>
                            <strong className="text-blue-600">5. Negation of Implication:</strong>
                            <p><code>¬(p ⇒ q) ≡ p ∧ ¬q</code>. The only way an implication is false is when the antecedent is true and consequent false. This is often used in proofs by contradiction.</p>
                        </div>
                    </div>
                </div>

                {/* Programming Applications */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
                    <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">💻 Application in Programming</h2>
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                            <p className="font-mono text-sm">// Instead of nested ifs:</p>
                            <p className="font-mono text-sm">{`if (p) { if (q) {doR(); } }`}</p>
                            <p className="font-mono text-sm mt-1">// Using exportation, rewrite as:</p>
                            <p className="font-mono text-sm">{`if (p && q) {doR(); }`}</p>
                            <p className="text-xs text-gray-500 mt-1">Flattening nested conditionals improves readability.</p>
                        </div>
                        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                            <p className="font-mono text-sm">// Instead of:</p>
                            <p className="font-mono text-sm">if (!(condition)) {`{... }`}</p>
                            <p className="font-mono text-sm mt-1">// Use contrapositive thinking:</p>
                            <p className="font-mono text-sm">if (!result) {`{... }`} // reverse condition</p>
                            <p className="text-xs text-gray-500 mt-1">Contrapositive helps restructure conditions for clarity.</p>
                        </div>
                    </div>
                </div>

                {/* Common Pitfalls */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
                    <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Pitfalls</h2>
                    <ul className="space-y-2 list-disc list-inside">
                        <li><strong>Confusing contrapositive with converse:</strong> Converse (q ⇒ p) is <span className="font-bold">not</span> equivalent to original. Only contrapositive is equivalent.</li>
                        <li><strong>Thinking false ⇒ false is false:</strong> In logic, false ⇒ false is true (vacuous truth).</li>
                        <li><strong>Misapplying exportation:</strong> p ⇒ (q ⇒ r) is not equivalent to (p ⇒ q) ⇒ r. Parentheses matter.</li>
                        <li><strong>Forgetting that implication is not associative:</strong> (p⇒q)⇒r is different from p⇒(q⇒r).</li>
                        <li><strong>Using hypothetical syllogism as equivalence:</strong> It's a valid implication, but the reverse (p⇒r) ⇒ ((p⇒q)∧(q⇒r)) is not valid.</li>
                    </ul>
                </div>

                {/* Best Practices & Tips */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-700">
                    <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ Best Practices & Pro Tips</h2>
                    <ul className="space-y-2 list-disc list-inside">
                        <li><strong>Always convert implications to disjunctions (¬p ∨ q) when simplifying complex expressions.</strong></li>
                        <li><strong>Use contrapositive when direct proof is difficult:</strong> Prove ¬q ⇒ ¬p instead of p ⇒ q.</li>
                        <li><strong>Flatten nested conditionals in code using exportation</strong> to reduce nesting depth.</li>
                        <li><strong>Remember that implication is not commutative</strong> — order matters.</li>
                        <li><strong>In debugging, check the only false case:</strong> p true and q false.</li>
                    </ul>
                    <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                        <p>📌 <strong>Mini Checklist:</strong></p>
                        <ul className="list-check list-inside ml-4">
                            <li>☑️ Did you correctly convert p⇒q to ¬p∨q?</li>
                            <li>☑️ Is the contrapositive correctly formed (negate both and swap)?</li>
                            <li>☑️ For nested implications, did you apply exportation correctly?</li>
                            <li>☑️ Did you avoid confusing converse with contrapositive?</li>
                        </ul>
                    </div>
                </div>

                {/* Teacher's Note */}
                <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
                    <Teacher note="Implication is often the hardest connective for students. Spend extra time on the truth table of ⇒, especially the vacuous truth cases (false antecedent). Use everyday examples: 'If it rains, I will take an umbrella' — this statement is true even if it doesn't rain. Emphasize that contrapositive is logically equivalent and often easier to prove in math. The exportation law is a lifesaver for simplifying nested if-statements in programming." />
                </div>

                {/* FAQ Section */}
                <div className="animate-[slideUp_0.5s_ease-out] animation-delay-900">
                    <FAQTemplate title="Implication Laws & Transformations FAQs" questions={questions} />
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

export default Topic14;